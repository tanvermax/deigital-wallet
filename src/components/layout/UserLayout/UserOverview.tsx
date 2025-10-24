"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { QuickAction, Transaction, User, Wallet } from "@/types/user";
import { toast } from "sonner";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useWalletinfoQuery } from "@/redux/features/wallet/wallet.api";
import {  useUserTransactionQuery } from "@/redux/features/transaction/transaction.api";


export default function UserOverview() {
    const { data: userData, isLoading: isUserLoading } = useUserInfoQuery(undefined)
    const { data: walletData, isLoading: isWalletLoading } = useWalletinfoQuery(undefined)
    const { data: transactions, isLoading: isHistoryLoading } = useUserTransactionQuery(undefined)
    // Mock user data

    // console.log(userData.data.role)
    
    const [user] = useState<User>({
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        avatar: "/avatars/john-doe.jpg",
        status: "active",
        joinDate: "2024-01-15"
    });

    const [wallet] = useState<Wallet>({
        balance: 12500.75,
        currency: "USD",
        lastUpdated: "2024-03-20T14:30:00Z",
        totalDeposits: 25000,
        totalWithdrawals: 12500
    });

    const quickActions: QuickAction[] = [

        {
            id: "send-money",
            label: "Send Money",
            description: "Transfer to another user",
            icon: "📤",
            variant: "outline",
            action: () => handleSendMoney()
        },
        {
            id: "withdraw",
            label: "Withdraw",
            description: "Withdraw to bank account",
            icon: "🏦",
            variant: "outline",
            action: () => handleWithdraw()
        },

    ];



    const handleSendMoney = () => {
        toast.success("Send Money,Open send money interface...")
    };

    const handleWithdraw = () => {
        toast.success("Withdraw Funds")
    };

    const getStatusBadge = (status: string) => {
        const variants = {
            active: "bg-green-100 text-green-800",
            inactive: "bg-gray-100 text-gray-800",
            suspended: "bg-red-100 text-red-800",
            completed: "bg-green-100 text-green-800",
            pending: "bg-yellow-100 text-yellow-800",
            failed: "bg-red-100 text-red-800"
        };

        return (
            <Badge variant="secondary" className={variants[status as keyof typeof variants]}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
        );
    };

    const getTransactionIcon = (type: string) => {
        const icons = {
            add_money: "📥",
            withdraw: "📤",
            cash_out: "🔄",
            payment: "💳"
        };
        return icons[type as keyof typeof icons] || "💰";
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: wallet.currency,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // const utilizationPercentage = (wallet.totalDeposits > 0)
    //     ? ((wallet.totalWithdrawals / wallet.totalDeposits) * 100)
    //     : 0;
    if (isUserLoading || isWalletLoading || isHistoryLoading) {
        // This is the cleanest way to show a loading state
        return <div>ব্যবহারকারীর এবং ওয়ালেটের ডেটা লোড হচ্ছে...</div>;
    }

    // **Optional:** Check for successful data retrieval if the loading state finishes but data is still missing
    if (!userData || !walletData || !userData.data || !walletData.data) {
        // This handles cases where the fetch finished but failed or returned an empty payload
        return <div>ডেটা পাওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।</div>;
    }

    // console.log(transactions)

    return (
        <div className="container mx-auto p-4 space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">User Overview</h1>
                    <p className="text-muted-foreground">
                        Manage user account, wallet, and transactions
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Edit Profile</Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button>Actions</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>View Full History</DropdownMenuItem>
                            <DropdownMenuItem>Generate Report</DropdownMenuItem>
                            <DropdownMenuItem>Suspend Account</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - User Info & Quick Actions */}
                <div className="lg:col-span-1 space-y-6">
                    {/* User Profile Card */}
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-4">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback className="text-lg">
                                    {userData.data.name.split(' ').map((n: string) => n[0] ?? '').join('')}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <CardTitle className="text-xl">{userData.data.name}</CardTitle>
                                <CardDescription>{userData.data.email}</CardDescription>
                                <div className="flex items-center gap-2 mt-2">
                                    {getStatusBadge(userData.data.isActive)}
                                    <span className="text-sm text-muted-foreground">
                                        Joined {formatDate(userData.data.createdAt)}
                                    </span>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <div className="font-medium text-muted-foreground">Phone</div>
                                    <div>{user.phone}</div>
                                </div>
                                <div>
                                    <div className="font-medium text-muted-foreground">User ID</div>
                                    <div className="font-semibold  ">{userData.data._id}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>Frequently used operations</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {quickActions.map((action) => (
                                <Button
                                    key={action.id}
                                    variant={action.variant}
                                    className="w-full justify-start h-auto py-3"
                                    onClick={action.action}
                                >
                                    <span className="text-xl mr-3">{action.icon}</span>
                                    <div className="text-left">
                                        <div className="font-medium">{action.label}</div>
                                        <div className="text-xs text-muted-foreground">
                                            {action.description}
                                        </div>
                                    </div>
                                </Button>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Wallet & Transactions */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Wallet Balance Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Wallet Balance</CardTitle>
                            <CardDescription>
                                Current balance and wallet statistics
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Main Balance */}
                            <div className="text-center">
                                <div className="text-4xl font-bold text-green-600">
                                    {formatCurrency(walletData.data.balance)}
                                </div>
                                <p className="text-muted-foreground mt-2">
                                    Last updated: {formatDate(walletData.data.updatedAt)}
                                </p>
                            </div>

                            {/* Wallet Statistics */}
                            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="text-center p-4 bg-muted rounded-lg">
                                    <div className="text-2xl font-bold text-blue-600">
                                        {formatCurrency(wallet.totalDeposits)}
                                    </div>
                                    <div className="text-sm text-muted-foreground">Total Deposits</div>
                                </div>
                                <div className="text-center p-4 bg-muted rounded-lg">
                                    <div className="text-2xl font-bold text-orange-600">
                                        {formatCurrency(wallet.totalWithdrawals)}
                                    </div>
                                    <div className="text-sm text-muted-foreground">Total Withdrawals</div>
                                </div>
                                <div className="text-center p-4 bg-muted rounded-lg">
                                    <div className="text-2xl font-bold text-purple-600">
                                        {utilizationPercentage.toFixed(1)}%
                                    </div>
                                    <div className="text-sm text-muted-foreground">Funds Utilization</div>
                                </div>
                            </div> */}

                            {/* Utilization Progress */}
                            {/* <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Wallet Utilization</span>
                                    <span>{utilizationPercentage.toFixed(1)}%</span>
                                </div>
                                <Progress value={utilizationPercentage} className="h-2" />
                            </div> */}
                        </CardContent>
                    </Card>

                    {/* Recent Transactions */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Recent Transactions</CardTitle>
                                <CardDescription>
                                    Last 5 transactions from your wallet
                                </CardDescription>
                            </div>
                            <Button variant="outline" size="sm">
                                View All
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Transaction</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {transactions.data.slice(0, 5).map((transaction: Transaction) => (
                                        <TableRow key={transaction._id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xl">
                                                      {getTransactionIcon(transaction.type)}
                                                    </span>
                                                    <div>
                                                        <div className="font-medium">
                                                            {transaction.type}
                                                        </div>
                                                        <div className="text-sm text-muted-foreground">
                                                            {/* {transaction.reference} */}
                                                            {/* {transaction.recipient && ` • To: ${transaction.recipient}`} */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className={`font-medium 
                                                ${transaction.type === 'deposit'
                                                        ? 'text-green-600'
                                                        : 'text-red-600'}
                                                    `
                                                }>
                                                    {/* {transaction.type === 'deposit' ? '+' : '-'} */}
                                                    {formatCurrency(transaction.amount)}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {formatDate(transaction.createdAt)}
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(transaction.status)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter className="flex justify-center border-t p-4">
                            <Button variant="ghost" className="text-sm">
                                Load More Transactions
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}