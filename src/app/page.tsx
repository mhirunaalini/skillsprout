"use client";

import {
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  Compass,
  Flame,
  GraduationCap,
  HandHeart,
  Heart,
  Home,
  Leaf,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Sparkles,
  Star,
  Trophy,
  Users,
  Video,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

type Tab = "Home" | "Discover" | "Portfolio" | "Community";
type Match = {
  name: string;
  initials: string;
  color: string;
  teach: string;
  needs: string;
  detail: string;
  availability: string;
  shared: string;
};

const matches: Match[] = [
  {
    name: "Noah Williams",
    initials: "NW",
    color: "#d7c3a5",
    teach: "Python for beginners",
    needs: "Photography fundamentals",
    detail: "Student · 2nd year",
    availability: "Thu after 4pm",
    shared: "97% fit",
  },
  {
    name: "Iris Patel",
    initials: "IP",
    color: "#cabfdb",
    teach: "Watercolor landscapes",
    needs: "Public speaking",
    detail: "Student · 1st year",
    availability: "Wed lunch",
    shared: "94% fit",
  },
  {
    name: "Leo Kim",
    initials: "LK",
    color: "#b9d0b6",
    teach: "Intro to guitar",
    needs: "Study planning",
    detail: "Student · 3rd year",
    availability: "Fri after 3pm",
    shared: "91% fit",
  },
];

const navItems: { label: Tab; icon: typeof Home }[] = [
  { label: "Home", icon: Home },
  { label: "Discover", icon: Compass },
  { label: "Portfolio", icon: BookOpen },
  { label: "Community", icon: Users },
];

function Avatar({ initials, color, size = "md" }: { initials: string; color: string; size?: "sm" | "md" | "lg" }) {
  const sizing = size === "sm" ? "h-8 w-8 text-[10px]" : size === "lg" ? "h-[74px] w-[74px] text-xl" : "h-11 w-11 text-xs";
  return (
    <div
      className={`${sizing} relative grid shrink-0 place-items-center overflow-hidden rounded-full border-[3px] border-white font-bold tracking-tight text-[#3d332e] shadow-[0_5px_12px_rgba(75,55,43,0.12)]`}
      style={{ backgroundColor: color }}
      aria-label={initials}
    >
      <span className="absolute -bottom-2 h-8 w-8 rounded-full bg-white/30" />
      <span className="relative">{initials}</span>
    </div>
  );
}

function TinyPlant({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 150 165" aria-hidden="true" className={className} fill="none">
      <path d="M79 159c2-35 0-67-11-97-7-20-18-35-35-45" stroke="#6c8767" strokeWidth="3" strokeLinecap="round" />
      <path d="M70 122c16-18 37-24 61-23-7 23-29 33-61 23Z" fill="#91a96f" />
      <path d="M61 86C38 83 19 70 13 49c23-3 43 10 48 37Z" fill="#e3bd7b" />
      <path d="M70 64C73 40 86 21 106 13c5 24-7 44-36 51Z" fill="#c2d39a" />
      <path d="M78 139c-19-15-40-16-56-7 13 19 35 21 56 7Z" fill="#d28b70" />
      <path d="M90 152H51c2-14 8-22 19-22s17 8 20 22Z" fill="#bf7659" />
      <path d="M55 152h31" stroke="#f4d5b2" strokeWidth="2" strokeLinecap="round" />
      <circle cx="67" cy="142" r="1.7" fill="#433630" />
      <circle cx="76" cy="142" r="1.7" fill="#433630" />
    </svg>
  );
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>("Home");
  const [matchIndex, setMatchIndex] = useState(0);
  const [toast, setToast] = useState("");
  const [showLogModal, setShowLogModal] = useState(false);
  const [sessionDone, setSessionDone] = useState(false);
  const [format, setFormat] = useState("Virtual");
  const [availability, setAvailability] = useState("Thursday, 4:30 PM");

  const currentMatch = matches[matchIndex % matches.length];
  const visibleTabTitle = useMemo(() => (activeTab === "Home" ? "Your growth space" : activeTab), [activeTab]);

  function flash(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  }

  function advanceMatch(action: "liked" | "passed") {
    flash(action === "liked" ? `Connection request sent to ${currentMatch.name}!` : "No problem — finding another great fit.");
    setMatchIndex((value) => value + 1);
  }

  async function completeSession() {
    const payload = {
      partnerName: currentMatch.name,
      skill: "Python fundamentals",
      role: "Learner",
      durationMinutes: 45,
      format,
    };
    try {
      await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // The UI stays optimistic when a local database is not available yet.
    }
    setSessionDone(true);
    setShowLogModal(false);
    flash("Session added to your Growth Portfolio · +35 points");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#e7edd9] text-[#3f3933] selection:bg-[#c6dca1]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-24 top-[14%] h-80 w-80 rounded-full bg-[#d1dfbd]/60 blur-3xl" />
        <div className="absolute -right-24 bottom-[-5%] h-96 w-96 rounded-full bg-[#efd9b9]/50 blur-3xl" />
        <svg className="absolute -left-6 top-24 h-[480px] w-[300px] opacity-35" viewBox="0 0 300 480" fill="none">
          <path d="M52 490C93 322 87 169 186 0" stroke="#93a779" strokeWidth="3" />
          <path d="M100 315c-50-9-82-41-100-81 55-12 94 28 100 81Z" fill="#a9bc8a" />
          <path d="M130 210c58-5 103-43 122-90-60-8-108 29-122 90Z" fill="#e4ca8d" />
          <path d="M157 109c-13-49 2-84 39-109 19 45 1 91-39 109Z" fill="#c3d59e" />
        </svg>
      </div>

      <section className="relative mx-auto min-h-screen max-w-[1490px] px-4 py-4 sm:px-7 sm:py-7 lg:px-10 lg:py-9">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-5 lg:grid-cols-[245px_minmax(0,1fr)_305px] lg:gap-6">
          <aside className="hidden h-[calc(100vh-72px)] min-h-[690px] flex-col rounded-[31px] border border-white/70 bg-[#fcf9ee]/80 p-5 shadow-[0_24px_70px_rgba(80,91,58,0.12)] backdrop-blur lg:flex">
            <div className="flex items-center gap-2.5 px-2 pb-9 pt-1">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#7f9e59] text-white shadow-[0_6px_15px_rgba(92,124,70,0.28)]"><Leaf size={21} strokeWidth={2.4} /></div>
              <span className="font-display text-[21px] font-bold tracking-[-0.07em] text-[#45413b]">SkillSprout</span>
            </div>

            <nav className="space-y-1.5" aria-label="Primary navigation">
              {navItems.map(({ label, icon: Icon }) => {
                const selected = activeTab === label;
                return (
                  <button
                    key={label}
                    onClick={() => { setActiveTab(label); flash(label === "Home" ? "Welcome home, Maya." : `${label} view is ready to explore.`); }}
                    className={`flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-left text-sm font-semibold transition ${selected ? "bg-[#b5ce85] text-[#31412a] shadow-[0_5px_12px_rgba(108,139,76,0.16)]" : "text-[#77736a] hover:bg-[#f1eddf] hover:text-[#48443d]"}`}
                  >
                    <Icon size={18} strokeWidth={selected ? 2.5 : 2} />
                    {label}
                    {label === "Portfolio" && <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-[#f1c952] px-1 text-[10px] font-extrabold text-[#58451b]">3</span>}
                  </button>
                );
              })}
            </nav>

            <div className="mt-auto rounded-[24px] bg-[#e6efd3] p-4">
              <div className="mb-3 flex items-center justify-between"><span className="text-xs font-bold text-[#58664a]">Monthly mission</span><Trophy size={16} className="text-[#d69a38]" /></div>
              <p className="font-display text-lg font-bold leading-tight text-[#43513a]">Share what you know.</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/70"><div className="h-full w-[62%] rounded-full bg-[#86a75c]" /></div>
              <p className="mt-2 text-[11px] font-medium text-[#6d7b5d]">3 of 5 sessions completed</p>
            </div>

            <button onClick={() => flash("Need a hand? Your school mentor can help.")} className="mt-4 flex items-center gap-2 px-2 text-xs font-semibold text-[#77736a] hover:text-[#45413b]"><CircleHelp size={16} /> Help & support</button>
          </aside>

          <section className="min-w-0">
            <header className="mb-5 flex items-center justify-between rounded-[25px] border border-white/75 bg-[#fcf9ee]/75 px-4 py-3 shadow-[0_15px_38px_rgba(88,91,64,0.08)] backdrop-blur sm:mb-6 sm:px-5 lg:rounded-none lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:shadow-none">
              <div className="flex items-center gap-3 lg:hidden">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#7f9e59] text-white"><Leaf size={18} /></div>
                <span className="font-display text-lg font-bold tracking-[-0.06em]">SkillSprout</span>
              </div>
              <div className="hidden lg:block">
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#89917b]">Tuesday, October 24</p>
                <h1 className="font-display mt-1 text-[26px] font-bold tracking-[-0.055em] text-[#45413b]">{visibleTabTitle}</h1>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => flash("You’re all caught up — no new notifications.")} aria-label="Notifications" className="relative grid h-10 w-10 place-items-center rounded-full bg-[#fbf8ef] text-[#756f65] shadow-sm transition hover:-translate-y-0.5"><Bell size={18} /><span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#de8971] ring-2 ring-[#fbf8ef]" /></button>
                <button onClick={() => flash("Maya’s profile is 84% complete.")} className="hidden items-center gap-2 rounded-full bg-[#dce7c9] py-1.5 pl-1.5 pr-3 text-xs font-bold text-[#526246] sm:flex"><Avatar initials="MC" color="#c69f89" size="sm" /> Maya</button>
              </div>
            </header>

            <div className="mb-5 rounded-[30px] border border-white/70 bg-[#fcf9ee]/95 p-5 shadow-[0_22px_55px_rgba(82,85,61,0.10)] sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-2"><span className="grid h-6 w-6 place-items-center rounded-lg bg-[#f3d78c] text-[#766025]"><Sparkles size={14} /></span><p className="text-xs font-bold uppercase tracking-[0.13em] text-[#8a877b]">Your learning rhythm</p></div>
                  <h2 className="font-display mt-2 text-[26px] font-bold tracking-[-0.055em] text-[#3f3b35] sm:text-[30px]">Hi Maya, grow a little today.</h2>
                  <p className="mt-1 text-sm text-[#767168]">One small session can unlock a big new perspective.</p>
                </div>
                <div className="flex shrink-0 items-center gap-2 rounded-2xl bg-[#e7efd8] p-2.5 text-[#637653]"><Flame className="fill-[#e69755] text-[#e69755]" size={21} /><span className="pr-1 text-sm font-bold">6 day streak</span></div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
                <div className="rounded-2xl bg-[#f4e5b4] px-3 py-3 sm:px-4"><p className="text-[11px] font-bold text-[#9a7e35]">SWAP POINTS</p><p className="mt-1 font-display text-xl font-bold text-[#594923]">240</p><p className="text-[11px] font-medium text-[#a2863b]">+35 this week</p></div>
                <div className="rounded-2xl bg-[#dce7c9] px-3 py-3 sm:px-4"><p className="text-[11px] font-bold text-[#6d8458]">HOURS GROWN</p><p className="mt-1 font-display text-xl font-bold text-[#435438]">12.5</p><p className="text-[11px] font-medium text-[#728662]">This semester</p></div>
                <div className="rounded-2xl bg-[#ede3dd] px-3 py-3 sm:px-4"><p className="text-[11px] font-bold text-[#956e61]">PEOPLE MET</p><p className="mt-1 font-display text-xl font-bold text-[#694c43]">18</p><p className="text-[11px] font-medium text-[#9f786b]">Across campus</p></div>
              </div>
            </div>

            <div className="grid gap-5 xl:grid-cols-[minmax(0,1.13fr)_minmax(270px,.87fr)]">
              <section className="rounded-[30px] border border-white/70 bg-[#fcf9ee]/95 p-5 shadow-[0_22px_55px_rgba(82,85,61,0.10)] sm:p-6">
                <div className="flex items-start justify-between">
                  <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a877b]">Made for you</p><h2 className="font-display mt-1 text-[22px] font-bold tracking-[-0.05em]">A great skill swap</h2></div>
                  <button onClick={() => { setActiveTab("Discover"); flash("Discovering skill matches near you."); }} className="flex items-center gap-1 text-xs font-bold text-[#789657] hover:text-[#526e36]">See all <ChevronRight size={15} /></button>
                </div>

                <div className="relative mt-5 overflow-hidden rounded-[25px] bg-[#e6efd4] p-5 sm:p-6">
                  <div className="absolute -right-4 -top-7 h-36 w-36 rounded-full bg-[#f4ddb4]/70" />
                  <div className="absolute -bottom-10 right-8 h-28 w-28 rounded-full bg-[#bdcf9a]/50" />
                  <div className="relative flex items-start justify-between"><div className="flex items-center gap-3"><Avatar initials={currentMatch.initials} color={currentMatch.color} size="lg" /><div><h3 className="font-display text-xl font-bold tracking-[-0.05em]">{currentMatch.name}</h3><p className="text-xs font-medium text-[#718063]">{currentMatch.detail}</p></div></div><span className="rounded-full bg-[#fbf8ef]/90 px-2.5 py-1 text-[11px] font-extrabold text-[#758c53]">{currentMatch.shared}</span></div>
                  <div className="relative mt-5 grid gap-2 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white/70 p-3"><p className="text-[10px] font-bold uppercase tracking-[0.11em] text-[#899576]">They can teach</p><p className="mt-1 text-sm font-bold text-[#4a5540]">{currentMatch.teach}</p></div>
                    <div className="rounded-2xl bg-white/70 p-3"><p className="text-[10px] font-bold uppercase tracking-[0.11em] text-[#b17d68]">They want to learn</p><p className="mt-1 text-sm font-bold text-[#654d43]">{currentMatch.needs}</p></div>
                  </div>
                  <div className="relative mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-[#6a765d]"><span className="flex items-center gap-1.5"><Clock3 size={14} /> {currentMatch.availability}</span><span className="flex items-center gap-1.5"><Video size={14} /> Virtual or in person</span></div>
                </div>

                <div className="mt-5 flex items-center justify-center gap-3">
                  <button onClick={() => advanceMatch("passed")} aria-label="Pass this match" className="grid h-12 w-12 place-items-center rounded-full border border-[#eadfd0] bg-white text-[#c78976] shadow-sm transition hover:-translate-y-1 hover:bg-[#fdf3ef]"><X size={21} strokeWidth={2.4} /></button>
                  <button onClick={() => advanceMatch("liked")} className="flex h-12 items-center gap-2 rounded-full bg-[#86a55e] px-5 text-sm font-bold text-white shadow-[0_8px_16px_rgba(100,137,75,0.30)] transition hover:-translate-y-1 hover:bg-[#74944e]"><Heart size={17} className="fill-white" /> Connect</button>
                  <button onClick={() => { setAvailability(currentMatch.availability); setFormat("Virtual"); setShowLogModal(true); }} aria-label="Plan a session" className="grid h-12 w-12 place-items-center rounded-full border border-[#eadfd0] bg-white text-[#79965a] shadow-sm transition hover:-translate-y-1 hover:bg-[#f5f9ed]"><CalendarDays size={20} /></button>
                </div>
              </section>

              <section className="rounded-[30px] border border-white/70 bg-[#fcf9ee]/95 p-5 shadow-[0_22px_55px_rgba(82,85,61,0.10)] sm:p-6">
                <div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a877b]">Today&apos;s sprout</p><h2 className="font-display mt-1 text-[22px] font-bold tracking-[-0.05em]">Your daily check-in</h2></div><button onClick={() => flash("Check-in reminder adjusted for tomorrow.")} className="text-[#9a968b] hover:text-[#565149]"><MoreHorizontal size={20} /></button></div>
                <div className="relative mt-5 overflow-hidden rounded-[24px] bg-[#f5eedf] p-5">
                  <div className="absolute -right-2 -top-2 h-28 w-28 rounded-full bg-[#d7e5b6] opacity-75" />
                  <TinyPlant className="absolute bottom-[-26px] right-[-7px] h-32 w-28 opacity-95" />
                  <div className="relative max-w-[58%]"><div className="grid h-9 w-9 place-items-center rounded-xl bg-[#b9cf89] text-white"><Leaf size={18} /></div><p className="mt-4 font-display text-[19px] font-bold leading-tight tracking-[-0.045em]">What do you feel ready to share today?</p><p className="mt-2 text-xs leading-relaxed text-[#797369]">A tiny thought is a great place to begin.</p></div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2"><button onClick={() => flash("Lovely — your confidence boost is noted!")} className="rounded-2xl bg-[#e5edd5] px-3 py-3 text-left transition hover:bg-[#d8e7c2]"><span className="block text-lg">✦</span><span className="mt-1 block text-xs font-bold text-[#596b4a]">Feeling ready</span></button><button onClick={() => flash("A gentle plan has been saved for you.")} className="rounded-2xl bg-[#f6e5d2] px-3 py-3 text-left transition hover:bg-[#f2d9c0]"><span className="block text-lg">♡</span><span className="mt-1 block text-xs font-bold text-[#8c6858]">Need a nudge</span></button></div>
              </section>
            </div>

            <section className="mt-5 rounded-[30px] border border-white/70 bg-[#fcf9ee]/95 p-5 shadow-[0_22px_55px_rgba(82,85,61,0.10)] sm:p-6">
              <div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a877b]">Your story in progress</p><h2 className="font-display mt-1 text-[22px] font-bold tracking-[-0.05em]">Growth Portfolio</h2></div><button onClick={() => { setActiveTab("Portfolio"); flash("Your shareable portfolio is ready."); }} className="rounded-full bg-[#f1eddc] px-3 py-2 text-xs font-bold text-[#6f735e] hover:bg-[#e8e2cd]">View all</button></div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <article className="flex items-center gap-3 rounded-2xl border border-[#eeeadf] bg-white/70 p-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#ece2c5] text-[#a57a2e]"><GraduationCap size={19} /></span><div><p className="text-sm font-bold">Python basics</p><p className="mt-0.5 text-[11px] text-[#8a857b]">Learned · 45 mins</p></div></article>
                <article className="flex items-center gap-3 rounded-2xl border border-[#eeeadf] bg-white/70 p-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#dce9d0] text-[#688454]"><HandHeart size={19} /></span><div><p className="text-sm font-bold">Guitar chords</p><p className="mt-0.5 text-[11px] text-[#8a857b]">Taught · 30 mins</p></div></article>
                <article className="flex items-center gap-3 rounded-2xl border border-[#eeeadf] bg-white/70 p-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#eee1e0] text-[#a27069]"><MessageCircle size={19} /></span><div><p className="text-sm font-bold">Interview prep</p><p className="mt-0.5 text-[11px] text-[#8a857b]">Practiced · 45 mins</p></div></article>
              </div>
            </section>
          </section>

          <aside className="hidden space-y-5 lg:block">
            <section className="rounded-[30px] border border-white/70 bg-[#fcf9ee]/90 p-5 shadow-[0_22px_55px_rgba(82,85,61,0.10)]">
              <div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a877b]">Community pulse</p><h2 className="font-display mt-1 text-[21px] font-bold tracking-[-0.05em]">Keep growing together</h2></div><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#f3dfaa] text-[#a67722]"><Trophy size={18} /></span></div>
              <div className="mt-5 rounded-[23px] bg-[#dce9c5] p-4"><div className="flex items-center justify-between"><p className="text-xs font-bold text-[#637853]">OCTOBER CHALLENGE</p><span className="rounded-full bg-white/60 px-2 py-1 text-[10px] font-bold text-[#72895d]">6 days left</span></div><p className="font-display mt-3 text-[18px] font-bold leading-tight tracking-[-0.045em] text-[#4f6043]">Teach 5 people a skill this month.</p><div className="mt-4 flex items-center gap-2"><div className="h-2 flex-1 overflow-hidden rounded-full bg-white/65"><div className="h-full w-3/5 rounded-full bg-[#85a75f]" /></div><span className="text-xs font-extrabold text-[#5b714b]">3/5</span></div></div>
              <button onClick={() => flash("Challenge details opened — you’re doing brilliantly!")} className="mt-4 w-full rounded-2xl bg-[#4c5942] py-3 text-sm font-bold text-white transition hover:bg-[#3d4b34]">Join the challenge</button>
            </section>

            <section className="rounded-[30px] border border-white/70 bg-[#fcf9ee]/90 p-5 shadow-[0_22px_55px_rgba(82,85,61,0.10)]"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a877b]">This week</p><h2 className="font-display mt-1 text-[21px] font-bold tracking-[-0.05em]">Your next steps</h2></div><button onClick={() => flash("Your calendar is open and ready.")} className="text-[#8ca06f]"><CalendarDays size={19} /></button></div><div className="mt-4 space-y-3"><button onClick={() => { setAvailability("Wednesday, 12:30 PM"); setShowLogModal(true); }} className="flex w-full items-center gap-3 text-left"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#f5e3cc] text-[#b97552]"><Clock3 size={16} /></span><span><span className="block text-xs font-bold">Watercolor with Iris</span><span className="mt-0.5 block text-[11px] text-[#8a857b]">Wed · 12:30 PM · 30 min</span></span></button><div className="h-px bg-[#eee9dd]" /><button onClick={() => flash("You have 3 people cheering you on.")} className="flex w-full items-center gap-3 text-left"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#e3ecd5] text-[#6d8c54]"><Users size={16} /></span><span><span className="block text-xs font-bold">3 new cheerleaders</span><span className="mt-0.5 block text-[11px] text-[#8a857b]">Your guitar lesson was loved</span></span></button></div></section>

            <section className="relative overflow-hidden rounded-[30px] bg-[#5a7350] p-5 text-white shadow-[0_20px_40px_rgba(73,99,62,0.20)]"><span className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-[#a9c785]/30" /><div className="relative"><div className="flex items-center gap-2 text-[#e5efcf]"><Star size={16} className="fill-[#e5efcf]" /><span className="text-xs font-bold">NEW BADGE</span></div><p className="font-display mt-3 text-xl font-bold tracking-[-0.05em]">Curious Connector</p><p className="mt-1 text-xs leading-relaxed text-[#e5ecd8]">Meet one more learning partner to unlock it.</p><button onClick={() => { setActiveTab("Community"); flash("One more connection unlocks your badge."); }} className="mt-4 flex items-center gap-1 text-xs font-bold text-[#fff3c9]">See your badges <ChevronRight size={14} /></button></div></section>
          </aside>
        </div>
      </section>

      <nav className="fixed bottom-4 left-1/2 z-20 flex w-[min(94vw,430px)] -translate-x-1/2 items-center justify-between rounded-[24px] border border-white/70 bg-[#fffcf3]/95 px-3 py-2 shadow-[0_14px_36px_rgba(66,77,50,0.20)] backdrop-blur lg:hidden" aria-label="Mobile navigation">
        {navItems.map(({ label, icon: Icon }) => <button key={label} onClick={() => { setActiveTab(label); flash(`${label} selected.`); }} className={`grid h-11 w-14 place-items-center rounded-2xl transition ${activeTab === label ? "bg-[#c4d99a] text-[#526d3e]" : "text-[#908c82]"}`} aria-label={label}><Icon size={20} strokeWidth={activeTab === label ? 2.5 : 2} /></button>)}
        <button onClick={() => { setShowLogModal(true); setAvailability("Choose a time"); }} className="-mt-7 grid h-14 w-14 place-items-center rounded-full bg-[#82a45d] text-white shadow-[0_7px_17px_rgba(84,123,57,0.38)]" aria-label="Log a session"><Plus size={26} /></button>
      </nav>

      {showLogModal && (
        <div className="fixed inset-0 z-30 grid place-items-end bg-[#394332]/30 p-3 backdrop-blur-[2px] sm:place-items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="session-title">
          <div className="w-full max-w-md rounded-[30px] bg-[#fffcf3] p-5 shadow-[0_26px_70px_rgba(44,53,37,0.26)] sm:p-6">
            <div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#86927b]">Growth Portfolio</p><h2 id="session-title" className="font-display mt-1 text-2xl font-bold tracking-[-0.055em]">Log a micro-session</h2></div><button onClick={() => setShowLogModal(false)} aria-label="Close dialog" className="grid h-9 w-9 place-items-center rounded-full bg-[#f1eddf] text-[#79746b]"><X size={18} /></button></div>
            <div className="mt-5 rounded-2xl bg-[#e7efd8] p-4"><p className="text-[11px] font-bold uppercase tracking-[0.13em] text-[#70845a]">LEARNING WITH</p><div className="mt-2 flex items-center gap-3"><Avatar initials={currentMatch.initials} color={currentMatch.color} /><div><p className="text-sm font-bold">{currentMatch.name}</p><p className="text-xs text-[#718064]">Python fundamentals · 45 minutes</p></div></div></div>
            <label className="mt-5 block text-xs font-bold text-[#676259]">When</label><button onClick={() => setAvailability(availability === "Thursday, 4:30 PM" ? "Friday, 3:00 PM" : "Thursday, 4:30 PM")} className="mt-2 flex w-full items-center justify-between rounded-2xl border border-[#e8e3d7] bg-white px-4 py-3 text-left text-sm font-semibold text-[#575149]"><span className="flex items-center gap-2"><CalendarDays size={17} className="text-[#839e62]" />{availability}</span><ChevronRight size={16} className="text-[#99938a]" /></button>
            <p className="mt-4 text-xs font-bold text-[#676259]">How will you meet?</p><div className="mt-2 grid grid-cols-2 gap-2"><button onClick={() => setFormat("Virtual")} className={`rounded-2xl border px-3 py-3 text-sm font-bold ${format === "Virtual" ? "border-[#9ebd78] bg-[#e7f0d7] text-[#5d7845]" : "border-[#e8e3d7] bg-white text-[#7c766c]"}`}><Video className="mr-1 inline" size={16} /> Virtual</button><button onClick={() => setFormat("In person")} className={`rounded-2xl border px-3 py-3 text-sm font-bold ${format === "In person" ? "border-[#9ebd78] bg-[#e7f0d7] text-[#5d7845]" : "border-[#e8e3d7] bg-white text-[#7c766c]"}`}><MapPin className="mr-1 inline" size={16} /> In person</button></div>
            <button onClick={completeSession} className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#506044] py-3.5 text-sm font-bold text-white shadow-[0_8px_16px_rgba(75,91,63,0.22)] hover:bg-[#404f35]"><Check size={17} /> Mark as complete</button>
          </div>
        </div>
      )}

      {toast && <div className="fixed bottom-24 left-1/2 z-40 w-[min(90vw,450px)] -translate-x-1/2 rounded-2xl bg-[#3f5036] px-4 py-3 text-center text-sm font-semibold text-white shadow-[0_15px_35px_rgba(42,57,33,0.3)] lg:bottom-7">{toast}</div>}
      {sessionDone && <span className="sr-only">Session saved</span>}
    </main>
  );
}
