"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section className="container mx-auto py-16 px-4 max-w-3xl">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
        <p className="text-muted-foreground">
          Have a question or feedback? We’d love to hear from you.
        </p>
      </motion.div>

      <motion.form
        className="space-y-4 bg-white shadow-md rounded-2xl p-6 border"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Input placeholder="Your Name" required />
        <Input type="email" placeholder="Your Email" required />
        <Textarea placeholder="Your Message" rows={5} required />
        <Button className="w-full">Send Message</Button>
      </motion.form>

      <div className="text-center mt-6 text-sm text-muted-foreground">
        Or reach us directly at{" "}
        <a href="mailto:support@wallet.com" className="text-blue-600 font-medium">
          support@wallet.com
        </a>
      </div>
    </section>
  );
}
