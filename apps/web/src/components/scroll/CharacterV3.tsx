"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

interface CharacterV3Props {
  Icon: React.ComponentType<{ size?: number; color?: string }>;
  index: number;
  centerIndex: number;
  scrollYProgress: MotionValue<number>;
}

export function CharacterV3({ Icon, index, centerIndex, scrollYProgress }: CharacterV3Props) {
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 90, 0]);
  const rotate = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [-Math.abs(distanceFromCenter) * 20, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1]);

  return (
    <motion.div className="inline-block" style={{ x, rotate, y, scale, transformOrigin: "center" }}>
      <Icon size={48} color="#ffffff" />
    </motion.div>
  );
}
