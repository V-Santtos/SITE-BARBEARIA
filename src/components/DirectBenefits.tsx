"use client";

const benefits = [
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    label: "Mais profissionalismo",
    headline: "Passa profissionalismo",
    desc: "Site próprio, agendamento organizado e confirmação automática. Sua barbearia transmite confiança desde o primeiro contato.",
    stat: "3×",
    statLabel: "mais credibilidade percebida",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: "Economize tempo",
    headline: "Recupere seu tempo",
    desc: "Pare de responder mensagem de agendamento. O sistema resolve tudo sozinho — você ganha horas por semana de volta.",
    stat: "4h+",
    statLabel: "economizadas por semana",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    label: "Tenha mais controle",
    headline: "Controle total",
    desc: "Agenda sempre organizada, sem marcação dupla, sem surpresa. Você sabe exatamente o que tem para o dia — em qualquer lugar.",
    stat: "0",
    statLabel: "conflitos de horário",
  },
];

export default function DirectBenefits() {
  return (
    <section
      className="py-32 md:py-24"
      style={{
        background: "var(--bg-soft)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background glow */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          height: "50%",
          background:
            "radial-gradient(ellipse, rgba(132,64,240,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--brand)",
              fontFamily: "var(--font-noto)",
              marginBottom: 12,
            }}
          >
            Benefícios diretos
          </p>
          <h2
            style={{
              fontFamily: "var(--font-michroma)",
              fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
              color: "var(--foreground)",
              lineHeight: 1.25,
            }}
          >
            O que você ganha.
          </h2>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="flex flex-col p-8 rounded-2xl transition-all"
              style={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border-strong)";
                el.style.backgroundColor = "var(--surface-2)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border)";
                el.style.backgroundColor = "var(--card)";
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  backgroundColor: "rgba(132,64,240,0.12)",
                  border: "1px solid rgba(132,64,240,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--brand)",
                  marginBottom: 24,
                }}
              >
                {b.icon}
              </div>

              {/* Stat */}
              <div style={{ marginBottom: 16 }}>
                <span
                  style={{
                    fontFamily: "var(--font-michroma)",
                    fontSize: 36,
                    color: "var(--brand)",
                    display: "block",
                    lineHeight: 1,
                    marginBottom: 4,
                  }}
                >
                  {b.stat}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--muted-foreground)",
                    fontFamily: "var(--font-noto)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {b.statLabel}
                </span>
              </div>

              {/* Content */}
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-michroma)",
                    fontSize: 14,
                    color: "var(--foreground)",
                    marginBottom: 8,
                    letterSpacing: "0.03em",
                  }}
                >
                  {b.headline}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--muted-foreground)",
                    fontFamily: "var(--font-noto)",
                    lineHeight: 1.6,
                  }}
                >
                  {b.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
