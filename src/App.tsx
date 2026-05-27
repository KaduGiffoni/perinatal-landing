import ParticleScene from "./components/particle-system/ParticleScene";
import SceneSection from "./components/sections/SceneSection";
import AmbientBackground from "./components/background/AmbientBackground";
import SmoothScroll from "./components/SmoothScroll";
import FadeText from "./components/ui/FadeText";
import WindowLight from "./components/background/WindowLight"; // <-- Importamos a luz

export default function App() {
  return (
    <>
      <SmoothScroll />
      <AmbientBackground />
      <ParticleScene />

      <main className="relative z-10 text-[#4A3B38]">
        <SceneSection theme="intro">
          <section className="h-screen flex flex-col items-center justify-center px-6 md:px-12">
            <span className="uppercase tracking-[0.4em] text-[11px] font-medium opacity-50 mb-8 block">
              Psicologia Perinatal
            </span>
            <FadeText>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light leading-[1.1] text-center max-w-5xl mb-10">
                Existe uma nova versão de você nascendo.
              </h1>
            </FadeText>
            <p className="text-lg md:text-xl opacity-70 font-light leading-relaxed text-center max-w-2xl">
              O cuidado emocional na gestação e maternidade transforma quem
              cuida.
            </p>
          </section>
        </SceneSection>

        <SceneSection theme="pregnant">
          <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-32 relative">
            {/* INJETAMOS A LUZ GEOMÉTRICA AQUI */}
            <WindowLight />

            {/* Mudamos de ml-auto (direita) para max-w-2xl sem margem (esquerda) */}
            <div className="max-w-2xl text-left">
              <span className="uppercase tracking-[0.4em] text-[11px] font-medium opacity-50 mb-6 block">
                Gestação
              </span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light leading-[1.15] mb-8">
                Gestar também é atravessar mudanças invisíveis.
              </h2>
            </div>
          </section>
        </SceneSection>

        {/* ... Restante do App.tsx continua igual ... */}

        <SceneSection theme="transition">
          <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24">
            <div className="max-w-2xl text-left">
              <span className="uppercase tracking-[0.4em] text-[11px] font-medium opacity-50 mb-6 block">
                Maternidade
              </span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light leading-[1.15] mb-8">
                O vínculo começa muito antes do nascimento.
              </h2>
            </div>
          </section>
        </SceneSection>

        <SceneSection theme="mother">
          <section className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12">
            <span className="uppercase tracking-[0.4em] text-[11px] font-medium opacity-50 mb-6 block">
              Sobre
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light leading-[1.15] text-center max-w-4xl mb-10">
              Um espaço de acolhimento para viver cada fase com mais leveza.
            </h2>
          </section>
        </SceneSection>
      </main>
    </>
  );
}
