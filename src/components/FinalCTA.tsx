"use client";

import { useEffect, useRef, useState } from "react";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";

const WA_LINK =
  "https://wa.me/5500000000000?text=Ol%C3%A1!%20Quero%20saber%20mais%20sobre%20o%20BarberIO.";

const ORANGE = "#F97316";
const ORANGE_HOVER = "#ea6c0a";

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const EASE = "cubic-bezier(0, 0, 0.2, 1)";
  const DUR = "700ms";

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: "#111111",
        padding: "96px 0 112px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top divider */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "15%",
          right: "15%",
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(249,115,22,0.25), transparent)",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: 720,
          margin: "0 auto",
          padding: "0 24px",
          textAlign: "center",
          zIndex: 10,
        }}
      >
        {/* Label */}
        <p
          style={{
            fontFamily: "var(--font-jost)",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: ORANGE,
            marginBottom: 20,
            opacity: visible ? 1 : 0,
            transition: `opacity ${DUR} ${EASE} 0ms`,
          }}
        >
          Comece agora
        </p>

        {/* Headline */}
        <h2
          style={{
            fontFamily: "var(--font-jost)",
            fontSize: "clamp(1.9rem, 4.5vw, 3.2rem)",
            fontWeight: 600,
            color: "rgba(255,255,255,0.88)",
            lineHeight: 1.2,
            marginBottom: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          {visible && (
            <>
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.1}
                staggerFrom="first"
                containerClassName="justify-center"
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 32,
                  delay: 0.05,
                }}
              >
                Organize seus agendamentos.
              </VerticalCutReveal>
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.1}
                staggerFrom="first"
                containerClassName="justify-center"
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 32,
                  delay: 0.22,
                }}
              >
                Sem depender de ninguém.
              </VerticalCutReveal>
            </>
          )}
        </h2>

        {/* Body */}
        <p
          style={{
            fontFamily: "var(--font-jost)",
            fontSize: 16,
            color: "rgba(255,255,255,0.4)",
            maxWidth: 480,
            margin: "0 auto 48px",
            lineHeight: 1.7,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: `opacity ${DUR} ${EASE} 300ms, transform ${DUR} ${EASE} 300ms`,
          }}
        >
          Entre em contato pelo WhatsApp e veja como o sistema funciona na
          prática — sem compromisso.
        </p>

        {/* CTA button */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: `opacity ${DUR} ${EASE} 450ms, transform ${DUR} ${EASE} 450ms`,
          }}
        >
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "15px 36px",
              borderRadius: 999,
              fontFamily: "var(--font-jost)",
              fontSize: 15,
              fontWeight: 700,
              color: "#fff",
              backgroundColor: ORANGE,
              textDecoration: "none",
              transition: "background-color 200ms, box-shadow 200ms",
              boxShadow: "0 4px 24px rgba(249,115,22,0.3)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = ORANGE_HOVER;
              el.style.boxShadow = "0 4px 36px rgba(249,115,22,0.5)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = ORANGE;
              el.style.boxShadow = "0 4px 24px rgba(249,115,22,0.3)";
            }}
          >
            <WhatsAppIcon />
            Contato
          </a>
        </div>

        {/* Reassurance */}
        <p
          style={{
            fontFamily: "var(--font-jost)",
            fontSize: 13,
            color: "rgba(255,255,255,0.3)",
            marginTop: 20,
            opacity: visible ? 1 : 0,
            transition: `opacity ${DUR} ${EASE} 600ms`,
          }}
        >
          Sem cadastro. Sem cartão. Só uma conversa.
        </p>
      </div>
    </section>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
