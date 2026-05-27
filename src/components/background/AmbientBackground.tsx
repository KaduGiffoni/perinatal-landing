import { useScene } from "../../context/SceneContext";

export default function AmbientBackground() {
  const { theme } = useScene();

  // Paleta de cores premium para cada fase (Pode customizar as cores hex aqui)
  const themeColors = {
    intro: "bg-[#F5EBE9]", // Blush bem suave
    pregnant: "bg-[#EFE8E3]", // Areia/Sage suave
    transition: "bg-[#EAE4E4]", // Lavanda/Cinza quente
    mother: "bg-[#F2E8E4]", // Pêssego claro
    calm: "bg-[#E8E6E1]", // Cinza perolado
  };

  // Pega a cor baseada no tema atual, ou usa a 'intro' como padrão
  const currentBg =
    themeColors[theme as keyof typeof themeColors] || themeColors.intro;

  return (
    <div
      className={`fixed inset-0 -z-20 overflow-hidden transition-colors duration-[2500ms] ease-in-out ${currentBg}`}
    >
      {/* Bolha de luz superior - Movimento lento orgânico */}
      <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-white/40 blur-[120px] animate-slow-move mix-blend-overlay" />

      {/* Bolha de luz inferior */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-rose-200/20 blur-[100px] animate-slow-move-reverse mix-blend-overlay" />
    </div>
  );
}
