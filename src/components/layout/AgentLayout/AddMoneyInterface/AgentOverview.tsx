"use client";

import { useEffect } from "react"; // <-- Import useEffect
import { driver } from "driver.js"; // <-- Import driver
import "driver.js/dist/driver.css"; // <-- Import driver CSS

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
import type { QuickAction, Transaction } from "@/types/user";
import { useAgentTransactionQuery } from "@/redux/features/agent/agenttansaction.api";

// Key for localStorage to track if the tour has been shown
const AGENT_TOUR_SHOWN_KEY = "agent_dashboard_tour_complete";

export default function AgentOverview() {

  const { data: agentData, isLoading: isAgentLoading } = useUserInfoQuery(undefined);
  const { data: walletData, isLoading: isWalletLoading } = useWalletinfoQuery(undefined);
  const { data: agettransactions, isLoading: isHistoryLoading } = useAgentTransactionQuery(undefined)

  // console.log(agettransactions)
  // Removed unused useState initialization for `wallet`
  // const [wallet] = useState<Wallet>({...}); 

  // --- Utility Functions and Data ---
  // console.log(agettransactions)
  
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
    // Handles the case where agentData.data.isActive is a boolean or string
    const statusKey = typeof status === 'boolean' ? (status ? 'active' : 'inactive') : status.toLowerCase();

    return (
      <Badge variant="secondary" className={variants[statusKey as keyof typeof variants] || variants.inactive}>
        {statusKey.charAt(0).toUpperCase() + statusKey.slice(1)}
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

  // Uses walletData.data for currency formatting
  const formatCurrency = (amount: number) => {
    const currency = walletData?.data?.currency || "USD"; // Default to USD if data is missing
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: currency,
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

  // --- Tour Logic (useEffect) ---
  useEffect(() => {
    // 1. Check if the tour has already been shown
    if (localStorage.getItem(AGENT_TOUR_SHOWN_KEY) === "true") {
      return;
    }

    // 2. Define and run the driver
    const agentTour = driver({
      popoverClass: "driverjs-theme",
      showProgress: true,
      prevBtnText: "Previous",
      nextBtnText: "Next",
      animate: true,
      showButtons: ['next', 'previous', 'close'],
      steps: [
        {
          element: "#agent-overview-main", // Target the main container
          popover: {
            title: "Welcome to your Agent Dashboard",
            description: "This is your control center for managing clients and commissions."
          },
        },
        {
          element: "#agent-info-card",
          popover: {
            title: "Agent Information",
            description: "Your key personal and account details are shown here."
          }
        },
        {
          element: "#quick-actions-card",
          popover: {
            title: "Quick Actions",
            description: "Instantly perform common tasks like sending money or requesting payouts."
          }
        },
        {
          element: "#commission-wallet-card",
          popover: {
            title: "Commission Wallet",
            description: "View your current balance and last update time for your earnings."
          }
        },
        {
          element: "#recent-activities-card",
          popover: {
            title: "Recent Activities",
            description: "Check the last five transactions to monitor your flow of funds."
          }
        },
        {
          popover: {
            title: "Tour Complete! 🎉",
            description: "You're ready to go! Start managing your operations efficiently."
          }
        }
      ],
      // 3. Add callback to set the flag when the tour is finished or closed
      onDestroyStarted: () => {
        localStorage.setItem(AGENT_TOUR_SHOWN_KEY, "true");
        agentTour.destroy();
      }
    });

    // Start the tour
    // We delay the start slightly to ensure all DOM elements are rendered,
    // especially after the data loading is complete.
    setTimeout(() => {
      // We only drive if the check above didn't return, but a re-check is safe
      if (localStorage.getItem(AGENT_TOUR_SHOWN_KEY) !== "true") {
        agentTour.drive();
      }
    }, 500); // 500ms delay

  }, [isAgentLoading, isWalletLoading, isHistoryLoading]); // Rerun if loading state changes (i.e., data becomes available)


  // --- Loading/Error States ---
  if (isAgentLoading || isWalletLoading || isHistoryLoading) {
    return <div className="text-center py-10 text-muted-foreground">এজেন্টের তথ্য লোড হচ্ছে...</div>;
  }

  // Ensure all necessary data objects and their 'data' properties exist
  if (!agentData || !walletData || !agettransactions || !agentData.data || !walletData.data || !agettransactions.data) {
    return <div className="text-center py-10 text-red-500">ডেটা পাওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।</div>;
  }


  // --- Render Component ---
  return (
    <div id="agent-overview-main" className="container mx-auto p-4 space-y-6"> {/* Added ID for tour */}
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
          <Card id="agent-info-card"> {/* Added ID for tour */}
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                {/* <AvatarImage src={agent.avatar} alt={agentData.name} /> */}
                <AvatarFallback className="text-lg">
                  {/* Safely get initials */}
                  {agentData.data.name?.split(" ").map((n: string) => n[0]).join("") || "AG"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-xl">{agentData.data.name}</CardTitle>
                <CardDescription>{agentData.data.email}</CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  {/* Status from data is a boolean, converting to 'active'/'inactive' */}
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
                <div>{agentData.data.phone || "N/A"}</div>
              </div>
              <div>
                <div className="font-medium text-muted-foreground">Agent ID</div>
                <div className="font-mono">{agentData.data._id}</div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card id="quick-actions-card"> {/* Added ID for tour */}
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
          <Card id="commission-wallet-card"> {/* Added ID for tour */}
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
          <Card id="recent-activities-card"> {/* Added ID for tour */}
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
                          <span className="font-medium capitalize">{transaction.type.replace('_', ' ')}</span>
                        </div>
                      </TableCell>
                      {/* Assuming commissions/deposits are positive and payouts/withdrawals are negative for color coding */}
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