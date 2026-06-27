"use client";
import { TRAVEL_CUISINES } from "../lib/mealData";

const COUNTRY_COLORS: Record<string, string> = {
  Japan: "linear-gradient(135deg, #0ea5e9, #2563eb)",
  India: "linear-gradient(135deg, #db2777, #be185d)",
  Mexico: "linear-gradient(135deg, #f59e0b, #d97706)",
  Thailand: "linear-gradient(135deg, #16a34a, #15803d)",
  Italy: "linear-gradient(135deg, #ef4444, #b91c1c)",
  Turkey: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
};

const COUNTRY_CODES: Record<string, string> = {
  Japan: "JP", India: "IN", Mexico: "MX", Thailand: "TH", Italy: "IT", Turkey: "TR",
};

export function TravelTab() {
  const countries = Array.from(new Set(TRAVEL_CUISINES.map((c) => c.country)));

  return (
    <div className="max-w-md mx-auto px-4 pt-6 pb-28" style={{ background: "var(--color-bg)" }}>
      <h1 className="font-display text-2xl font-black" style={{ color: "var(--leaf-deep)" }}>Travel</h1>
      <p className="text-sm mb-5" style={{ color: "var(--color-muted-foreground)" }}>
        Eat the world from your kitchen ✈️
      </p>

      {countries.map((country) => {
        const dishes = TRAVEL_CUISINES.filter((c) => c.country === country);
        return (
          <div key={country} className="mb-6">
            <div
              className="rounded-2xl px-4 py-3 text-white flex items-center gap-3 mb-3"
              style={{ background: COUNTRY_COLORS[country] || "var(--gradient-cta)" }}
            >
              <span className="font-extrabold text-sm bg-white/20 rounded-lg px-2 py-1">
                {COUNTRY_CODES[country] || country.slice(0, 2).toUpperCase()}
              </span>
              <div>
                <p className="font-display font-bold text-base leading-tight">{country}</p>
                <p className="text-[11px] uppercase tracking-wide opacity-90">{dishes[0]?.tags[0] || "Local Favorite"}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {dishes.map((dish) => (
                <div key={dish.id} className="card-soft overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.dish}
                    className="w-full h-24 object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/400x300/fdfbf3/9a9482?text=${encodeURIComponent(dish.dish)}`; }}
                  />
                  <div className="p-2.5">
                    <p className="text-xs font-bold text-gray-800 truncate">{dish.dish}</p>
                    <p className="text-[11px]" style={{ color: "var(--color-muted-foreground)" }}>{dish.city}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
