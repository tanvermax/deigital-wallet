"use client";

import { motion } from "framer-motion";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function FAQ() {
  const faqs = [
    {
      q: "Is my money safe in this wallet?",
      a: "Absolutely. We use bank-grade encryption, 2FA, and cold storage systems for top security.",
    },
    {
      q: "Can I use this wallet internationally?",
      a: "Yes, you can send and receive money globally in multiple currencies.",
    },
    {
      q: "Are there any hidden fees?",
      a: "No. All fees are clearly mentioned before each transaction.",
    },
    {
      q: "How do I reset my password?",
      a: "Click 'Forgot Password' on the login page and follow the secure reset instructions.",
    },
  ];

  return (
    <section className="container mx-auto py-16 px-4 max-w-3xl">
      <motion.h1
        className="text-4xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Frequently Asked Questions
      </motion.h1>

      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="border rounded-lg px-4">
            <AccordionTrigger className="text-lg font-semibold">{faq.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
