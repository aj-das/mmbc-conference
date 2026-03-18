"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, Mic, Search } from "lucide-react";
import { speakerSessions } from "./conference-ui";
import type { SpeakerSession } from "./conference-ui";

export function SpeakersScreen() {
  const [query, setQuery] = useState("");

  // Filter sessions: keep a session if any speaker's name or role matches
  const filtered: SpeakerSession[] = speakerSessions
    .map((session) => {
      if (query === "") return session;
      const matchedSpeakers = session.speakers.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.role.toLowerCase().includes(query.toLowerCase())
      );
      const titleMatches = session.title
        .toLowerCase()
        .includes(query.toLowerCase());
      if (titleMatches) return session;
      if (matchedSpeakers.length > 0)
        return { ...session, speakers: matchedSpeakers };
      return null;
    })
    .filter(Boolean) as SpeakerSession[];

  return (
    <main className="relative min-h-screen overflow-hidden px-3 py-4 text-white sm:grid sm:place-items-center sm:p-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bg-float-1 absolute right-[-10rem] top-[-8rem] h-[28rem] w-[28rem] rounded-full bg-[#625cce]/28 blur-3xl" />
        <div className="bg-float-2 absolute bottom-[-12rem] left-[-9rem] h-[32rem] w-[32rem] rounded-full bg-[#5641d9]/24 blur-3xl" />
      </div>

      <div className="phone-shell relative mx-auto flex min-h-[min(100vh,36rem)] w-full max-w-[24.375rem] flex-col overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="bg-float-3 absolute right-[-7rem] top-[-6.5rem] h-64 w-64 rounded-full bg-[#6a62c4]/45" />
          <div className="bg-float-4 absolute bottom-[-8rem] left-[-6rem] h-72 w-72 rounded-full bg-[#5f56d8]/34 blur-[2px]" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#24108d]/35 to-transparent" />
        </div>

        <div className="phone-scroll relative flex min-h-0 flex-1 flex-col gap-5 px-4 pb-8 pt-4">
          <section className="space-y-5 pb-6">
            {/* Back */}
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
                Speakers
              </h1>
              <p className="text-[0.875rem] leading-5 tracking-[-0.04em] text-[#d7d2ff]">
                The lineup for MMBC Conference 2026.
              </p>
              <p className="text-[0.75rem] leading-[1.35] tracking-[-0.02em] text-[#b8b0e8]">
                Tap a session to see who&apos;s speaking. Use search to find by name or topic.
              </p>
            </header>

            {/* Search */}
            <div className="flex items-center gap-2.5 rounded-xl border border-white/18 bg-white/12 px-3 py-3 text-[#d7d2ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <Search className="h-5 w-5 shrink-0" />
              <input
                type="text"
                placeholder="Search speakers or sessions"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-[0.8125rem] font-medium tracking-[-0.03em] text-[#d7d2ff]/95 placeholder-[#d7d2ff]/60 outline-none"
              />
            </div>

            {/* Session list */}
            <div className="space-y-2">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-[#9e93ff]">
                Sessions &amp; speakers
              </p>

              {filtered.length === 0 ? (
                <div className="rounded-xl border border-[#8f86d2]/80 bg-[#41368d]/60 px-4 py-6 text-center">
                  <p className="text-sm text-[#d7d2ff]">
                    No speakers match your search.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filtered.map((session) => (
                    <details
                      key={session.title}
                      className="group rounded-xl border border-[#8f86d2]/80 bg-[#41368d] shadow-[0_10px_28px_rgba(9,6,43,0.28)]"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5">
                        <h2 className="font-display text-sm leading-tight tracking-[-0.05em] text-white">
                          {session.title}
                        </h2>
                        <ChevronDown className="h-4 w-4 shrink-0 text-[#ddd8ff] transition group-open:rotate-180" />
                      </summary>

                      <div className="divide-y divide-white/8 border-t border-white/10">
                        {session.speakers.map((speaker) => (
                          <div
                            key={speaker.name}
                            className="flex items-start gap-3 px-4 py-3"
                          >
                            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#6d63c6] bg-[#2a1f73]">
                              <Mic className="h-3.5 w-3.5 text-[#b8b0e8]" />
                            </span>
                            <div className="min-w-0">
                              <p className="text-[0.8125rem] font-semibold leading-tight tracking-[-0.03em] text-white">
                                {speaker.name}
                                {speaker.isModerator && (
                                  <span className="ml-2 rounded-full bg-[#3d2fa0] px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.1em] text-[#c4b8ff]">
                                    Moderator
                                  </span>
                                )}
                              </p>
                              <p className="mt-0.5 text-[0.75rem] leading-[1.35] text-[#b8b0e8]">
                                {speaker.role}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
