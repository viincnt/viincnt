"use client";

import { MotionConfig, motion } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export function Reveal({
  children,
  delay = 0,
  className,
  eager = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  eager?: boolean;
}) {
  const viewProps = eager
    ? {}
    : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "0px 0px -8% 0px" } };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={eager ? { opacity: 1, y: 0 } : undefined}
      {...viewProps}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Wipes content in using overflow+transform (GPU-composited, no clip-path). */
export function Unveil({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <motion.div
        className="size-full"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, ease }}
      >
        <motion.div
          className="size-full"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.7, ease }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}

export function Pop({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.85, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 24, delay }}
    >
      {children}
    </motion.div>
  );
}

export function LiveDot() {
  return (
    <span aria-hidden className="relative inline-flex size-2">
      <motion.span
        className="bg-clay absolute inset-0 rounded-full"
        animate={{ scale: [1, 2.6], opacity: [0.55, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
      />
      <span className="bg-clay relative inline-flex size-2 rounded-full" />
    </span>
  );
}
