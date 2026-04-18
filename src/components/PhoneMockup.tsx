import { cn } from "@/lib/utils";

interface PhoneMockupProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const dates = [
  { day: "Ter", num: "11", selected: false },
  { day: "Qua", num: "12", selected: false },
  { day: "Qui", num: "13", selected: true },
  { day: "Sex", num: "14", selected: false },
  { day: "Sáb", num: "15", selected: false },
];

const slots = [
  { time: "09:00", available: true, selected: false },
  { time: "10:30", available: true, selected: false },
  { time: "11:00", available: false, selected: false },
  { time: "14:00", available: true, selected: true },
  { time: "15:30", available: true, selected: false },
  { time: "16:00", available: false, selected: false },
];

const sizeMap = { sm: 210, md: 265, lg: 310 };

export default function PhoneMockup({ className, size = "md" }: PhoneMockupProps) {
  const width = sizeMap[size];

  return (
    <div className={cn("relative select-none", className)} style={{ width }}>
      {/* Ambient glow behind phone */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: "-30%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(132,64,240,0.35) 0%, transparent 65%)",
          filter: "blur(40px)",
          zIndex: 0,
        }}
      />

      {/* Phone shell */}
      <div
        className="relative overflow-hidden shadow-2xl"
        style={{
          width,
          borderRadius: 40,
          border: "2px solid var(--surface-3)",
          background: "var(--background)",
          zIndex: 1,
        }}
      >
        {/* Notch */}
        <div
          className="flex justify-center items-center"
          style={{
            background: "var(--bg-soft)",
            padding: "12px 0 8px",
          }}
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

        {/* App UI */}
        <div
          style={{
            background: "var(--bg-soft)",
            padding: "10px 16px 22px",
          }}
        >
          {/* App header */}
          <div
            className="flex items-center justify-between"
            style={{ marginBottom: 14 }}
          >
            <span
              style={{
                fontFamily: "var(--font-michroma)",
                fontSize: 10,
                color: "var(--brand)",
                letterSpacing: "0.18em",
              }}
            >
              BARBER·IO
            </span>
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: 8,
                backgroundColor: "var(--surface-2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 11, color: "var(--muted-foreground)" }}>
                ☰
              </span>
            </div>
          </div>

          {/* Page title */}
          <div style={{ marginBottom: 12 }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "var(--foreground)",
                marginBottom: 2,
                fontFamily: "var(--font-noto)",
              }}
            >
              Novo agendamento
            </p>
            <p
              style={{
                fontSize: 10,
                color: "var(--muted-foreground)",
                fontFamily: "var(--font-noto)",
              }}
            >
              Escolha data e horário
            </p>
          </div>

          {/* Date strip */}
          <div
            style={{
              display: "flex",
              gap: 6,
              marginBottom: 14,
            }}
          >
            {dates.map((d) => (
              <div
                key={d.num}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "7px 0",
                  borderRadius: 12,
                  backgroundColor: d.selected
                    ? "var(--brand)"
                    : "var(--surface-2)",
                  color: d.selected ? "white" : "var(--muted-foreground)",
                }}
              >
                <span style={{ fontSize: 8, fontFamily: "var(--font-noto)" }}>
                  {d.day}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    fontFamily: "var(--font-noto)",
                  }}
                >
                  {d.num}
                </span>
              </div>
            ))}
          </div>

          {/* Time slots */}
          <div style={{ marginBottom: 14 }}>
            <p
              style={{
                fontSize: 9,
                color: "var(--muted-foreground)",
                marginBottom: 6,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontFamily: "var(--font-noto)",
              }}
            >
              Horários disponíveis
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 5,
              }}
            >
              {slots.map((s) => (
                <div
                  key={s.time}
                  style={{
                    padding: "6px 0",
                    borderRadius: 9,
                    textAlign: "center",
                    fontSize: 10,
                    fontFamily: "var(--font-noto)",
                    backgroundColor: s.selected
                      ? "var(--brand)"
                      : s.available
                        ? "var(--surface-2)"
                        : "var(--surface-3)",
                    color: s.selected
                      ? "white"
                      : s.available
                        ? "var(--foreground)"
                        : "var(--muted-foreground)",
                    opacity: s.available ? 1 : 0.35,
                    textDecoration: s.available ? "none" : "line-through",
                  }}
                >
                  {s.time}
                </div>
              ))}
            </div>
          </div>

          {/* Service info */}
          <div
            style={{
              borderRadius: 12,
              padding: "10px 12px",
              backgroundColor: "var(--surface-2)",
              marginBottom: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: "var(--foreground)",
                    fontFamily: "var(--font-noto)",
                    marginBottom: 2,
                  }}
                >
                  ✂ Corte + Barba
                </p>
                <p
                  style={{
                    fontSize: 9,
                    color: "var(--muted-foreground)",
                    fontFamily: "var(--font-noto)",
                  }}
                >
                  45 min · com João
                </p>
              </div>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "var(--brand)",
                  fontFamily: "var(--font-noto)",
                }}
              >
                R$ 45
              </p>
            </div>
          </div>

          {/* Confirm button */}
          <div
            style={{
              width: "100%",
              padding: "10px 0",
              borderRadius: 12,
              backgroundColor: "var(--brand)",
              color: "white",
              fontSize: 10,
              fontWeight: 700,
              textAlign: "center",
              fontFamily: "var(--font-noto)",
              letterSpacing: "0.03em",
            }}
          >
            Confirmar agendamento →
          </div>
        </div>
      </div>
    </div>
  );
}
