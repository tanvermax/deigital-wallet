"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";

interface UpdatePayload {
    name?: string;
    email?: string;
    password?: string;
}

export default function AdminProfile() {

    // Get admin profile info
    const { data: adminData, isLoading, refetch } = useUserInfoQuery(undefined);

    // Mutation to update profile
    // const [updateProfile, { isLoading: isUpdating }] = useUpdateAdminProfileMutation();

    // Local form state
    const [formData, setFormData] = useState<UpdatePayload>({
        name: "",
        email: "",
        password: "",
    });

    // Populate form once data is fetched
    useEffect(() => {
        if (adminData?.data) {
            setFormData({
                name: adminData.data.name || "",
                email: adminData.data.email || "",
                password: "",
            });
        }
    }, [adminData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // const payload: UpdatePayload = {
            //     name: formData.name,
            //     email: formData.email,
            // };
            // if (formData.password.trim()) payload.password = formData.password;

            // const res = await updateProfile(payload).unwrap();
            toast.success("Profile Updated,Your account information was updated successfully.")

            refetch();
            setFormData((prev) => ({ ...prev, password: "" }));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.log(err)
            toast.error("Update Failed!,Something went wrong. Try again later..")


        }
    };

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="ml-2 text-gray-600">Loading profile...</span>
            </div>
        );

    return (
        <Card className="max-w-lg mx-auto mt-10 shadow-md">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-center">
                    Admin Profile Management
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleUpdate} className="space-y-5">
                    <div>
                        <label className="text-sm font-medium block mb-1">Name</label>
                        <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium block mb-1">Email</label>
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium block mb-1">New Password</label>
                        <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Leave blank to keep current password"
                        />
                    </div>

                    <Button
                        type="submit"
                        // disabled={isUpdating}
                        className="w-full mt-3"
                    >
                        {/* {isUpdating ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" /> Save Changes
                            </>
                        )} */}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
