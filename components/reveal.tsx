"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "left" | "right" | "up";

const offsets: Record<Direction, { x: number; y: number }> = {
  left: { x: -56, y: 0 },
  right: { x: 56, y: 0 },
  up: { x: 0, y: 32 },
};

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const offset = reduceMotion ? { x: 0, y: 0 } : offsets[direction];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
