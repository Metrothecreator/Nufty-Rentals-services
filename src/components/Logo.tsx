const GOLD = "#ffc619";

/**
 * Cubix brand mark — recreation of the described logo:
 * white lowercase "cubix" wordmark + a neon golden-yellow isometric
 * hexagon/cube icon, housed in a dark circular badge with a double golden rim.
 */
export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#0e0d0b]"
      style={{
        width: size,
        height: size,
        boxShadow: `0 0 0 1.5px ${GOLD}, 0 0 0 4px rgba(255,198,25,0.28), 0 0 18px rgba(255,198,25,0.45)`,
      }}
    >
      <svg viewBox="0 0 64 64" width={size * 0.62} height={size * 0.62} aria-hidden="true">
        {/* isometric hexagon outline */}
        <polygon
          points="32,3 57,17.5 57,46.5 32,61 7,46.5 7,17.5"
          fill="none"
          stroke={GOLD}
          strokeWidth="3.2"
          strokeLinejoin="round"
        />
        {/* inner cube / cross structure */}
        <line x1="32" y1="32" x2="32" y2="3" stroke={GOLD} strokeWidth="3" strokeLinecap="round" />
        <line x1="32" y1="32" x2="7" y2="17.5" stroke={GOLD} strokeWidth="3" strokeLinecap="round" />
        <line x1="32" y1="32" x2="7" y2="46.5" stroke={GOLD} strokeWidth="3" strokeLinecap="round" />
        {/* inner small hex */}
        <polygon
          points="32,18 44,25 44,39 32,46 20,39 20,25"
          fill="none"
          stroke={GOLD}
          strokeWidth="2"
          strokeLinejoin="round"
          opacity="0.9"
        />
      </svg>
    </span>
  );
}

export default function Logo({
  size = 40,
  dark = true,
}: {
  size?: number;
  dark?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-3">
      <LogoMark size={size} />
      <span
        className="font-display text-[20px] font-bold lowercase leading-none tracking-[0.01em]"
        style={{ color: dark ? "#ffffff" : "#0e0d0b", textShadow: dark ? "0 1px 6px rgba(0,0,0,0.35)" : "none" }}
      >
        cubix
      </span>
    </span>
  );
}
