"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { useAgentCommissionQuery } from "@/redux/features/commission/commission.api"; // API hook
import { formatCurrency, formatDate } from "@/utils/helper";

export default function AgentCommissionHistory() {
//   const { data: commissions, isLoading } = useAgentCommissionQuery(undefined);

//   if (isLoading) return <div>Commission history লোড হচ্ছে...</div>;
//   if (!commissions || !commissions.data) return <div>কোনো Commission পাওয়া যায়নি।</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Commission History</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Commission</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* {commissions.data.map((c) => (
            <TableRow key={c._id}>
              <TableCell>{c.type}</TableCell>
              <TableCell>{formatCurrency(c.amount)}</TableCell>
              <TableCell>{formatCurrency(c.commission)}</TableCell>
              <TableCell>{formatDate(c.createdAt)}</TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </div>
  );
}
