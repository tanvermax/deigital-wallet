"use client";

import { useWithdrawinfoMutation } from "@/redux/features/user/user.api";
import React, { useState } from "react";

import { toast } from "sonner";


const Withdrawmoney: React.FC = () => {

  const [withdraw] = useWithdrawinfoMutation();
  const [formData, setFormData] = useState({
    agentId: "",
    amount: "",

  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();

    const { agentId, amount } = formData;
    if (!agentId || !amount) {
      toast.error("সব ফিল্ড পূরণ করুন!");
      return;
    }

    try {
      setIsLoading(true);

      console.log(formData)
      const res = await withdraw(formData).unwrap();
      console.log(res)
      toast.success(`${res.message}`);

      setFormData({ agentId: "", amount: "" });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.data)
      toast.error(`${error.data?.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-xl rounded-2xl p-6 mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">💸 Withdraw Money</h2>

      <form onSubmit={handleWithdraw} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Agent ID</label>
          <input
            type="text"
            name="agentId"
            value={formData.agentId}
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Agent ID"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Amount (৳)</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>



        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isLoading ? "Processing..." : "Withdraw Now"}
        </button>
      </form>
    </div>
  );
};

export default Withdrawmoney;
