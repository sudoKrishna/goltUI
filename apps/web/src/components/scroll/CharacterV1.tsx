"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

interface CharacterV1Props {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: MotionValue<number>;
}

export function CharacterV1({ char, index, centerIndex, scrollYProgress }: CharacterV1Props) {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);

  return (
    <motion.span
      className={`inline-block text-white ${isSpace ? "w-4" : ""}`}
      style={{ x, rotateX }}
    >
      {char}
    </motion.span>
  );
}
