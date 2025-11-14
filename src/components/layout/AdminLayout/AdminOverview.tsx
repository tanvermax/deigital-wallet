"use client";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useEffect } from "react"; // <--- Import useEffect
// import { useAdminStatsQuery, useAllUsersQuery } from "@/redux/features/admin/admin.api";
import type { Transaction, User } from "@/types/user";
import { useAllBalanceQuery, useAllUserInfoQuery, useTransactionInfoQuery } from "@/redux/features/admin/admin.api";

// Key for localStorage to track if the tour has been shown
const TOUR_SHOWN_KEY = "admin_dashboard_tour_complete";

export default function AdminOverview() {
  const { data: balance, isLoading: isStatsLoading } = useAllBalanceQuery(undefined);
  const { data: users, isLoading: isUsersLoading } = useAllUserInfoQuery(undefined);
  const { data: transactions, isLoading: isTransactionsLoading } = useTransactionInfoQuery(undefined);

  // --- Utility Functions ---

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      suspended: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800",
    };
    return (
      <Badge variant="secondary" className={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleAction = (action: string) => {
    toast.success(`${action} সফলভাবে সম্পন্ন হয়েছে!`);
  };

  // --- Tour Logic (useEffect) ---
  useEffect(() => {
    // Check if the tour has already been shown
    if (localStorage.getItem(TOUR_SHOWN_KEY) === "true") {
      return;
    }

    // Define and run the driver
    const dashTour = driver({
      popoverClass: "driverjs-theme",
      showProgress: true,
      prevBtnText: "Previous",
      nextBtnText: "Next",
      animate: true,
      showButtons: ['next', 'previous', 'close'],
      steps: [
        {
          element: "#admindasbord",
          popover: {
            title: "Welcome to your Admin Dashboard",
            description: "Here you can find all critical system information and controls."
          },
        },
        {
          element: "#totoaluser",
          popover: {
            title: "Total Users",
            description: "This card shows the total count of registered users."
          }
        },
        {
          element: "#totaltransaction",
          popover: {
            title: "Total Transactions",
            description: "This shows the overall number of transactions processed by the system."
          }
        },
        {
          element: "#totalbalance",
          popover: {
            title: "Total Balance",
            description: "The cumulative balance across all user wallets."
          }
        },
        {
          element: "#recentusers-card", // Targeting a new ID for clarity
          popover: {
            title: "Recent Users",
            description: "Keep an eye on the latest registrations here."
          }
        },
        {
          element: "#recenttransactions-card", // Targeting a new ID for clarity
          popover: {
            title: "Recent Transactions",
            description: "View the most recent activities in the system."
          }
        },
        {
          popover: {
            title: "Tour Complete!",
            description: "You're all set! Use the dashboard controls to manage the system. Happy administering!"
          }
        }
      ],
      // Add callback to run when the tour is finished or closed
      onDestroyStarted: () => {
        // Only set the flag if the user closes/finishes the tour
        // This ensures they don't see it again.
        localStorage.setItem(TOUR_SHOWN_KEY, "true");
        dashTour.destroy();
      }
    });

    // Start the tour
    dashTour.drive();

  }, []); // Empty dependency array ensures this runs only once after mount

  // --- Loading/Error States ---
  if (isUsersLoading || isTransactionsLoading || isStatsLoading) {
    return <div className="text-center py-10 text-muted-foreground">ডেটা লোড হচ্ছে...</div>;
  }

  if (!users || !transactions || !balance) {
    return <div className="text-center py-10 text-red-500">ডেটা পাওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।</div>;
  }

  // --- Render Component ---
  return (
    <div id="admindasbord" className="container mx-auto p-4 space-y-6 ">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users, transactions, and system stats</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">System Settings</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>Admin Actions</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleAction("Backup Database")}>
                Backup Database
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction("Generate Report")}>
                Generate Report
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction("Send Notifications")}>
                Send Notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card id="totoaluser">
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
            <CardDescription>All registered users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600">{users?.meta?.totaluser}</div>
          </CardContent>
        </Card>

        <Card id="totaltransaction">
          <CardHeader>
            <CardTitle>Total Transactions</CardTitle>
            <CardDescription>All-time system transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-600">{transactions?.meta?.totaltansactions}</div>
          </CardContent>
        </Card>

        <Card id="totalbalance">
          <CardHeader>
            <CardTitle>Total Balance</CardTitle>
            <CardDescription>Sum of all user wallets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-purple-600">
              {formatCurrency(balance?.meta?.totalbalance)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card id="recentusers-card"> {/* Added ID here */}
        <CardHeader className="flex justify-between items-center">
          <div>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>Last 5 registered users</CardDescription>
          </div>
          <Button variant="outline" size="sm">View All Users</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.data.slice(0, 5).map((user: User) => (
                <TableRow key={user._id}>
                  <TableCell className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    {user.name}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{getStatusBadge(user.isActive ? "active" : "suspended")}</TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card id="recenttransactions-card"> {/* Added ID here */}
        <CardHeader className="flex justify-between items-center">
          <div>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest 5 system transactions</CardDescription>
          </div>
          <Button variant="outline" size="sm">View All Transactions</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Reciver ID</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
             {[...transactions.tansactions].reverse().slice(0, 5).map((txn: Transaction) => (
  <TableRow key={txn._id}>
    <TableCell>{txn._id.slice(-6)}</TableCell>
    <TableCell>{txn.type}</TableCell>
    <TableCell className="font-medium text-green-600">
      {formatCurrency(txn.amount)}
    </TableCell>
    <TableCell>{txn.receiver || "N/A"}</TableCell>
    <TableCell>{getStatusBadge(txn.status)}</TableCell>
  </TableRow>
))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-center border-t p-4">
          <Button variant="ghost" className="text-sm">Load More</Button>
        </CardFooter>
      </Card>
    </div>
  );
}