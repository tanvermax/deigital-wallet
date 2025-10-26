"use client";

import { useState, useEffect } from "react"; // <-- Import useEffect
import { driver } from "driver.js"; // <-- Import driver
import "driver.js/dist/driver.css"; // <-- Import driver CSS

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { QuickAction, Transaction, Wallet } from "@/types/user";
import { toast } from "sonner";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useWalletinfoQuery } from "@/redux/features/wallet/wallet.api";
import { useUserTransactionQuery } from "@/redux/features/transaction/transaction.api";


// Key for localStorage to track if the tour has been shown
const USER_TOUR_SHOWN_KEY = "user_dashboard_tour_complete";

export default function UserOverview() {
    const { data: userData, isLoading: isUserLoading } = useUserInfoQuery(undefined)
    const { data: walletData, isLoading: isWalletLoading } = useWalletinfoQuery(undefined)
    const { data: transactions, isLoading: isHistoryLoading } = useUserTransactionQuery(undefined)

    // Mock user data (kept for structure, but actual data comes from userData)
    // const [user] = useState<User>({
    //     _id: "1",
    //     name: "John Doe",
    //     email: "john.doe@example.com",
    //     phone: "+1 (555) 123-4567",
    //     avatar: "/avatars/john-doe.jpg",
    //     status: "active",
    //     joinDate: "2024-01-15"
    // });

    // Mock wallet data (kept for structure, but actual data comes from walletData)
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

    const getStatusBadge = (status: string | boolean) => {
        const variants = {
            active: "bg-green-100 text-green-800",
            inactive: "bg-gray-100 text-gray-800",
            suspended: "bg-red-100 text-red-800",
            completed: "bg-green-100 text-green-800",
            pending: "bg-yellow-100 text-yellow-800",
            failed: "bg-red-100 text-red-800"
        };
        // Normalize status to a string key for lookup
        const statusKey = typeof status === 'boolean' ? (status ? 'active' : 'inactive') : status.toLowerCase();

        return (
            <Badge variant="secondary" className={variants[statusKey as keyof typeof variants] || variants.inactive}>
                {statusKey.charAt(0).toUpperCase() + statusKey.slice(1)}
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
        // Use the actual currency from walletData if available, otherwise fallback to mock/default
        const currency = walletData?.data?.currency || wallet.currency;
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
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
    
    // --- Tour Logic (useEffect) ---
    useEffect(() => {
        // 1. Check if the tour has already been shown
        if (localStorage.getItem(USER_TOUR_SHOWN_KEY) === "true") {
            return;
        }

        // 2. Define and run the driver
        const userTour = driver({
            popoverClass: "driverjs-theme",
            showProgress: true,
            prevBtnText: "Previous",
            nextBtnText: "Next",
            animate: true,
            showButtons: ['next', 'previous', 'close'],
            steps: [
                {
                    element: "#user-dashboard-main", // Target the main container
                    popover: {
                        title: "Welcome to your User Dashboard",
                        description: "This is where you manage your account, wallet, and transactions."
                    },
                },
                {
                    element: "#user-profile-card",
                    popover: {
                        title: "Your Profile",
                        description: "Check your account status and basic information here."
                    }
                },
                {
                    element: "#wallet-balance-card",
                    popover: {
                        title: "Wallet Balance",
                        description: "This is your current available balance and wallet statistics."
                    }
                },
                {
                    element: "#quick-actions-card",
                    popover: {
                        title: "Quick Actions",
                        description: "Perform fast operations like Send Money or Withdrawal."
                    }
                },
                {
                    element: "#recent-transactions-card",
                    popover: {
                        title: "Recent Transactions",
                        description: "View the latest activities from your wallet."
                    }
                },
                {
                    popover: {
                        title: "Tour Complete! ✅",
                        description: "You're all set! Enjoy using your personal dashboard."
                    }
                }
            ],
            // 3. Add callback to set the flag when the tour is finished or closed
            onDestroyStarted: () => {
                localStorage.setItem(USER_TOUR_SHOWN_KEY, "true");
                userTour.destroy();
            }
        });

        // Start the tour
        // Use a slight delay to ensure the DOM is fully ready after loading state resolves.
        setTimeout(() => {
            if (localStorage.getItem(USER_TOUR_SHOWN_KEY) !== "true") {
                userTour.drive();
            }
        }, 500);

    }, [isUserLoading, isWalletLoading, isHistoryLoading]); // Rerun if loading state changes (i.e., data becomes available)


    // --- Loading/Error States ---
    if (isUserLoading || isWalletLoading || isHistoryLoading) {
        return <div className="text-center py-10 text-muted-foreground">ব্যবহারকারীর এবং ওয়ালেটের ডেটা লোড হচ্ছে...</div>;
    }

    // Check for successful data retrieval
    if (!userData || !walletData || !transactions || !userData.data || !walletData.data) {
        return <div className="text-center py-10 text-red-500">ডেটা পাওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।</div>;
    }
    
    // --- Render Component ---
    return (
        <div id="user-dashboard-main" className="container mx-auto p-4 space-y-6"> {/* Added ID for tour */}
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
                    <Card id="user-profile-card"> {/* Added ID for tour */}
                        <CardHeader className="flex flex-row items-center gap-4">
                            <Avatar className="h-16 w-16">
                                {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                                <AvatarFallback className="text-lg">
                                    {userData.data.name?.split(' ').map((n: string) => n[0] ?? '').join('') || 'U'}
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
                                    <div>{userData.data.phone || "012345678"}</div>
                                </div>
                                <div>
                                    <div className="font-medium text-muted-foreground">User ID</div>
                                    <div className="font-semibold">{userData.data._id}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card id="wallet-balance-card"> {/* Added ID for tour */}
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
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card id="quick-actions-card"> {/* Added ID for tour */}
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

                {/* Right Column - Transactions */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Recent Transactions */}
                    <Card id="recent-transactions-card"> {/* Added ID for tour */}
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
                                                        <div className="font-medium capitalize">
                                                            {transaction.type.replace('_', ' ')}
                                                        </div>
                                                        <div className="text-sm text-muted-foreground">
                                                            {/* Placeholder for ref/recipient if available */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className={`font-medium 
                                                ${transaction.type === 'deposit' || transaction.type === 'add_money'
                                                        ? 'text-green-600'
                                                        : 'text-red-600'}
                                                    `
                                                }>
                                                    {formatCurrency(Number(transaction.totolammount ?? transaction.amount ?? 0))}
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