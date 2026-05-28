import ParticleScene from "./components/particle-system/ParticleScene";
import SceneSection from "./components/sections/SceneSection";
import AmbientBackground from "./components/background/AmbientBackground";
import SmoothScroll from "./components/SmoothScroll";
import FadeText from "./components/ui/FadeText";

import "./App.css";
import PuerperiumLight from "./components/background/PuerperiumLight";

export default function App() {
  return (
    <div className="app-shell">
      <SmoothScroll />

      {/* FUNDO */}
      <AmbientBackground />

      {/* SOMBRA CINEMATOGRÁFICA */}
      <div className="cinematic-shadow" />

      {/* TEXTURA */}
      <div className="noise-overlay" />

      {/* LUZ */}
      <div className="window-light-wrapper">
        <div className="window-light" />
      </div>

      {/* PARTÍCULAS */}
      <div className="particle-layer">
        <ParticleScene />
      </div>

      {/* HEADER */}
      <header className="main-header">
        <span>Psicologia Perinatal</span>

        <span>Amanda Fonseca</span>
      </header>

      <main className="main-content">
        {/* HERO */}
        <SceneSection theme="intro">
          <section className="hero-section">
            <div className="floating-phrase">
              você não precisa passar por isso sozinha
            </div>

            <div className="hero-content">
              <div className="hero-badge">acolhimento emocional materno</div>

              <FadeText>
                <h1 className="hero-title">
                  Existe uma nova versão
                  <br />
                  <span>de você nascendo.</span>
                </h1>
              </FadeText>

              <p className="hero-description">
                A maternidade muda o corpo, os pensamentos, os medos e a forma
                como você enxerga a si mesma. Você não precisa atravessar tudo
                isso sozinha.
              </p>

              <div className="hero-actions">
                <a href="#contato" className="primary-button">
                  Agendar acolhimento
                </a>

                <button className="secondary-button">Conhecer abordagem</button>
              </div>
            </div>
          </section>
        </SceneSection>

        <div className="editorial-line" />

        {/* GESTAÇÃO */}
        <SceneSection theme="pregnant">
          <section className="content-section">
            <div className="content-grid">
              <div>
                <span className="section-label">Gestação</span>

                <h2 className="section-title">
                  Gestar também é atravessar mudanças invisíveis.
                </h2>

                <p className="section-description">
                  Medos, ansiedade, culpa, cobranças, inseguranças e mudanças
                  emocionais profundas. Nem toda transformação aparece no corpo.
                </p>
              </div>

              <div className="glass-visual">
                <div className="glass-orb orb-1" />
                <div className="glass-orb orb-2" />
              </div>
            </div>
          </section>
        </SceneSection>

        <div className="editorial-line" />

        {/* PUERPÉRIO */}
        <SceneSection theme="transition">
          <section className="center-section">
            <PuerperiumLight />

            <span className="section-label">Puerpério</span>

            <h2 className="center-title">
              O vínculo começa muito antes do nascimento.
            </h2>

            <p className="center-description">
              Acolhimento emocional para prevenção da depressão pós-parto,
              fortalecimento da identidade feminina e reconstrução emocional.
            </p>
          </section>
        </SceneSection>

        <div className="editorial-line" />

        {/* SOBRE */}
        <SceneSection theme="mother">
          <section className="about-section">
            <div className="about-card">
              <div className="about-content">
                <span className="section-label">A profissional</span>

                <h2 className="section-title">
                  Muito prazer,
                  <br />
                  sou Amanda.
                </h2>

                <p className="section-description">
                  Meu propósito é oferecer um espaço seguro para mulheres que
                  estão vivendo as transformações da maternidade.
                </p>

                <a href="#contato" className="primary-button">
                  Agendar acolhimento
                </a>
              </div>

              <div className="about-visual">
                <div className="about-light" />
              </div>
            </div>
          </section>
        </SceneSection>
      </main>
    </div>
  );
}
