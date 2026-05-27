// Importando a imagem diretamente da mesma pasta
import luzJanelaImg from "./luz-janela.png";

export default function WindowLight() {
  return (
    <div className="fixed inset-0 z-[-10] overflow-hidden pointer-events-none">
      <img
        src={luzJanelaImg} // Usando a variável importada aqui
        alt="Luz geométrica da janela"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-70 mix-blend-screen"
      />

      <div
        className="absolute inset-0 bg-gradient-to-r from-[#F5EBE9] via-[#F5EBE9]/60 to-transparent"
        style={{ width: "60%" }}
      />
    </div>
  );
}
