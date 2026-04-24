"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function DemoVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const EASE = "cubic-bezier(0, 0, 0.2, 1)";
  const DUR = "1000ms";

  // ── MOBILE: card grande (mesmo tamanho do desktop), mostra só a ponta à direita.
  // Celular centralizado abaixo do card.
  if (isMobile) {
    return (
      <section
        ref={sectionRef}
        id="demo"
        style={{
          backgroundColor: "#1E1E1E",
          position: "relative",
          overflow: "hidden",
          // card: top 20 + maxHeight 420 = bottom 440. Celular a 460. ~560px altura celular + folga
          minHeight: "1250px",
        }}
      >
        {/* ── Card: tamanho original, desliza da direita, mostra só a ponta.
            maxHeight corta o card em 420px (SVG é 1:1 = 740px alto) para o
            celular ficar visível abaixo sem scroll excessivo. ── */}
        <div
          style={{
            position: "absolute",
            // top: "20px",
            right: 0,
            width: "clamp(740px, 104vw, 1280px)",
            opacity: hasAnimated ? 1 : 0,
            transform: hasAnimated ? "translate(58%, 0)" : "translate(92%, 0)",
            pointerEvents: "none",
            transition: hasAnimated
              ? `opacity ${DUR} ${EASE} 200ms, transform ${DUR} ${EASE} 200ms`
              : "none",
          }}
        >
          {/* Card branco decorativo — mesma animação do desktop */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#ffffff",
              borderRadius: "9.85% / 15.37%",
              transform: hasAnimated ? "translateX(-0.7%)" : "translateX(6%)",
              zIndex: 0,
              transition: hasAnimated
                ? `transform ${DUR} ${EASE} 550ms`
                : "none",
            }}
          />

          <div
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "9.85% / 15.37%",
              zIndex: 1,
            }}
          >
            <Image
              src="/assets/Frame 9.svg"
              alt=""
              width={960}
              height={960}
              style={{ width: "100%", height: "auto", display: "block" }}
              priority
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  marginLeft: "8%",
                  maxWidth: "42%",
                  marginTop: "0%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-jost)",
                    fontSize: "clamp(24px, 3.6vw, 46px)",
                    fontWeight: 700,
                    color: "#ffffff",
                    lineHeight: 1.0,
                    margin: 0,
                    marginBottom: "clamp(6px, 0.8vw, 11px)",
                  }}
                >
                  Fluxo direto,
                  <br />
                  sem enrolação.
                </h2>

                <p
                  style={{
                    fontFamily: "var(--font-jost)",
                    fontSize: "clamp(14px, 1.85vw, 21px)",
                    fontWeight: 400,
                    color: "#939393",
                    lineHeight: 1.15,
                    margin: 0,
                    marginBottom: "clamp(28px, 5vw, 58px)",
                  }}
                >
                  Uma experiência mais clara
                  <br />
                  para você e para o cliente.
                </p>

                <p
                  style={{
                    fontFamily: "var(--font-jost)",
                    fontSize: "clamp(18px, 2.35vw, 30px)",
                    fontWeight: 700,
                    color: "#FFC8A2",
                    lineHeight: 1.2,
                    margin: 0,
                    marginBottom: "clamp(24px, 4vw, 48px)",
                  }}
                >
                  Ofereça um
                  <br />
                  agendamento mais
                  <br />
                  rápido e organizado.
                </p>

                <div
                  style={{
                    position: "relative",
                    width: "clamp(62px, 6.4vw, 84px)",
                    height: "clamp(62px, 6.4vw, 84px)",
                    flexShrink: 0,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/bolinha laranja.svg"
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "block",
                      filter:
                        "drop-shadow(0px 0px 12px rgba(255,255,255,0.35)) drop-shadow(0px 0px 6px rgba(255,255,255,0.2))",
                    }}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/raio.svg"
                    alt=""
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "52%",
                      height: "52%",
                      filter: "drop-shadow(7px 1.5px 0px rgba(4,4,4,0.25))",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Celular: abaixo do card (top 20 + altura card ~740px + gap 20 = 780px) ── */}
        <div
          style={{
            position: "absolute",
            top: "550px",
            left: "50%",
            width: "180vw",
            opacity: hasAnimated ? 1 : 0,
            transform: hasAnimated
              ? "translateX(-50%)"
              : "translate(-50%, 30px)",
            pointerEvents: "none",
            transition: hasAnimated
              ? `opacity ${DUR} ${EASE}, transform ${DUR} ${EASE}`
              : "none",
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              pointerEvents: "none",
            }}
          >
            <source
              src="/assets/Comp_1_2_hevc_alpha.mov"
              type="video/mp4; codecs=hvc1"
            />
            <source src="/assets/Celular.webm" type="video/webm" />
          </video>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 55%, rgba(30,30,30,0.55) 80%, rgba(30,30,30,0.85) 100%)",
              pointerEvents: "none",
            }}
          />
        </div>
      </section>
    );
  }

  // ── DESKTOP: layout original, 100% inalterado ──
  return (
    <section
      ref={sectionRef}
      id="demo"
      style={{
        backgroundColor: "#1E1E1E",
        position: "relative",
        overflow: "hidden",
        minHeight: "860px",
        paddingTop: "350px",
        paddingBottom: "670px",
      }}
    >
      {/* ── Celular: sobe de baixo para cima na primeira entrada ── */}
      <div
        style={{
          position: "absolute",
          top: "calc(55% - 135px)",
          left: 0,
          right: 0,
          transform: hasAnimated
            ? "translateY(-50%)"
            : "translateY(calc(-50% + 80px))",
          opacity: hasAnimated ? 1 : 0,
          pointerEvents: "none",
          transition: hasAnimated
            ? `opacity ${DUR} ${EASE}, transform ${DUR} ${EASE}`
            : "none",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 40px",
          }}
        >
          <div
            style={{ width: "clamp(680px, 62vw, 820px)", position: "relative" }}
          >
            <video
              src="/assets/Celular.webm"
              autoPlay
              muted
              loop
              playsInline
              disablePictureInPicture
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 55%, rgba(30,30,30,0.55) 80%, rgba(30,30,30,0.85) 100%)",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Card: entra da direita para a esquerda na primeira entrada ── */}
      <div
        style={{
          position: "absolute",
          top: "calc(50% - 95px)",
          right: 0,
          transform: hasAnimated
            ? "translate(45%, -50%)"
            : "translate(75%, -50%)",
          opacity: hasAnimated ? 1 : 0,
          width: "clamp(740px, 104vw, 1280px)",
          pointerEvents: "none",
          transition: hasAnimated
            ? `opacity ${DUR} ${EASE} 200ms, transform ${DUR} ${EASE} 200ms`
            : "none",
        }}
      >
        {/* Card branco decorativo — camada de trás */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#ffffff",
            borderRadius: "9.85% / 15.37%",
            transform: hasAnimated ? "translateX(-0.7%)" : "translateX(6%)",
            zIndex: 0,
            transition: hasAnimated ? `transform ${DUR} ${EASE} 550ms` : "none",
          }}
        />

        {/* Wrapper relativo: vincula card (background) + overlay de conteúdo */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "9.85% / 15.37%",
            zIndex: 1,
          }}
        >
          {/* Background visual — não alterar */}
          <Image
            src="/assets/Frame 9.svg"
            alt=""
            width={960}
            height={960}
            style={{ width: "100%", height: "auto", display: "block" }}
            priority
          />

          {/* Overlay de conteúdo — preso à área visível esquerda do card */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* Coluna de conteúdo — edite aqui */}
            <div
              style={{
                marginLeft: "8%",
                maxWidth: "42%",
                marginTop: "0%",
                display: "flex",
                flexDirection: "column",
                gap: 0,
              }}
            >
              {/* Título */}
              <h2
                style={{
                  fontFamily: "var(--font-jost)",
                  fontSize: "clamp(24px, 3.6vw, 46px)",
                  fontWeight: 700,
                  color: "#ffffff",
                  lineHeight: 1.0,
                  margin: 0,
                  marginBottom: "clamp(6px, 0.8vw, 11px)",
                }}
              >
                Fluxo direto,
                <br />
                sem enrolação.
              </h2>

              {/* Subtítulo */}
              <p
                style={{
                  fontFamily: "var(--font-jost)",
                  fontSize: "clamp(14px, 1.85vw, 21px)",
                  fontWeight: 400,
                  color: "#939393",
                  lineHeight: 1.15,
                  margin: 0,
                  marginBottom: "clamp(28px, 5vw, 58px)",
                }}
              >
                Uma experiência mais clara
                <br />
                para você e para o cliente.
              </p>

              {/* Texto de apoio */}
              <p
                style={{
                  fontFamily: "var(--font-jost)",
                  fontSize: "clamp(18px, 2.35vw, 30px)",
                  fontWeight: 700,
                  color: "#FFC8A2",
                  lineHeight: 1.2,
                  margin: 0,
                  marginBottom: "clamp(24px, 4vw, 48px)",
                }}
              >
                Ofereça um
                <br />
                agendamento mais
                <br />
                rápido e organizado.
              </p>

              {/* Ícone: bolinha laranja + raio por cima */}
              <div
                style={{
                  position: "relative",
                  width: "clamp(62px, 6.4vw, 84px)",
                  height: "clamp(62px, 6.4vw, 84px)",
                  flexShrink: 0,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/bolinha laranja.svg"
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    filter:
                      "drop-shadow(0px 0px 12px rgba(255,255,255,0.35)) drop-shadow(0px 0px 6px rgba(255,255,255,0.2))",
                  }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/raio.svg"
                  alt=""
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "52%",
                    height: "52%",
                    filter: "drop-shadow(7px 1.5px 0px rgba(4,4,4,0.25))",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
