import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import "./ElegantQuote.css";

export default function ElegantQuote() {
  const containerRef = useRef<HTMLElement>(null);

  // Mapeia o scroll na seção atual
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "center center"],
  });

  // Movimento de entrada incrivelmente suave
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <section ref={containerRef} className="elegant-quote-section">
      {/* Uma luz de fundo muito sutil que "respira" */}
      <div className="elegant-aura" />

      <motion.div
        className="elegant-quote-content"
        style={{ y, opacity, scale }}
      >
        <div className="quote-mark">“</div>
        <h3 className="quote-text">
          Nascer uma mãe é um processo tão profundo quanto nascer um bebê. Exige
          tempo, escuta e, acima de tudo, muito acolhimento.
        </h3>
        <div className="quote-author">— O vínculo começa aqui</div>
      </motion.div>
    </section>
  );
}
