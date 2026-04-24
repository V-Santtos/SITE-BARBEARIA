"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const WA_LINK =
  "https://wa.me/5500000000000?text=Ol%C3%A1!%20Quero%20saber%20mais%20sobre%20o%20BarberIO.";

const ORANGE = "#F97316";

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <footer
      style={{
        backgroundColor: "#1E1E1E",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "64px 24px",
        }}
      >
        {isMobile ? (
          // ── MOBILE ──
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {/* Brand */}
            <div>
              <Link
                href="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 16,
                  textDecoration: "none",
                }}
              >
                <Image
                  src="/assets/LOGO1.png"
                  alt="Logo"
                  width={28}
                  height={28}
                  style={{ objectFit: "contain" }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-jost)",
                    fontSize: 16,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  automatiza
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-jost)",
                    fontSize: 16,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: ORANGE,
                  }}
                >
                  .ia
                </span>
              </Link>
              <p
                style={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.4)",
                  fontFamily: "var(--font-jost)",
                  lineHeight: 1.7,
                  marginBottom: 24,
                }}
              >
                Sistema de agendamento automático para barbearias. Organizado,
                profissional e sem depender de mensagens manuais.
              </p>
            </div>

            {/* Navegação */}
            <div>
              <p
                style={{
                  fontFamily: "var(--font-jost)",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  color: "rgba(255,255,255,0.85)",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Navegação
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {[
                  { label: "Funcionalidades", href: "#funcionalidades" },
                  { label: "Como funciona", href: "#demo" },
                  { label: "Benefícios", href: "#funcionalidades" },
                  { label: "Planos", href: "#planos" },
                  { label: "FAQ", href: "#faq" },
                ].map(({ label, href }) => (
                  <Link
                    key={href + label}
                    href={href}
                    style={{
                      fontSize: 14,
                      color: "rgba(255,255,255,0.4)",
                      fontFamily: "var(--font-jost)",
                      textDecoration: "none",
                    }}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contato */}
            <div>
              <p
                style={{
                  fontFamily: "var(--font-jost)",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  color: "rgba(255,255,255,0.85)",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Contato
              </p>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 20px",
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: "var(--font-jost)",
                  color: "#fff",
                  backgroundColor: ORANGE,
                  textDecoration: "none",
                }}
              >
                <WhatsAppIcon />
                Contato
              </a>

              <p
                style={{
                  marginTop: 12,
                  fontSize: 13,
                  color: "rgba(255,255,255,0.35)",
                  fontFamily: "var(--font-jost)",
                }}
              >
                contato@barberio.com.br
              </p>
            </div>
          </div>
        ) : (
          // ── DESKTOP: original ──
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr",
              gap: 48,
            }}
          >
            {/* Brand column */}
            <div>
              <Link
                href="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 16,
                  textDecoration: "none",
                }}
              >
                <Image
                  src="/assets/LOGO1.png"
                  alt="Logo"
                  width={28}
                  height={28}
                  style={{ objectFit: "contain" }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-jost)",
                    fontSize: 16,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  automatiza
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-jost)",
                    fontSize: 16,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: ORANGE,
                  }}
                >
                  .ia
                </span>
              </Link>
              <p
                style={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.4)",
                  fontFamily: "var(--font-jost)",
                  lineHeight: 1.7,
                  maxWidth: 300,
                  marginBottom: 24,
                }}
              >
                Sistema de agendamento automático para barbearias. Organizado,
                profissional e sem depender de mensagens manuais.
              </p>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 20px",
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: "var(--font-jost)",
                  color: "#fff",
                  backgroundColor: ORANGE,
                  textDecoration: "none",
                  transition: "background-color 200ms",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor =
                    "#ea6c0a")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor =
                    ORANGE)
                }
              >
                <WhatsAppIcon />
                Contato
              </a>
            </div>

            {/* Nav column */}
            <div>
              <p
                style={{
                  fontFamily: "var(--font-jost)",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  color: "rgba(255,255,255,0.85)",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Navegação
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {[
                  { label: "Funcionalidades", href: "#funcionalidades" },
                  { label: "Como funciona", href: "#demo" },
                  { label: "Benefícios", href: "#funcionalidades" },
                  { label: "Planos", href: "#planos" },
                  { label: "FAQ", href: "#faq" },
                ].map(({ label, href }) => (
                  <Link
                    key={href + label}
                    href={href}
                    style={{
                      fontSize: 14,
                      color: "rgba(255,255,255,0.4)",
                      fontFamily: "var(--font-jost)",
                      textDecoration: "none",
                      transition: "color 150ms",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color =
                        "rgba(255,255,255,0.85)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color =
                        "rgba(255,255,255,0.4)")
                    }
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact column */}
            <div>
              <p
                style={{
                  fontFamily: "var(--font-jost)",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  color: "rgba(255,255,255,0.85)",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Contato
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.4)",
                    fontFamily: "var(--font-jost)",
                    textDecoration: "none",
                    transition: "color 150ms",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = ORANGE)
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      "rgba(255,255,255,0.4)")
                  }
                >
                  WhatsApp
                </a>
                <a
                  href="mailto:contato@barberio.com.br"
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.4)",
                    fontFamily: "var(--font-jost)",
                    textDecoration: "none",
                    transition: "color 150ms",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      "rgba(255,255,255,0.85)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      "rgba(255,255,255,0.4)")
                  }
                >
                  contato@barberio.com.br
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom bar — igual em ambos */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          padding: "16px 24px",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.25)",
              fontFamily: "var(--font-jost)",
            }}
          >
            © {new Date().getFullYear()} BarberIO. Todos os direitos reservados.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            {["Termos de uso", "Privacidade"].map((item) => (
              <Link
                key={item}
                href="#"
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.25)",
                  fontFamily: "var(--font-jost)",
                  textDecoration: "none",
                  transition: "color 150ms",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "rgba(255,255,255,0.6)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "rgba(255,255,255,0.25)")
                }
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
