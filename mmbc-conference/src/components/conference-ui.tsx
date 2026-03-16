import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeDollarSign,
  CalendarDays,
  ChevronDown,
  Map,
  MapPin,
  MicVocal,
  UsersRound,
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

type SpeakerItem = {
  name: string;
  role: string;
  focus: string;
  bio: string;
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
    title: "Check-In and Coffee Lounge",
    time: "8:00 AM - 9:00 AM",
    location: "Main Lobby",
    speaker: "MMBC Team",
    description:
      "Pick up your badge, meet other attendees, and get settled before the day starts.",
    startTime: "2026-03-28T08:00:00",
    endTime: "2026-03-28T09:00:00",
  },
  {
    title: "Opening Keynote: The Future of Artist Development",
    time: "9:15 AM - 10:00 AM",
    location: "Auditorium A",
    speaker: "Bill Werde",
    description:
      "A framing session on where management, discovery, and audience building are headed next.",
    startTime: "2026-03-28T09:15:00",
    endTime: "2026-03-28T10:00:00",
  },
  {
    title: "Data-Driven A&R Workshop",
    time: "10:20 AM - 11:10 AM",
    location: "Studio Room 2",
    speaker: "Chartmetric Team",
    description:
      "A practical breakdown of how teams use metrics to spot momentum without losing taste.",
    startTime: "2026-03-28T10:20:00",
    endTime: "2026-03-28T11:10:00",
  },
  {
    title: "Brand Partnerships Panel",
    time: "10:20 AM - 11:10 AM",
    location: "Auditorium B",
    speaker: "Cindy Levitt",
    description:
      "How artists, labels, and brands can structure deals that create value beyond a one-off post.",
    startTime: "2026-03-28T10:20:00",
    endTime: "2026-03-28T11:10:00",
  },
  {
    title: "Label and Management Meetups",
    time: "11:25 AM - 12:00 PM",
    location: "Networking Lounge",
    speaker: "Andrea Johnson",
    description:
      "A fast-moving networking block designed to connect students with operators across the business.",
    startTime: "2026-03-28T11:25:00",
    endTime: "2026-03-28T12:00:00",
  },
];

export const speakerItems: SpeakerItem[] = [
  {
    name: "Andrea Johnson",
    role: "Conference Featured Speaker",
    focus: "Artist management and roster strategy",
    bio: "Andrea works at the intersection of artist growth, team building, and long-term career planning.",
  },
  {
    name: "Ari Nisman",
    role: "Conference Featured Speaker",
    focus: "Music-tech entrepreneurship",
    bio: "Ari brings a founder perspective on data, fan behavior, and tools that move decision-making faster.",
  },
  {
    name: "Bill Werde",
    role: "Conference Featured Speaker",
    focus: "Media, education, and artist development",
    bio: "Bill connects cultural shifts to the business systems shaping how artists break and sustain careers.",
  },
  {
    name: "Cindy Levitt",
    role: "Conference Featured Speaker",
    focus: "Brand partnerships and experiential campaigns",
    bio: "Cindy has built collaborations that translate artist identity into brand moments people actually remember.",
  },
  {
    name: "Denise Melanson",
    role: "Conference Featured Speaker",
    focus: "Touring, live strategy, and execution",
    bio: "Denise specializes in turning ambitious live ideas into practical, scalable audience experiences.",
  },
];

const sponsors = [
  "AEG Presents",
  "Chartmetric",
  "Universal Music Group",
  "The Orchard",
  "Sony Music",
  "CAA",
];

const floorPlanZones = [
  {
    name: "Main Lobby",
    detail: "Registration, coffee lounge, and sponsor welcome desk.",
  },
  {
    name: "Auditorium A",
    detail: "Keynotes, featured talks, and large-format programming.",
  },
  {
    name: "Auditorium B",
    detail: "Panels and brand partnership sessions.",
  },
  {
    name: "Studio Room 2",
    detail: "Hands-on workshops and smaller breakout sessions.",
  },
];

function AppShell({ children }: { children: ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-hidden px-3 py-4 text-white sm:grid sm:place-items-center sm:p-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bg-float-1 absolute right-[-10rem] top-[-8rem] h-[28rem] w-[28rem] rounded-full bg-[#625cce]/28 blur-3xl" />
        <div className="bg-float-2 absolute bottom-[-12rem] left-[-9rem] h-[32rem] w-[32rem] rounded-full bg-[#5641d9]/24 blur-3xl" />
      </div>

      <div className="phone-shell relative mx-auto flex w-full max-w-[26.875rem] flex-col overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="bg-float-3 absolute right-[-7rem] top-[-6.5rem] h-64 w-64 rounded-full bg-[#6a62c4]/45" />
          <div className="bg-float-4 absolute bottom-[-8rem] left-[-6rem] h-72 w-72 rounded-full bg-[#5f56d8]/34 blur-[2px]" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#24108d]/35 to-transparent" />
        </div>

        <div className="phone-scroll relative flex min-h-0 flex-1 flex-col gap-5 px-4 pb-8 pt-4">
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
    <header className="shrink-0 pt-2 -mb-4">
      <div className="mx-auto w-full max-w-[13rem]">
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
        <ConferenceLogo />

        <NextUpCard events={scheduleItems as ScheduledEvent[]} />

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
            <div className="grid grid-cols-2 gap-2">
              {sponsors.map((sponsor) => (
                <div
                  key={sponsor}
                  className="rounded-lg border border-white/12 bg-white/6 px-3 py-3 text-center font-display text-sm tracking-[-0.05em] text-white"
                >
                  {sponsor}
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
  return (
    <AppShell>
      <section className="space-y-6 pb-6">
        <BackButton />
        <SectionHeading
          title="Floor Plan"
          subtitle="Find your way around the venue."
          hint="Tap a location to see what’s there. Use this list to plan where to go between sessions."
        />
        <div className="space-y-2">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-[#9e93ff]">
            Venue locations
          </p>
          <div className="rounded-xl border border-[#8f86d2]/80 bg-[#3f3689] p-4 shadow-[0_10px_28px_rgba(9,6,43,0.28)]">
            <div className="space-y-2">
              {floorPlanZones.map((zone) => (
                <div
                  key={zone.name}
                  className="rounded-lg border border-white/12 bg-white/6 px-3 py-3"
                >
                  <p className="font-display text-sm tracking-[-0.05em] text-white">
                    {zone.name}
                  </p>
                  <p className="mt-1 text-[0.8125rem] leading-5 text-[#d7d2ff]">
                    {zone.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
