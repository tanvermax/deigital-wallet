"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Wallet, ShieldCheck, Send, Smartphone, Clock, LineChart } from "lucide-react";

const features = [
  {
    id: 1,
    title: "Instant Money Transfer",
    description: "Send and receive money across borders instantly with minimal fees.",
    icon: <Send className="h-6 w-6 text-blue-600" />,
    badge: "Fast",
  },
  {
    id: 2,
    title: "Secure Wallet System",
    description: "Your funds are protected with multi-layer encryption and 2FA security.",
    icon: <ShieldCheck className="h-6 w-6 text-green-600" />,
    badge: "Secure",
  },
  {
    id: 3,
    title: "Mobile-Friendly Access",
    description: "Manage your digital wallet from anywhere with our responsive mobile interface.",
    icon: <Smartphone className="h-6 w-6 text-purple-600" />,
    badge: "Responsive",
  },
  {
    id: 4,
    title: "Smart Transaction Insights",
    description: "Track your spending patterns and get AI-based financial insights.",
    icon: <LineChart className="h-6 w-6 text-orange-600" />,
    badge: "AI Powered",
  },
  {
    id: 5,
    title: "24/7 Transaction History",
    description: "Access your complete transaction history at any time.",
    icon: <Clock className="h-6 w-6 text-gray-600" />,
    badge: "Realtime",
  },
  {
    id: 6,
    title: "Multi-Currency Support",
    description: "Use your wallet in multiple currencies with live exchange rate updates.",
    icon: <Wallet className="h-6 w-6 text-teal-600" />,
    badge: "Global",
  },
];

export default function Features() {
  return (
    <section className="container mx-auto px-4 py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Powerful Features for Your Digital Wallet
        </motion.h1>
        <motion.p
          className="text-muted-foreground text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Manage your money smarter, safer, and faster — all in one place.
        </motion.p>
      </div>

      {/* Features Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.15 },
          },
        }}
      >
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Card className="hover:shadow-lg transition-all duration-300 rounded-2xl border border-gray-200">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-3 bg-muted rounded-xl">{feature.icon}</div>
                <div>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    {feature.title}
                    <Badge variant="outline" className="text-xs">{feature.badge}</Badge>
                  </CardTitle>
                  <CardDescription className="text-sm mt-1">{feature.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Section */}
      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Ready to experience the future of digital payments?</h2>
        <Button size="lg" className="rounded-full px-8">
          Get Started
        </Button>
      </motion.div>
    </section>
  );
}
