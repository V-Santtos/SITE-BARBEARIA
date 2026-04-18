"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

// ── Posição vertical do título: desktop sobrepõe HaloTransition; mobile fica abaixo da faixa de blur
const BASE_TITLE_Y         = -500;
const BASE_TITLE_Y_MOBILE  = -420;
// ── Faixa do progress base em que o título aparece
// Começa mais tarde (0.40) para o halo já estar bem visível quando o título emerge
const TITLE_START = 0.60;
const TITLE_END   = 0.75;
// ── Parâmetros do reveal
const BLUR_MAX  = 3;   // px — desfoque inicial sutil, não exagerado
const SLIDE_AMT = 24;  // px — deslocamento vertical inicial

// ── SVG path data from feliz.svg and triste.svg ──
const SHARED_BASE =
  "m254.5 10.12c12.18-0.08 20.97 0.45 31 1.88 7.7 1.09 17.38 2.7 21.5 3.58 4.13 0.87 12.23 2.95 18 4.61 5.77 1.66 14.89 4.77 20.25 6.91 5.36 2.15 14.14 6.09 19.5 8.78 5.36 2.68 13.8 7.27 18.75 10.2 4.95 2.92 14.4 9.39 21 14.36 6.6 4.97 17.43 14.45 24.06 21.05 6.64 6.61 15.09 15.84 18.8 20.51 3.7 4.67 9.73 13 13.4 18.5 3.66 5.5 9.69 15.85 13.39 23 3.71 7.15 8.82 18.4 11.37 25 2.54 6.6 6.17 17.85 8.06 25 1.89 7.15 4.56 20.76 5.93 30.25 1.72 11.93 2.49 21.64 2.5 31.5 0 8.57-0.8 20.42-2.01 29.75-1.12 8.52-3.63 22.02-5.6 30-1.97 7.98-5.81 20.35-8.54 27.5-2.72 7.15-7.99 18.85-11.71 26-3.71 7.15-9.42 17.05-12.69 22-3.26 4.95-9.48 13.5-13.82 19-4.34 5.5-13.13 15.18-19.52 21.5-6.4 6.32-16.81 15.39-23.13 20.14-6.32 4.75-15.54 11.1-20.49 14.11-4.95 3.02-13.73 7.85-19.5 10.75-5.77 2.9-15.45 7.2-21.5 9.57-6.05 2.36-17.07 5.9-24.5 7.86-7.43 1.96-21.15 4.69-30.5 6.07-12.47 1.84-21.13 2.51-32.5 2.51-11.37 0-20.03-0.67-32.5-2.51-9.35-1.38-22.85-4.05-30-5.93-7.15-1.88-18.4-5.51-25-8.05-6.6-2.55-17.85-7.67-25-11.38-7.15-3.71-17.05-9.41-22-12.68-4.95-3.26-13.5-9.49-19-13.84-5.5-4.35-14.74-12.68-20.53-18.51-5.79-5.84-13.57-14.43-17.3-19.11-3.72-4.68-9.76-13-13.43-18.5-3.66-5.5-9.69-15.85-13.4-23-3.72-7.15-8.81-18.4-11.34-25-2.52-6.6-6.14-17.85-8.05-25-1.91-7.15-4.59-20.76-5.96-30.25-1.72-11.93-2.49-21.64-2.5-31.5 0-8.57 0.8-20.42 2.01-29.75 1.12-8.53 3.64-22.03 5.6-30 1.97-7.97 5.62-19.9 8.11-26.5 2.5-6.6 7.61-18.07 11.37-25.5 3.76-7.43 9.89-18.08 13.63-23.69 3.73-5.6 9.71-13.92 13.29-18.48 3.58-4.56 11.45-13.29 17.5-19.41 6.05-6.12 15.28-14.52 20.5-18.67 5.22-4.15 14-10.54 19.5-14.19 5.5-3.66 15.85-9.62 23-13.26 7.15-3.64 18.63-8.74 25.5-11.33 6.88-2.58 18.13-6.16 25-7.93 6.88-1.78 19.25-4.26 27.5-5.52 10.7-1.62 19.88-2.31 32-2.4zm-40 35c-6.05 1.16-17.53 4.25-25.5 6.85-7.97 2.61-20.13 7.47-27 10.81-6.87 3.34-17.68 9.53-24 13.75-6.32 4.23-14.88 10.5-19 13.95-4.12 3.45-12.22 11.17-18 17.16-5.78 5.99-13.19 14.48-16.48 18.87-3.3 4.4-8.4 11.81-11.34 16.49-2.95 4.68-7.86 13.68-10.9 20-3.05 6.32-7.49 17.35-9.87 24.5-2.37 7.15-5.24 17.16-6.36 22.25-1.13 5.09-2.73 14.99-3.55 22-0.83 7.01-1.5 17.48-1.51 23.25 0 5.77 0.45 15.23 1.01 21 0.56 5.77 1.97 15.45 3.12 21.5 1.16 6.05 4.23 17.52 6.83 25.5 2.6 7.98 7.47 20.13 10.81 27 3.35 6.88 9.54 17.68 13.77 24 4.22 6.32 10.51 14.88 13.96 19 3.46 4.13 10.95 12.02 16.65 17.54 5.7 5.52 14.19 12.94 18.86 16.48 4.68 3.54 13 9.19 18.5 12.55 5.5 3.35 14.5 8.24 20 10.86 5.5 2.62 16.53 6.92 24.5 9.56 7.97 2.63 19.45 5.73 25.5 6.87 6.05 1.15 15.72 2.55 21.5 3.12 5.78 0.57 14.78 1.03 20 1.03 5.23 0 14.23-0.45 20-1.01 5.77-0.56 15.45-1.97 21.5-3.12 6.05-1.16 17.52-4.24 25.5-6.85 7.98-2.61 19.68-7.24 26-10.3 6.32-3.05 15.32-7.96 20-10.91 4.68-2.94 12.09-8.04 16.49-11.34 4.39-3.29 12.88-10.71 18.87-16.48 5.99-5.77 13.71-13.87 17.16-18 3.45-4.12 9.73-12.68 13.95-19 4.23-6.32 10.42-17.12 13.77-24 3.34-6.87 8.21-19.02 10.81-27 2.6-7.98 5.67-19.45 6.83-25.5 1.15-6.05 2.56-15.73 3.12-21.5 0.56-5.77 1.01-14.77 1.01-20 0-5.22-0.45-14.22-1.01-20-0.56-5.77-1.97-15.45-3.12-21.5-1.16-6.05-4.23-17.52-6.83-25.5-2.6-7.97-7.47-20.12-10.81-27-3.35-6.87-9.54-17.68-13.77-24-4.22-6.32-10.5-14.87-13.95-19-3.45-4.12-11.17-12.22-17.16-18-5.99-5.77-14.48-13.19-18.87-16.48-4.4-3.3-11.81-8.4-16.49-11.34-4.68-2.95-13.68-7.86-20-10.91-6.32-3.06-18.02-7.69-26-10.3-7.98-2.61-19.45-5.69-25.5-6.85-6.05-1.15-15.73-2.56-21.5-3.12-5.77-0.56-15.68-0.95-22-0.87-6.32 0.07-15.32 0.53-20 1.01-4.68 0.48-13.45 1.82-19.5 2.98zm-34 119.19c4.75 0.16 8.45 0.93 11.5 2.41 2.47 1.19 6.19 3.77 8.25 5.72 2.06 1.96 4.97 5.92 6.45 8.81 2.28 4.43 2.7 6.51 2.7 13.25-0.01 6.4-0.5 9-2.43 13-1.33 2.75-4.46 6.94-6.94 9.32-2.57 2.45-6.8 5.16-9.78 6.25-2.91 1.07-7.81 1.93-11 1.93-3.16 0.01-8-0.78-10.75-1.74-3.32-1.16-6.88-3.6-10.58-7.26-3.88-3.82-6.11-7.03-7.29-10.5-0.94-2.75-1.7-7.7-1.7-11 0-3.3 0.67-8.02 1.5-10.5 0.82-2.47 3.42-6.7 5.78-9.39 2.36-2.68 6.08-5.79 8.26-6.91 2.18-1.11 5.11-2.38 6.5-2.82 1.39-0.45 5.68-0.7 9.53-0.57zm153.5 0.04c5.57 0.24 8.79 0.97 12.5 2.85 2.75 1.39 6.93 4.72 9.29 7.41 2.36 2.69 4.96 6.92 5.78 9.39 0.83 2.48 1.5 7.2 1.5 10.5 0 3.3-0.76 8.25-1.7 11-1.18 3.47-3.41 6.68-7.29 10.5-3.7 3.66-7.26 6.1-10.58 7.26-2.75 0.96-7.59 1.75-10.75 1.74-3.19 0-8.09-0.86-11-1.93-2.98-1.09-7.21-3.8-9.78-6.25-2.48-2.38-5.61-6.57-6.94-9.32-1.93-4-2.42-6.6-2.43-13 0-6.76 0.41-8.77 2.66-13 1.47-2.75 3.47-5.94 4.45-7.09 0.99-1.16 3.36-3.27 5.29-4.7 1.93-1.44 5.3-3.3 7.5-4.15 2.69-1.04 6.45-1.43 11.5-1.21z";

const SMILE_PATH =
  "zm-201 122.66c2.75 0 5.77 0.78 7.75 1.99 1.79 1.1 5.37 5.26 7.97 9.25 2.6 3.99 8.11 10.63 12.25 14.76 4.14 4.12 11.35 10.06 16.03 13.18 4.68 3.12 11.88 7.23 16 9.12 4.13 1.9 11.32 4.6 16 6.02 4.68 1.41 12.55 3.37 17.5 4.35 6.85 1.35 13.91 1.78 29.5 1.78 15.59 0 22.65-0.43 29.5-1.78 4.95-0.98 12.82-2.94 17.5-4.35 4.68-1.42 11.88-4.12 16-6.02 4.13-1.89 11.32-6 15.98-9.12 4.66-3.13 11.68-8.84 15.59-12.69 3.91-3.85 9.44-10.49 12.27-14.75 2.84-4.26 6.62-8.65 8.41-9.75 1.79-1.09 4.94-1.99 7-2 2.06 0 5.21 0.59 7 1.32 1.79 0.72 4.35 2.86 5.7 4.75 1.43 1.99 2.63 5.31 2.87 7.93 0.3 3.19-0.16 5.67-1.59 8.5-1.11 2.2-4.17 6.93-6.79 10.5-2.63 3.58-7.74 9.59-11.36 13.37-3.62 3.78-10.18 9.62-14.58 12.98-4.4 3.36-11.6 8.17-16 10.7-4.4 2.52-11.82 6.21-16.5 8.21-4.68 1.99-12.55 4.8-17.5 6.23-4.95 1.44-13.95 3.47-20 4.51-6.05 1.05-17.07 2.21-24.5 2.58-8.08 0.4-18.52 0.21-26-0.49-6.87-0.63-17-2.06-22.5-3.18-5.5-1.11-14.72-3.6-20.5-5.54-5.78-1.93-15.45-6.06-21.5-9.17-6.05-3.11-14.6-8.33-19-11.6-4.4-3.27-10.86-8.68-14.36-12.02-3.49-3.34-8.51-8.78-11.15-12.08-2.64-3.3-6.43-8.7-8.41-12-2.74-4.55-3.61-7.09-3.59-10.5 0.01-2.72 0.81-5.79 2.01-7.75 1.1-1.79 3.46-4.15 5.25-5.25 1.98-1.21 5-1.99 7.75-1.99z";

const FROWN_PATH =
  "zm-80 106.83c1.93-0.09 8.68 0.29 15 0.85 6.32 0.55 16 2.09 21.5 3.4 5.5 1.32 13.6 3.83 18 5.57 4.4 1.73 11.38 5.02 15.5 7.31 4.13 2.28 11.1 6.82 15.5 10.09 4.4 3.26 11.6 9.61 16 14.1 4.4 4.48 10.83 12.17 14.29 17.08 3.47 4.9 7 10.72 7.86 12.92 0.96 2.47 1.32 5.34 0.95 7.5-0.33 1.93-1.5 4.96-2.6 6.75-1.1 1.79-3.46 3.98-5.25 4.86-1.79 0.89-5.05 1.62-7.25 1.62-2.2 0-5.46-0.73-7.25-1.62-2.21-1.09-5.29-4.73-9.61-11.36-4.34-6.65-9.4-12.61-15.88-18.75-5.36-5.07-13.15-11.18-17.85-14-4.6-2.75-12.19-6.43-16.88-8.17-4.69-1.75-12.35-3.99-17.03-4.98-5.97-1.28-12.81-1.81-23-1.81-10.19 0-17.03 0.53-23 1.81-4.68 0.99-12.34 3.23-17.03 4.98-4.69 1.74-12.28 5.42-16.88 8.17-4.7 2.82-12.49 8.93-17.85 14-6.28 5.95-11.64 12.22-15.77 18.5-3.7 5.61-7.54 10.22-9.37 11.25-1.75 0.99-5.17 1.75-7.85 1.75-2.99-0.01-5.95-0.75-8-2-1.81-1.12-4.12-3.88-5.23-6.25-1.09-2.34-1.98-5.37-1.99-6.75 0-1.37 1.05-4.75 2.34-7.5 1.29-2.75 5.19-8.82 8.68-13.5 3.48-4.67 9.51-11.67 13.39-15.54 3.88-3.88 10.44-9.55 14.56-12.62 4.13-3.06 10.65-7.4 14.5-9.64 3.85-2.23 10.82-5.63 15.5-7.55 4.68-1.92 12.1-4.39 16.5-5.49 4.4-1.1 11.38-2.49 15.5-3.09 4.13-0.6 9.53-1.24 12-1.41 2.47-0.17 6.07-0.39 8-0.48z";

const FELIZ_D = SHARED_BASE + SMILE_PATH;
const TRISTE_D = SHARED_BASE + FROWN_PATH;

// ── Face icon component ──
function FaceIcon({ type, size = 40 }: { type: "happy" | "sad"; size?: number }) {
  return (
    <svg
      viewBox="0 0 512 512"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <path
        fillRule="evenodd"
        fill={type === "happy" ? "#FFB079" : "#FFDBDB"}
        d={type === "happy" ? FELIZ_D : TRISTE_D}
      />
    </svg>
  );
}

// ── Card data ──
type CardData = { type: "happy" | "sad"; title: string; desc: string };

const row1: CardData[] = [
  {
    type: "sad",
    title: "Mensagens o tempo todo",
    desc: "Clientes perguntando horários disponíveis a qualquer hora, interrompendo o seu trabalho.",
  },
  {
    type: "happy",
    title: "Feedback automatico",
    desc: "O cliente recebe todos os detalhes da reserva por mensagem, sem você precisar fazer nada.",
  },
  {
    type: "sad",
    title: "Reagendamentos manuais",
    desc: "Cada reagendamento vira uma troca longa de mensagens que bagunça a agenda inteira.",
  },
  {
    type: "happy",
    title: "Cliente reagenda e cancela",
    desc: "Sem precisar de você. O sistema organiza a agenda em tempo real, sem conflitos.",
  },
];

const row2: CardData[] = [
  {
    type: "sad",
    title: "Agenda desorganizada",
    desc: "Marcação dupla, horários esquecidos e confusão geral que prejudica o atendimento.",
  },
  {
    type: "happy",
    title: "Agenda sempre organizada",
    desc: "Sem marcação dupla, sem surpresas. Controle total sobre sua disponibilidade.",
  },
  {
    type: "sad",
    title: "Tempo desperdiçado",
    desc: "Horas por semana perdidas com processos repetitivos que podiam ser automáticos.",
  },
  {
    type: "happy",
    title: "Site para sua barbearia",
    desc: "Com sua marca, logo e link direto para agendamento. Passa profissionalismo imediato.",
  },
];

// Card width + margin-right = 296px per slot → -50% of 8×296=2368 = -1184px (exactly 4 cards) ✓
const CARD_W = 460;
const CARD_H = 250;
const CARD_GAP = 0;

function Card({ item }: { item: CardData }) {
  return (
    <div
      style={{
        position: "relative",
        width: CARD_W,
        height: CARD_H,
        flexShrink: 0,
        marginRight: CARD_GAP,
      }}
    >
      <Image
        src="/assets/Rectangle 26.png"
        fill
        style={{ objectFit: "fill" }}
        alt=""
        aria-hidden
        draggable={false}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          gap: 26,
          padding: "0 42px",
        }}
      >
        <FaceIcon type={item.type} size={82} />
        <div style={{ minWidth: 0 }}>
          <p
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: item.type === "happy" ? "#FFB079" : "#FFDBDB",
              fontFamily: "var(--font-noto)",
              marginBottom: 8,
              lineHeight: 1.3,
            }}
          >
            {item.title}
          </p>
          <p
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.50)",
              fontFamily: "var(--font-noto)",
              lineHeight: 1.5,
            }}
          >
            {item.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  direction,
  duration = 28,
}: {
  items: CardData[];
  direction: "left" | "right";
  duration?: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <div
        style={{
          display: "flex",
          width: "max-content",
          animationName: direction === "left" ? "marquee-left" : "marquee-right",
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {doubled.map((item, i) => (
          <Card key={i} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function PainBenefits() {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const baseTitleY = isMobile ? BASE_TITLE_Y_MOBILE : BASE_TITLE_Y;

    let ticking = false;
    let cancelled = false;

    function update() {
      const titleEl = titleRef.current;
      const container = document.getElementById("halo-transition");
      if (!container || !titleEl) return;

      const rect = container.getBoundingClientRect();
      const viewH = window.innerHeight;

      // Progress espelhado do HaloTransition (mesmo cálculo por breakpoint)
      let rawProgress: number;
      if (isMobile) {
        rawProgress = (viewH - rect.top) / (viewH * 0.9);
      } else {
        rawProgress = (viewH * 1.3 - rect.top) / (viewH * 1.3);
      }
      const progress = Math.max(0, Math.min(1, rawProgress));

      // Mapeado para o range do título (0.25 → 0.65)
      const titleProgress = Math.max(0, Math.min(1,
        (progress - TITLE_START) / (TITLE_END - TITLE_START)
      ));

      // easeOutQuad: entrada suave, pousa sem solavanco
      const eased = 1 - Math.pow(1 - titleProgress, 2);

      const blurPx  = BLUR_MAX  * (1 - eased);
      const slideY  = SLIDE_AMT * (1 - eased);

      titleEl.style.opacity   = String(eased);
      titleEl.style.filter    = `blur(${blurPx.toFixed(2)}px)`;
      titleEl.style.transform = `translateY(${baseTitleY + slideY}px)`;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!cancelled) update();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      cancelled = true;
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      id="funcionalidades"
style={{
        position: "relative",
        backgroundColor: "#1E1E1E",
        padding: "80px 0 200px",
        overflow: "visible",
      }}
    >

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Section header */}
        <div
          ref={titleRef}
          className="text-center mb-16 max-w-6xl mx-auto px-6"
          style={{ transform: `translateY(${BASE_TITLE_Y + SLIDE_AMT}px)`, opacity: 0, filter: `blur(${BLUR_MAX}px)`, willChange: "transform, opacity, filter" }}
        >
          <h2
            style={{
              fontFamily: "var(--font-jost)",
              fontWeight: 500,
              fontSize: "clamp(1.7rem, 3vw, 2.4rem)",
              color: "rgba(255,255,255,0.85)",
              lineHeight: 1.2,
              marginBottom: -8,
              letterSpacing: "0.01em",
            }}
          >
            A fórmula certa com processo inteligente
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
            }}
          >
            tudo flui, tudo se encaixa.
          </p>
        </div>

        {/* Carousel — two rows below the halo */}
        <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: -150 }}>
          <MarqueeRow items={row1} direction="left" duration={30} />
          <MarqueeRow items={row2} direction="right" duration={26} />
        </div>
      </div>
    </section>
  );
}
