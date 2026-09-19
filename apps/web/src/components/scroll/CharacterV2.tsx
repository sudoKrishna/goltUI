"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

interface CharacterV2Props {
  Icon: React.ComponentType<{ size?: number; color?: string }>;
  index: number;
  centerIndex: number;
  scrollYProgress: MotionValue<number>;
}

export function CharacterV2({ Icon, index, centerIndex, scrollYProgress }: CharacterV2Props) {
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [Math.abs(distanceFromCenter) * 50, 0]);

  return (
    <motion.div className="inline-block" style={{ x, y, scale, transformOrigin: "center" }}>
      <Icon size={48} color="#ffffff" />
    </motion.div>
  );
}
