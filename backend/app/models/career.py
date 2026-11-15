from datetime import datetime
from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Boolean,
    ForeignKey,
    DateTime,
    JSON,
)
from sqlalchemy.orm import relationship
from ..db.session import Base


class Domain(Base):
    __tablename__ = "domains"
    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(100), unique=True, index=True, nullable=False)
    name = Column(String(200), nullable=False)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    overview = Column(Text, nullable=True)
    why_it_matters = Column(Text, nullable=True)
    applications = Column(JSON, default=list)  # List[{"title": "...", "description": "...", "icon": "..."}]
    professional_work = Column(JSON, default=list)  # List[{"title": "...", "description": "..."}]
    technologies = Column(JSON, default=list)  # List[{"name": "...", "description": "...", "why_it_matters": "..."}]
    milestone_count = Column(Integer, default=8)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    domain_roles = relationship("DomainRole", back_populates="domain", cascade="all, delete-orphan")
    roadmaps = relationship("Roadmap", back_populates="domain")


class Role(Base):
    __tablename__ = "roles"
    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(100), unique=True, index=True, nullable=False)
    title = Column(String(200), nullable=False)
    focus = Column(Text, nullable=False)
    description = Column(Text, nullable=False)
    responsibilities = Column(Text, nullable=False)
    tasks = Column(JSON, default=list)  # List[str] daily tasks
    tools = Column(JSON, default=list)  # List[str] primary tools
    deliverables = Column(JSON, default=list)  # List[str] expected deliverables
    prerequisites = Column(JSON, default=list)  # List[str]
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    domain_roles = relationship("DomainRole", back_populates="role", cascade="all, delete-orphan")
    role_skills = relationship("RoleSkill", back_populates="role", cascade="all, delete-orphan")
    roadmap = relationship("Roadmap", back_populates="role", uselist=False)


class DomainRole(Base):
    __tablename__ = "domain_roles"
    id = Column(Integer, primary_key=True, index=True)
    domain_id = Column(Integer, ForeignKey("domains.id", ondelete="CASCADE"), nullable=False)
    role_id = Column(Integer, ForeignKey("roles.id", ondelete="CASCADE"), nullable=False)
    is_primary = Column(Boolean, default=False)

    domain = relationship("Domain", back_populates="domain_roles")
    role = relationship("Role", back_populates="domain_roles")


class Skill(Base):
    __tablename__ = "skills"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), unique=True, index=True, nullable=False)
    slug = Column(String(150), unique=True, index=True, nullable=False)
    category = Column(String(100), nullable=True)
    description = Column(Text, nullable=True)
    why_it_matters = Column(Text, nullable=True)
    prerequisites = Column(JSON, default=list)
    recommended_tools = Column(JSON, default=list)

    role_skills = relationship("RoleSkill", back_populates="skill")
    milestone_skills = relationship("MilestoneSkill", back_populates="skill")


class RoleSkill(Base):
    __tablename__ = "role_skills"
    id = Column(Integer, primary_key=True, index=True)
    role_id = Column(Integer, ForeignKey("roles.id", ondelete="CASCADE"), nullable=False)
    skill_id = Column(Integer, ForeignKey("skills.id", ondelete="CASCADE"), nullable=False)
    stage_number = Column(Integer, nullable=False, default=1)  # 1: Foundations, 2: Core Skills, 3: Specialization, 4: Career Readiness
    importance = Column(String(50), default="core")

    role = relationship("Role", back_populates="role_skills")
    skill = relationship("Skill", back_populates="role_skills")


class Roadmap(Base):
    __tablename__ = "roadmaps"
    id = Column(Integer, primary_key=True, index=True)
    role_id = Column(Integer, ForeignKey("roles.id", ondelete="CASCADE"), nullable=False, unique=True)
    domain_id = Column(Integer, ForeignKey("domains.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    total_duration = Column(String(100), default="4 Academic Years (8–9 Semesters)")

    role = relationship("Role", back_populates="roadmap")
    domain = relationship("Domain", back_populates="roadmaps")
    stages = relationship("RoadmapStage", back_populates="roadmap", cascade="all, delete-orphan", order_by="RoadmapStage.stage_number")


class RoadmapStage(Base):
    __tablename__ = "roadmap_stages"
    id = Column(Integer, primary_key=True, index=True)
    roadmap_id = Column(Integer, ForeignKey("roadmaps.id", ondelete="CASCADE"), nullable=False)
    stage_number = Column(Integer, nullable=False)  # 1, 2, 3, 4
    stage_name = Column(String(150), nullable=False)
    stage_subtitle = Column(String(200), nullable=True)
    duration = Column(String(100), default="Year 1 (Semesters 1 & 2)")

    roadmap = relationship("Roadmap", back_populates="stages")
    milestones = relationship("Milestone", back_populates="stage", cascade="all, delete-orphan", order_by="Milestone.milestone_number")


class Milestone(Base):
    __tablename__ = "milestones"
    id = Column(Integer, primary_key=True, index=True)
    stage_id = Column(Integer, ForeignKey("roadmap_stages.id", ondelete="CASCADE"), nullable=False)
    milestone_number = Column(Integer, nullable=False)
    title = Column(String(200), nullable=False)
    duration = Column(String(100), default="4–6 Weeks")
    description = Column(Text, nullable=False)
    why_it_matters = Column(Text, nullable=True)
    concepts = Column(JSON, default=list)
    tools = Column(JSON, default=list)
    exercises = Column(JSON, default=list)
    completion_criteria = Column(JSON, default=list)

    stage = relationship("RoadmapStage", back_populates="milestones")
    milestone_skills = relationship("MilestoneSkill", back_populates="milestone", cascade="all, delete-orphan")
    milestone_projects = relationship("MilestoneProject", back_populates="milestone", cascade="all, delete-orphan")


class MilestoneSkill(Base):
    __tablename__ = "milestone_skills"
    id = Column(Integer, primary_key=True, index=True)
    milestone_id = Column(Integer, ForeignKey("milestones.id", ondelete="CASCADE"), nullable=False)
    skill_id = Column(Integer, ForeignKey("skills.id", ondelete="CASCADE"), nullable=False)

    milestone = relationship("Milestone", back_populates="milestone_skills")
    skill = relationship("Skill", back_populates="milestone_skills")


class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(150), unique=True, index=True, nullable=False)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    difficulty = Column(String(50), default="Intermediate")
    estimated_hours = Column(Integer, default=25)
    tech_stack = Column(JSON, default=list)
    deliverables = Column(JSON, default=list)
    domain_slug = Column(String(100), nullable=True)
    role_slug = Column(String(100), nullable=True)

    milestone_projects = relationship("MilestoneProject", back_populates="project")


class MilestoneProject(Base):
    __tablename__ = "milestone_projects"
    id = Column(Integer, primary_key=True, index=True)
    milestone_id = Column(Integer, ForeignKey("milestones.id", ondelete="CASCADE"), nullable=False)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)

    milestone = relationship("Milestone", back_populates="milestone_projects")
    project = relationship("Project", back_populates="milestone_projects")
