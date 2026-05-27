export default function WindowLight() {
  return (
    // 'fixed inset-0' garante que o contêiner ocupe a tela toda
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* A Imagem da Luz:
        1. 'object-cover': Preenche a tela sem distorcer.
        2. 'mix-blend-screen': ESTA É A MÁGICA. Remove o fundo preto e deixa apenas a luz dourada brilhar.
        3. 'opacity-70': Ajuste a suavidade da luz aqui (de 0 a 100).
      */}
      <img
        src="/luz-janela.jpg"
        alt="Efeito de luz geométrica da janela"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-70 mix-blend-screen"
      />

      {/* Gradiente de Proteção (Névoa de Acolhimento):
        Cria uma transição suave da cor do fundo (bege) vindo da esquerda (onde está o texto),
        garantindo que a luz não fique agressiva e o texto fique perfeitamente legível.
      */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#F5EBE9] via-[#F5EBE9]/60 to-transparent"
        style={{ width: "60%" }} // Controla até onde a "névoa" bege avança
      />
    </div>
  );
}
