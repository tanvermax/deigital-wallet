"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Basic",
    price: "Free",
    description: "Perfect for new users to get started.",
    features: [
      "Send & receive payments",
      "Basic wallet analytics",
      "Secure 2FA access",
    ],
  },
  {
    name: "Pro",
    price: "$9.99/mo",
    description: "For regular users who want advanced control.",
    features: [
      "Everything in Basic",
      "Priority support",
      "Unlimited transactions",
      "Budget tracking tools",
    ],
  },
  {
    name: "Business",
    price: "$29.99/mo",
    description: "For teams and business owners.",
    features: [
      "Multi-user access",
      "Advanced analytics dashboard",
      "Custom API integrations",
      "Dedicated support manager",
    ],
  },
];

export default function Pricing() {
  return (
    <section className="container mx-auto py-16 px-4 space-y-12">
      <div className="text-center">
        <motion.h1
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Simple & Transparent Pricing
        </motion.h1>
        <motion.p
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Choose a plan that fits your financial lifestyle.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
          >
            <Card className="border border-gray-200 hover:shadow-lg transition rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-4">{plan.price}</div>
                <ul className="space-y-2 text-sm">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      ✅ {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Choose Plan</Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
