"use client";

import { cn } from "@/lib/utils";

interface WhatsAppMockupProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = { sm: 200, md: 250, lg: 295 };

const messages = [
  { from: "user", text: "Oi, quero agendar um corte" },
  { from: "bot",  text: "Olá! 👋 Aqui é o BarberIO.\nQual dia você prefere?" },
  { from: "user", text: "Quinta-feira" },
  {
    from: "bot",
    text: "Perfeito! Horários disponíveis na quinta:",
    slots: ["09:00", "14:00", "16:30"],
  },
  { from: "user", text: "14:00" },
  {
    from: "bot",
    text: "✅ Agendado!\nCorte com João\nQui 13/06 · 14:00",
    confirmed: true,
  },
];

export default function WhatsAppMockup({ className, size = "md" }: WhatsAppMockupProps) {
  const width = sizeMap[size];

  return (
    <div className={cn("relative select-none", className)} style={{ width }}>
      {/* Ambient glow — lilac para diferenciar do booking */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: "-30%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,169,255,0.28) 0%, transparent 65%)",
          filter: "blur(40px)",
          zIndex: 0,
        }}
      />

      {/* Phone shell */}
      <div
        className="relative overflow-hidden shadow-2xl"
        style={{
          width,
          borderRadius: 38,
          border: "2px solid var(--surface-3)",
          background: "#111118",
          zIndex: 1,
        }}
      >
        {/* Notch */}
        <div
          className="flex justify-center items-center"
          style={{ background: "#0e0e15", padding: "12px 0 8px" }}
        >
          <div
            style={{
              width: 72,
              height: 18,
              borderRadius: 9,
              backgroundColor: "var(--surface-3)",
            }}
          />
        </div>

        {/* WhatsApp header */}
        <div
          style={{
            background: "#1a1a24",
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            gap: 9,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: "var(--brand)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              flexShrink: 0,
            }}
          >
            ✂
          </div>
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, color: "var(--foreground)", fontFamily: "var(--font-noto)" }}>
              BarberIO Bot
            </p>
            <p style={{ fontSize: 8, color: "#4CAF50", fontFamily: "var(--font-noto)" }}>
              online agora
            </p>
          </div>
          {/* WhatsApp icon */}
          <div style={{ marginLeft: "auto" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#4CAF50">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
        </div>

        {/* Chat area */}
        <div
          style={{
            background: "#0d0d14",
            padding: "12px 10px 10px",
            display: "flex",
            flexDirection: "column",
            gap: 7,
          }}
        >
          {messages.map((msg, i) => {
            const isUser = msg.from === "user";
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: isUser ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "78%",
                    padding: msg.confirmed ? "8px 10px" : "7px 10px",
                    borderRadius: isUser
                      ? "12px 12px 3px 12px"
                      : "12px 12px 12px 3px",
                    background: isUser
                      ? "var(--brand)"
                      : msg.confirmed
                        ? "rgba(76,175,80,0.18)"
                        : "var(--surface-2)",
                    border: msg.confirmed ? "1px solid rgba(76,175,80,0.35)" : "none",
                  }}
                >
                  {/* Text */}
                  <p
                    style={{
                      fontSize: 9,
                      color: "var(--foreground)",
                      fontFamily: "var(--font-noto)",
                      lineHeight: 1.5,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {msg.text}
                  </p>

                  {/* Slot chips */}
                  {"slots" in msg && msg.slots && (
                    <div style={{ display: "flex", gap: 4, marginTop: 6, flexWrap: "wrap" }}>
                      {msg.slots.map((s) => (
                        <span
                          key={s}
                          style={{
                            fontSize: 8,
                            padding: "3px 7px",
                            borderRadius: 6,
                            background: "var(--brand)",
                            color: "white",
                            fontFamily: "var(--font-noto)",
                            fontWeight: 600,
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Timestamp */}
                  <p
                    style={{
                      fontSize: 7,
                      color: isUser ? "rgba(255,255,255,0.55)" : "var(--muted-foreground)",
                      fontFamily: "var(--font-noto)",
                      marginTop: 3,
                      textAlign: "right",
                    }}
                  >
                    {["14:01","14:01","14:02","14:02","14:02","14:03"][i]} {isUser ? "✓✓" : ""}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input bar */}
        <div
          style={{
            background: "#1a1a24",
            padding: "8px 10px",
            display: "flex",
            alignItems: "center",
            gap: 7,
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            style={{
              flex: 1,
              background: "var(--surface-2)",
              borderRadius: 20,
              padding: "6px 10px",
            }}
          >
            <p style={{ fontSize: 8, color: "var(--muted-foreground)", fontFamily: "var(--font-noto)" }}>
              Mensagem
            </p>
          </div>
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: "#4CAF50",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
              flexShrink: 0,
            }}
          >
            ➤
          </div>
        </div>
      </div>
    </div>
  );
}
