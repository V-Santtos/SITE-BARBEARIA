"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";

const faqsLeft = [
  {
    question: "Funciona pelo WhatsApp?",
    answer:
      "Sim. O sistema se integra com o WhatsApp para enviar confirmações, lembretes e notificações automáticas para os seus clientes. Eles também podem agendar pelo link do seu site ou diretamente pelo WhatsApp.",
  },
  {
    question: "O cliente consegue reagendar sozinho?",
    answer:
      "Sim. O cliente pode reagendar pelo próprio link de confirmação que recebe após o agendamento. Tudo acontece de forma automática — sem precisar falar com você.",
  },
  {
    question: "Posso usar com a minha marca?",
    answer:
      "Com certeza. O site da sua barbearia é personalizado com o nome, logo e identidade visual do seu negócio. Parece que foi feito especialmente para você — porque foi.",
  },
  {
    question: "Serve para barbearia pequena?",
    answer:
      "Serve muito bem. O sistema foi pensado justamente para barbeiros autônomos e barbearias pequenas que querem se organizar melhor sem precisar contratar alguém só para isso.",
  },
];

const faqsRight = [
  {
    question: "Como funciona a implantação?",
    answer:
      "Você entra em contato pelo WhatsApp, a gente configura tudo junto em poucas horas. Não precisa instalar nada, não precisa de servidor, não precisa de técnico.",
  },
  {
    question: "Preciso saber mexer em sistema?",
    answer:
      "Não. A interface é simples e direta. Se você sabe usar o WhatsApp, você sabe usar o sistema. E se tiver qualquer dúvida, o suporte está disponível.",
  },
  {
    question: "O cliente consegue cancelar sozinho?",
    answer:
      "Sim. O cancelamento também é feito pelo próprio cliente, pelo link que recebe na confirmação. O horário é liberado automaticamente na sua agenda.",
  },
  {
    question: "O sistema ajuda a reduzir confusão de horários?",
    answer:
      "Sim, é uma das principais vantagens. O sistema mostra apenas os horários realmente disponíveis, bloqueia automaticamente os ocupados e elimina a possibilidade de marcação dupla.",
  },
];

function FAQItem({
  question,
  answer,
  isLast,
}: {
  question: string;
  answer: string;
  isLast: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        borderBottom: isLast ? "none" : "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-jost)",
            fontSize: 15,
            fontWeight: 500,
            color: "rgba(255,255,255,0.85)",
            lineHeight: 1.4,
          }}
        >
          {question}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            flexShrink: 0,
            width: 20,
            height: 20,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: open ? "#F97316" : "rgba(255,255,255,0.4)",
            fontSize: 16,
            lineHeight: 1,
          }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                fontFamily: "var(--font-jost)",
                fontSize: 14,
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.7,
                paddingBottom: 20,
              }}
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const EASE = "cubic-bezier(0, 0, 0.2, 1)";
  const DUR = "700ms";

  return (
    <section
      ref={sectionRef}
      id="faq"
      style={{
        backgroundColor: "#111111",
        padding: "112px 0 96px",
      }}
    >
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          {/* Label */}
          <p
            style={{
              fontFamily: "var(--font-jost)",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#F97316",
              marginBottom: 14,
              opacity: visible ? 1 : 0,
              transition: `opacity ${DUR} ${EASE} 0ms`,
            }}
          >
            Perguntas frequentes
          </p>

          {/* Title com VerticalCutReveal */}
          <h2
            style={{
              fontFamily: "var(--font-jost)",
              fontSize: "clamp(1.9rem, 4vw, 3rem)",
              fontWeight: 600,
              color: "rgba(255,255,255,0.88)",
              lineHeight: 1.2,
              marginBottom: 4,
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
                transition={{ type: "spring", stiffness: 220, damping: 32, delay: 0.05 }}
              >
                Ficou alguma dúvida?
              </VerticalCutReveal>
            )}
          </h2>

          {/* Description */}
          <p
            style={{
              fontFamily: "var(--font-jost)",
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
              color: "rgba(255,255,255,0.45)",
              margin: "0 auto 28px",
              lineHeight: 1.5,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: `opacity ${DUR} ${EASE} 200ms, transform ${DUR} ${EASE} 200ms`,
            }}
          >
            Tudo o que você precisa saber sobre como o sistema funciona.
          </p>

          {/* WhatsApp button */}
          <a
            href="https://wa.me/5500000000000?text=Ol%C3%A1!%20Tenho%20uma%20d%C3%BAvida%20sobre%20o%20BarberIO."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "11px 24px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.15)",
              fontFamily: "var(--font-jost)",
              fontSize: 14,
              fontWeight: 500,
              color: "rgba(255,255,255,0.6)",
              textDecoration: "none",
              transition: "border-color 200ms, color 200ms",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(249,115,22,0.5)";
              el.style.color = "rgba(255,255,255,0.9)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(255,255,255,0.15)";
              el.style.color = "rgba(255,255,255,0.6)";
            }}
          >
            <WhatsAppIcon />
            Tirar dúvidas
          </a>
        </div>

        {/* 2-column accordion */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "0 48px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: `opacity ${DUR} ${EASE} 500ms, transform ${DUR} ${EASE} 500ms`,
          }}
        >
          {[faqsLeft, faqsRight].map((column, colIdx) => (
            <div key={colIdx}>
              {column.map((item, i) => (
                <FAQItem
                  key={i}
                  question={item.question}
                  answer={item.answer}
                  isLast={i === column.length - 1}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
