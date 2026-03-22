"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, BookmarkPlus, BookmarkCheck, ChevronDown, MapPin, MicVocal, Search } from "lucide-react";
import { AppShell, scheduleItems } from "./conference-ui";

const AGENDA_KEY = "mmbc-my-agenda";

function useAgenda() {
  const [agenda, setAgenda] = useState<Set<string>>(() => new Set());

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(AGENDA_KEY);
      if (stored) setAgenda(new Set(JSON.parse(stored) as string[]));
    } catch {}
  }, []);

  function toggle(title: string) {
    setAgenda((prev) => {
      const next = new Set(prev);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      try {
        localStorage.setItem(AGENDA_KEY, JSON.stringify([...next]));
      } catch {}
      return next;
    });
  }

  return { agenda, toggle };
}

function PillTag({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#8e85d2] bg-[#2b2178] px-3 py-1.5 text-[0.72rem] font-semibold text-[#d9d5ff]">
      <Icon className="h-3.5 w-3.5" />
      {children}
    </span>
  );
}

export function ScheduleScreen() {
  const [tab, setTab] = useState<"all" | "my-agenda">("all");
  const [query, setQuery] = useState("");
  const { agenda, toggle } = useAgenda();

  const filtered = scheduleItems.filter((e) => {
    const matchesSearch =
      query === "" ||
      e.title.toLowerCase().includes(query.toLowerCase()) ||
      e.speaker.toLowerCase().includes(query.toLowerCase()) ||
      e.location.toLowerCase().includes(query.toLowerCase());
    const matchesTab = tab === "all" || agenda.has(e.title);
    return matchesSearch && matchesTab;
  });

  return (
    <AppShell>
      <section className="space-y-6 pb-6">
        {/* Back button */}
            <Link
              href="/"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-2 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/8">
                <ArrowLeft className="h-4 w-4" />
              </span>
              Back
            </Link>

            {/* Heading */}
            <header className="space-y-1.5">
              <h1 className="font-display text-[2rem] leading-[0.95] tracking-[-0.08em] text-white">
                Schedule
              </h1>
              <p className="text-[0.875rem] leading-5 tracking-[-0.04em] text-[#d7d2ff]">
                Build your personal run-of-show.
              </p>
              <p className="text-[0.75rem] leading-[1.35] tracking-[-0.02em] text-[#b8b0e8]">
                Tap an event to expand it. Tap the bookmark to save it to My Agenda.
              </p>
            </header>

            {/* Search */}
            <div className="flex items-center gap-2.5 rounded-xl border border-white/18 bg-white/12 px-3 py-3 text-[#d7d2ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <Search className="h-5 w-5 shrink-0" />
              <input
                type="text"
                placeholder="Search events, speakers, rooms"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-[0.8125rem] font-medium tracking-[-0.03em] text-[#d7d2ff]/95 placeholder-[#d7d2ff]/60 outline-none"
              />
            </div>

            {/* Tab toggle */}
            <div className="space-y-1.5">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-[#9e93ff]">
                View
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setTab("all")}
                  aria-pressed={tab === "all"}
                  className={`flex-1 rounded-xl border px-3 py-2.5 text-center font-display text-xs tracking-[-0.05em] transition ${
                    tab === "all"
                      ? "border-[#8f86d2] bg-[#41368d] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
                      : "border-[#8f86d2]/80 bg-[#3a317e] text-white/70"
                  }`}
                >
                  All Events
                </button>
                <button
                  type="button"
                  onClick={() => setTab("my-agenda")}
                  aria-pressed={tab === "my-agenda"}
                  className={`flex-1 rounded-xl border px-3 py-2.5 text-center font-display text-xs tracking-[-0.05em] transition ${
                    tab === "my-agenda"
                      ? "border-[#8f86d2] bg-[#41368d] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
                      : "border-[#8f86d2]/80 bg-[#3a317e] text-white/70"
                  }`}
                >
                  My Agenda ({agenda.size})
                </button>
              </div>
            </div>

            {/* Event list */}
            <div className="space-y-1.5">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-[#9e93ff]">
                {tab === "all" ? "Today's sessions" : "Your saved sessions"}
              </p>
              <div className="space-y-2">
                {filtered.length === 0 ? (
                  <div className="rounded-xl border border-[#8f86d2]/80 bg-[#41368d]/60 px-4 py-6 text-center">
                    <p className="text-sm text-[#d7d2ff]">
                      {tab === "my-agenda"
                        ? "No saved sessions yet. Tap the bookmark on any event to add it."
                        : "No events match your search."}
                    </p>
                  </div>
                ) : (
                  filtered.map((event, index) => {
                    const saved = agenda.has(event.title);
                    return (
                      <details
                        key={event.title}
                        open={index === 0 && tab === "all" && query === ""}
                        className="group rounded-xl border border-[#8f86d2]/80 bg-[#41368d] px-3 py-3 shadow-[0_10px_28px_rgba(9,6,43,0.28)]"
                      >
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <h2 className="font-display text-sm leading-tight tracking-[-0.06em] text-white">
                              {event.title}
                            </h2>
                            <p className="mt-1 text-[0.75rem] font-medium tracking-[-0.03em] text-[#ece8ff]">
                              {event.time}
                            </p>
                          </div>
                          <div className="flex shrink-0 items-center gap-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                toggle(event.title);
                              }}
                              aria-label={saved ? "Remove from agenda" : "Add to agenda"}
                              className={`rounded-full p-1 transition ${
                                saved
                                  ? "text-[#a78bfa]"
                                  : "text-[#ddd8ff]/50 hover:text-[#ddd8ff]"
                              }`}
                            >
                              {saved ? (
                                <BookmarkCheck className="h-4 w-4" />
                              ) : (
                                <BookmarkPlus className="h-4 w-4" />
                              )}
                            </button>
                            <ChevronDown className="h-4 w-4 text-[#ddd8ff] transition group-open:rotate-180" />
                          </div>
                        </summary>

                        <div className="mt-2 flex flex-wrap gap-1.5">
                          <PillTag icon={MapPin}>{event.location}</PillTag>
                          <PillTag icon={MicVocal}>{event.speaker}</PillTag>
                        </div>

                        <p className="mt-2 text-[0.75rem] leading-[1.4] text-[#ddd8ff]">
                          {event.description}
                        </p>
                      </details>
                    );
                  })
                )}
              </div>
            </div>
      </section>
    </AppShell>
  );
}
