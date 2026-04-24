"use client";

import { useRef, useEffect } from "react";

// Desktop: offset grande dá efeito de profundidade e movimento amplo.
// Mobile: imagem é renderizada em 260% de largura (vs 102% no desktop) para compensar
// o viewport estreito — sem isso o halo fica com ~120px de altura e aparece como
// uma faixa fina na borda com PainBenefits. Com offset menor, o halo já está
// parcialmente visível quando HaloTransition entra em view.
const OFFSET_DESKTOP = -820;
const OFFSET_MOBILE = -580;

export default function HaloTransition() {
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    const container = containerRef.current;
    if (!img || !container) return;

    const isMobile = window.innerWidth < 768;
    const offsetStart = isMobile ? OFFSET_MOBILE : OFFSET_DESKTOP;

    if (isMobile) {
      img.style.width = "200%";
    }

    img.style.transform = `translateX(-50%) translateY(${offsetStart}px)`;

    let ticking = false;
    let cancelled = false;

    function update() {
      if (!img || !container) return;
      const rect = container.getBoundingClientRect();
      const viewH = window.innerHeight;

      // Mobile: animação começa quando a seção entra no viewport (rect.top = viewH)
      // Desktop: começa 1.3× antes para o efeito de profundidade antecipado
      let rawProgress: number;
      if (isMobile) {
        rawProgress = (viewH - rect.top) / (viewH * 0.9);
      } else {
        rawProgress = (viewH * 1.3 - rect.top) / (viewH * 1.3);
      }
      const progress = Math.max(0, Math.min(1, rawProgress));

      // easeOutCubic: descida rápida no início, pousa suavemente na posição final
      const eased = 1 - Math.pow(1 - progress, 3);

      const offsetY = offsetStart * (1 - eased);
      img.style.transform = `translateX(-50%) translateY(${offsetY}px)`;
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
    <div
      id="halo-transition"
      ref={containerRef}
      className="h-[420px] md:h-[600px]"
      style={{
        position: "relative",
        width: "100%",
        backgroundColor: "#1E1E1E",
        overflow: "hidden",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        id="halo-img"
        ref={imgRef}
        src="/assets/2.png"
        alt=""
        aria-hidden="true"
        draggable={false}
        // className="w-[200%] md:w-[102%]"
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: `translateX(-50%) translateY(${OFFSET_DESKTOP}px)`,
          width: "102%",
          height: "auto",
          mixBlendMode: "lighten",
          maxWidth: "none",
          pointerEvents: "none",
          userSelect: "none",
          display: "block",
          willChange: "transform",
        }}
      />
    </div>
  );
}
