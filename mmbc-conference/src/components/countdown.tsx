"use client";

import { useEffect, useState } from "react";

function formatCountdown(target: Date, now: Date) {
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, past: true };
  }
  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds, past: false };
}

export function Countdown({ targetDate }: { targetDate: string }) {
  const target = new Date(targetDate);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const { days, hours, minutes, seconds, past } = formatCountdown(target, now);

  if (past) {
    return (
      <span className="text-sm font-semibold tracking-[-0.04em] text-[#9e93ff]">
        Started
      </span>
    );
  }

  return (
    <span className="text-sm font-semibold tracking-[-0.04em] text-[#9e93ff]">
      Starts in {days}d {hours}h {minutes}m {seconds}s
    </span>
  );
}
