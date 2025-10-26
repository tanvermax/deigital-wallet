"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
// Import with the correct, descriptive name from your API slice
import { useAllUserInfoQuery, useBlockinfoMutation } from "@/redux/features/admin/admin.api";
import type { User } from "@/types/user";
import { toast } from "sonner";

interface Ifilter {
    name: string,
    email: string,
}

export default function ManageUsers() {
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch users
    const { data: users, isLoading: isUsersLoading,refetch } = useAllUserInfoQuery(undefined);

    // 1. Rename the imported hook to match the API slice
    const [updateWalletStatus, { isLoading: isUpdating }] = useBlockinfoMutation();
    console.log(users)
    // Use a loading state to prevent spamming the button while an update is in progress
    const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

    // Filtered users
    const filteredUsers = users?.data?.filter(
        (u: Ifilter) =>
            u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 2. Define the handler to send ID and Status
    const handleUpdateStatus = async (userId: string, currentStatus: "ACTIVE" | "BLOCK") => {
        setUpdatingUserId(userId);

        // Determine the new status
        const newStatus = currentStatus === "ACTIVE" ? "BLOCK" : "ACTIVE";

        try {
            // 3. Pass the payload: { userId, status }
            console.log(userId, newStatus)
            const res = await updateWalletStatus({ userId, status: newStatus }).unwrap();
            // On success, the UI will update automatically due to RTK Query's cache invalidation (if implemented).
            // You can add a success toast/notification here.
            refetch()
            console.log(res)
            toast.success(`Successfully set user ${userId} to ${newStatus}`)
            console.log(`Successfully set user ${userId} to ${newStatus}`);
        } catch (err) {
            // Handle error (e.g., show an error toast)
            console.error("Failed to update user status:", err);
        } finally {
            setUpdatingUserId(null); // Clear the updating state
        }
    };

    if (isUsersLoading)
        return (
            <div className="flex justify-center items-center h-40">
                <Loader2 className="animate-spin" />
                <span className="ml-2">Loading users...</span>
            </div>
        );

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Manage Users</h2>
                <Input
                    placeholder="Search users..."
                    className="max-w-xs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>ID</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {filteredUsers && filteredUsers.length > 0 ? (
                            filteredUsers.map((user: User) => {
                                const isUpdatingThisUser = isUpdating && updatingUserId === user._id;

                                return (
                                    <TableRow key={user._id}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user._id}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell className="capitalize">{user.role}</TableCell>
                                        <TableCell>
                                            <Badge
                                                className={
                                                    user.isActive === "ACTIVE"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-red-100 text-red-800"
                                                }
                                            >
                                                {user.isActive}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {user.isActive === "ACTIVE" ? (
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    disabled={isUpdatingThisUser} // Disable while this specific user is being updated
                                                    onClick={() => handleUpdateStatus(user._id, user.isActive)}
                                                >
                                                    {isUpdatingThisUser ? (
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    ) : null}
                                                    {isUpdatingThisUser ? "Blocking..." : "BLOCK"}
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    disabled={isUpdatingThisUser} // Disable while this specific user is being updated
                                                    onClick={() => handleUpdateStatus(user._id, user.isActive)}
                                                >
                                                    {isUpdatingThisUser ? (
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    ) : null}
                                                    {isUpdatingThisUser ? "Unblocking..." : "Unblock"}
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                                    No users found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}