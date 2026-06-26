"use client";
import { useState } from "react";
import { useApp } from "../AppContext";
import { User, Droplets, Target, Scale, Edit2, Check, Sparkles, Globe, Trophy, ChevronRight } from "lucide-react";

const PLANS = [
  {
    id: "free",
    name: "Free Trial",
    price: "$0",
    period: "7 days",
    features: ["Everything unlocked", "Cancel anytime", "No credit card"],
    cta: "Current plan",
    style: "soft" as const,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$12",
    period: "/month",
    badge: "MOST POPULAR",
    features: [
      "Unlimited meal plans",
      "Unlimited regenerations",
      "Grocery lists & meal prep",
      "Voice recipes",
      "Fridge scan — 3/week",
    ],
    cta: "Upgrade to Pro",
    style: "cta" as const,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$20",
    period: "/month",
    features: [
      "Everything in Pro, plus:",
      "Unlimited Fridge scans",
      "Priority AI · faster results",
      "Advanced nutrition insights",
      "Meal prep planner & family plans",
      "Early access features",
    ],
    cta: "Go Premium",
    style: "iq" as const,
  },
];

const COMING_SOON = [
  { icon: Globe, title: "Travel Mode", desc: "Eat well anywhere" },
  { icon: Target, title: "Smart Goals", desc: "Timeline-based plans" },
  { icon: Trophy, title: "Challenges", desc: "7-day high protein, no sugar week" },
  { icon: Droplets, title: "Hydration Coach", desc: "Water + electrolytes" },
];

export function ProfileTab() {
  const { profile, setProfile, hydrationLog, addWater } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [activePlan, setActivePlan] = useState("free");
  const [editForm, setEditForm] = useState({ name: profile.name });

  const handleSave = () => {
    setProfile({ ...profile, name: editForm.name });
    setIsEditing(false);
  };

  return (
    <div className="max-w-md mx-auto px-4 pt-6 pb-24" style={{ background: "var(--color-bg)" }}>
      {/* Avatar & Name */}
      <div className="flex items-center gap-4 mb-6">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
          style={{ background: "var(--brand-soft)" }}
        >
          <User size={28} style={{ color: "var(--brand-deep)" }} />
        </div>
        <div className="flex-1 min-w-0">
          {!isEditing ? (
            <>
              <div className="text-xl font-extrabold truncate">{profile.name || "Friend"}</div>
              <div className="text-xs" style={{ color: "var(--color-muted-foreground)" }}>
                Goal: {profile.healthGoals?.[0] || "—"}
              </div>
            </>
          ) : (
            <input
              value={editForm.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditForm({ name: e.target.value })}
              className="w-full p-2 rounded-xl border-2 border-gray-200 font-bold text-sm outline-none"
            />
          )}
        </div>
        <button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1"
          style={{ background: "var(--brand-soft)", color: "var(--brand-deep)" }}
        >
          {isEditing ? <Check size={12} /> : <Edit2 size={12} />}
          {isEditing ? "Save" : "Edit quiz"}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="card-soft p-4">
          <div className="flex items-center gap-2 mb-2">
            <Scale size={16} className="text-blue-500" />
            <span className="text-xs font-semibold" style={{ color: "var(--color-muted-foreground)" }}>Weight</span>
          </div>
          <p className="text-sm font-bold text-gray-800">
            {profile.currentWeight ? `${profile.currentWeight} ${profile.weightUnit}` : "Not set"}
          </p>
        </div>
        <div className="card-soft p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target size={16} className="text-purple-500" />
            <span className="text-xs font-semibold" style={{ color: "var(--color-muted-foreground)" }}>Target</span>
          </div>
          <p className="text-sm font-bold text-gray-800">
            {profile.targetWeight ? `${profile.targetWeight} ${profile.weightUnit}` : "Not set"}
          </p>
        </div>
      </div>

      {/* Hydration */}
      <div className="card-soft p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Droplets size={16} className="text-blue-500" />
            <span className="text-sm font-semibold text-gray-700">Daily Hydration</span>
          </div>
          <span className="text-xs text-gray-500">{hydrationLog.glasses}/{hydrationLog.target}</span>
        </div>
        <div className="flex gap-2 mb-3">
          {Array.from({ length: hydrationLog.target }, (_, i: number) => (
            <div key={i} className={i < hydrationLog.glasses ? "flex-1 h-8 rounded-lg bg-blue-400" : "flex-1 h-8 rounded-lg bg-blue-100"} />
          ))}
        </div>
        <button
          onClick={addWater}
          disabled={hydrationLog.glasses >= hydrationLog.target}
          className="w-full py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-semibold disabled:opacity-50"
        >
          + Add Glass
        </button>
      </div>

      {/* Pricing */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles size={16} style={{ color: "var(--accent-pink)" }} />
          <h2 className="text-lg font-extrabold">Pricing</h2>
        </div>
        <p className="text-xs mb-3" style={{ color: "var(--color-muted-foreground)" }}>
          7-day free trial — then pick your plan.
        </p>
        <div className="space-y-3">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className="relative rounded-2xl p-5 border-2"
              style={
                plan.style === "cta"
                  ? { background: "var(--color-card)", borderColor: "transparent", backgroundImage: "linear-gradient(white,white), var(--gradient-cta)", backgroundOrigin: "border-box", backgroundClip: "padding-box, border-box", boxShadow: "var(--shadow-cta)" }
                  : { background: plan.style === "soft" ? "var(--brand-soft)" : "var(--color-card)", borderColor: "var(--color-border)", boxShadow: "var(--shadow-card)" }
              }
            >
              {plan.badge && (
                <span
                  className="absolute -top-2 right-4 text-[10px] font-extrabold tracking-wider text-white px-2 py-0.5 rounded-full"
                  style={{ background: "var(--gradient-cta)" }}
                >
                  {plan.badge}
                </span>
              )}
              <div className="flex items-baseline justify-between">
                <div className="font-extrabold text-lg">{plan.name}</div>
                <div className="text-right">
                  <span className="text-2xl font-extrabold">{plan.price}</span>
                  <span className="text-xs" style={{ color: "var(--color-muted-foreground)" }}> {plan.period}</span>
                </div>
              </div>
              <ul className="mt-3 space-y-1.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check size={14} className="mt-0.5 shrink-0" style={{ color: "var(--brand-deep)" }} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setActivePlan(plan.id)}
                disabled={activePlan === plan.id && plan.id === "free"}
                className="mt-4 w-full py-3 rounded-full text-sm font-extrabold text-white disabled:opacity-60"
                style={{ background: plan.style === "iq" ? "var(--gradient-iq)" : plan.style === "cta" ? "var(--gradient-cta)" : "var(--brand-deep)" }}
              >
                {activePlan === plan.id ? "Current plan" : plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Coming soon */}
      <div className="mb-6">
        <h2 className="text-lg font-extrabold mb-3">Coming soon</h2>
        <div className="grid grid-cols-2 gap-3">
          {COMING_SOON.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card-soft p-3">
              <div className="size-9 rounded-xl flex items-center justify-center" style={{ background: "var(--brand-soft)", color: "var(--brand-deep)" }}>
                <Icon size={18} />
              </div>
              <div className="mt-2 font-bold text-sm">{title}</div>
              <div className="text-[11px]" style={{ color: "var(--color-muted-foreground)" }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings list */}
      <div className="card-soft divide-y divide-gray-100">
        {["Preferences", "Subscription", "Notifications", "Units", "Privacy", "Logout"].map((item) => (
          <button key={item} className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold">
            <span>{item}</span>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
        ))}
      </div>
    </div>
  );
}
