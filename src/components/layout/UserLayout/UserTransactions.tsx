"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useUserTransactionQuery } from "@/redux/features/transaction/transaction.api";
import { format } from "date-fns";

const UserTransactions = () => {
  const { data: transactionsData, isLoading } = useUserTransactionQuery(undefined);

  const [filterType, setFilterType] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  const transactions = transactionsData?.data || [];

  console.log(transactionsData)
  // ✅ Filtering logic
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t: any) => {
      const matchesType = filterType === "all" || t.type === filterType;

      const transactionDate = new Date(t.createdAt);
      const matchesDate =
        (!dateFrom || transactionDate >= new Date(dateFrom)) &&
        (!dateTo || transactionDate <= new Date(dateTo));

      return matchesType && matchesDate;
    });
  }, [transactions, filterType, dateFrom, dateTo]);

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedData = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (dateString: string) =>
    format(new Date(dateString), "dd MMM yyyy, hh:mm a");

  if (isLoading) return <div className="text-center py-10">লোড হচ্ছে...</div>;

  return (
    <div className="container mx-auto py-6 px-4 space-y-6">
      <Card className="shadow-md border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            💳 Transaction History
          </CardTitle>
        </CardHeader>

        {/* 🔍 Filters */}
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex items-center gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="deposit">Deposit</SelectItem>
                  <SelectItem value="withdraw">Withdraw</SelectItem>
                  <SelectItem value="send">Send</SelectItem>
                  <SelectItem value="receive">Receive</SelectItem>
                </SelectContent>
              </Select>

              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-36"
                placeholder="From"
              />
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-36"
                placeholder="To"
              />
            </div>

            <Button
              variant="outline"
              onClick={() => {
                setFilterType("all");
                setDateFrom("");
                setDateTo("");
              }}
            >
              Reset Filters
            </Button>
          </div>

          {/* 🧾 Table */}
          <div className="overflow-x-auto border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((t: any) => (
                    <TableRow key={t._id}>
                      <TableCell className="capitalize font-medium">
                        {t.type}
                      </TableCell>
                      <TableCell
                        className={`font-semibold ${
                          t.type === "deposit" || t.type === "receive"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {t.type === "deposit" || t.type === "receive" ? "+" : "-"}৳
                        {parseFloat(t.totolammount).toFixed(3)}
                        
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            t.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : t.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {t.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {formatDate(t.createdAt)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6">
                      কোন ট্রানজ্যাকশন পাওয়া যায়নি
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* 📄 Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-4">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Prev
              </Button>
              <span className="font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserTransactions;
