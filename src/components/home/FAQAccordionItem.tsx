import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { HomepageFAQ } from "@/data/homepage";

export interface FAQAccordionItemProps {
  faq: HomepageFAQ;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

export const FAQAccordionItem: React.FC<FAQAccordionItemProps> = ({
  faq,
  isOpen,
  onToggle,
  index,
}) => {
  const numberDisplay = String(faq.id || index + 1).padStart(2, "0");
  const triggerId = `faq-trigger-${faq.id || index + 1}`;
  const panelId = `faq-panel-${faq.id || index + 1}`;

  return (
    <div
      className={cn(
        "rounded-2xl border transition-all duration-200 overflow-hidden text-left motion-reduce:transition-none",
        isOpen
          ? "border-[#1769E0] bg-[#F8FAFF] shadow-xs ring-1 ring-[#1769E0]/15"
          : "border-[#E3EAF3] bg-white hover:border-slate-300 hover:shadow-2xs hover:bg-[#F8FAFC]/60"
      )}
    >
      <button
        id={triggerId}
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1769E0] transition-colors"
      >
        <span className="text-sm sm:text-base font-bold text-[#14213D] flex items-center gap-3.5 tracking-tight">
          <span
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors motion-reduce:transition-none",
              isOpen
                ? "bg-[#1769E0] text-white"
                : "bg-[#EEF5FF] text-[#1769E0]"
            )}
          >
            {numberDisplay}
          </span>
          <span className="leading-snug">{faq.question}</span>
        </span>

        <ChevronDown
          className={cn(
            "w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 motion-reduce:transition-none",
            isOpen ? "rotate-180 text-[#1769E0]" : ""
          )}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          id={panelId}
          role="region"
          aria-labelledby={triggerId}
          className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 text-[15px] sm:text-[16px] text-[#475467] leading-[1.75] border-t border-blue-100/60 mt-1 animate-in fade-in-50 duration-200 motion-reduce:animate-none"
        >
          {/* Lead Paragraph if structured, otherwise fallback */}
          {faq.lead && <p className="pt-4">{faq.lead}</p>}

          {/* Subheading (e.g. FAQ 06 "Recent achievers include:") */}
          {faq.subheading && (
            <p className="pt-3 font-bold text-[#14213D]">{faq.subheading}</p>
          )}

          {/* Structured Achievers List (FAQ 06) */}
          {faq.achievers && faq.achievers.length > 0 && (
            <ul className="mt-3 space-y-2">
              {faq.achievers.map((achiever, idx) => (
                <li
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 text-sm sm:text-[15px] p-3 rounded-xl bg-white border border-slate-200/70 shadow-2xs"
                >
                  <span className="font-bold text-[#1769E0] shrink-0">
                    {achiever.yearExam} —
                  </span>
                  <span className="font-semibold text-[#14213D] shrink-0">
                    {achiever.student}:
                  </span>
                  <span className="text-[#475467]">{achiever.detail}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Structured Bullets (FAQ 01, FAQ 03) */}
          {faq.bullets && faq.bullets.length > 0 && (
            <ul className="mt-3 space-y-2.5">
              {faq.bullets.map((point, idx) => {
                const parts = point.split(" — ");
                const isLegacyPoint = point.startsWith("15+ Years");

                return (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-sm sm:text-[15px]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1769E0] shrink-0 mt-2.5" />
                    <span>
                      {parts.length > 1 ? (
                        <>
                          <strong className="font-bold text-[#14213D]">
                            {parts[0]}
                          </strong>{" "}
                          — {parts.slice(1).join(" — ")}
                        </>
                      ) : isLegacyPoint ? (
                        <strong className="font-bold text-[#14213D]">
                          {point}
                        </strong>
                      ) : (
                        point
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}

          {/* Structured Paragraphs (FAQ 05) */}
          {faq.paragraphs && faq.paragraphs.length > 0 && (
            <div className="pt-4 space-y-3">
              {faq.paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          )}

          {/* Standard Single Answer (FAQ 02, 04, 07, 08, 09, 10, 11, 12, 13) */}
          {!faq.lead && !faq.paragraphs && (
            <p className="pt-4">
              {faq.highlight ? (
                <>
                  Emprise Academy&apos;s Mathura Corporate Centre is located{" "}
                  <strong className="font-semibold text-[#14213D]">
                    {faq.highlight}
                  </strong>
                  .
                </>
              ) : (
                faq.answer
              )}
            </p>
          )}

          {/* Single Closing Note (FAQ 01, FAQ 03) */}
          {faq.closing && (
            <p
              className={cn(
                "pt-3.5",
                faq.id === 3
                  ? "font-bold text-[#1769E0] text-sm sm:text-[15px]"
                  : "text-[#475467]"
              )}
            >
              {faq.closing}
            </p>
          )}

          {/* Closing Paragraphs (FAQ 06) */}
          {faq.closingParagraphs && faq.closingParagraphs.length > 0 && (
            <div className="pt-3.5 space-y-2.5">
              {faq.closingParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
