"use client";

import type { ComponentType, ReactNode } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeDollarSign,
  CalendarDays,
  Map,
  UsersRound,
  X,
} from "lucide-react";
import { NextUpCard } from "./next-up-card";
import type { ScheduledEvent } from "./next-up-card";

type ExploreCard = {
  href: string;
  title: string;
  subtitle: string;
  icon: ComponentType<{ className?: string }>;
};

type EventItem = {
  title: string;
  time: string;
  location: string;
  speaker: string;
  description: string;
  startTime: string;
  endTime: string;
};

export type SessionSpeaker = {
  name: string;
  role: string;
  isModerator?: boolean;
};

export type SpeakerSession = {
  title: string;
  speakers: SessionSpeaker[];
};

// Ordered by attendee journey: what’s on → who’s speaking → where to go → partners
const exploreCards: ExploreCard[] = [
  {
    href: "/schedule",
    title: "Schedule",
    subtitle: "Plan your day",
    icon: CalendarDays,
  },
  {
    href: "/speakers",
    title: "Speakers",
    subtitle: "Discover talent",
    icon: UsersRound,
  },
  {
    href: "/floor-plan",
    title: "Floor Plan",
    subtitle: "Navigate venue",
    icon: Map,
  },
  {
    href: "/sponsors",
    title: "Sponsors",
    subtitle: "Meet partners",
    icon: BadgeDollarSign,
  },
];

export const scheduleItems: EventItem[] = [
  {
    title: "Opening Remarks",
    time: "9:00 – 9:10 AM",
    location: "Robertson",
    speaker: "",
    description: "A brief welcome to kick off MMBC Conference 2026.",
    startTime: "2026-03-28T09:00:00",
    endTime: "2026-03-28T09:10:00",
  },
  {
    title: "Fireside Chat — Keynote",
    time: "9:10 – 9:50 AM",
    location: "Robertson",
    speaker: "Jacqueline Saturn, Jenna Adler",
    description: "Conversation and audience Q&A with Jenna Adler (CAA) and Jacqueline Saturn (Virgin Music Group).",
    startTime: "2026-03-28T09:10:00",
    endTime: "2026-03-28T09:50:00",
  },
  {
    title: "How Tours Get Greenlit Panel",
    time: "10:00 – 10:40 AM",
    location: "Robertson",
    speaker: "Vinnie Ferra, Howard Handler",
    description: "Panel discussion on how tours get greenlit. Featuring Vinnie Ferra (The Beehive LA) and Howard Handler (313 Presents).",
    startTime: "2026-03-28T10:00:00",
    endTime: "2026-03-28T10:40:00",
  },
  {
    title: "Coffee Break",
    time: "10:40 – 10:55 AM",
    location: "Lobby",
    speaker: "",
    description: "Coffee and transition break between sessions.",
    startTime: "2026-03-28T10:40:00",
    endTime: "2026-03-28T10:55:00",
  },
  {
    title: "Scroll to Stream: Media Driving Music Discovery",
    time: "10:55 – 11:35 AM",
    location: "Robertson",
    speaker: "Lydia Barry, Christian Hoard, Andrew Spelman, Harrison Golding",
    description: "Panel on how media drives music discovery. Featuring Lydia Barry, Christian Hoard (Rolling Stone), Andrew Spelman, and Harrison Golding.",
    startTime: "2026-03-28T10:55:00",
    endTime: "2026-03-28T11:35:00",
  },
  {
    title: "Money Moves: Music as an Asset Class",
    time: "11:40 AM – 12:20 PM",
    location: "Robertson",
    speaker: "Andrew Batey, Josh Housman, Peter Picado-Curtis, Alex Silverstein",
    description: "Panel on music as an asset class. Featuring Andrew Batey (Beatdapp), Josh Housman (Jefferies), Peter Picado-Curtis, and Alex Silverstein (Too Lost).",
    startTime: "2026-03-28T11:40:00",
    endTime: "2026-03-28T12:20:00",
  },
  {
    title: "Recruitment Lunch",
    time: "12:25 – 1:20 PM",
    location: "R2210 & R2220",
    speaker: "",
    description: "Catered lunch with recruitment-based rooms.",
    startTime: "2026-03-28T12:25:00",
    endTime: "2026-03-28T13:20:00",
  },
  {
    title: "Plugged In: Where Brands Meet Music Authentically",
    time: "1:25 – 2:05 PM",
    location: "Robertson",
    speaker: "Chris King",
    description: "Keynote on where brands meet music authentically. Chris King, CMS Nashville.",
    startTime: "2026-03-28T13:25:00",
    endTime: "2026-03-28T14:05:00",
  },
  {
    title: "Artist Keynote",
    time: "2:10 – 2:50 PM",
    location: "Robertson",
    speaker: "QUINNXCII, ayokay",
    description: "Artist keynote with QUINNXCII and ayokay.",
    startTime: "2026-03-28T14:10:00",
    endTime: "2026-03-28T14:50:00",
  },
  {
    title: "Coffee Break",
    time: "2:50 – 3:05 PM",
    location: "Lobby",
    speaker: "",
    description: "Coffee and transition break.",
    startTime: "2026-03-28T14:50:00",
    endTime: "2026-03-28T15:05:00",
  },
  {
    title: "WORKSHOP",
    time: "3:05 – 4:05 PM",
    location: "R2230 & R2240",
    speaker: "Tony Scudellari, Sarah Bromberg, Jongnic Bontemps · Marie Jacobsen (Moderator)",
    description: "Workshop session. Moderated by Marie Jacobsen. Featuring Tony Scudellari, Sarah Bromberg, and Jongnic Bontemps.",
    startTime: "2026-03-28T15:05:00",
    endTime: "2026-03-28T16:05:00",
  },
  {
    title: "Making a Hit: Inside the Creative Process",
    time: "4:10 – 4:50 PM",
    location: "Robertson",
    speaker: "Leven Kali, Sol Was",
    description: "Interactive session on the creative process with producer/songwriter Sol Was and artist/producer Leven Kali.",
    startTime: "2026-03-28T16:10:00",
    endTime: "2026-03-28T16:50:00",
  },
  {
    title: "Keynote",
    time: "5:00 – 5:40 PM",
    location: "Robertson",
    speaker: "Brendon Anthony",
    description: "Keynote address with Brendon Anthony.",
    startTime: "2026-03-28T17:00:00",
    endTime: "2026-03-28T17:40:00",
  },
  {
    title: "Closing remarks",
    time: "5:45 – 5:55 PM",
    location: "Robertson",
    speaker: "",
    description: "Wrap-up and send-off for MMBC Conference 2026.",
    startTime: "2026-03-28T17:45:00",
    endTime: "2026-03-28T17:55:00",
  },
];

export const speakerSessions: SpeakerSession[] = [
  {
    title: "Fireside Chat — Keynote",
    speakers: [
      {
        name: "Jacqueline Saturn",
        role: "President, Virgin Music Group North America · EVP, Global Artist Relations, Virgin Music Group",
      },
      {
        name: "Jenna Adler",
        role: "Music Agent, Creative Arts Agency (CAA)",
      },
    ],
  },
  {
    title: "How Tours Get Greenlit Panel",
    speakers: [
      { name: "Vinnie Ferra", role: "Co-Founder, The Beehive LA" },
      { name: "Howard Handler", role: "President, 313 Presents" },
    ],
  },
  {
    title: "Scroll to Stream: Media Driving Music Discovery",
    speakers: [
      { name: "Lydia Barry", role: "VP, Marketing & Communications, The · Team" },
      { name: "Christian Hoard", role: "Executive Music Editor, Rolling Stone" },
      { name: "Andrew Spelman", role: "Partner, Mutual Friends" },
      { name: "Harrison Golding", role: "Partner & Co-Founder, Choatic Good Projects" },
      { name: "Tyler Eilenberg", role: "VP of Fan Engagement & Digital Strategy, EMPIRE" },
    ],
  },
  {
    title: "Money Moves: Music as an Asset Class",
    speakers: [
      { name: "Andrew Batey", role: "Co-Founder & Co-CEO, Beatdapp" },
      { name: "Josh Housman", role: "SVP, Media, Entertainment & Sports, Jefferies Investment Bank" },
      { name: "Peter Picado-Curtis", role: "Panelist" },
      { name: "Alex Silverstein", role: "COO & Co-Founder, Too Lost" },
    ],
  },
  {
    title: "Plugged In: Where Brands Meet Music Authentically",
    speakers: [
      { name: "Chris King", role: "CMS Nashville" },
    ],
  },
  {
    title: "Artist Keynote",
    speakers: [
      { name: "Quinn XCII", role: "Recording Artist" },
      { name: "ayokay", role: "Recording Artist" },
    ],
  },
  {
    title: "Sony Music SYNC Panel",
    speakers: [
      { name: "Tony Scudellari", role: "Senior VP, Television Music, Sony Pictures Television" },
      { name: "Sarah Bromberg", role: "VP of Music Supervision & Library at Raedio, Sony Pictures Television" },
      { name: "Jognic Bontemps", role: "Composer and Musician, Sony Pictures Television" },
      { name: "Marie Jacobsen", role: "Exectuive VP, Head of Current Programming, Sony Pictures Television", isModerator: true },
    ],
  },
  {
    title: "Making a Hit: Inside the Creative Process",
    speakers: [
      { name: "Leven Kali", role: "Artist, Producer, Songwriter" },
      { name: "Sol Was", role: "Producer / Songwriter" },
    ],
  },
  {
    title: "Keynote",
    speakers: [
      { name: "Brendon Anthony", role: "Keynote Speaker" },
    ],
  },
];

const sponsors: { name: string; logo?: string }[] = [
  { name: "Assistants Vs Agents", logo: "/sponsors/ava_logo.png" },
  { name: "BBA Council", logo: "/sponsors/bbacouncil.png" },
  { name: "Bo's Bagels", logo: "/sponsors/bo_bagels.png" },
  { name: "Breakaway", logo: "/sponsors/breakaway.png" },
  { name: "Bravado", logo: "/sponsors/bravado logo.png" },
  { name: "Cahoots" },
  { name: "CMS Nashville", logo: "/sponsors/cms_nashville.png" },
  { name: "Depop", logo: "/sponsors/depop.png" },
  { name: "Happy Belly Vending" },
  { name: "Kultura", logo: "/sponsors/kultura.PNG" },
  { name: "Maize & Blue", logo: "/sponsors/maizeandblue.png" },
  { name: "Moises", logo: "/sponsors/moises.png" },
  { name: "Monster Energy", logo: "/sponsors/monster.png" },
  { name: "Motivation", logo: "/sponsors/motivation.png" },
  { name: "Nothing Bundt Cakes", logo: "/sponsors/nothingbundtcake.png" },
  { name: "Rolling Stone", logo: "/sponsors/rolling stone.png" },
  { name: "RushLink", logo: "/sponsors/rushlink.png" },
  { name: "SB Vision", logo: "/sponsors/sbvision.png" },
  { name: "Slido", logo: "/sponsors/slido.svg" },
  { name: "Stray Hen", logo: "/sponsors/strayhen.png" },
  { name: "THE TEAM", logo: "/sponsors/the team logo.png" },
  { name: "The Digilogue", logo: "/sponsors/digilogue.png" },
  { name: "UTA", logo: "/sponsors/uta_logo.svg" },
  { name: "Unwell", logo: "/sponsors/unwell.png" },
  { name: "Yeti", logo: "/sponsors/Yeti-Emblem.png" },
  { name: "Zell Lurie", logo: "/sponsors/ZLI_logo.png" },
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <main className="relative min-h-[100dvh] overflow-x-hidden px-3 py-0 text-white sm:px-6 sm:py-0 sm:grid sm:place-items-center">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bg-float-1 absolute right-[-10rem] top-[-8rem] h-[28rem] w-[28rem] rounded-full bg-[#625cce]/28 blur-3xl" />
        <div className="bg-float-2 absolute bottom-[-12rem] left-[-9rem] h-[32rem] w-[32rem] rounded-full bg-[#5641d9]/24 blur-3xl" />
      </div>

      <div
        className="relative mx-auto w-full max-w-[26.875rem]"
        style={{
          paddingTop: "calc(0.75rem + env(safe-area-inset-top))",
          paddingBottom: "calc(2rem + env(safe-area-inset-bottom))",
        }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 overflow-hidden">
          <div className="bg-float-3 absolute right-[-7rem] top-[-6.5rem] h-64 w-64 rounded-full bg-[#6a62c4]/45" />
          <div className="bg-float-4 absolute bottom-[-8rem] left-[-6rem] h-72 w-72 rounded-full bg-[#5f56d8]/34 blur-[2px]" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#24108d]/35 to-transparent" />
        </div>

        <div className="relative flex flex-col gap-5 px-1 pt-4">
          {children}
        </div>
      </div>
    </main>
  );
}

function BackButton({ href = "/" }: { href?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-2 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/8">
        <ArrowLeft className="h-4 w-4" />
      </span>
    </Link>
  );
}

function PillTag({
  icon: Icon,
  children,
}: {
  icon: ComponentType<{ className?: string }>;
  children: ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#8e85d2] bg-[#2b2178] px-3 py-1.5 text-[0.72rem] font-semibold text-[#d9d5ff]">
      <Icon className="h-3.5 w-3.5" />
      {children}
    </span>
  );
}

function SectionHeading({
  title,
  subtitle,
  hint,
}: {
  title: string;
  subtitle: string;
  hint?: string;
}) {
  return (
    <header className="space-y-1.5">
      <h1 className="font-display text-[2rem] leading-[0.95] tracking-[-0.08em] text-white">
        {title}
      </h1>
      <p className="text-[0.875rem] leading-5 tracking-[-0.04em] text-[#d7d2ff]">
        {subtitle}
      </p>
      {hint ? (
        <p className="text-[0.75rem] leading-[1.35] tracking-[-0.02em] text-[#b8b0e8]">
          {hint}
        </p>
      ) : null}
    </header>
  );
}

function ConferenceLogo() {
  return (
    <header className="shrink-0 pt-2">
      <div className="mx-auto w-full max-w-[18rem]">
        <Image
          src="/conferencelogo.png"
          alt="Conference"
          width={750}
          height={437}
          priority
          className="h-auto w-full object-contain"
        />
      </div>
    </header>
  );
}

export function HomeScreen() {
  return (
    <AppShell>
      <section className="relative flex min-h-0 flex-1 flex-col gap-4 pb-4">
        <div className="flex flex-col gap-1">
          <ConferenceLogo />
          <NextUpCard events={scheduleItems as ScheduledEvent[]} />
        </div>

        <section className="flex min-h-0 flex-1 flex-col">
          <h3 className="shrink-0 font-display text-center text-xl tracking-[-0.07em] text-white">
            Explore
          </h3>
          <p className="shrink-0 pt-0.5 text-center text-[0.8125rem] tracking-[-0.02em] text-[#b8b0e8]">
            Tap a card to view schedule, speakers, map, or sponsors.
          </p>
          <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-5 pt-5">
            {exploreCards.map(({ href, title, subtitle, icon: Icon }) => (
              <Link
                key={title}
                href={href}
                className="flex min-h-0 flex-col items-center justify-center rounded-xl border border-[#8f86d2]/80 bg-[#3d3388] px-4 py-5 text-center shadow-[0_10px_28px_rgba(7,5,39,0.3),inset_0_1px_0_rgba(255,255,255,0.06)] transition hover:bg-[#443a92] active:scale-[0.98]"
              >
                <span className="mb-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#5144ab] text-white/95">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-display text-base leading-none tracking-[-0.06em] text-white">
                  {title}
                </span>
                <span className="mt-1.5 text-[0.75rem] font-medium tracking-[-0.03em] text-[#d7d2ff]">
                  {subtitle}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </AppShell>
  );
}

export function SponsorsScreen() {
  return (
    <AppShell>
      <section className="space-y-6 pb-6">
        <BackButton />
        <SectionHeading
          title="Sponsors"
          subtitle="Thank you to the partners making this conference possible."
          hint="Connect with these organizations in the lobby and at their booths."
        />
        <div className="space-y-2">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-[#9e93ff]">
            Our partners
          </p>
          <div className="rounded-xl border border-[#8f86d2]/80 bg-[#3f3689] p-4 shadow-[0_10px_28px_rgba(9,6,43,0.28)]">
            <div className="grid grid-cols-2 gap-3">
              {sponsors.map((sponsor) => (
                <div
                  key={sponsor.name}
                  className="flex min-h-[4rem] flex-col items-center justify-center gap-4 rounded-lg border border-white/12 bg-white/6 px-3 py-5"
                >
                  {sponsor.logo ? (
                    <div className="relative h-12 w-full shrink-0">
                      <Image
                        src={sponsor.logo}
                        alt={sponsor.name}
                        fill
                        className="object-contain object-center"
                        sizes="(max-width: 400px) 50vw, 200px"
                      />
                    </div>
                  ) : null}
                  <span className="font-display text-center text-sm tracking-[-0.05em] text-white">
                    {sponsor.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}

export function FloorPlanScreen() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <AppShell>
      <section className="space-y-5 pb-6">
        <BackButton />
        <SectionHeading
          title="Floor Plan"
          subtitle="Find your way around the venue."
          hint="Tap the map to zoom in. Pinch and scroll to explore."
        />
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="block w-full overflow-hidden rounded-2xl border-2 border-[#8f86d2]/60 bg-[#2b2178]/60 text-left shadow-[0_20px_50px_rgba(0,0,0,0.4),0_0_0_1px_rgba(143,134,210,0.2),inset_0_1px_0_rgba(255,255,255,0.08)] transition active:scale-[0.99]"
        >
          <div className="relative aspect-[4/3] min-h-[220px] w-full">
            <Image
              src="/MMBC_Conf_Map_final.jpeg"
              alt="MMBC Conference venue floor plan"
              width={1920}
              height={1440}
              className="h-full w-full cursor-pointer object-contain object-top"
              sizes="(max-width: 430px) 100vw, 430px"
              priority
            />
          </div>
        </button>
      </section>

      {lightboxOpen ? (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/95"
          style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}
          onClick={() => setLightboxOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-3 top-3 z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="flex-1 overflow-auto overscroll-contain p-4 pt-14"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src="/MMBC_Conf_Map_final.jpeg"
              alt="MMBC Conference venue floor plan"
              className="mx-auto min-w-full object-contain"
              style={{ maxWidth: "min(100%, 1200px)" }}
            />
          </div>
          <p className="shrink-0 px-4 pb-4 text-center text-sm text-white/70">
            Tap outside or X to close
          </p>
        </div>
      ) : null}
    </AppShell>
  );
}
