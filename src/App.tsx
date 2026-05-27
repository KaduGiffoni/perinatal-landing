import ParticleScene from "./components/particle-system/ParticleScene";
import SceneSection from "./components/sections/SceneSection";
import AmbientBackground from "./components/background/AmbientBackground";
import SmoothScroll from "./components/SmoothScroll";
import FadeText from "./components/ui/FadeText";

export default function App() {
  return (
    <>
      <SmoothScroll />
      <AmbientBackground />
      <ParticleScene />

      {/* Cor do texto aplicada globalmente: Um marrom grafite elegante */}
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
          <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24">
            <div className="max-w-2xl ml-auto text-center md:text-left">
              <span className="uppercase tracking-[0.4em] text-[11px] font-medium opacity-50 mb-6 block">
                Gestação
              </span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light leading-[1.15] mb-8">
                Gestar também é atravessar mudanças invisíveis.
              </h2>
            </div>
          </section>
        </SceneSection>

        <SceneSection theme="transition">
          <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24">
            <div className="max-w-2xl text-center md:text-left">
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
            <p className="text-lg md:text-xl opacity-70 font-light leading-relaxed text-center max-w-2xl">
              A psicologia perinatal oferece suporte emocional contínuo durante
              a gestação, parto, puerpério e construção da maternidade.
            </p>
          </section>
        </SceneSection>

        <SceneSection theme="calm">
          <section className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12">
            <span className="uppercase tracking-[0.4em] text-[11px] font-medium opacity-50 mb-6 block">
              Cuidado
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light leading-[1.15] text-center max-w-4xl mb-10">
              Você não precisa atravessar tudo sozinha.
            </h2>
            <p className="text-lg md:text-xl opacity-70 font-light leading-relaxed text-center max-w-2xl mb-16">
              Um espaço seguro para acolher emoções, mudanças e as profundas
              transformações da maternidade.
            </p>
            <button className="px-10 py-5 rounded-full bg-[#4A3B38] text-[#F5EBE9] text-sm tracking-[0.2em] uppercase hover:bg-[#352926] hover:scale-105 transition-all duration-500 shadow-lg">
              Agendar acompanhamento
            </button>
          </section>
        </SceneSection>
      </main>
    </>
  );
}
