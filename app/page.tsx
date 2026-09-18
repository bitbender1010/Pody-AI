"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import undpLogo from "@/public/undp-logo.png";
import { ChatInput } from "@/components/chat-input";
import { SuggestedQuestionCard } from "@/components/suggested-question-card";
import { suggestedQuestions } from "@/data/suggested-questions";

export default function HomePage() {
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  function selectQuestion(question: string) {
    setDraft(question);
    requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(question.length, question.length);
    });
  }

  return (
    <main className="flex min-h-[calc(100dvh-61px)] flex-1 flex-col px-5 py-6 sm:px-8 lg:min-h-dvh lg:px-10 lg:py-5">
      <div className="ml-auto hidden items-center gap-2.5 lg:flex">
        <div className="grid size-[30px] place-items-center rounded-full bg-blue-50 text-[11px] font-medium text-undp">
          DO
        </div>
        <span className="text-[13px] font-normal text-slate-700">Damilare Ololade</span>
      </div>

      <section className="mx-auto flex w-full max-w-[680px] flex-1 flex-col justify-center py-8 lg:py-10">
        <div className="mx-auto max-w-2xl text-center">
          <Image
            src={undpLogo}
            alt="United Nations Development Programme (UNDP)"
            className="mx-auto h-auto w-[88px]"
            sizes="88px"
            priority
          />
          <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">
            UniPods AI Assistant
          </p>
          <h1 className="font-display mt-2 text-[34px] leading-[1.15] tracking-normal text-ink sm:text-[40px]">
            Good Morning, Damilare
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base leading-6 text-slate-500">
            Ask me anything about the UniPods AI Innovation Programme. I can
            answer in English or French.
          </p>
        </div>

        <div className="mt-6">
          <h2 className="mb-3 text-[11px] font-medium tracking-[0.06em] text-slate-400">
            Suggested questions
          </h2>
          <div className="grid gap-2 sm:grid-cols-3">
            {suggestedQuestions.map((item) => (
              <SuggestedQuestionCard
                key={item.question}
                question={item.question}
                answer={item.answer}
                icon={item.icon}
                onSelect={() => selectQuestion(item.question)}
              />
            ))}
          </div>
        </div>
        <ChatInput value={draft} onChange={setDraft} inputRef={inputRef} />
      </section>

    </main>
  );
}
