"use client";

const STATS = [
  { value: "6", label: "AI Models" },
  { value: "∞", label: "Requests" },
  { value: "$0", label: "Forever Free" },
  { value: "No", label: "Credit Card" },
];

export default function StatsSection() {
  return (
    <div
      className="max-w-2xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden border"
      style={{ borderColor: "hsl(228, 10%, 13%)", background: "hsl(228, 10%, 11%)" }}
    >
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className="py-6 px-4 flex flex-col items-center"
          style={{ background: "hsl(228, 16%, 8%)" }}
        >
          <span className="text-2xl font-bold font-mono" style={{ color: "hsl(38, 100%, 58%)" }}>
            {stat.value}
          </span>
          <span className="text-xs mt-1" style={{ color: "hsl(228, 6%, 44%)" }}>
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
