import { motion, useScroll, useTransform } from "framer-motion";

export default function PuerperiumLight() {
  const { scrollYProgress } = useScroll();

  const y = useTransform(scrollYProgress, [0.2, 0.6], [0, 250]);

  const opacity = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.5],
    [0, 0.18, 0],
  );

  const rotate = useTransform(scrollYProgress, [0.2, 0.6], [-18, -10]);

  return (
    <motion.div
      className="puerperium-light-wrapper"
      style={{
        y,
        opacity,
        rotate,
      }}
    >
      <div className="puerperium-window">
        <div className="window-arch" />

        <div className="window-line vertical v1" />
        <div className="window-line vertical v2" />

        <div className="window-line horizontal h1" />
        <div className="window-line horizontal h2" />
      </div>
    </motion.div>
  );
}
