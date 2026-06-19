"use client";

import StaggeredText from "@/components/react-bits/staggered-text";
import { cn } from "@/lib/utils";

type SegmentBy = "chars" | "words" | "lines";

/**
 * Scroll-triggered heading built on React Bits' StaggeredText, pre-tuned with
 * PJ's brand defaults so headings reveal consistently across the site.
 */
export function AnimatedHeading({
  text,
  as = "h2",
  className,
  center = false,
  segmentBy = "words",
  delay = 55,
  duration = 0.55,
  separator,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  center?: boolean;
  segmentBy?: SegmentBy;
  delay?: number;
  duration?: number;
  separator?: string;
}) {
  return (
    <StaggeredText
      text={text}
      as={as}
      segmentBy={segmentBy}
      separator={separator}
      delay={delay}
      duration={duration}
      easing="easeOut"
      blur
      className={cn(center && "justify-center text-center", className)}
    />
  );
}
