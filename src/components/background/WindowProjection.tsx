export default function WindowProjection() {
  return (
    <div className="window-projection-wrapper">

      <div className="window-projection">

        {/* Arco */}
        <div className="window-arch" />

        {/* Grades verticais */}
        <div className="window-line vertical v1" />
        <div className="window-line vertical v2" />

        {/* Grades horizontais */}
        <div className="window-line horizontal h1" />
        <div className="window-line horizontal h2" />

      </div>

    </div>
  );
}