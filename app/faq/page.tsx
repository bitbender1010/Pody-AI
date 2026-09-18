import { FAQItem } from "@/components/faq-item";
import { PageHeader } from "@/components/page-header";
import { faqs } from "@/data/faqs";

export default function FAQPage() {
  return (
    <main className="flex-1 px-5 py-9 sm:px-8 lg:px-10 lg:py-12">
      <PageHeader
        title="FAQ"
        description="Answers to common questions about the UniPods programme, hackathon, MIT course, and Wadhwani sessions."
      />
      <section className="mx-auto mt-7 grid w-full max-w-[800px] gap-2.5">
        {faqs.map((faq) => (
          <FAQItem
            key={faq.id}
            question={faq.question}
            answer={faq.answer}
            updatedAt={faq.updatedAt}
          />
        ))}
      </section>
    </main>
  );
}
