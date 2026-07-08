type Props = {
  type:
    | "research-supported"
    | "experimental"
    | "theoretical"
    | "experiential";
};

const LABELS: Record<Props["type"], string> = {
  "research-supported": "Research-Supported",
  experimental: "Experimental",
  theoretical: "Theoretical",
  experiential: "Experiential",
};

const COLORS: Record<Props["type"], string> = {
  "research-supported":
    "border-emerald-400/40 text-emerald-300 bg-emerald-500/10",
  experimental:
    "border-cyan-400/40 text-cyan-300 bg-cyan-500/10",
  theoretical:
    "border-indigo-400/40 text-indigo-300 bg-indigo-500/10",
  experiential:
    "border-amber-400/40 text-amber-300 bg-amber-500/10",
};

export default function FrequencyBadge({ type }: Props) {
  return (
    <span
      className={`
        rounded-full
        px-3
        py-0.5
        text-[10px]
        tracking-wide
        uppercase
        border
        ${COLORS[type]}
      `}
    >
      {LABELS[type]}
    </span>
  );
}
