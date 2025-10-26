"use client";

import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { useAgentTransactionQuery } from "@/redux/features/transaction/transaction.api"; // API hook
import { useAgentTransactionQuery } from "@/redux/features/agent/agenttansaction.api";
import { formatCurrency, formatDate, getTransactionIcon } from "@/utils/helper";

export default function AgentTransactions() {
  const { data: transactions, isLoading } = useAgentTransactionQuery(undefined);
console.log(transactions)
  if (isLoading) return <div>Transaction লোড হচ্ছে...</div>;
  if (!transactions || !transactions.data) return <div>কোনো transaction পাওয়া যায়নি।</div>;



   const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      active: "bg-green-100 text-green-800",
      suspended: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800",
    };
    return <Badge className={variants[status] || "bg-gray-100 text-gray-800"}>{status}</Badge>;
  };



  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Agent Transactions</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Commision</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.data.map((t:any) => (
            <TableRow key={t._id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span>{getTransactionIcon(t.type)}</span>
                  <span>{t.type}</span>
                </div>
              </TableCell>
              <TableCell>{formatCurrency(t.amount)}</TableCell>
              <TableCell>{formatDate(t.createdAt)}</TableCell>
              
              <TableCell><span className="text-green-500 font-bold">+{parseFloat(t.commision).toFixed(3)}</span></TableCell>
              {/* <TableCell>{t.commision | 0}</TableCell> */}
              <TableCell>{getStatusBadge(t.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
