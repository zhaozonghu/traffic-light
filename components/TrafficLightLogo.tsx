interface TrafficLightLogoProps {
  size?: "sm" | "lg";
  animated?: boolean;
}

/** 红绿灯三色圆点 logo */
export default function TrafficLightLogo({
  size = "lg",
  animated = true,
}: TrafficLightLogoProps) {
  const dot = size === "lg" ? "h-4 w-4" : "h-2.5 w-2.5";
  const gap = size === "lg" ? "gap-2.5" : "gap-1.5";
  return (
    <span className={`inline-flex items-center ${gap}`} aria-hidden>
      <span
        className={`${dot} rounded-full bg-tl-red text-tl-red ${animated ? "animate-blink" : ""}`}
      />
      <span
        className={`${dot} rounded-full bg-tl-yellow text-tl-yellow ${animated ? "animate-blink" : ""}`}
        style={{ animationDelay: "0.8s" }}
      />
      <span
        className={`${dot} rounded-full bg-tl-green text-tl-green ${animated ? "animate-blink" : ""}`}
        style={{ animationDelay: "1.6s" }}
      />
    </span>
  );
}
