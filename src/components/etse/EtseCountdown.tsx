"use client";

import React, { useState, useEffect } from "react";
import { MAIN_ETSE_DATA } from "@/data/etse";
import { Clock } from "lucide-react";

export const EtseCountdown: React.FC = () => {
  const targetTime = new Date(MAIN_ETSE_DATA.campaign.examDateIso).getTime();

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

  if (timeLeft.isPast) {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold">
        <Clock className="w-4 h-4" />
        <span>ETSE 2026 Examination Concluded</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/15 text-white">
      <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-300 px-2 uppercase tracking-wider hidden sm:flex">
        <Clock className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
        <span>Exam In</span>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        <div className="flex flex-col items-center bg-white/10 px-2.5 py-1 rounded-lg min-w-[40px]">
          <span className="text-sm sm:text-base font-extrabold text-amber-300 leading-tight">
            {timeLeft.days}
          </span>
          <span className="text-[9px] text-slate-400 uppercase font-medium">Days</span>
        </div>

        <span className="font-bold text-slate-500">:</span>

        <div className="flex flex-col items-center bg-white/10 px-2.5 py-1 rounded-lg min-w-[40px]">
          <span className="text-sm sm:text-base font-extrabold text-white leading-tight">
            {String(timeLeft.hours).padStart(2, "0")}
          </span>
          <span className="text-[9px] text-slate-400 uppercase font-medium">Hrs</span>
        </div>

        <span className="font-bold text-slate-500">:</span>

        <div className="flex flex-col items-center bg-white/10 px-2.5 py-1 rounded-lg min-w-[40px]">
          <span className="text-sm sm:text-base font-extrabold text-white leading-tight">
            {String(timeLeft.minutes).padStart(2, "0")}
          </span>
          <span className="text-[9px] text-slate-400 uppercase font-medium">Min</span>
        </div>

        <span className="font-bold text-slate-500">:</span>

        <div className="flex flex-col items-center bg-white/10 px-2.5 py-1 rounded-lg min-w-[40px]">
          <span className="text-sm sm:text-base font-extrabold text-[var(--brand-accent-light)] leading-tight">
            {String(timeLeft.seconds).padStart(2, "0")}
          </span>
          <span className="text-[9px] text-slate-400 uppercase font-medium">Sec</span>
        </div>
      </div>
    </div>
  );
};
