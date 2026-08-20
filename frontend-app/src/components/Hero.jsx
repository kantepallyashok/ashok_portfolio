function Hero() {
  return (
    <section
      className="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Background person image (white background removed, centered, 70% opacity) */}
      <img
        src="/images/Ashok_hero.png"
        alt="Ashok"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          margin: "auto",
          maxWidth: "100%",
          height: "80%",
          objectFit: "contain",
          opacity: 0.7,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <h2>Venkata Kantepally</h2>
        <h3>Senior DevOps Engineer</h3>
        <p>
          DevOps Engineer with 7+ years of experience in Cloud,
          CI/CD, Automation, Containerization and Kubernetes.
        </p>
      </div>
    </section>
  );
}

export default Hero;