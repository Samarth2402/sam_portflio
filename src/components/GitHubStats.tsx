"use client";

import { useEffect, useState } from "react";

const weeks = 52;
const daysPerWeek = 7;

export default function GitHubStats() {
  const [grid, setGrid] = useState<number[][]>([]);

  useEffect(() => {
    // Generate mock contribution data biased towards recent activity
    const newGrid: number[][] = [];
    for (let w = 0; w < weeks; w++) {
      const week: number[] = [];
      for (let d = 0; d < daysPerWeek; d++) {
        // More activity towards the end (right side)
        const activityLevel = Math.random() * (w / weeks); 
        
        if (activityLevel > 0.8) week.push(4);
        else if (activityLevel > 0.5) week.push(3);
        else if (activityLevel > 0.3) week.push(2);
        else if (activityLevel > 0.1) week.push(1);
        else week.push(0);
      }
      newGrid.push(week);
    }
    setGrid(newGrid);
  }, []);

  const getColor = (level: number) => {
    switch(level) {
      case 4: return "bg-[#2ED9A0]";
      case 3: return "bg-[#2ED9A0]/80";
      case 2: return "bg-[#2ED9A0]/50";
      case 1: return "bg-[#2ED9A0]/20";
      default: return "bg-white/5";
    }
  };

  return (
    <div className="w-full bg-[#11151A] rounded-lg border border-white/5 p-6 overflow-x-auto">
      <div className="flex justify-between items-center mb-6 min-w-[600px]">
        <div className="text-sm font-mono tracking-widest text-[#7D8793]">ENGINEERING ACTIVITY</div>
        <div className="text-xs font-mono text-[#2ED9A0]">1,204 Contributions in the last year</div>
      </div>
      
      <div className="flex gap-1 min-w-[600px]">
        {grid.map((week, wIdx) => (
          <div key={wIdx} className="flex flex-col gap-1">
            {week.map((level, dIdx) => (
              <div 
                key={`${wIdx}-${dIdx}`} 
                className={`w-3 h-3 rounded-[2px] ${getColor(level)} transition-colors duration-300 hover:scale-125`}
                title={`${level} contributions`}
              />
            ))}
          </div>
        ))}
      </div>
      
      <div className="flex justify-end items-center gap-2 mt-4 min-w-[600px]">
        <span className="text-xs text-[#7D8793] font-mono">Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-[2px] bg-white/5" />
          <div className="w-3 h-3 rounded-[2px] bg-[#2ED9A0]/20" />
          <div className="w-3 h-3 rounded-[2px] bg-[#2ED9A0]/50" />
          <div className="w-3 h-3 rounded-[2px] bg-[#2ED9A0]/80" />
          <div className="w-3 h-3 rounded-[2px] bg-[#2ED9A0]" />
        </div>
        <span className="text-xs text-[#7D8793] font-mono">More</span>
      </div>
    </div>
  );
}
