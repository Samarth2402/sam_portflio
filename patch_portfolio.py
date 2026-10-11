import re

with open('src/app/page.tsx', 'r') as f:
    content = f.read()

# 1. Update PROJECTS
old_projects = re.search(r'const PROJECTS = \[\s*\{.*?\}\s*\];', content, re.DOTALL)
new_projects = """const PROJECTS = [
  {
    id: "svm-scout",
    title: "SVM Scout",
    category: "AI-Powered Recruitment & Assessment Platform",
    description: "Developed an AI-powered recruitment platform to streamline candidate evaluation, technical assessments, aptitude testing, and recruitment workflows.",
    link: "",
    details: [
      "Resume parsing and NLP-based skill extraction",
      "TF-IDF and Support Vector Machine (SVM)-based matching",
      "Candidate-job relevance scoring and ranking",
      "Assessment workflows and candidate reports via Groq API"
    ],
    visualConcept: "RESUME → AI ANALYSIS → SKILL EXTRACTION → MATCHING → EVALUATION",
  },
  {
    id: "interactive-bowling",
    title: "Interactive Bowling",
    category: "Computer Vision & IoT-Based Projection System",
    description: "An interactive bowling system combining camera-based computer vision, real-world lane data, and projector-based visual experiences.",
    link: "",
    details: [
      "Camera-based computer vision for ball detection",
      "Processing spatial coordinates for interactive visual effects",
      "Integrating detection results with Unity for real-time animations"
    ],
    visualConcept: "LANE DATA → BALL DETECTION → COORDINATE MAPPING → UNITY ANIMATION",
  },
  {
    id: "pickleball-analysis",
    title: "Pickleball Shot Analysis",
    category: "IoT & Machine Learning",
    description: "An intelligent pickleball shot analysis system using sensor components embedded in a paddle to capture impact, swing, and motion-related data.",
    link: "",
    details: [
      "Real-world training data collection for different shots",
      "Shot classification for forehand, backhand, dink using sensor data",
      "Analyzing impact and swing patterns for player performance insights"
    ],
    visualConcept: "SENSOR DATA → FEATURE EXTRACTION → SHOT CLASSIFICATION → PERFORMANCE INSIGHTS",
  },
  {
    id: "go-karting-safety",
    title: "Go-Karting Safety & Race Analytics",
    category: "Computer Vision & IoT",
    description: "A computer vision-based monitoring system to detect potential accidents and stopped karts during live races using camera feeds.",
    link: "",
    details: [
      "Computer vision monitoring for accident and stopped kart detection",
      "Real-time event alerts to frontend via backend APIs",
      "RFID-based kart identification and lap tracking",
      "Live leaderboard displaying race progress and performance"
    ],
    visualConcept: "CAMERA FEED → KART DETECTION → ACCIDENT MONITORING → RFID TRACKING → LEADERBOARD",
  }
];"""
content = content.replace(old_projects.group(0), new_projects)

# 2. Update SKILLS
old_skills = re.search(r'const SKILLS = \[\s*\{.*?\}\s*\];', content, re.DOTALL)
new_skills = """const SKILLS = [
  {
    category: "Programming",
    items: ["Python", "SQL", "JavaScript"],
  },
  {
    category: "Machine Learning",
    items: ["Scikit-learn", "Supervised Learning", "Classification", "Random Forest", "Support Vector Machine (SVM)", "Model Training"],
  },
  {
    category: "Natural Language Processing",
    items: ["NLP", "TF-IDF", "Text Processing", "Resume Parsing", "Semantic Matching"],
  },
  {
    category: "Computer Vision",
    items: ["OpenCV", "Image Processing", "Object Detection", "Video Frame Processing"],
  },
  {
    category: "Backend & DB",
    items: ["Flask", "FastAPI", "Django", "MySQL", "SQLite", "SQLAlchemy", "REST APIs"],
  },
  {
    category: "IoT & Integration",
    items: ["Sensor Data Processing", "Camera Integration", "RFID Tracking", "Unity Integration", "LLM API Integration"],
  },
];"""
content = content.replace(old_skills.group(0), new_skills)

# 3. Update Hero section
content = content.replace("""            <p className="mt-4 text-2xl md:text-4xl font-light text-transparent bg-clip-text bg-gradient-to-r from-[#2ED9A0] to-[#8B5CF6]">
              AI / ML ENGINEER
            </p>
            <p className="mt-8 text-lg md:text-xl text-[#7D8793] max-w-2xl font-light leading-relaxed">
              Building intelligent systems, automation platforms, AI agents, and interactive technology.
            </p>""", """            <p className="mt-4 text-2xl md:text-4xl font-light text-transparent bg-clip-text bg-gradient-to-r from-[#2ED9A0] to-[#8B5CF6]">
              AI/ML ENGINEER & PYTHON DEVELOPER
            </p>
            <p className="mt-8 text-lg md:text-xl text-[#7D8793] max-w-2xl font-light leading-relaxed">
              Building AI-powered applications, machine learning solutions, and intelligent automation systems.
            </p>""")

# 4. Update About section
content = content.replace("""              <p className="text-[#7D8793] text-lg leading-relaxed mb-6">
                I am an AI/ML Engineer with 1.5+ years of professional experience building intelligent applications, AI agents, automation systems, computer-vision workflows, and AI-powered developer tools.
              </p>
              <p className="text-[#7D8793] text-lg leading-relaxed mb-8">
                My work focuses on turning complex workflows into intelligent systems that can understand information, automate tasks, analyze data, interact with software, and assist users.
              </p>""", """              <p className="text-[#7D8793] text-lg leading-relaxed mb-6">
                I am an AI/ML Engineer and Python Developer with approximately 1 year and 8 months of professional experience developing AI-powered applications, machine learning solutions, backend APIs, and intelligent automation systems.
              </p>
              <p className="text-[#7D8793] text-lg leading-relaxed mb-8">
                My work focuses on building scalable, data-driven solutions that connect AI models with real-world applications, including AI-driven recruitment platforms, computer vision, and IoT-integrated systems.
              </p>""")

# 5. Update Experience section
old_exp = re.search(r'<div className="space-y-16">.*?</div>\s*</div>\s*</section>', content, re.DOTALL).group(0)
new_exp = """<div className="space-y-16">
              {/* Capermint */}
              <div className="border-l border-[#2ED9A0] pl-8 relative">
                <div className="absolute w-3 h-3 bg-[#2ED9A0] rounded-full -left-[1.5px] top-2" />
                <h3 className="text-3xl font-bold mb-2">Capermint Technologies</h3>
                <p className="text-xl text-[#2ED9A0] mb-4">AI/ML Engineer / Python Developer <span className="text-[#7D8793] text-sm font-mono ml-4">18 May 2026 – Present</span></p>
                <ul className="text-[#7D8793] space-y-2 list-none">
                  <li>— Develop Python-based AI/ML solutions involving computer vision and sensor data processing</li>
                  <li>— Collect and prepare training data, improving detection and classification accuracy</li>
                  <li>— Integrate AI models and IoT components with backend APIs and frontend applications</li>
                </ul>
              </div>

              {/* Isoftrend */}
              <div className="border-l border-white/10 pl-8 relative">
                <div className="absolute w-3 h-3 bg-white/20 rounded-full -left-[1.5px] top-2" />
                <h3 className="text-3xl font-bold mb-2 text-white/80">iSoftrend System</h3>
                <p className="text-xl text-white/60 mb-4">Python Developer / AI/ML Engineer <span className="text-[#7D8793] text-sm font-mono ml-4">1 Feb 2025 – 17 May 2026</span></p>
                <ul className="text-[#7D8793] space-y-2 list-none">
                  <li>— Developed Python-based backend applications and REST APIs using Flask/FastAPI</li>
                  <li>— Implemented machine learning and NLP workflows, including text preprocessing and model-based matching</li>
                  <li>— Integrated AI services and application components to automate business workflows</li>
                </ul>
              </div>
            </div>
          </div>
        </section>"""
content = content.replace(old_exp, new_exp)

# 6. Update Education section
old_edu = re.search(r'<div className="space-y-8">.*?</div>\s*</div>\s*</section>', content, re.DOTALL).group(0)
new_edu = """<div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">LJ University</h3>
                <p className="text-[#7D8793]">Master of Computer Applications (MCA)</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">Swaminarayan College of Computer Science</h3>
                <p className="text-[#7D8793]">Bachelor of Computer Applications (BCA)</p>
                <p className="text-xs font-mono text-[#8B5CF6] mt-2 tracking-widest uppercase">2024 | 61.8%</p>
              </div>
            </div>
          </div>
        </section>"""
content = content.replace(old_edu, new_edu)

with open('src/app/page.tsx', 'w') as f:
    f.write(content)
