"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Terminal as TerminalIcon } from "lucide-react";
import gsap from "gsap";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "system" | "user", text: string }[]>([
    { role: "system", text: "SYSTEM INITIALIZED." },
    { role: "system", text: "I am Samarth's AI assistant. Ask me about his experience, skills, or projects." }
  ]);
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Animate opening
  useEffect(() => {
    if (isOpen && chatRef.current) {
      gsap.fromTo(chatRef.current, 
        { y: 50, opacity: 0, scale: 0.9 }, 
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setInput("");

    // Simulate AI response delay
    setTimeout(() => {
      let reply = "I'm still learning. Please ask about Samarth's skills, experience, or projects.";
      
      const query = userMsg.toLowerCase();
      if (query.includes("skill") || query.includes("stack") || query.includes("technolog")) {
        reply = "Samarth specializes in Python, Machine Learning, Computer Vision, and modern web frameworks like Next.js and React.";
      } else if (query.includes("experience") || query.includes("work") || query.includes("capermint")) {
        reply = "He currently works as an AI/ML Engineer at Capermint Technology, and previously at Isoftrend System. He has 1.5+ years of experience.";
      } else if (query.includes("project") || query.includes("build") || query.includes("portfolio")) {
        reply = "He has built complex systems like an AI Recruitment System, Testable AI Agents, and Generative AI platforms. Scroll up to the 'Technical Artifacts' section to see more!";
      } else if (query.includes("contact") || query.includes("email") || query.includes("hire")) {
        reply = "You can connect with him directly on LinkedIn at the bottom of the page, or email him at hello@samarthsolanki.com.";
      } else if (query.includes("who") || query.includes("about") || query.includes("samarth")) {
        reply = "Samarth Solanki is an AI/ML Engineer who turns complex workflows into intelligent systems. He's based in Ahmedabad, India.";
      } else if (query.includes("education") || query.includes("degree") || query.includes("study") || query.includes("college") || query.includes("university")) {
        reply = "He holds a Master of Computer Applications (MCA) from LJ University in Ahmedabad, and a Bachelor of Computer Applications (BCA) from Shree Swaminarayan Gurukul in Bhavnagar, Gujarat.";
      }

      setMessages(prev => [...prev, { role: "system", text: reply }]);
    }, 600);
  };

  return (
    <>
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-40 bg-[#11151A] border border-[#2ED9A0]/50 text-[#2ED9A0] p-4 rounded-full shadow-[0_0_20px_rgba(46,217,160,0.2)] hover:bg-[#2ED9A0]/10 hover:scale-110 transition-all duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <TerminalIcon size={24} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
          ref={chatRef}
          className="fixed bottom-8 right-8 z-50 w-80 md:w-96 bg-[#030507]/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-lg overflow-hidden flex flex-col font-mono text-sm"
        >
          {/* Header */}
          <div className="bg-[#11151A] border-b border-white/10 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2 text-[#2ED9A0]">
              <TerminalIcon size={16} />
              <span className="font-bold tracking-widest text-xs">AI_ASSISTANT.sh</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-[#7D8793] hover:text-white transition-colors">
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 h-64 overflow-y-auto flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'system' && <span className="text-[#2ED9A0] mt-1">&gt;</span>}
                <div className={`max-w-[85%] ${msg.role === 'user' ? 'text-white' : 'text-[#7D8793]'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="border-t border-white/10 p-4 bg-[#11151A]/50 flex items-center gap-2">
            <span className="text-[#2ED9A0]">&gt;</span>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="bg-transparent border-none outline-none flex-1 text-white placeholder:text-[#7D8793]/50"
              autoFocus
            />
          </form>
        </div>
      )}
    </>
  );
}
