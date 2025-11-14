"use client";

import { useSendmoneyMutation } from "@/redux/features/user/user.api";
import React, { useState } from "react";

import { toast } from "sonner";

const SendMoney: React.FC = () => {
  const [sendmoneyinfo] = useSendmoneyMutation()

  const [formData, setFormData] = useState({
    phone: "",
    amount: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    const { phone, amount } = formData;

    if (!phone || !amount) {
      toast.error("সব তথ্য পূরণ করুন!");
      return;
    }

    try {
      setIsLoading(true);
      console.log(formData)
      const res = await sendmoneyinfo(formData).unwrap();

      toast.success(res.data.message || "টাকা পাঠানো সফল হয়েছে!");
      setFormData({ phone: "", amount: "" });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error)
      toast.error(`${error.data?.message}` );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-xl rounded-2xl p-6 mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">💸 Send Money</h2>

      <form onSubmit={handleSend} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Receiver User Number
          </label>
          <input
            type="number"
            name="phone"
            
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter receiver Number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Amount (৳)</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter amount"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 text-white font-semibold py-2 rounded-xl hover:bg-green-700 transition disabled:opacity-50"
        >
          {isLoading ? "Processing..." : "Send Now"}
        </button>
      </form>
    </div>
  );
};

export default SendMoney;
