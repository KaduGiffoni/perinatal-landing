import { motion, useScroll, useTransform } from "framer-motion";

export default function CinematicSunlight() {
  const { scrollYProgress } = useScroll();

  /*
    A luz aparece só na área do puerpério
  */

  const opacity = useTransform(scrollYProgress, [0.28, 0.4, 0.62], [0, 0.9, 0]);

  return (
    <motion.div
      className="cinematic-sunlight"
      style={{
        opacity,
      }}
    >
      {/* GLOW PRINCIPAL */}
      <div className="sunlight-core" />

      {/* SOMBRAS DAS DIVISÓRIAS */}
      <div className="sunlight-shadow shadow-1" />
      <div className="sunlight-shadow shadow-2" />
      <div className="sunlight-shadow shadow-3" />

      {/* LINHAS HORIZONTAIS */}
      <div className="sunlight-horizontal horizontal-1" />
      <div className="sunlight-horizontal horizontal-2" />
    </motion.div>
  );
}
