"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import Loader from "@/components/Loader";
import Link from "next/link";
import * as THREE from "three";
import gsap from "gsap";
import GitHubStats from "@/components/GitHubStats";

// --- CONTENT DATA ---

const PROJECTS = [
  {
    id: "svm-scout",
    title: "SVM Scout",
    category: "AI-Powered Recruitment & Assessment Platform",
    description: "Developed an AI-powered recruitment platform to streamline candidate evaluation, technical assessments, aptitude testing, and recruitment workflows.",
    link: "https://svm-scout.up.railway.app",
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
  },
  {
    id: "archon",
    title: "Archon",
    category: "AI / Game Development / Documentation / Automation",
    description: "An AI-powered workflow that analyzes a game, captures and organizes game screens, and converts findings into structured tasks.",
    link: "https://archon.automusk.ai",
    details: [
      "Analyze game screens & document interfaces",
      "Organize screenshots & identify relevant info",
      "Create structured documentation",
      "Generate and manage tasks through Zoho",
    ],
    visualConcept: "GAME → SCREEN ANALYSIS → DOCUMENTATION → TASK GENERATION → ZOHO",
  },
  {
    id: "phone-money-agent",
    title: "Phone Money Agent",
    category: "AI Agent / Financial Automation",
    description: "An intelligent phone-based financial monitoring agent designed to keep track of transactions and relevant financial activity.",
    details: [
      "Monitoring transaction information",
      "Understanding transaction activity",
      "Organizing financial events",
      "Identifying relevant transaction information",
      "Providing an intelligent overview of activity",
    ],
    visualConcept: "PHONE → TRANSACTION → AI UNDERSTANDING → MONITORING → INSIGHTS",
  }
];

const SKILLS = [
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
];

// --- 3D COMPONENTS ---

function AINeuralCore({ activeProject }: { activeProject: any }) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create random nodes for the neural network
  const count = 150;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.2 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Base rotation
    groupRef.current.rotation.x = state.clock.elapsedTime * 0.05;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    
    if (activeProject) {
      // Cinematic state for project detail
      const targetPos = new THREE.Vector3(2, 0, 2);
      groupRef.current.position.lerp(targetPos, 0.05);
      
      const targetScale = 2.5;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
    } else {
      // Scroll state
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;
      
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, 0, 0.1);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, scrollProgress * 2, 0.1);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, 0, 0.1);
      
      const scale = THREE.MathUtils.lerp(1, 1.5, scrollProgress);
      groupRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Wireframe Core */}
      <mesh>
        <icosahedronGeometry args={[1.5, 2]} />
        <meshStandardMaterial 
          color="#111" 
          wireframe 
          emissive="#2ED9A0" 
          emissiveIntensity={0.8} 
          transparent 
          opacity={0.2} 
        />
      </mesh>
      
      {/* Inner solid */}
      <mesh>
        <icosahedronGeometry args={[1.3, 2]} />
        <meshStandardMaterial color="#07090C" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Neural Nodes (Particles) */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.06} color="#8B5CF6" transparent opacity={0.8} sizeAttenuation />
      </points>
    </group>
  );
}

function Scene({ activeProject }: { activeProject: any }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} />
      <pointLight position={[-10, -10, -5]} intensity={1} color="#8B5CF6" />
      
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <AINeuralCore activeProject={activeProject} />
      </Float>
      
      <Environment preset="city" />
    </>
  );
}

// --- MAIN PAGE ---

export default function HybridProfessional() {
  const [loaded, setLoaded] = useState(false);
  const [activeProject, setActiveProject] = useState<any>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaded || !contentRef.current) return;

    const sections = contentRef.current.querySelectorAll('.reveal-section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.to(entry.target, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    sections.forEach(sec => {
      gsap.set(sec, { y: 50, opacity: 0 });
      observer.observe(sec);
    });

    return () => observer.disconnect();
  }, [loaded]);

  // Handle Project Detail transition
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(".project-overlay", 
        { opacity: 0, scale: 1.05 }, 
        { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }
      );
      gsap.fromTo(".project-content > *", 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.2, ease: "power3.out" }
      );
    } else {
      document.body.style.overflow = "auto";
    }
  }, [activeProject]);

  return (
    <div className="w-full relative bg-[#07090C] text-[#F5F7FA] min-h-screen font-sans selection:bg-[#2ED9A0] selection:text-black">
      {!loaded && <Loader onLoaded={() => setLoaded(true)} />}
      
      {/* 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <Scene activeProject={activeProject} />
        </Canvas>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-center mix-blend-difference transition-opacity duration-500 ${activeProject ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="font-bold tracking-[0.3em] text-sm text-white">SAMARTH SOLANKI.</div>
        <div className="flex gap-6 hidden md:flex text-white">
          <a href="#about" className="text-sm font-mono tracking-widest hover:text-[#2ED9A0] transition-colors">ABOUT</a>
          <a href="#experience" className="text-sm font-mono tracking-widest hover:text-[#2ED9A0] transition-colors">EXPERIENCE</a>
          <a href="#projects" className="text-sm font-mono tracking-widest hover:text-[#2ED9A0] transition-colors">PROJECTS</a>
          <a href="#skills" className="text-sm font-mono tracking-widest hover:text-[#2ED9A0] transition-colors">SKILLS</a>
        </div>
      </nav>

      {/* Project Detail Overlay */}
      {activeProject && (
        <div className="project-overlay fixed inset-0 z-40 bg-[#07090C]/90 backdrop-blur-xl flex items-center justify-start p-8 md:p-24 overflow-y-auto">
          <div className="project-content max-w-2xl mt-24">
            <button 
              onClick={() => setActiveProject(null)}
              className="text-[#2ED9A0] font-mono tracking-widest text-sm hover:text-white transition-colors flex items-center gap-2 mb-8"
            >
              <span>&larr;</span> CLOSE EXPERIENCE
            </button>
            <h2 className="text-5xl md:text-7xl font-bold mb-4">{activeProject.title}</h2>
            <div className="text-[#8B5CF6] font-mono tracking-widest text-sm mb-8">{activeProject.category}</div>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">OVERVIEW</h3>
              <p className="text-[#7D8793] leading-relaxed">{activeProject.description}</p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">KEY CAPABILITIES</h3>
              <ul className="list-disc list-inside text-[#7D8793] leading-relaxed space-y-2">
                {activeProject.details.map((detail: string, i: number) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>

            <div className="p-6 border border-[#2ED9A0]/30 bg-[#11151A]/50 rounded-lg mb-8">
              <h3 className="text-sm font-mono text-[#2ED9A0] mb-2 tracking-widest">CONCEPT FLOW</h3>
              <p className="text-sm text-[#F5F7FA] opacity-80">{activeProject.visualConcept}</p>
            </div>
            
            {activeProject.link && (
              <a 
                href={activeProject.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#2ED9A0] text-[#07090C] font-bold font-mono tracking-widest py-4 px-8 rounded-full hover:bg-[#8B5CF6] hover:text-white transition-colors duration-300"
              >
                VIEW LIVE PROJECT <span>↗</span>
              </a>
            )}
          </div>
        </div>
      )}

      {/* 2D Scrolling Content */}
      <div ref={contentRef} className="relative z-10 w-full" style={{ opacity: activeProject ? 0 : 1, transition: "opacity 0.5s ease" }}>
        
        {/* Hero Section */}
        <section className="h-screen flex flex-col justify-center px-8 md:px-24">
          <div className="reveal-section">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-tight max-w-5xl">
              SAMARTH SOLANKI
            </h1>
            <p className="mt-4 text-2xl md:text-4xl font-light text-transparent bg-clip-text bg-gradient-to-r from-[#2ED9A0] to-[#8B5CF6]">
              AI / ML ENGINEER & PYTHON DEVELOPER
            </p>
            <p className="mt-8 text-lg md:text-xl text-[#7D8793] max-w-2xl font-light leading-relaxed">
              Building AI-powered applications, machine learning solutions, and intelligent automation systems.
            </p>
          </div>
          
          <div className="absolute bottom-12 left-8 md:left-24 text-xs font-mono tracking-widest text-[#7D8793] flex gap-4 items-center">
            <span>SCROLL TO EXPLORE</span>
            <div className="w-12 h-[1px] bg-[#7D8793]" />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 px-8 md:px-24 pointer-events-auto">
          <div className="reveal-section max-w-4xl grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-sm font-mono tracking-widest text-[#2ED9A0] mb-8 uppercase">About Me</h2>
              <h3 className="text-3xl md:text-4xl font-light leading-snug">
                I build systems that bridge the gap between complex workflows and intelligent automation.
              </h3>
            </div>
            <div className="flex flex-col justify-end">
              <p className="text-[#7D8793] text-lg leading-relaxed mb-6">
                I am an AI/ML Engineer and Python Developer with approximately 1 year and 8 months of professional experience developing AI-powered applications, machine learning solutions, backend APIs, and intelligent automation systems.
              </p>
              <p className="text-[#7D8793] text-lg leading-relaxed mb-8">
                My work focuses on building scalable, data-driven solutions that connect AI models with real-world applications, including AI-driven recruitment platforms, computer vision, and IoT-integrated systems.
              </p>
              <div className="flex gap-4 mt-8">
                <a href="https://www.linkedin.com/in/samarth-solanki1902" target="_blank" rel="noopener noreferrer" className="text-xs font-mono px-6 py-3 border border-[#2ED9A0]/50 hover:bg-[#2ED9A0]/10 text-[#2ED9A0] rounded-full transition-colors cursor-pointer">
                  CONNECT ON LINKEDIN
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-24 reveal-section">
            <GitHubStats />
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-32 px-8 md:px-24 bg-[#11151A]/80 backdrop-blur-sm border-t border-white/5">
          <div className="reveal-section max-w-5xl mx-auto">
            <h2 className="text-sm font-mono tracking-widest text-[#8B5CF6] mb-16 uppercase">Professional Experience</h2>
            
            <div className="space-y-16">
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
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32 px-8 md:px-24 pointer-events-auto">
          <div className="reveal-section mb-16">
            <h2 className="text-sm font-mono tracking-widest text-[#2ED9A0] mb-4 uppercase">Selected Work</h2>
            <h3 className="text-5xl md:text-7xl font-bold tracking-tight">Technical Artifacts</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 reveal-section">
            {PROJECTS.map((project, idx) => (
              <div 
                key={project.id} 
                onClick={() => setActiveProject(project)}
                className="group cursor-pointer border border-white/10 p-8 rounded-lg hover:border-[#2ED9A0]/50 transition-all duration-300"
              >
                <div className="text-xs font-mono text-[#8B5CF6] mb-4 tracking-widest">{`0${idx + 1}`}</div>
                <h4 className="text-2xl font-bold mb-4 group-hover:text-[#2ED9A0] transition-colors">{project.title}</h4>
                <p className="text-[#7D8793] text-sm line-clamp-3 mb-8">{project.description}</p>
                
                <div className="flex justify-between items-center mt-auto border-t border-white/5 pt-4">
                  <span className="text-xs font-mono text-[#7D8793] uppercase line-clamp-1 max-w-[80%]">{project.category.split('/')[0]}</span>
                  <span className="text-[#2ED9A0] opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-32 px-8 md:px-24 pointer-events-auto">
          <div className="reveal-section max-w-5xl mx-auto">
            <h2 className="text-sm font-mono tracking-widest text-[#8B5CF6] mb-16 uppercase">Technical Expertise</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {SKILLS.map((skillGroup, idx) => (
                <div key={idx}>
                  <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">{skillGroup.category}</h3>
                  <ul className="space-y-3">
                    {skillGroup.items.map((item, i) => (
                      <li key={i} className="text-[#7D8793] flex items-center gap-3">
                        <span className="w-1.5 h-1.5 bg-[#2ED9A0]/50 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="py-24 px-8 md:px-24 border-t border-white/5 pointer-events-auto">
          <div className="reveal-section max-w-4xl grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-sm font-mono tracking-widest text-[#2ED9A0] mb-8 uppercase">Education</h2>
            </div>
            <div className="space-y-8">
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
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-[70vh] flex flex-col justify-center items-center text-center py-32 px-8 border-t border-white/5 pointer-events-auto">
          <div className="reveal-section w-full max-w-5xl border border-[#2ED9A0]/20 rounded-2xl p-16">
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight mb-6">Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ED9A0] to-[#8B5CF6]">intelligent.</span></h2>
            <p className="text-[#7D8793] text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Interested in AI, intelligent automation, AI agents, or interactive technology? Let's connect.
            </p>
            <div className="flex flex-col items-center gap-6">
              <a href="https://www.linkedin.com/in/samarth-solanki1902" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#2ED9A0] text-[#07090C] font-bold font-mono tracking-widest py-4 px-12 rounded-full hover:bg-[#8B5CF6] hover:text-white transition-colors duration-300">
                CONNECT ON LINKEDIN
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-20 py-12 px-8 md:px-24 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 pointer-events-auto">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-bold tracking-[0.3em] text-sm uppercase">Samarth Solanki</span>
            <span className="text-[#2ED9A0] font-mono text-xs tracking-widest uppercase">AI / ML Engineer</span>
          </div>
          <div className="text-xs text-[#7D8793] font-mono tracking-widest uppercase">© 2026. All rights reserved.</div>
        </footer>

      </div>
    </div>
  );
}
