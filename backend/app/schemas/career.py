from typing import List, Optional, Any, Dict
from pydantic import BaseModel


class SkillBase(BaseModel):
    id: int
    name: str
    slug: str
    category: Optional[str] = None
    description: Optional[str] = None
    why_it_matters: Optional[str] = None
    prerequisites: List[str] = []
    recommended_tools: List[str] = []

    class Config:
        from_attributes = True


class SkillInStage(BaseModel):
    id: int
    name: str
    slug: str
    category: Optional[str] = None
    description: Optional[str] = None
    why_it_matters: Optional[str] = None
    prerequisites: List[str] = []
    recommended_tools: List[str] = []
    stage_number: int
    importance: str

    class Config:
        from_attributes = True


class ProjectBase(BaseModel):
    id: int
    slug: str
    title: str
    description: str
    difficulty: str
    estimated_hours: int
    tech_stack: List[str] = []
    deliverables: List[str] = []
    domain_slug: Optional[str] = None
    role_slug: Optional[str] = None

    class Config:
        from_attributes = True


class MilestoneSchema(BaseModel):
    id: int
    milestone_number: int
    title: str
    duration: str
    description: str
    why_it_matters: Optional[str] = None
    concepts: List[str] = []
    tools: List[str] = []
    exercises: List[str] = []
    completion_criteria: List[str] = []
    skills: List[str] = []
    projects: List[ProjectBase] = []

    class Config:
        from_attributes = True


class RoadmapStageSchema(BaseModel):
    id: int
    stage_number: int
    stage_name: str
    stage_subtitle: Optional[str] = None
    duration: str
    milestones: List[MilestoneSchema] = []

    class Config:
        from_attributes = True


class RoadmapSchema(BaseModel):
    id: int
    role_id: int
    role_slug: Optional[str] = None
    role_title: Optional[str] = None
    domain_id: int
    domain_slug: Optional[str] = None
    title: str
    description: Optional[str] = None
    total_duration: str
    stages: List[RoadmapStageSchema] = []

    class Config:
        from_attributes = True


class RoleSummary(BaseModel):
    id: int
    slug: str
    title: str
    focus: str
    description: str
    is_primary: Optional[bool] = False

    class Config:
        from_attributes = True


class RoleProfile(BaseModel):
    id: int
    slug: str
    title: str
    focus: str
    description: str
    responsibilities: str
    tasks: List[str] = []
    tools: List[str] = []
    deliverables: List[str] = []
    prerequisites: List[str] = []
    skills_count: Optional[int] = 0
    domain_id: Optional[int] = None
    domain_slug: Optional[str] = None
    domain_name: Optional[str] = None

    class Config:
        from_attributes = True


class RoleCompareItem(BaseModel):
    id: int
    slug: str
    title: str
    focus: str
    description: str
    responsibilities: str
    tasks: List[str] = []
    tools: List[str] = []
    deliverables: List[str] = []
    prerequisites: List[str] = []
    core_skills: List[str] = []

    class Config:
        from_attributes = True


class DomainListItem(BaseModel):
    id: int
    slug: str
    name: str
    title: str
    description: str
    milestone_count: int
    role_count: int

    class Config:
        from_attributes = True


class DomainDetail(BaseModel):
    id: int
    slug: str
    name: str
    title: str
    description: str
    overview: Optional[str] = None
    why_it_matters: Optional[str] = None
    applications: List[Dict[str, Any]] = []
    professional_work: List[Dict[str, Any]] = []
    technologies: List[Dict[str, Any]] = []
    milestone_count: int
    roles: List[RoleSummary] = []
    related_projects: List[ProjectBase] = []

    class Config:
        from_attributes = True


class RecommendationRequest(BaseModel):
    domain_slug: str
    role_slug: Optional[str] = None
    academic_year: Optional[int] = 1
    known_skills: List[str] = []


class RecommendationResponse(BaseModel):
    domain_slug: str
    role_slug: str
    role_title: str
    total_skills_evaluated: int
    matched_skills: List[str] = []
    missing_skills: List[str] = []
    readiness_score: int
    recommended_starting_stage: int
    recommended_starting_stage_name: str
    recommended_milestone: Optional[Dict[str, Any]] = None
    recommended_projects: List[ProjectBase] = []
    explanation: str
