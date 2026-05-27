export default function Home() {
  return (
      <main className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <h1
              className="text-5xl text-ink mb-3"
              style={{ fontFamily: "var(--font-playfair)" }}
          >
            Olivia Hill
          </h1>
          <p className="text-sm text-ink-secondary" style={{ fontFamily: "var(--font-dm-sans)" }}>
            home-directory is live ✦
          </p>
        </div>
      </main>
  );
}