"use client";

import { useEffect, useState } from "react";
import { Clock3, Radio } from "lucide-react";

export type ScheduledEvent = {
  title: string;
  time: string;
  location: string;
  speaker: string;
  startTime: string; // ISO string
  endTime: string;   // ISO string
};

function useNow() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function formatCountdown(target: Date, now: Date) {
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) return null;
  const s = Math.floor((diff / 1000) % 60);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (d > 0) return `${d}d ${h}h ${m}m ${s}s`;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  return `${m}m ${s}s`;
}

export function NextUpCard({ events }: { events: ScheduledEvent[] }) {
  const now = useNow();

  // Find the first event that hasn't ended yet
  const activeIndex = events.findIndex((e) => new Date(e.endTime) > now);

  // All done
  if (activeIndex === -1) {
    return (
      <article className="shrink-0 rounded-xl border border-[#8f86d2]/80 bg-[#3a317e] px-5 py-5 shadow-[0_12px_32px_rgba(8,6,39,0.35),inset_0_1px_0_rgba(255,255,255,0.06)]">
        <div className="mb-2 flex items-center gap-2 text-[#9d92ff]">
          <Clock3 className="h-4 w-4" />
          <span className="text-sm font-semibold tracking-[-0.04em]">
            That&apos;s a wrap!
          </span>
        </div>
        <h2 className="font-display text-lg leading-tight tracking-[-0.05em] text-white">
          Thanks for joining MMBC 2026
        </h2>
        <p className="mt-2 text-[0.8125rem] font-medium tracking-[-0.03em] text-[#ece8ff]">
          All sessions have ended. See you next year!
        </p>
      </article>
    );
  }

  const event = events[activeIndex];
  const start = new Date(event.startTime);
  const isHappening = start <= now;
  const countdown = isHappening ? null : formatCountdown(start, now);

  return (
    <article className="shrink-0 rounded-xl border border-[#8f86d2]/80 bg-[#3a317e] px-5 py-5 shadow-[0_12px_32px_rgba(8,6,39,0.35),inset_0_1px_0_rgba(255,255,255,0.06)]">
      <div className="mb-2 flex items-center gap-2 text-[#9d92ff]">
        {isHappening ? (
          <Radio className="h-4 w-4 text-[#a78bfa]" />
        ) : (
          <Clock3 className="h-4 w-4" />
        )}
        <span className="text-sm font-semibold tracking-[-0.04em]">
          {isHappening ? (
            <span className="text-[#a78bfa]">Happening now</span>
          ) : (
            "Next up"
          )}
        </span>
      </div>

      <h2 className="font-display text-lg leading-tight tracking-[-0.05em] text-white">
        {event.title}
      </h2>
      <p className="mt-2 text-[0.8125rem] font-medium tracking-[-0.03em] text-[#ece8ff]">
        {event.time} · {event.location}
      </p>

      {!isHappening && countdown && (
        <p className="mt-3 text-sm font-semibold tracking-[-0.04em] text-[#9e93ff]">
          Starts in {countdown}
        </p>
      )}

      {isHappening && (
        <p className="mt-3 text-sm font-semibold tracking-[-0.04em] text-[#9e93ff]">
          Ends in {formatCountdown(new Date(event.endTime), now)}
        </p>
      )}
    </article>
  );
}
