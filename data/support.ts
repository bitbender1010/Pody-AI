import { Headphones, Mail, MessageCircle, Wrench } from "lucide-react";

export const supportContacts = [
  {
    title: "Email support",
    label: "Programme Email",
    value: "unipods.regional@undp.org",
    href: "mailto:unipods.regional@undp.org",
    description:
      "For scheduling, recordings, hackathon guidelines, team declarations, and general UniPods questions.",
    icon: Mail,
  },
  {
    title: "WhatsApp support",
    label: "Munira",
    value: "+250 786 387 244",
    href: "https://wa.me/250786387244",
    description:
      "Use this contact if your MIT invitation is missing or your applicant email needs confirmation.",
    icon: MessageCircle,
  },
  {
    title: "General programme contact",
    label: "UniPods team",
    value: "unipods.regional@undp.org",
    href: "mailto:unipods.regional@undp.org",
    description:
      "Ask about programme milestones, Addis Ababa AI Institute progression, or official announcements.",
    icon: Headphones,
  },
  {
    title: "Technical support",
    label: "MIT platform help",
    value: "uaisupport@mit.edu",
    href: "mailto:uaisupport@mit.edu",
    description:
      "Contact for MIT Learn access problems, platform navigation, module issues, or account support.",
    icon: Wrench,
  },
];
