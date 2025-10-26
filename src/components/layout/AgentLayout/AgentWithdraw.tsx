"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
// import { useWithdrawMoneyMutation } from "@/redux/features/wallet/wallet.api"; // replace with your API hook

export default function AgentWithdraw() {
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [loading, setLoading] = useState(false);

//   const [withdrawMoney] = useWithdrawMoneyMutation();

  const handleWithdraw = async () => {
    if (!userId || !amount || amount <= 0) {
      toast.error("দয়া করে বৈধ ইউজার ID এবং পরিমাণ লিখুন!");
      return;
    }

    setLoading(true);
    try {
    //   await withdrawMoney({ userId, amount }).unwrap(); // replace with your API call
      toast.success(`Successfully withdrew $${amount} from user ${userId}`);
      setUserId("");
      setAmount("");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to withdraw money!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <Card className="max-w-md mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Withdraw Money from User Wallet</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">User ID</label>
            <Input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter user ID"
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Amount</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Enter amount"
              className="mt-1"
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button onClick={handleWithdraw} disabled={loading}>
            {loading ? "Processing..." : "Withdraw Money"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
