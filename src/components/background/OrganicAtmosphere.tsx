import "./OrganicAtmosphere.css";

export default function OrganicAtmosphere() {
  return (
    <div className="organic-atmosphere-wrapper">
      
      {/* 1. FLUIDEZ ORGÂNICA (Líquido Amniótico) */}
      <div className="amniotic-liquid-container">
        <div className="amniotic-blob blob-primary" />
        <div className="amniotic-blob blob-secondary" />
      </div>

      {/* 2. CORTINA DE LINHO (Textura e Proteção) */}
      <div className="sheer-fabric-container">
        <div className="fabric-panel fabric-left" />
        <div className="fabric-panel fabric-right" />
      </div>

    </div>
  );
}