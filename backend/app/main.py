import os
from typing import List, Optional
from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from contextlib import asynccontextmanager

from .core.config import settings
from .db.session import engine, get_db, SessionLocal, Base
from .db.seed import seed_database
from .models.career import (
    Domain,
    Role,
    DomainRole,
    Skill,
    RoleSkill,
    Roadmap,
    RoadmapStage,
    Milestone,
    MilestoneSkill,
    Project,
    MilestoneProject,
)
from .schemas.career import (
    DomainListItem,
    DomainDetail,
    RoleSummary,
    RoleProfile,
    RoleCompareItem,
    SkillInStage,
    ProjectBase,
    RoadmapSchema,
    RoadmapStageSchema,
    MilestoneSchema,
    RecommendationRequest,
    RecommendationResponse,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize DB tables and seed if empty on startup
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        seed_database(db)
    yield


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description=settings.DESCRIPTION,
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Helper for domain slug aliases
def resolve_domain_slug(slug: str) -> str:
    alias_map = {
        "software-dev": "software-engineering",
        "software": "software-engineering",
        "data-analytics": "data-science",
        "data": "data-science",
        "cloud": "cloud-devops",
        "devops": "cloud-devops",
        "security": "cybersecurity",
    }
    return alias_map.get(slug.lower(), slug.lower())


# -------------------------------------------------------------
# 1. HEALTH CHECK
# -------------------------------------------------------------
@app.get("/api/v1/health")
def health_check(db: Session = Depends(get_db)):
    domain_count = db.query(Domain).count()
    role_count = db.query(Role).count()
    return {
        "status": "ok",
        "service": "IntelliMatch AI Career Intelligence API",
        "version": "2.0.0",
        "database": "connected",
        "domains_count": domain_count,
        "roles_count": role_count,
    }


# -------------------------------------------------------------
# 2. DOMAIN EXPLORER ENDPOINTS
# -------------------------------------------------------------
@app.get("/api/v1/domains", response_model=List[DomainListItem])
def list_domains(db: Session = Depends(get_db)):
    domains = db.query(Domain).filter(Domain.is_active == True).all()
    results = []
    for d in domains:
        role_cnt = db.query(DomainRole).filter(DomainRole.domain_id == d.id).count()
        results.append(
            DomainListItem(
                id=d.id,
                slug=d.slug,
                name=d.name,
                title=d.title,
                description=d.description,
                milestone_count=d.milestone_count or 8,
                role_count=role_cnt,
            )
        )
    return results


@app.get("/api/v1/domains/{slug}", response_model=DomainDetail)
def get_domain_detail(slug: str, db: Session = Depends(get_db)):
    resolved = resolve_domain_slug(slug)
    domain = db.query(Domain).filter(Domain.slug == resolved).first()
    if not domain:
        raise HTTPException(status_code=404, detail=f"Domain '{slug}' not found.")

    # Fetch associated roles
    domain_roles = (
        db.query(DomainRole, Role)
        .join(Role, DomainRole.role_id == Role.id)
        .filter(DomainRole.domain_id == domain.id, Role.is_active == True)
        .all()
    )
    roles_list = [
        RoleSummary(
            id=r.id,
            slug=r.slug,
            title=r.title,
            focus=r.focus,
            description=r.description,
            is_primary=dr.is_primary,
        )
        for dr, r in domain_roles
    ]

    # Fetch related projects
    projects = db.query(Project).filter(Project.domain_slug == resolved).all()
    project_list = [
        ProjectBase(
            id=p.id,
            slug=p.slug,
            title=p.title,
            description=p.description,
            difficulty=p.difficulty,
            estimated_hours=p.estimated_hours,
            tech_stack=p.tech_stack or [],
            deliverables=p.deliverables or [],
            domain_slug=p.domain_slug,
            role_slug=p.role_slug,
        )
        for p in projects
    ]

    return DomainDetail(
        id=domain.id,
        slug=domain.slug,
        name=domain.name,
        title=domain.title,
        description=domain.description,
        overview=domain.overview,
        why_it_matters=domain.why_it_matters,
        applications=domain.applications or [],
        professional_work=domain.professional_work or [],
        technologies=domain.technologies or [],
        milestone_count=domain.milestone_count or 8,
        roles=roles_list,
        related_projects=project_list,
    )


@app.get("/api/v1/domains/{slug}/roles", response_model=List[RoleSummary])
def get_domain_roles(slug: str, db: Session = Depends(get_db)):
    resolved = resolve_domain_slug(slug)
    domain = db.query(Domain).filter(Domain.slug == resolved).first()
    if not domain:
        raise HTTPException(status_code=404, detail=f"Domain '{slug}' not found.")

    domain_roles = (
        db.query(DomainRole, Role)
        .join(Role, DomainRole.role_id == Role.id)
        .filter(DomainRole.domain_id == domain.id, Role.is_active == True)
        .all()
    )
    return [
        RoleSummary(
            id=r.id,
            slug=r.slug,
            title=r.title,
            focus=r.focus,
            description=r.description,
            is_primary=dr.is_primary,
        )
        for dr, r in domain_roles
    ]


# -------------------------------------------------------------
# 3. ROLE EXPLORER, INSIDE THE PROFESSION & ROLE COMPARISON
# -------------------------------------------------------------
@app.get("/api/v1/roles/compare", response_model=List[RoleCompareItem])
def compare_roles(slugs: str = Query(..., description="Comma-separated role slugs to compare"), db: Session = Depends(get_db)):
    slug_list = [s.strip().lower() for s in slugs.split(",") if s.strip()]
    if not slug_list:
        raise HTTPException(status_code=400, detail="Please provide at least one role slug to compare.")

    roles = db.query(Role).filter(Role.slug.in_(slug_list)).all()
    if not roles:
        raise HTTPException(status_code=404, detail="No matching roles found.")

    # Preserve order of requested slugs
    role_map = {r.slug: r for r in roles}
    ordered_roles = [role_map[s] for s in slug_list if s in role_map]

    result = []
    for r in ordered_roles:
        # Get top skills
        role_skills = (
            db.query(Skill)
            .join(RoleSkill, Skill.id == RoleSkill.skill_id)
            .filter(RoleSkill.role_id == r.id)
            .limit(8)
            .all()
        )
        skill_names = [s.name for s in role_skills]

        result.append(
            RoleCompareItem(
                id=r.id,
                slug=r.slug,
                title=r.title,
                focus=r.focus,
                description=r.description,
                responsibilities=r.responsibilities,
                tasks=r.tasks or [],
                tools=r.tools or [],
                deliverables=r.deliverables or [],
                prerequisites=r.prerequisites or [],
                core_skills=skill_names,
            )
        )
    return result


@app.get("/api/v1/roles/{slug}", response_model=RoleProfile)
def get_role_profile(slug: str, db: Session = Depends(get_db)):
    role = db.query(Role).filter(Role.slug == slug.lower()).first()
    if not role:
        raise HTTPException(status_code=404, detail=f"Role '{slug}' not found.")

    domain_role = (
        db.query(DomainRole, Domain)
        .join(Domain, DomainRole.domain_id == Domain.id)
        .filter(DomainRole.role_id == role.id)
        .first()
    )

    skill_count = db.query(RoleSkill).filter(RoleSkill.role_id == role.id).count()

    return RoleProfile(
        id=role.id,
        slug=role.slug,
        title=role.title,
        focus=role.focus,
        description=role.description,
        responsibilities=role.responsibilities,
        tasks=role.tasks or [],
        tools=role.tools or [],
        deliverables=role.deliverables or [],
        prerequisites=role.prerequisites or [],
        skills_count=skill_count,
        domain_id=domain_role[1].id if domain_role else None,
        domain_slug=domain_role[1].slug if domain_role else None,
        domain_name=domain_role[1].name if domain_role else None,
    )


# -------------------------------------------------------------
# 4. 4-STAGE SKILL PROGRESSION FOR A ROLE
# -------------------------------------------------------------
@app.get("/api/v1/roles/{slug}/skills")
def get_role_skills_grouped(slug: str, db: Session = Depends(get_db)):
    role = db.query(Role).filter(Role.slug == slug.lower()).first()
    if not role:
        raise HTTPException(status_code=404, detail=f"Role '{slug}' not found.")

    records = (
        db.query(RoleSkill, Skill)
        .join(Skill, RoleSkill.skill_id == Skill.id)
        .filter(RoleSkill.role_id == role.id)
        .order_by(RoleSkill.stage_number, RoleSkill.id)
        .all()
    )

    stages = {1: [], 2: [], 3: [], 4: []}
    for rs, sk in records:
        stages[rs.stage_number].append(
            SkillInStage(
                id=sk.id,
                name=sk.name,
                slug=sk.slug,
                category=sk.category,
                description=sk.description,
                why_it_matters=sk.why_it_matters,
                prerequisites=sk.prerequisites or [],
                recommended_tools=sk.recommended_tools or [],
                stage_number=rs.stage_number,
                importance=rs.importance,
            )
        )

    stage_labels = {
        1: {"title": "Stage 1 — Foundations", "subtitle": "Year 1 • Fundamental Programming & Concepts"},
        2: {"title": "Stage 2 — Core Skills", "subtitle": "Year 2 • Core Technical Competencies"},
        3: {"title": "Stage 3 — Specialization", "subtitle": "Year 3 • Advanced Frameworks & Distributed Systems"},
        4: {"title": "Stage 4 — Career Readiness", "subtitle": "Year 4 • Production Capstone & Fresher Hiring Bar"},
    }

    return {
        "role_id": role.id,
        "role_slug": role.slug,
        "role_title": role.title,
        "stages": [
            {
                "stage_number": st,
                "stage_title": stage_labels[st]["title"],
                "stage_subtitle": stage_labels[st]["subtitle"],
                "skills": stages[st],
            }
            for st in [1, 2, 3, 4]
        ],
    }


# -------------------------------------------------------------
# 5. ROLE-SPECIFIC STRUCTURED ROADMAP
# -------------------------------------------------------------
@app.get("/api/v1/roles/{slug}/roadmap", response_model=RoadmapSchema)
def get_role_roadmap(slug: str, db: Session = Depends(get_db)):
    role = db.query(Role).filter(Role.slug == slug.lower()).first()
    if not role:
        raise HTTPException(status_code=404, detail=f"Role '{slug}' not found.")

    roadmap = db.query(Roadmap).filter(Roadmap.role_id == role.id).first()
    if not roadmap:
        raise HTTPException(status_code=404, detail=f"No roadmap found for role '{slug}'.")

    domain = db.query(Domain).filter(Domain.id == roadmap.domain_id).first()

    stages_result = []
    for st in roadmap.stages:
        milestones_result = []
        for ms in st.milestones:
            # Fetch skills linked to this milestone
            ms_skills = (
                db.query(Skill)
                .join(MilestoneSkill, Skill.id == MilestoneSkill.skill_id)
                .filter(MilestoneSkill.milestone_id == ms.id)
                .all()
            )
            skill_names = [s.name for s in ms_skills]

            # Fetch projects linked to this milestone
            ms_projects = (
                db.query(Project)
                .join(MilestoneProject, Project.id == MilestoneProject.project_id)
                .filter(MilestoneProject.milestone_id == ms.id)
                .all()
            )
            project_bases = [
                ProjectBase(
                    id=p.id,
                    slug=p.slug,
                    title=p.title,
                    description=p.description,
                    difficulty=p.difficulty,
                    estimated_hours=p.estimated_hours,
                    tech_stack=p.tech_stack or [],
                    deliverables=p.deliverables or [],
                    domain_slug=p.domain_slug,
                    role_slug=p.role_slug,
                )
                for p in ms_projects
            ]

            milestones_result.append(
                MilestoneSchema(
                    id=ms.id,
                    milestone_number=ms.milestone_number,
                    title=ms.title,
                    duration=ms.duration,
                    description=ms.description,
                    why_it_matters=ms.why_it_matters,
                    concepts=ms.concepts or [],
                    tools=ms.tools or [],
                    exercises=ms.exercises or [],
                    completion_criteria=ms.completion_criteria or [],
                    skills=skill_names,
                    projects=project_bases,
                )
            )

        stages_result.append(
            RoadmapStageSchema(
                id=st.id,
                stage_number=st.stage_number,
                stage_name=st.stage_name,
                stage_subtitle=st.stage_subtitle,
                duration=st.duration,
                milestones=milestones_result,
            )
        )

    return RoadmapSchema(
        id=roadmap.id,
        role_id=role.id,
        role_slug=role.slug,
        role_title=role.title,
        domain_id=roadmap.domain_id,
        domain_slug=domain.slug if domain else None,
        title=roadmap.title,
        description=roadmap.description,
        total_duration=roadmap.total_duration,
        stages=stages_result,
    )


# -------------------------------------------------------------
# 6. PROJECTS DIRECTORY
# -------------------------------------------------------------
@app.get("/api/v1/projects", response_model=List[ProjectBase])
def list_projects(
    domain: Optional[str] = None,
    role: Optional[str] = None,
    difficulty: Optional[str] = None,
    skill: Optional[str] = None,
    db: Session = Depends(get_db),
):
    query = db.query(Project)
    if domain:
        resolved = resolve_domain_slug(domain)
        query = query.filter(Project.domain_slug == resolved)
    if role:
        query = query.filter(Project.role_slug == role.lower())
    if difficulty:
        query = query.filter(Project.difficulty.ilike(difficulty))

    projects = query.all()

    if skill:
        skill_lower = skill.lower()
        projects = [
            p for p in projects
            if any(skill_lower in s.lower() for s in (p.tech_stack or []))
        ]

    return [
        ProjectBase(
            id=p.id,
            slug=p.slug,
            title=p.title,
            description=p.description,
            difficulty=p.difficulty,
            estimated_hours=p.estimated_hours,
            tech_stack=p.tech_stack or [],
            deliverables=p.deliverables or [],
            domain_slug=p.domain_slug,
            role_slug=p.role_slug,
        )
        for p in projects
    ]


# -------------------------------------------------------------
# 7. CAREER PATH INTELLIGENCE & RECOMMENDATION ENGINE
# -------------------------------------------------------------
@app.post("/api/v1/career-path/recommend", response_model=RecommendationResponse)
def recommend_career_path(req: RecommendationRequest, db: Session = Depends(get_db)):
    resolved_domain = resolve_domain_slug(req.domain_slug)
    domain = db.query(Domain).filter(Domain.slug == resolved_domain).first()
    if not domain:
        raise HTTPException(status_code=404, detail=f"Domain '{req.domain_slug}' not found.")

    # Resolve target role
    role = None
    if req.role_slug:
        role = db.query(Role).filter(Role.slug == req.role_slug.lower()).first()
    if not role:
        # Default to primary role in domain
        primary_dr = (
            db.query(DomainRole, Role)
            .join(Role, DomainRole.role_id == Role.id)
            .filter(DomainRole.domain_id == domain.id, DomainRole.is_primary == True)
            .first()
        )
        role = primary_dr[1] if primary_dr else db.query(Role).first()

    if not role:
        raise HTTPException(status_code=404, detail="No role available for recommendation.")

    # Get all skills for this role with stage numbers
    role_skills = (
        db.query(RoleSkill, Skill)
        .join(Skill, RoleSkill.skill_id == Skill.id)
        .filter(RoleSkill.role_id == role.id)
        .order_by(RoleSkill.stage_number)
        .all()
    )

    known_lower = {k.strip().lower() for k in req.known_skills if k.strip()}

    matched = []
    missing_by_stage = {1: [], 2: [], 3: [], 4: []}

    for rs, sk in role_skills:
        sk_name_lower = sk.name.lower()
        if any(k in sk_name_lower or sk_name_lower in k for k in known_lower):
            matched.append(sk.name)
        else:
            missing_by_stage[rs.stage_number].append(sk.name)

    total_evaluated = len(role_skills)
    readiness_score = int((len(matched) / total_evaluated * 100)) if total_evaluated > 0 else 0

    # Determine recommended starting stage: earliest stage with missing skills, or user's academic year
    recommended_stage = 1
    for st in [1, 2, 3, 4]:
        if missing_by_stage[st]:
            recommended_stage = st
            break

    # If student knows all skills up to their academic year, advance them
    if req.academic_year and req.academic_year > recommended_stage:
        # Give gentle warning or stay at missing foundational stage
        pass

    stage_names = {
        1: "Stage 1 — Foundations (Year 1)",
        2: "Stage 2 — Core Skills (Year 2)",
        3: "Stage 3 — Specialization (Year 3)",
        4: "Stage 4 — Career Readiness (Year 4)",
    }

    # Find the recommended starting milestone in that stage
    roadmap = db.query(Roadmap).filter(Roadmap.role_id == role.id).first()
    recommended_ms_dict = None
    if roadmap:
        target_stage = next((st for st in roadmap.stages if st.stage_number == recommended_stage), None)
        if target_stage and target_stage.milestones:
            first_ms = target_stage.milestones[0]
            recommended_ms_dict = {
                "number": first_ms.milestone_number,
                "title": first_ms.title,
                "duration": first_ms.duration,
                "description": first_ms.description,
            }

    # Recommend projects
    recommended_projects = (
        db.query(Project)
        .filter(Project.role_slug == role.slug)
        .limit(2)
        .all()
    )
    if not recommended_projects:
        recommended_projects = (
            db.query(Project)
            .filter(Project.domain_slug == domain.slug)
            .limit(2)
            .all()
        )

    project_bases = [
        ProjectBase(
            id=p.id,
            slug=p.slug,
            title=p.title,
            description=p.description,
            difficulty=p.difficulty,
            estimated_hours=p.estimated_hours,
            tech_stack=p.tech_stack or [],
            deliverables=p.deliverables or [],
            domain_slug=p.domain_slug,
            role_slug=p.role_slug,
        )
        for p in recommended_projects
    ]

    all_missing = [s for st in [1, 2, 3, 4] for s in missing_by_stage[st]]

    explanation = (
        f"Based on your profile with {len(matched)} matched skills out of {total_evaluated} core competencies for {role.title}, "
        f"your current foundational readiness is {readiness_score}%. "
        f"We recommend starting at {stage_names[recommended_stage]} to master your priority skill gaps: "
        f"{', '.join(missing_by_stage[recommended_stage][:3]) or 'next-stage specialization'}."
    )

    return RecommendationResponse(
        domain_slug=domain.slug,
        role_slug=role.slug,
        role_title=role.title,
        total_skills_evaluated=total_evaluated,
        matched_skills=matched,
        missing_skills=all_missing,
        readiness_score=readiness_score,
        recommended_starting_stage=recommended_stage,
        recommended_starting_stage_name=stage_names[recommended_stage],
        recommended_milestone=recommended_ms_dict,
        recommended_projects=project_bases,
        explanation=explanation,
    )


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=True)
