"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    function resume() {
      if (!v) return;
      if (document.visibilityState === "visible" && v.paused) {
        v.play().catch(() => {});
      }
    }

    document.addEventListener("visibilitychange", resume);
    return () => document.removeEventListener("visibilitychange", resume);
  }, []);

  function handleEnded() {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  }

  return (
    <section
      className="relative bg-grid items-start lg:items-center pt-16 lg:pt-[120px] min-h-fit lg:min-h-svh overflow-visible lg:overflow-hidden"
      style={{
        background: "var(--background)",

        display: "flex",
        zIndex: 1,
      }}
    >
      {/* BG video */}
      <video
        ref={videoRef}
        src="/assets/BG.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        onEnded={handleEnded}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        style={{
          zIndex: 0,
          maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 85%, transparent 100%)",
        }}
      />

      {/* Grid — muito sutil por cima do vídeo */}
      <div
        className="absolute inset-0 pointer-events-none bg-grid"
        style={{ opacity: 0.18, zIndex: 1 }}
      />

      {/* Vignette — escurece as bordas */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(13,10,18,0.60) 100%)",
          zIndex: 2,
        }}
      />

      {/* Scrim — dissolve o Hero no fundo da próxima seção */}
      <div
        className="hero-scrim absolute bottom-0 left-0 right-0 pointer-events-none h-16 lg:h-[180px]"
        style={{
          // height: 180,
          background: "linear-gradient(to bottom, transparent, #1E1E1E)",
          zIndex: 3,
        }}
      />

      {/* Conteúdo principal */}
      <div
        className="relative max-w-6xl mx-auto px-6 py-6 lg:py-24 w-full"
        style={{ zIndex: 10 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* ── Left: Text content ── */}
          <div className="text-center lg:text-left">
            {/* Headline */}
            <h1
              className="animate-blur-fade"
              style={{
                fontFamily: "var(--font-michroma)",
                animationDelay: "0.1s",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                lineHeight: 1.15,
                fontWeight: 400,
                color: "var(--foreground)",
                marginBottom: 24,
              }}
            >
              <span className="block lg:inline">Seu atendimento </span>
              <span className="text-gradient block lg:inline">no piloto</span>
              <br className="hidden lg:block" />
              <span style={{ color: "var(--foreground)" }}>automático.</span>
            </h1>

            {/* Subheadline */}
            <p
              className="animate-blur-fade mx-auto lg:mx-0"
              style={{
                fontFamily: "var(--font-noto)",
                animationDelay: "0.4s",
                fontSize: "clamp(1rem, 2vw, 1.125rem)",
                lineHeight: 1.7,
                color: "rgba(244, 240, 251, 0.72)",
                textShadow: "0 2px 8px rgba(0,0,0,0.45)",
                marginBottom: 40,
                maxWidth: 480,
              }}
            >
              Seus clientes agendam, reagendam e cancelam sozinhos pelo
              WhatsApp. Sem você precisar ficar preso no celular.
            </p>

            {/* CTA row */}
            <div
              className="animate-blur-fade flex justify-center lg:justify-start"
              style={{ marginBottom: 40, animationDelay: "0.65s" }}
            >
              <a
                href="#demo"
                className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-white transition-all relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.55)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position] before:duration-700 hover:before:bg-[position:-100%_0,0_0]"
                style={{
                  backgroundColor: "#F97316",
                  fontFamily: "var(--font-noto)",
                  fontSize: 15,
                  padding: "14px 32px",
                  letterSpacing: "0.01em",
                  boxShadow:
                    "0 4px 28px rgba(249,115,22,0.45), 0 0 0 1px rgba(249,115,22,0.2)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "#EA6C0A";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 8px 36px rgba(249,115,22,0.60), 0 0 0 1px rgba(249,115,22,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "#F97316";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 4px 28px rgba(249,115,22,0.45), 0 0 0 1px rgba(249,115,22,0.2)";
                }}
              >
                Ver demonstração
              </a>
            </div>
            {/* ── Mockup mobile — absoluto, fora do fluxo do documento ── */}
            {/* zIndex 2: abaixo do scrim (3) para o fade funcionar, acima do bg (1) */}
            <div
              className="flex lg:hidden bottom-0 overflow-hidden pointer-events-none select-none"
              style={{
                transform: "translateX(-30%)",
                width: "150vw",
                height: "auto",

                zIndex: 2,
              }}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                style={{ width: "100%", display: "block" }}
              >
                <source
                  src="/assets/Conversor WEBM - FreeConvert.com.webm"
                  type="video/webm"
                />
              </video>
            </div>

            {/* Social proof strip — desktop only */}
            <div
              className="animate-blur-fade hidden lg:inline-flex items-center gap-4"
              style={{
                animationDelay: "0.9s",
                padding: "14px 18px",
                borderRadius: 16,
                background: "rgba(13,10,18,0.55)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div className="flex items-center" style={{ gap: 0 }}>
                {[12, 25, 47, 63].map((seed, i) => (
                  <div
                    key={i}
                    className="transition-transform duration-200 ease-out hover:-translate-y-2 hover:z-10"
                    style={{
                      marginLeft: i === 0 ? 0 : -10,
                      position: "relative",
                      zIndex: i,
                    }}
                  >
                    <Image
                      src={`https://i.pravatar.cc/64?img=${seed}`}
                      alt="cliente"
                      width={34}
                      height={34}
                      style={{
                        borderRadius: "50%",
                        border: "2px solid rgba(13,10,18,0.8)",
                        display: "block",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))}
                {/* +53 bubble */}
                <div
                  className="transition-transform duration-200 ease-out hover:-translate-y-2"
                  style={{
                    marginLeft: -10,
                    position: "relative",
                    zIndex: 4,
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    border: "2px solid rgba(13,10,18,0.8)",
                    backgroundColor: "rgba(132,64,240,0.35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#e2d4ff",
                    fontFamily: "var(--font-noto)",
                  }}
                >
                  +53
                </div>
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(244,240,251,0.75)",
                  fontFamily: "var(--font-noto)",
                }}
              >
                Mais de <strong style={{ color: "#fff" }}>50 barbearias</strong>{" "}
                já usam o sistema
              </p>
            </div>
          </div>

          {/* ── Right: Demo video — desktop only ── */}
          <div
            className="hidden lg:flex justify-center lg:justify-end"
            style={{ overflow: "visible" }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: "100%",
                transform: "scale(2.0)",
                transformOrigin: "center center",
              }}
            >
              <source
                src="/assets/Conversor WEBM - FreeConvert.com.webm"
                type="video/webm"
              />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
