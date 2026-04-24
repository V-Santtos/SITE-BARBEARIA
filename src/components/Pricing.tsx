"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";

const WA_ESSENCIAL =
  "https://wa.me/5500000000000?text=Ol%C3%A1!%20Tenho%20interesse%20no%20Plano%20Essencial.";
const WA_PRO =
  "https://wa.me/5500000000000?text=Ol%C3%A1!%20Tenho%20interesse%20no%20Plano%20Profissional.";

const basicFeatures = [
  "Agendamento online",
  "Notificação automática por WhatsApp",
  "Até 1 profissional",
  "Cancelamento e reagendamento automático",
  "Até 300 agendamentos/mês",
];

const proFeatures = [
  "Tudo do Plano Essencial",
  "Até 3 profissionais",
  "Agendamentos ilimitados",
  "Base de clientes para campanhas e reativação",
  "Suporte prioritário",
  "Integração personalizada",
];

const ORANGE = "#F97316";
const ORANGE_HOVER = "#ea6c0a";

function PricingSwitch({
  isYearly,
  onSwitch,
}: {
  isYearly: boolean;
  onSwitch: (yearly: boolean) => void;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        borderRadius: 999,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
        padding: 4,
      }}
    >
      {(
        [
          { label: "Mensal", value: false },
          { label: "Anual", value: true, badge: "−20%" },
        ] as { label: string; value: boolean; badge?: string }[]
      ).map(({ label, value, badge }) => (
        <button
          key={label}
          onClick={() => onSwitch(value)}
          style={{
            position: "relative",
            padding: "10px 22px",
            borderRadius: 999,
            border: "none",
            cursor: "pointer",
            background: "transparent",
            fontFamily: "var(--font-jost)",
            fontSize: 14,
            fontWeight: 600,
            color: isYearly === value ? "#fff" : "rgba(255,255,255,0.4)",
            transition: "color 200ms",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {isYearly === value && (
            <motion.span
              layoutId="pricing-switch"
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 999,
                background: ORANGE,
                boxShadow: `0 2px 16px rgba(249,115,22,0.45)`,
                zIndex: 0,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
          {badge && (
            <span
              style={{
                position: "relative",
                zIndex: 1,
                fontSize: 10,
                fontWeight: 700,
                padding: "2px 7px",
                borderRadius: 99,
                background:
                  isYearly === value
                    ? "rgba(255,255,255,0.22)"
                    : "rgba(249,115,22,0.18)",
                color: isYearly === value ? "#fff" : ORANGE,
                letterSpacing: "0.04em",
              }}
            >
              {badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [isYearly, setIsYearly] = useState(false);

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
      id="planos"
      style={{
        backgroundColor: "#1E1E1E",
        padding: "112px 0 160px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          maxWidth: 860,
          margin: "0 auto",
          padding: "0 24px",
          zIndex: 10,
        }}
      >
        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <h2
            style={{
              fontFamily: "var(--font-jost)",
              fontWeight: 500,
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              color: "rgba(255,255,255,0.85)",
              lineHeight: 1.2,
              marginBottom: 0,
              letterSpacing: "0.01em",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {visible && (
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.12}
                staggerFrom="first"
                containerClassName="justify-center"
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 32,
                  delay: 0,
                }}
              >
                Simples e direto.
              </VerticalCutReveal>
            )}
          </h2>

          <p
            style={{
              fontFamily: "var(--font-jost)",
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: "clamp(1.7rem, 3vw, 2.4rem)",
              color: "rgba(255,255,255,0.45)",
              margin: "0 auto",
              lineHeight: 1.5,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: `opacity ${DUR} ${EASE} 200ms, transform ${DUR} ${EASE} 200ms`,
            }}
          >
            Escolha o que faz sentido para a sua barbearia.
          </p>

          <div
            style={{
              marginTop: 36,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: `opacity ${DUR} ${EASE} 350ms, transform ${DUR} ${EASE} 350ms`,
            }}
          >
            <PricingSwitch isYearly={isYearly} onSwitch={setIsYearly} />
          </div>
        </div>

        {/* ── Grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
            alignItems: "stretch",
          }}
        >
          {/* ── Card Essencial ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "32px 28px",
              borderRadius: 20,
              backgroundColor: "#2a2a2a",
              border: "1px solid rgba(255,255,255,0.08)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(32px)",
              transition: `opacity ${DUR} ${EASE} 400ms, transform ${DUR} ${EASE} 400ms`,
            }}
          >
            <div style={{ marginBottom: 28 }}>
              <h3
                style={{
                  fontFamily: "var(--font-jost)",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "var(--foreground)",
                  marginBottom: 8,
                }}
              >
                Plano Essencial
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-jost)",
                  fontSize: 13,
                  color: "var(--muted-foreground)",
                  lineHeight: 1.6,
                  marginBottom: 20,
                }}
              >
                Ideal para barbeiros autônomos que querem organizar a agenda e
                parecer mais profissional.
              </p>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
                <span
                  style={{
                    fontFamily: "var(--font-jost)",
                    fontSize: 52,
                    fontWeight: 800,
                    color: "var(--foreground)",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {isYearly ? "R$ 77" : "R$ 97"}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-jost)",
                    fontSize: 14,
                    color: "var(--muted-foreground)",
                    marginBottom: 8,
                  }}
                >
                  /mês
                </span>
              </div>
            </div>

            <a
              href={WA_ESSENCIAL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "14px 0",
                borderRadius: 999,
                fontFamily: "var(--font-jost)",
                fontSize: 14,
                fontWeight: 600,
                color: "#fff",
                backgroundColor: ORANGE,
                textDecoration: "none",
                transition: "background-color 200ms, box-shadow 200ms",
                cursor: "pointer",
                marginBottom: 28,
                boxShadow: "0 4px 20px rgba(249,115,22,0.3)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = ORANGE_HOVER;
                el.style.boxShadow = "0 4px 28px rgba(249,115,22,0.5)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = ORANGE;
                el.style.boxShadow = "0 4px 20px rgba(249,115,22,0.3)";
              }}
            >
              Começar agora
            </a>

            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.07)",
                paddingTop: 24,
                flex: 1,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-jost)",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--muted-foreground)",
                  marginBottom: 6,
                }}
              >
                Incluído
              </p>
              <p
                style={{
                  fontFamily: "var(--font-jost)",
                  fontSize: 13,
                  color: "var(--muted-foreground)",
                  marginBottom: 16,
                }}
              >
                O que você recebe no plano:
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {basicFeatures.map((f, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <span
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        backgroundColor: "rgba(249,115,22,0.15)",
                        border: "1px solid rgba(249,115,22,0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        fontSize: 10,
                        color: ORANGE,
                      }}
                    >
                      ✓
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-jost)",
                        fontSize: 13,
                        color: "var(--muted-foreground)",
                      }}
                    >
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Card Profissional ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "32px 28px",
              borderRadius: 20,
              backgroundColor: "#F5F2EE",
              border: "1px solid rgba(0,0,0,0.05)",
              boxShadow:
                "0 8px 40px rgba(0,0,0,0.22), 0 1px 0 rgba(255,255,255,0.06) inset",
              position: "relative",
              overflow: "hidden",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(32px)",
              transition: `opacity ${DUR} ${EASE} 560ms, transform ${DUR} ${EASE} 560ms`,
            }}
          >
            {/* Badge */}
            <div
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                padding: "5px 12px",
                borderRadius: 99,
                backgroundColor: "rgba(249,115,22,0.12)",
                border: "1px solid rgba(249,115,22,0.25)",
                fontFamily: "var(--font-jost)",
                fontSize: 10,
                fontWeight: 700,
                color: ORANGE,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Recomendado
            </div>

            <div style={{ marginBottom: 28 }}>
              <h3
                style={{
                  fontFamily: "var(--font-jost)",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#1a1816",
                  marginBottom: 8,
                }}
              >
                Plano Profissional
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-jost)",
                  fontSize: 13,
                  color: "#5e5a56",
                  lineHeight: 1.6,
                  marginBottom: 20,
                }}
              >
                Para barbearias com múltiplos profissionais que precisam de
                controle completo e escala.
              </p>
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-jost)",
                  fontSize: "clamp(34px, 3.4vw, 44px)",
                  fontWeight: 800,
                  color: "#1a1816",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                Sob consulta
              </span>
              <span
                style={{
                  fontFamily: "var(--font-jost)",
                  fontSize: 13,
                  color: "#8a8480",
                  marginTop: 6,
                  display: "block",
                }}
              >
                Valor adaptado ao tamanho da sua operação
              </span>
            </div>

            <a
              href={WA_PRO}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "14px 0",
                borderRadius: 999,
                fontFamily: "var(--font-jost)",
                fontSize: 14,
                fontWeight: 700,
                color: "#fff",
                backgroundColor: ORANGE,
                textDecoration: "none",
                transition: "background-color 200ms, box-shadow 200ms",
                cursor: "pointer",
                boxShadow: "0 2px 12px rgba(249,115,22,0.22)",
                marginBottom: 28,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = ORANGE_HOVER;
                el.style.boxShadow = "0 2px 20px rgba(249,115,22,0.38)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = ORANGE;
                el.style.boxShadow = "0 2px 12px rgba(249,115,22,0.22)";
              }}
            >
              Falar com a equipe
            </a>

            <div
              style={{
                borderTop: "1px solid rgba(0,0,0,0.08)",
                paddingTop: 24,
                flex: 1,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-jost)",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#8a8480",
                  marginBottom: 6,
                }}
              >
                Incluído
              </p>
              <p
                style={{
                  fontFamily: "var(--font-jost)",
                  fontSize: 13,
                  color: "#7a7672",
                  marginBottom: 16,
                }}
              >
                Tudo do Essencial, mais:
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {proFeatures.map((f, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <span
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        backgroundColor: "rgba(249,115,22,0.12)",
                        border: "1px solid rgba(249,115,22,0.28)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        fontSize: 10,
                        color: ORANGE,
                      }}
                    >
                      ✓
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-jost)",
                        fontSize: 13,
                        color: "#2e2b28",
                      }}
                    >
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
