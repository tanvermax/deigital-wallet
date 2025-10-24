"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import {
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import {
  useWalletinfoQuery,
} from "@/redux/features/wallet/wallet.api";
// import { useAgentTransactionQuery } from "@/redux/features/agenttransaction/agent.tansaction";
import type { QuickAction, Transaction, User, Wallet } from "@/types/user";
import { useAgentTransactionQuery } from "@/redux/features/agenttransaction/agenttansaction.api";



export default function AgentOverview() {
  
  const { data: agentData, isLoading: isAgentLoading } = useUserInfoQuery(undefined);
  const { data: walletData, isLoading: isWalletLoading } = useWalletinfoQuery(undefined);
  const { data: agettransactions, isLoading: isHistoryLoading } = useAgentTransactionQuery(undefined)

  console.log(agettransactions)


  const [agent] = useState<User>({
    id: "2",
    name: "Agent Smith",
    email: "agent.smith@example.com",
    phone: "+880 1711 223344",
    avatar: "/avatars/agent-smith.jpg",
    status: "active",
    joinDate: "2024-02-10",
  });

  const [wallet] = useState<Wallet>({
    balance: 18900.75,
    currency: "BDT",
    lastUpdated: "2024-04-22T10:15:00Z",
    totalDeposits: 50000,
    totalWithdrawals: 31100,
  });

  const quickActions: QuickAction[] = [
    {
      id: "send-money",
      label: "Send Money",
      description: "Transfer funds to a client or user",
      icon: "📤",
      variant: "outline",
      action: () => toast.success("Send Money feature coming soon!"),
    },
    {
      id: "approve-payment",
      label: "Approve Payment",
      description: "Review and approve pending payments",
      icon: "✅",
      variant: "outline",
      action: () => toast.success("Payment approved successfully!"),
    },
    {
      id: "request-payout",
      label: "Request Payout",
      description: "Withdraw your earned commission",
      icon: "💵",
      variant: "outline",
      action: () => toast.success("Payout request submitted."),
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
      suspended: "bg-red-100 text-red-800",
      completed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      failed: "bg-red-100 text-red-800",
    };

    return (
      <Badge variant="secondary" className={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getTransactionIcon = (type: string) => {
    const icons = {
      commission: "💰",
      payout: "🏦",
      client_payment: "📥",
      transfer: "🔄",
    };
    return icons[type as keyof typeof icons] || "💳";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: wallet.currency,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isAgentLoading || isWalletLoading || isHistoryLoading) {
    return <div>এজেন্টের তথ্য লোড হচ্ছে...</div>;
  }

  if (!agentData || !walletData || !agentData.data || !walletData.data) {
    return <div>ডেটা পাওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agent Overview</h1>
          <p className="text-muted-foreground">
            Manage agent account, commissions, and transaction performance
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Edit Profile</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>Actions</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>View Agent Report</DropdownMenuItem>
              <DropdownMenuItem>Export Transactions</DropdownMenuItem>
              <DropdownMenuItem>Deactivate Agent</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Agent Info */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={agent.avatar} alt={agent.name} />
                <AvatarFallback className="text-lg">
                  {agentData.data.name.split(" ").map((n: string) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-xl">{agentData.data.name}</CardTitle>
                <CardDescription>{agentData.data.email}</CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  {getStatusBadge(agentData.data.isActive)}
                  <span className="text-sm text-muted-foreground">
                    Joined {formatDate(agentData.data.createdAt)}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-medium text-muted-foreground">Phone</div>
                <div>{agent.phone}</div>
              </div>
              <div>
                <div className="font-medium text-muted-foreground">Agent ID</div>
                <div className="font-mono">{agentData.data._id}</div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Perform common agent operations</CardDescription>
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

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Wallet Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Commission Wallet</CardTitle>
              <CardDescription>
                Overview of your earnings and payouts
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-2">
              <div className="text-4xl font-bold text-green-600">
                {formatCurrency(walletData.data.balance)}
              </div>
              <p className="text-muted-foreground">
                Last updated: {formatDate(walletData.data.updatedAt)}
              </p>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <div>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Last 5 transactions</CardDescription>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agettransactions.data.slice(0, 5).map((transaction: Transaction) => (
                    <TableRow key={transaction._id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{getTransactionIcon(transaction.type)}</span>
                          <span className="font-medium capitalize">{transaction.type}</span>
                        </div>
                      </TableCell>
                      <TableCell className={`font-medium ${transaction.amount >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {formatCurrency(transaction.amount)}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(transaction.createdAt)}
                      </TableCell>
                      <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-center border-t">
              <Button variant="ghost" className="text-sm">
                Load More Activities
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
