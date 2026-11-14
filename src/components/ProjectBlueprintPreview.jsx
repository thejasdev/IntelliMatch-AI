import React from "react";

export default function ProjectBlueprintPreview({ project = {} }) {
  const title = (project.title || "").toLowerCase();
  const domain = (project.domain || project.category || "").toLowerCase();
  const stack = Array.isArray(project.skills || project.techStack || project.technologies)
    ? (project.skills || project.techStack || project.technologies).slice(0, 3)
    : ["React", "API", "SQL"];

  // 1. CLIENT-SIDE TASK & HABIT ANALYTICS TRACKER (Beginner)
  if (title.includes("task") || title.includes("habit")) {
    return (
      <div className="w-full h-48 bg-[#070B16] p-3 flex flex-col justify-between select-none overflow-hidden group">
        {/* Window Top Bar */}
        <div className="flex items-center justify-between border-b border-slate-800/90 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500/80" />
            <span className="w-2 h-2 rounded-full bg-amber-400/80" />
            <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
            <span className="ml-1.5 font-mono text-[10px] text-slate-400 truncate">
              HabitFlow • Task &amp; Streak Analytics
            </span>
          </div>
        </div>

        {/* Main Split UI: Left Task Checklist + Right Weekly Trend Chart */}
        <div className="grid grid-cols-12 gap-2.5 my-auto pt-2">
          {/* Left: Interactive Task List & Category Pills */}
          <div className="col-span-7 bg-[#0B1224] border border-slate-800/90 rounded-lg p-2 space-y-1.5">
            <div className="flex items-center gap-1 pb-1">
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[8px]">
                All (12)
              </span>
              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono text-[8px]">
                DSA
              </span>
              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono text-[8px]">
                Core CS
              </span>
            </div>

            <div className="flex items-center justify-between bg-slate-900/90 px-2 py-1 rounded border border-emerald-500/25">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-400 flex items-center justify-center text-[8px] text-emerald-300">
                  ✓
                </span>
                <span className="font-sans text-[9px] text-slate-200 truncate">
                  2 LeetCode Graph Problems
                </span>
              </div>
              <span className="font-mono text-[8px] text-emerald-400">7d 🔥</span>
            </div>

            <div className="flex items-center justify-between bg-slate-900/90 px-2 py-1 rounded border border-slate-800">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-400 flex items-center justify-center text-[8px] text-emerald-300">
                  ✓
                </span>
                <span className="font-sans text-[9px] text-slate-200 truncate">
                  CSS Grid Layout Refactor
                </span>
              </div>
              <span className="font-mono text-[8px] text-cyan-400">Done</span>
            </div>

            <div className="flex items-center justify-between bg-slate-900/60 px-2 py-1 rounded border border-slate-800/70">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded border border-slate-600" />
                <span className="font-sans text-[9px] text-slate-400 truncate">
                  Export Weekly JSON Backup
                </span>
              </div>
              <span className="font-mono text-[8px] text-amber-300">Today</span>
            </div>
          </div>

          {/* Right: Weekly Completion Trend Chart */}
          <div className="col-span-5 bg-[#0B1224] border border-slate-800/90 rounded-lg p-2 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8px] uppercase text-slate-400">
                Weekly Trend
              </span>
              <span className="font-mono text-[9px] font-semibold text-emerald-400">
                92%
              </span>
            </div>

            <div className="flex items-end justify-between gap-1 h-16 pt-2 px-0.5">
              {[45, 70, 60, 85, 75, 95, 100].map((height, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-slate-800/80 rounded-t h-12 flex items-end overflow-hidden">
                    <div
                      style={{ height: `${height}%` }}
                      className="w-full bg-gradient-to-t from-emerald-600 to-cyan-400 rounded-t group-hover:brightness-125 transition-all duration-300"
                    />
                  </div>
                  <span className="font-mono text-[7px] text-slate-500">
                    {["M", "T", "W", "T", "F", "S", "S"][idx]}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-slate-800/80 pt-1">
              <span className="font-mono text-[8px] text-slate-400">LocalStorage</span>
              <span className="font-mono text-[8px] text-cyan-300">Synced ●</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. FULL-STACK COLLABORATIVE ISSUE BOARD / KANBAN (Intermediate)
  if (title.includes("kanban") || title.includes("issue board") || title.includes("collaborative")) {
    return (
      <div className="w-full h-48 bg-[#070B16] p-3 flex flex-col justify-between select-none overflow-hidden group">
        <div className="flex items-center justify-between border-b border-slate-800/90 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500/80" />
            <span className="w-2 h-2 rounded-full bg-amber-400/80" />
            <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
            <span className="ml-1.5 font-mono text-[10px] text-slate-400 truncate">
              DevBoard • Collaborative Kanban Lab
            </span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-1.5 pt-2 flex-1">
          {/* Column 1: BACKLOG */}
          <div className="bg-[#0B1224] border border-slate-800/90 rounded p-1.5 flex flex-col gap-1.5">
            <span className="font-mono text-[8px] text-slate-400 font-semibold">
              BACKLOG (3)
            </span>
            <div className="bg-slate-900/95 border border-slate-800 rounded p-1.5">
              <div className="font-sans text-[8px] font-semibold text-white">
                Setup JWT Auth
              </div>
              <div className="font-mono text-[7px] text-slate-400 mt-0.5">
                bcrypt + refresh token
              </div>
              <span className="inline-block mt-1 px-1 py-0.2 bg-rose-500/20 text-rose-300 font-mono text-[7px] rounded">
                HIGH
              </span>
            </div>
            <div className="bg-slate-900/95 border border-slate-800 rounded p-1.5">
              <div className="font-sans text-[8px] font-semibold text-white">
                DB Migrations
              </div>
              <span className="inline-block mt-1 px-1 py-0.2 bg-amber-500/20 text-amber-300 font-mono text-[7px] rounded">
                MED
              </span>
            </div>
          </div>

          {/* Column 2: IN PROGRESS */}
          <div className="bg-[#0B1530] border border-blue-500/40 rounded p-1.5 flex flex-col gap-1.5">
            <span className="font-mono text-[8px] text-blue-300 font-semibold">
              IN PROGRESS (2)
            </span>
            <div className="bg-blue-950/60 border border-blue-400/40 rounded p-1.5 group-hover:translate-x-0.5 transition-transform">
              <div className="font-sans text-[8px] font-semibold text-cyan-200">
                Drag &amp; Drop Hook
              </div>
              <div className="font-mono text-[7px] text-slate-300 mt-0.5">
                Optimistic UI state
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="px-1 bg-blue-500/30 text-blue-200 font-mono text-[7px] rounded">
                  FEAT
                </span>
                <span className="w-3 h-3 rounded-full bg-indigo-500 text-[7px] text-white flex items-center justify-center">
                  TK
                </span>
              </div>
            </div>
          </div>

          {/* Column 3: CODE REVIEW */}
          <div className="bg-[#0B1224] border border-slate-800/90 rounded p-1.5 flex flex-col gap-1.5">
            <span className="font-mono text-[8px] text-slate-400 font-semibold">
              REVIEW (1)
            </span>
            <div className="bg-slate-900/95 border border-slate-800 rounded p-1.5">
              <div className="font-sans text-[8px] font-semibold text-white">
                Rate Limiting API
              </div>
              <div className="font-mono text-[7px] text-slate-400 mt-0.5">
                express-rate-limit
              </div>
              <span className="inline-block mt-1 px-1 bg-indigo-500/25 text-indigo-300 font-mono text-[7px] rounded">
                PR #14
              </span>
            </div>
          </div>

          {/* Column 4: DONE */}
          <div className="bg-[#081A1C] border border-emerald-500/30 rounded p-1.5 flex flex-col gap-1.5">
            <span className="font-mono text-[8px] text-emerald-300 font-semibold">
              DONE (8)
            </span>
            <div className="bg-emerald-950/40 border border-emerald-500/30 rounded p-1.5">
              <div className="font-sans text-[8px] font-semibold text-emerald-200">
                PostgreSQL Setup
              </div>
              <div className="font-mono text-[7px] text-emerald-400/80 mt-0.5">
                Docker &amp; seed
              </div>
            </div>
            <div className="bg-emerald-950/40 border border-emerald-500/30 rounded p-1.5">
              <div className="font-sans text-[8px] font-semibold text-emerald-200">
                RBAC Guard
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. HIGH-THROUGHPUT DISTRIBUTED URL SHORTENER & ANALYTICS (Advanced)
  if (title.includes("url shortener") || title.includes("high-throughput") || title.includes("distributed")) {
    return (
      <div className="w-full h-48 bg-[#070B16] p-3 flex flex-col justify-between select-none overflow-hidden group">
        {/* Window Top Bar */}
        <div className="flex items-center justify-between border-b border-slate-800/90 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500/80" />
            <span className="w-2 h-2 rounded-full bg-amber-400/80" />
            <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
            <span className="ml-1.5 font-mono text-[10px] text-slate-400 truncate">
              ShortScale • Distributed Redirect &amp; Telemetry
            </span>
          </div>
        </div>

        {/* Architecture Flow Pipeline */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          <div className="bg-[#0B1224] border border-cyan-500/30 rounded-lg p-2">
            <div className="font-mono text-[8px] text-cyan-300 uppercase">1. Ingress</div>
            <div className="font-sans text-[9px] font-semibold text-white mt-0.5">
              Base62 + Bloom
            </div>
            <div className="font-mono text-[8px] text-emerald-400 mt-1">
              5,420 req/s
            </div>
          </div>

          <div className="bg-[#0B1224] border border-violet-500/35 rounded-lg p-2">
            <div className="font-mono text-[8px] text-violet-300 uppercase">2. Cache Tier</div>
            <div className="font-sans text-[9px] font-semibold text-white mt-0.5">
              Redis Cluster
            </div>
            <div className="font-mono text-[8px] text-cyan-300 mt-1">
              99.4% Hit Ratio
            </div>
          </div>

          <div className="bg-[#0B1224] border border-blue-500/30 rounded-lg p-2">
            <div className="font-mono text-[8px] text-blue-300 uppercase">3. Storage</div>
            <div className="font-sans text-[9px] font-semibold text-white mt-0.5">
              Postgres Shards
            </div>
            <div className="font-mono text-[8px] text-amber-300 mt-1">
              Async Kafka Log
            </div>
          </div>
        </div>

        {/* Bottom Telemetry Bar: Latency & Redirect Inspector */}
        <div className="bg-[#0B1224] border border-slate-800/90 rounded-lg p-2 mt-2 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[9px] text-white">
                GET /s/x9Kp2A → 301 Redirect
              </span>
            </div>
            <div className="font-mono text-[8px] text-slate-400 mt-0.5">
              p95 Latency: <span className="text-emerald-400">6.8ms</span> (Target &lt;15ms)
            </div>
          </div>
          <div className="text-right">
            <span className="px-2 py-0.5 rounded bg-violet-500/20 border border-violet-400/30 font-mono text-[8px] text-violet-200">
              FastAPI + Redis
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 4. AI, MACHINE LEARNING, RAG, COMPUTER VISION & VECTOR SEARCH PROJECTS
  if (
    domain.includes("ai") ||
    domain.includes("machine learning") ||
    title.includes("neural") ||
    title.includes("rag") ||
    title.includes("embedding") ||
    title.includes("recommend") ||
    title.includes("vision") ||
    title.includes("llm") ||
    title.includes("model") ||
    title.includes("prediction")
  ) {
    return (
      <div className="w-full h-48 bg-[#070B16] p-3 flex flex-col justify-between select-none overflow-hidden group">
        <div className="flex items-center justify-between border-b border-slate-800/90 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500/80" />
            <span className="w-2 h-2 rounded-full bg-amber-400/80" />
            <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
            <span className="ml-1.5 font-mono text-[10px] text-slate-400 truncate">
              NeuralStudio • Inference &amp; Vector Pipeline
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-2 pt-2 flex-1 items-center">
          <div className="col-span-7 bg-[#0B1224] border border-violet-500/30 rounded-lg p-2 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8px] text-violet-300 uppercase">
                Embedding &amp; Retrieval
              </span>
              <span className="font-mono text-[8px] text-emerald-400">F1: 0.942</span>
            </div>
            <div className="bg-slate-900/90 rounded p-1.5 border border-slate-800 font-mono text-[8px] text-slate-300">
              1. Feature / Token Extraction → <span className="text-cyan-300">768-dim</span>
            </div>
            <div className="bg-slate-900/90 rounded p-1.5 border border-slate-800 font-mono text-[8px] text-slate-300">
              2. Vector Index Search → <span className="text-violet-300">FAISS Top-K</span>
            </div>
            <div className="bg-slate-900/90 rounded p-1.5 border border-emerald-500/30 font-mono text-[8px] text-emerald-300">
              3. Model Inference Latency: 24ms
            </div>
          </div>

          <div className="col-span-5 bg-[#0B1224] border border-slate-800/90 rounded-lg p-2 h-full flex flex-col justify-between">
            <span className="font-mono text-[8px] text-slate-400 uppercase">
              Confidence Score
            </span>
            <div className="space-y-1.5 my-auto">
              <div>
                <div className="flex justify-between font-mono text-[8px] text-slate-300">
                  <span>Top-1 Match</span>
                  <span className="text-cyan-300">96.4%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-0.5">
                  <div className="h-full w-[96%] bg-gradient-to-r from-violet-500 to-cyan-400" />
                </div>
              </div>
              <div>
                <div className="flex justify-between font-mono text-[8px] text-slate-400">
                  <span>Validation Loss</span>
                  <span className="text-emerald-400">0.038</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-0.5">
                  <div className="h-full w-[82%] bg-emerald-500" />
                </div>
              </div>
            </div>
            <span className="font-mono text-[7px] text-slate-500 truncate">
              {stack.join(" • ")}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 5. DATA SCIENCE, ANALYTICS, SQL, POWER BI & CHURN DASHBOARD PROJECTS
  if (
    domain.includes("data") ||
    domain.includes("analytics") ||
    title.includes("analytics") ||
    title.includes("churn") ||
    title.includes("dashboard") ||
    title.includes("warehouse") ||
    title.includes("etl") ||
    title.includes("pipeline") ||
    title.includes("sql")
  ) {
    return (
      <div className="w-full h-48 bg-[#070B16] p-3 flex flex-col justify-between select-none overflow-hidden group">
        <div className="flex items-center justify-between border-b border-slate-800/90 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500/80" />
            <span className="w-2 h-2 rounded-full bg-amber-400/80" />
            <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
            <span className="ml-1.5 font-mono text-[10px] text-slate-400 truncate">
              DataPulse • SQL &amp; Executive BI Telemetry
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1.5 pt-2">
          <div className="bg-[#0B1224] border border-slate-800 rounded p-1.5">
            <div className="font-mono text-[7px] text-slate-400">RETENTION RATE</div>
            <div className="font-mono text-xs font-bold text-emerald-400 mt-0.5">88.6% ↑</div>
          </div>
          <div className="bg-[#0B1224] border border-slate-800 rounded p-1.5">
            <div className="font-mono text-[7px] text-slate-400">CHURN RISK COHORT</div>
            <div className="font-mono text-xs font-bold text-amber-300 mt-0.5">11.4%</div>
          </div>
          <div className="bg-[#0B1224] border border-slate-800 rounded p-1.5">
            <div className="font-mono text-[7px] text-slate-400">ROWS PROCESSED</div>
            <div className="font-mono text-xs font-bold text-cyan-300 mt-0.5">1.24M</div>
          </div>
        </div>

        <div className="bg-[#0B1224] border border-slate-800/90 rounded-lg p-2 mt-1.5 flex items-end justify-between gap-1.5 h-20">
          {[35, 55, 48, 72, 66, 88, 80, 95].map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center h-full justify-end">
              <div
                style={{ height: `${val}%` }}
                className="w-full rounded-t bg-gradient-to-t from-blue-600/80 to-cyan-300 group-hover:brightness-125 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 6. CLOUD, DEVOPS, KUBERNETES, DOCKER & INFRASTRUCTURE PROJECTS
  if (
    domain.includes("cloud") ||
    domain.includes("devops") ||
    title.includes("kubernetes") ||
    title.includes("docker") ||
    title.includes("ci/cd") ||
    title.includes("terraform") ||
    title.includes("deployment") ||
    title.includes("microservice")
  ) {
    return (
      <div className="w-full h-48 bg-[#070B16] p-3 flex flex-col justify-between select-none overflow-hidden group">
        <div className="flex items-center justify-between border-b border-slate-800/90 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500/80" />
            <span className="w-2 h-2 rounded-full bg-amber-400/80" />
            <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
            <span className="ml-1.5 font-mono text-[10px] text-slate-400 truncate">
              CloudOps • CI/CD &amp; Cluster Orchestration
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2">
          <div className="bg-[#0B1224] border border-emerald-500/30 rounded p-2">
            <div className="font-mono text-[8px] text-emerald-400">✓ BUILD &amp; TEST</div>
            <div className="font-sans text-[9px] text-white font-semibold mt-0.5">
              GitHub Actions
            </div>
            <div className="font-mono text-[7px] text-slate-400 mt-1">Docker Image</div>
          </div>
          <div className="bg-[#0B1224] border border-cyan-500/30 rounded p-2">
            <div className="font-mono text-[8px] text-cyan-300">✓ PROVISION</div>
            <div className="font-sans text-[9px] text-white font-semibold mt-0.5">
              Terraform IaC
            </div>
            <div className="font-mono text-[7px] text-slate-400 mt-1">VPC + EKS Nodes</div>
          </div>
          <div className="bg-[#0B1224] border border-indigo-500/30 rounded p-2">
            <div className="font-mono text-[8px] text-indigo-300">● PRODUCTION</div>
            <div className="font-sans text-[9px] text-white font-semibold mt-0.5">
              K8s Pods (6/6)
            </div>
            <div className="font-mono text-[7px] text-emerald-400 mt-1">99.98% Uptime</div>
          </div>
        </div>

        <div className="bg-[#0B1224] border border-slate-800 rounded p-2 font-mono text-[8px] text-slate-300 flex items-center justify-between">
          <span>Prometheus Telemetry: CPU 34% | Mem 58%</span>
          <span className="text-emerald-400">Zero-Downtime Rollout</span>
        </div>
      </div>
    );
  }

  // 7. CYBERSECURITY, SOC, SIEM, NETWORK SECURITY & AUTH PROJECTS
  if (
    domain.includes("cyber") ||
    domain.includes("security") ||
    title.includes("security") ||
    title.includes("soc") ||
    title.includes("threat") ||
    title.includes("firewall") ||
    title.includes("intrusion") ||
    title.includes("scanner") ||
    title.includes("encryption")
  ) {
    return (
      <div className="w-full h-48 bg-[#070B16] p-3 flex flex-col justify-between select-none overflow-hidden group">
        <div className="flex items-center justify-between border-b border-slate-800/90 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500/80" />
            <span className="w-2 h-2 rounded-full bg-amber-400/80" />
            <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
            <span className="ml-1.5 font-mono text-[10px] text-slate-400 truncate">
              SentinelSOC • Threat &amp; Packet Telemetry
            </span>
          </div>
        </div>

        <div className="bg-[#0B1224] border border-slate-800 rounded-lg p-2 my-auto space-y-1.5 font-mono text-[8px]">
          <div className="flex items-center justify-between text-emerald-400">
            <span>[PASS] TLS 1.3 Handshake &amp; mTLS Cert Verification</span>
            <span>0.8ms</span>
          </div>
          <div className="flex items-center justify-between text-amber-300">
            <span>[WARN] Rate-Limit Triggered: 192.168.4.21 (SQLi Pattern)</span>
            <span>BLOCKED</span>
          </div>
          <div className="flex items-center justify-between text-cyan-300">
            <span>[INFO] SIEM Log Ingestion &amp; Anomaly Score: 0.04</span>
            <span>CLEAN</span>
          </div>
        </div>

        <div className="flex items-center justify-between bg-emerald-950/30 border border-emerald-500/30 rounded px-2.5 py-1.5 font-mono text-[8px]">
          <span className="text-emerald-300">Zero-Trust Policy Active</span>
          <span className="text-slate-300">OWASP Top-10 Verified</span>
        </div>
      </div>
    );
  }

  // 8. UNIVERSAL DYNAMIC BLUEPRINT WORKBENCH (For Any Other Engineering Project)
  return (
    <div className="w-full h-48 bg-[#070B16] p-3 flex flex-col justify-between select-none overflow-hidden group">
      {/* Window Top Bar with Project Title */}
      <div className="flex items-center justify-between border-b border-slate-800/90 pb-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="w-2 h-2 rounded-full bg-rose-500/80 shrink-0" />
          <span className="w-2 h-2 rounded-full bg-amber-400/80 shrink-0" />
          <span className="w-2 h-2 rounded-full bg-emerald-400/80 shrink-0" />
          <span className="ml-1.5 font-mono text-[10px] text-slate-300 truncate">
            {project.title || "Engineering System Architecture"}
          </span>
        </div>
      </div>

      {/* Dynamic 3-Tier Architecture Preview Driven by the Project's Actual Data */}
      <div className="grid grid-cols-12 gap-2 my-auto pt-2">
        <div className="col-span-7 bg-[#0B1224] border border-slate-800 rounded-lg p-2 space-y-1.5">
          <div className="font-mono text-[8px] text-cyan-400 uppercase">
            System Modules
          </div>
          <div className="bg-slate-900/90 border border-slate-800 rounded px-2 py-1 font-sans text-[9px] text-slate-200 truncate">
            1. Core Interface &amp; State Layer
          </div>
          <div className="bg-slate-900/90 border border-slate-800 rounded px-2 py-1 font-sans text-[9px] text-slate-200 truncate">
            2. Service API &amp; Validation Engine
          </div>
          <div className="bg-slate-900/90 border border-slate-800 rounded px-2 py-1 font-sans text-[9px] text-slate-200 truncate">
            3. Persistent Storage &amp; Telemetry
          </div>
        </div>

        <div className="col-span-5 bg-[#0B1224] border border-blue-500/30 rounded-lg p-2 flex flex-col justify-between">
          <span className="font-mono text-[8px] text-blue-300 uppercase">
            Tech Stack
          </span>
          <div className="flex flex-wrap gap-1 my-auto">
            {stack.map((tech, idx) => (
              <span
                key={idx}
                className="px-1.5 py-0.5 rounded bg-blue-500/15 border border-blue-400/30 font-mono text-[8px] text-cyan-200 truncate"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-slate-800 pt-1 font-mono text-[8px] text-emerald-400">
            <span>Status</span>
            <span>Blueprint Ready ●</span>
          </div>
        </div>
      </div>
    </div>
  );
}

