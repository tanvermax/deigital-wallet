"use client";

import React from "react";
import useDriver from "@/hooks/useDriver";

const steps = [
  {
    element: "#users-nav",
    popover: {
      title: "Users",
      description: "Manage users from here.",
      position: "right",
    },
  },
  {
    element: "#transactions-nav",
    popover: {
      title: "Transactions",
      description: "View all transaction history.",
      position: "right",
    },
  },
  {
    element: "#create-agent-btn",
    popover: {
      title: "Create Agent",
      description: "Create a new agent account.",
      position: "bottom",
    },
  },
];

export default function AdminTour() {
  const { start, reset } = useDriver(steps, { opacity: 0.6 });

  return (
    <div className="space-x-2">
      <button onClick={() => start()} className="btn">
        Start Tour
      </button>
      <button onClick={() => reset()} className="btn-ghost">
        Reset Tour
      </button>
    </div>
  );
}
