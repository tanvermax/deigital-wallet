"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";

export default function UserProfile() {
  const { data: userData, isLoading } = useUserInfoQuery(undefined);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (userData?.data) {
      setName(userData.data.name);
      setPhone(userData.data.phone);
    }
  }, [userData]);

  const handleUpdate = async () => {
    if (password && password !== confirmPassword) {
      toast.error("Password and Confirm Password do not match!");
      return;
    }

    // Example API call — replace with your update API
    try {
      // await updateUserProfile({ name, phone, password });
      toast.success("Profile updated successfully!");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Failed to update profile!");
    }
  };

  if (isLoading) return <div className="py-10 text-center">লোড হচ্ছে...</div>;

  return (
    <div className="container mx-auto py-6 px-4">
      <Card className="max-w-xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Update Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Phone Number</label>
            <Input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Your phone number"
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">New Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Confirm Password</label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="mt-1"
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button onClick={handleUpdate}>Update Profile</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
