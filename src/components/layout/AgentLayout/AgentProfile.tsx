"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
// import { useUpdateAgentProfileMutation } from "@/redux/features/auth/auth.api"; // API hook

export default function AgentProfile({ agent }: { agent: any }) {
  const [name, setName] = useState(agent.name);
  const [phone, setPhone] = useState(agent.phone);
  const [password, setPassword] = useState("");
//   const [updateProfile] = useUpdateAgentProfileMutation();

  const handleUpdate = async () => {
    try {
    //   await updateProfile({ name, phone, password }).unwrap();
      toast.success("Profile updated successfully!");
      setPassword("");
    } catch (err: any) {
      toast.error(err?.data?.message || "Profile update failed!");
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <Card className="max-w-md mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>Agent Profile Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Phone</label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">New Password</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleUpdate}>Update Profile</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
