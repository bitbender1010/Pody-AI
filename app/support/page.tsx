import { PageHeader } from "@/components/page-header";
import { SupportCard } from "@/components/support-card";
import { supportContacts } from "@/data/support";

export default function SupportPage() {
  return (
    <main className="flex-1 px-5 py-9 sm:px-8 lg:px-10 lg:py-12">
      <PageHeader
        title="Support"
        description="Need help? Reach out to the appropriate support contact below."
      />
      <section className="mx-auto mt-7 grid w-full max-w-[800px] gap-3 md:grid-cols-2">
        {supportContacts.map((contact) => (
          <SupportCard
            key={contact.title}
            title={contact.title}
            label={contact.label}
            value={contact.value}
            href={contact.href}
            description={contact.description}
            icon={contact.icon}
          />
        ))}
      </section>
    </main>
  );
}
