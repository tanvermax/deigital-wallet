"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <section className="container mx-auto py-16 px-4 space-y-12">
      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-4">About Our Digital Wallet</h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Our mission is to make digital payments effortless, secure, and accessible to everyone.  
          Founded in 2024, our wallet empowers users to send, receive, and manage money worldwide —  
          with transparency, speed, and trust at its core.
        </p>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-2 gap-8 items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Why Choose Us?</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>✅ Instant and secure transactions</li>
            <li>✅ Real-time analytics and smart budgeting</li>
            <li>✅ 24/7 customer support</li>
            <li>✅ Trusted by thousands of users worldwide</li>
          </ul>
        </div>

        <motion.div
          className="p-6 bg-muted rounded-2xl text-center"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-3xl font-bold mb-2">1M+ Users</h3>
          <p className="text-muted-foreground mb-4">and growing every day</p>
          <Button>Join the Community</Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
