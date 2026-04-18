"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const WA_LINK =
  "https://wa.me/5500000000000?text=Ol%C3%A1!%20Quero%20saber%20mais%20sobre%20o%20BarberIO.";

const NAV_ITEMS = [
  { label: "Funcionalidades", href: "#funcionalidades" },
  { label: "Planos", href: "#planos" },
  { label: "FAQ", href: "#faq" },
  { label: "Contato", href: WA_LINK, external: true },
];

const EASE_BG = "cubic-bezier(0.4, 0, 0.2, 1)";

const IMPULSE_FACTOR = 0.018;
const DAMPING        = 0.88;
const RETURN_LERP    = 0.032;
const DELTA_CLAMP    = 40;

// Desktop-only NAV_ITEMS (sem Contato — desktop tem o botão WA separado)
const DESKTOP_NAV = NAV_ITEMS.slice(0, 3);

export default function Header() {
  const [scrolled, setScrolled]     = useState(false);
  const [isMinimal, setIsMinimal]   = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const logoRef   = useRef<HTMLSpanElement>(null);
  const desktopNavRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const desktopCtaRef = useRef<HTMLSpanElement>(null);
  const mobileOverlayRef = useRef<HTMLDivElement>(null);
  const mobileItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const desktopVisibilityTween = useRef<gsap.core.Tween | null>(null);
  const mobileMenuTimeline = useRef<gsap.core.Timeline | null>(null);
  const rotation  = useRef(0);
  const velocity  = useRef(0);
  const returning = useRef(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafId     = useRef<number | null>(null);

  const setDesktopNavRef = (index: number) => (element: HTMLSpanElement | null) => {
    desktopNavRefs.current[index] = element;
  };

  const setMobileItemRef = (index: number) => (element: HTMLAnchorElement | null) => {
    mobileItemRefs.current[index] = element;
  };

  // Logo rotation physics
  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    const tick = () => {
      if (returning.current) {
        rotation.current += (0 - rotation.current) * RETURN_LERP;
        velocity.current  = 0;

        if (Math.abs(rotation.current) < 0.05) {
          rotation.current  = 0;
          returning.current = false;
          logo.style.transform = "rotate(0deg)";
          rafId.current = null;
          return;
        }
      } else {
        rotation.current += velocity.current;
        velocity.current *= DAMPING;

        if (Math.abs(velocity.current) < 0.005) {
          velocity.current = 0;
          rafId.current = null;
          return;
        }
      }

      logo.style.transform = `rotate(${rotation.current}deg)`;
      rafId.current = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(tick);
      }
    };

    const onWheel = (e: WheelEvent) => {
      returning.current = false;

      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 16;
      if (e.deltaMode === 2) delta *= 600;
      delta = Math.max(-DELTA_CLAMP, Math.min(DELTA_CLAMP, delta));

      velocity.current += delta * IMPULSE_FACTOR;
      startLoop();

      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        returning.current = true;
        startLoop();
      }, 2000);
    };

    window.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  // Initial header entrance
  useEffect(() => {
    const header = headerRef.current;
    const desktopItems = desktopNavRefs.current.filter(Boolean);
    const cta = desktopCtaRef.current;
    if (!header) return;

    const ctx = gsap.context(() => {
      gsap.set(header, { yPercent: -100 });

      if (desktopItems.length) {
        gsap.set(desktopItems, { autoAlpha: 0, y: 14 });
      }

      if (cta) {
        gsap.set(cta, { autoAlpha: 0, y: 14 });
      }

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline.to(header, { yPercent: 0, duration: 0.55 });

      if (desktopItems.length) {
        timeline.to(
          desktopItems,
          { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.07 },
          "-=0.2"
        );
      }

      if (cta) {
        timeline.to(
          cta,
          { autoAlpha: 1, y: 0, duration: 0.42 },
          desktopItems.length ? "-=0.22" : "-=0.15"
        );
      }
    }, header);

    return () => ctx.revert();
  }, []);

  // Scroll: update scrolled + close mobile menu on scroll
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (window.scrollY > 80) setIsMenuOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Minimal mode (when #demo section is in view)
  useEffect(() => {
    const el = document.getElementById("demo");
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsMinimal(entry.isIntersecting),
      { threshold: 0.45, rootMargin: "-10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  useEffect(() => {
    const items = desktopNavRefs.current.filter(Boolean);
    const cta = desktopCtaRef.current;
    const targets = cta ? [...items, cta] : items;
    if (!targets.length) return;

    desktopVisibilityTween.current?.kill();
    desktopVisibilityTween.current = gsap.to(targets, {
      autoAlpha: isMinimal ? 0 : 1,
      y: isMinimal ? -8 : 0,
      duration: isMinimal ? 0.22 : 0.34,
      ease: isMinimal ? "power2.in" : "power3.out",
      stagger: isMinimal ? -0.04 : 0.06,
      overwrite: true,
    });

    return () => {
      desktopVisibilityTween.current?.kill();
      desktopVisibilityTween.current = null;
    };
  }, [isMinimal]);

  useEffect(() => {
    const overlay = mobileOverlayRef.current;
    const items = mobileItemRefs.current.filter(Boolean);
    if (!overlay) return;

    if (!mobileMenuTimeline.current) {
      const timeline = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
      timeline
        .set(overlay, { pointerEvents: "auto" })
        .fromTo(
          overlay,
          { autoAlpha: 0, y: -16 },
          { autoAlpha: 1, y: 0, duration: 0.3 },
        );

      if (items.length) {
        timeline.fromTo(
          items,
          { autoAlpha: 0, y: -12 },
          { autoAlpha: 1, y: 0, duration: 0.26, stagger: 0.06 },
          "-=0.12"
        );
      }

      timeline.eventCallback("onReverseComplete", () => {
        gsap.set(overlay, { pointerEvents: "none" });
      });

      mobileMenuTimeline.current = timeline;
    }

    if (isMenuOpen) {
      mobileMenuTimeline.current.play();
    } else {
      mobileMenuTimeline.current.reverse();
    }

    return () => {
      if (!isMenuOpen) {
        gsap.set(overlay, { pointerEvents: "none" });
      }
    };
  }, [isMenuOpen]);

  useEffect(() => {
    return () => {
      desktopVisibilityTween.current?.kill();
      mobileMenuTimeline.current?.kill();
    };
  }, []);

  const showBg = scrolled && !isMinimal;
  const bgDelay = isMinimal ? "280ms" : "0ms";
  const headerHeight = scrolled ? 64 : 112;

  return (
    <header
      ref={headerRef}
      className="fixed top-0 inset-x-0 z-50"
      style={{
        backgroundColor: showBg ? "rgba(31, 31, 31, 0.8)" : "transparent",
        backdropFilter: showBg ? "blur(20px)" : "none",
        borderBottom: showBg
          ? "1px solid rgba(58, 43, 87, 0.5)"
          : "1px solid transparent",
        transition: [
          `background-color 300ms ${EASE_BG} ${bgDelay}`,
          `backdrop-filter 300ms ${EASE_BG} ${bgDelay}`,
          `border-color 300ms ${EASE_BG} ${bgDelay}`,
        ].join(", "),
      }}
    >
      {/* ── Mobile full-screen overlay ────────────────────────────────
          position: absolute (não fixed) porque o header tem transform,
          que cria um containing block — fixed filhos ficariam presos ao
          tamanho do header. absolute; top:0; height:100dvh cobre a viewport. */}
      <div
        ref={mobileOverlayRef}
        className="md:hidden absolute top-0 left-0 right-0"
        style={{
          height: "100dvh",
          backgroundColor: "rgba(13,10,18,0.98)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          opacity: 0,
          transform: "translateY(-16px)",
          pointerEvents: "none",
          paddingTop: headerHeight + 24,
          paddingLeft: 24,
          paddingRight: 24,
          paddingBottom: 48,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <nav style={{ display: "flex", flexDirection: "column" }}>
          {NAV_ITEMS.map(({ label, href, external }, i) => (
            <a
              key={href + label}
              ref={setMobileItemRef(i)}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              onClick={() => setIsMenuOpen(false)}
              style={{
                display: "block",
                padding: "20px 0",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                fontSize: 22,
                fontFamily: "var(--font-noto)",
                fontWeight: 500,
                color: label === "Contato" ? "#F97316" : "rgba(244,240,251,0.9)",
                textDecoration: "none",
                opacity: 0,
                transform: "translateY(-10px)",
              }}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>

      {/* ── Header bar — rendered after overlay, paints on top ── */}
      <div
        className="relative max-w-6xl mx-auto px-6 flex items-center justify-between"
        style={{
          height: `${headerHeight}px`,
          transition: "height 300ms ease",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <span ref={logoRef} style={{ display: "inline-flex", willChange: "transform" }}>
            <Image
              src="/assets/LOGO1.png"
              alt="BarberIO"
              width={60}
              height={20}
              style={{ objectFit: "contain" }}
              priority
            />
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-8">
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {DESKTOP_NAV.map(({ label, href }, i) => {
              return (
                <span
                  key={href}
                  ref={setDesktopNavRef(i)}
                  style={{
                    display: "inline-block",
                  }}
                >
                  <Link
                    href={href}
                    className="relative text-sm after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100"
                    style={{
                      color: "#FFFFFF",
                      fontFamily: "var(--font-noto)",
                    }}
                  >
                    {label}
                  </Link>
                </span>
              );
            })}
          </nav>

          {/* Desktop WA button — hidden on mobile */}
          <div className="hidden md:block">
            <span
              ref={desktopCtaRef}
              style={{
                display: "inline-flex",
              }}
            >
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  border: "1px solid #F97316",
                  color: "#FFFFFF",
                  backgroundColor: "transparent",
                  fontFamily: "var(--font-noto)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(249,115,22,0.10)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                }}
              >
                <WhatsAppIcon />
                <span className="hidden sm:inline">Contato</span>
              </a>
            </span>
          </div>

          {/* Hamburger / X — mobile only */}
          <button
            className="flex md:hidden items-center justify-center"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            style={{
              background: "none",
              border: "none",
              color: "#ffffff",
              cursor: "pointer",
              padding: 4,
            }}
          >
            {isMenuOpen ? <XIcon /> : <HamburgerIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}

function HamburgerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="19" y2="6" />
      <line x1="3" y1="11" x2="19" y2="11" />
      <line x1="3" y1="16" x2="19" y2="16" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="4" y1="4" x2="18" y2="18" />
      <line x1="18" y1="4" x2="4" y2="18" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
