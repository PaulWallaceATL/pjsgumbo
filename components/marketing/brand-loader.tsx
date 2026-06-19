"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

import { SITE } from "@/lib/content/site";

const TAGLINE = "Atlanta Made. Cajun Soul.";
const MIN_VISIBLE_MS = 1900;
const HARD_CAP_MS = 4500;

/**
 * Full-screen branded intro loader. Renders immediately (covers content before
 * the page paints) on every full page load / reload, waits for the window to
 * finish loading, then peels away to reveal the site. Always starts the page
 * scrolled to the top.
 */
export function BrandLoader() {
  // Start visible so the overlay is present in the very first paint (no flash
  // of the page before the loader appears).
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Always (re)load at the top of the page.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    const start = Date.now();
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      const wait = Math.max(0, MIN_VISIBLE_MS - (Date.now() - start));
      window.setTimeout(() => {
        setShow(false);
        document.body.style.overflow = "";
      }, wait);
    };

    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish);
    const cap = window.setTimeout(finish, HARD_CAP_MS);

    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(cap);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="pjs-brand-loader"
          aria-hidden
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background:
              "radial-gradient(125% 125% at 50% 28%, #fdfbf6 0%, #f3e8cf 46%, #9c6a3c 118%)",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-102%" }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Rising simmer bubbles */}
          <div className="pointer-events-none absolute inset-0">
            {[
              { left: "38%", delay: "0s", size: 8 },
              { left: "46%", delay: "0.6s", size: 6 },
              { left: "55%", delay: "0.3s", size: 10 },
              { left: "62%", delay: "0.9s", size: 7 },
            ].map((b) => (
              <span
                key={b.left}
                className="pjs-rise bg-roux-300/50 absolute bottom-[42%] block rounded-full"
                style={{
                  left: b.left,
                  width: b.size,
                  height: b.size,
                  animationDelay: b.delay,
                }}
              />
            ))}
          </div>

          <div className="relative flex flex-col items-center">
            {/* Steam */}
            <div className="absolute -top-9 left-1/2 flex -translate-x-1/2 gap-2">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="pjs-steam bg-roux-400/40 block h-10 w-1.5 rounded-full blur-[2px]"
                  style={{ animationDelay: `${i * 0.35}s` }}
                />
              ))}
            </div>

            {/* Logo + sweeping ring */}
            <div className="relative grid size-32 place-items-center">
              <svg
                className="pjs-spin absolute inset-0 size-full"
                viewBox="0 0 120 120"
                fill="none"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="55"
                  stroke="rgba(164,38,44,0.14)"
                  strokeWidth="4"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="55"
                  stroke="#a4262c"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="86 260"
                />
              </svg>
              <motion.div
                className="pjs-bob"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src={SITE.logo}
                  alt="PJ's Gumbo"
                  width={104}
                  height={104}
                  priority
                  className="size-24 rounded-full object-contain drop-shadow-lg"
                />
              </motion.div>
            </div>

            {/* Tagline, letter by letter */}
            <div className="mt-9 flex overflow-hidden">
              {TAGLINE.split("").map((ch, i) => (
                <motion.span
                  key={`${ch}-${i}`}
                  className="font-display text-roux-800 text-lg font-bold tracking-tight sm:text-xl"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.35 + i * 0.035,
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {ch === " " ? "\u00A0" : ch}
                </motion.span>
              ))}
            </div>

            <motion.p
              className="text-roux-600/70 mt-3 text-xs font-medium tracking-[0.22em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              Simmering something good
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
