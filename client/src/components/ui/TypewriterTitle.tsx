import { useEffect, useMemo, useState } from "react";

type FontStyle = React.CSSProperties & {
  fontFamily?: string;
  fontWeight?: number | string;
  fontSize?: number | string;
  letterSpacing?: number | string;
  lineHeight?: number | string;
};

type TransitionValue = {
  type?: string;
  stiffness?: number;
  damping?: number;
  mass?: number;
  duration?: number;
  delay?: number;
  ease?: string | number[];
  staggerChildren?: number;
};

export type TypewriterTitleProps = {
  prefix?: string;
  texts?: string[];
  font?: FontStyle;
  fontVariant?: "tech" | "nothing" | "dot";
  cursorColor?: string;
  cursorBorderColor?: string;
  cursorWidth?: number;
  cursorHeight?: number;
  deletingSpeed?: number;
  transition?: TransitionValue;
  className?: string;
};

const DEFAULT_TEXTS = ["TITLE SEQUENCE"];

const DEFAULT_TRANSITION: TransitionValue = {
  type: "tween",
  duration: 0.065,
  delay: 2.2,
  ease: "linear",
};

const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

type Phase = "typing" | "holding" | "deleting";

export default function TypewriterTitle(props: TypewriterTitleProps) {
  const {
    prefix = "",
    texts = DEFAULT_TEXTS,
    fontVariant = "tech",
    cursorColor = "#3b82f6",
    cursorBorderColor = "#6366f1",
    cursorWidth = 8,
    cursorHeight = 36,
    deletingSpeed = 35,
    transition = DEFAULT_TRANSITION,
    className = "",
  } = props;

  const fontClass = fontVariant === "nothing" ? "font-nothing" : fontVariant === "dot" ? "font-dot" : "font-tech";

  const typingSpeed = Math.max(
    20,
    Math.round((transition.duration ?? DEFAULT_TRANSITION.duration ?? 0.065) * 1000)
  );
  const holdDuration = transition.delay ?? DEFAULT_TRANSITION.delay ?? 2.2;

  const safeTexts = useMemo(() => {
    const list = (texts ?? DEFAULT_TEXTS)
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
    return list.length > 0 ? list : DEFAULT_TEXTS;
  }, [texts]);

  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [cursorOn, setCursorOn] = useState(true);

  const currentText = safeTexts[textIndex] ?? safeTexts[0] ?? "";
  const displayed = currentText.slice(0, charIndex);

  const fontFamily =
    fontVariant === "nothing"
      ? "'DotGothic16', monospace"
      : fontVariant === "dot"
      ? "'Silkscreen', monospace"
      : "'Space Grotesk', sans-serif";

  useEffect(() => {
    setTextIndex(0);
    setCharIndex(0);
    setPhase("typing");
    setCursorOn(true);
  }, [safeTexts]);

  useEffect(() => {
    if (phase !== "holding") {
      setCursorOn(true);
      return;
    }

    const id = window.setInterval(() => {
      setCursorOn((prev) => !prev);
    }, 500);

    return () => window.clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setCharIndex(currentText.length);
      setPhase("holding");
      return;
    }

    let timer: ReturnType<typeof setTimeout>;
    const holdMs = holdDuration * 1000;

    if (phase === "typing") {
      if (charIndex < currentText.length) {
        timer = setTimeout(() => {
          setCharIndex((i) => i + 1);
        }, typingSpeed);
      } else {
        timer = setTimeout(() => setPhase("holding"), 0);
      }
    } else if (phase === "holding") {
      timer = setTimeout(() => {
        setPhase("deleting");
      }, holdMs);
    } else if (phase === "deleting") {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setCharIndex((i) => i - 1);
        }, deletingSpeed);
      } else {
        timer = setTimeout(() => {
          setTextIndex((i) => (i + 1) % safeTexts.length);
          setPhase("typing");
        }, 0);
      }
    }

    return () => clearTimeout(timer);
  }, [
    phase,
    charIndex,
    currentText,
    typingSpeed,
    deletingSpeed,
    holdDuration,
    safeTexts.length,
  ]);

  return (
    <div
      className={`grid place-items-center w-full mb-8 min-h-[3.5rem] md:min-h-[4.5rem] relative ${className}`}
      style={{ contain: "layout style" }}
    >
      {/* Invisible Ghost layer reserving full layout space across all titles */}
      <div
        className="col-start-1 row-start-1 grid place-items-center invisible pointer-events-none select-none"
        aria-hidden="true"
      >
        {safeTexts.map((text, idx) => (
          <div
            key={idx}
            className={`col-start-1 row-start-1 text-4xl md:text-5xl font-extrabold ${fontClass} text-center flex items-center justify-center flex-wrap leading-tight select-none`}
            style={{ fontFamily }}
          >
            {prefix && <span className="mr-2">{prefix}</span>}
            <span>{text}</span>
            <span
              style={{
                display: "inline-block",
                width: cursorWidth,
                height: cursorHeight,
                marginLeft: "0.12em",
                verticalAlign: "-0.05em",
              }}
            />
          </div>
        ))}
      </div>

      {/* Active Visible Typewriter Title layer */}
      <div
        className={`col-start-1 row-start-1 text-4xl md:text-5xl font-extrabold ${fontClass} text-center flex items-center justify-center flex-wrap leading-tight select-none`}
        style={{ fontFamily }}
        aria-label={`${prefix}${currentText}`}
      >
        {prefix && (
          <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent mr-2">
            {prefix}
          </span>
        )}

        {/* Gradient Animated Custom Font Text */}
        <span className="relative inline-flex items-center">
          <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
            {displayed || "\u00A0"}
          </span>

          {/* Animated Glowing Liquid Cursor */}
          <span
            aria-hidden="true"
            style={{
              display: "inline-block",
              boxSizing: "border-box",
              width: cursorWidth,
              height: cursorHeight,
              marginLeft: "0.12em",
              verticalAlign: "-0.05em",
              backgroundColor: cursorColor,
              border: `1.5px solid ${cursorBorderColor}`,
              borderRadius: 3,
              boxShadow: `0 0 12px ${cursorColor}, 0 0 4px ${cursorBorderColor}`,
              opacity: cursorOn ? 1 : 0,
              transition: "opacity 0.15s ease",
              willChange: "opacity",
            }}
          />
        </span>
      </div>
    </div>
  );
}

