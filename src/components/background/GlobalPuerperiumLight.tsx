import { motion, useScroll, useTransform } from "framer-motion";

export default function GlobalPuerperiumLight() {
  const { scrollYProgress } = useScroll();

  const opacity = useTransform(scrollYProgress, [0.3, 0.42, 0.6], [0, 1, 0]);

  const y = useTransform(scrollYProgress, [0.3, 0.6], [0, 120]);

  return (
    <motion.div
      className="global-puerperium-light"
      style={{
        opacity,
        y,
      }}
    >
      <div className="window-projection-realistic">
        {/* ARCO */}
        <div className="window-arch-realistic" />

        {/* DIVISÓRIAS */}
        <div className="window-divider vertical left" />
        <div className="window-divider vertical center" />
        <div className="window-divider vertical right" />

        <div className="window-divider horizontal top" />
        <div className="window-divider horizontal middle" />
      </div>
    </motion.div>
  );
}
