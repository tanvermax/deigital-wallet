/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { Loader2, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTransactionInfoQuery } from '@/redux/features/admin/admin.api';

interface Transaction {
  _id: string;
  sender:string ;
  receiver:  string;
  amount: number;
  type: 'DEPOSIT' | 'WITHDRAW' | 'TRANSFER';
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  createdAt: string;
}

const ManageTransactions: React.FC = () => {
  const { data: tansactionsData = [], isLoading, refetch } = useTransactionInfoQuery(undefined);

//   console.log(tansactionsData.tansactions)

  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'SUCCESS' | 'FAILED'>('ALL');
  const [typeFilter, setTypeFilter] = useState<'ALL' | 'DEPOSIT' | 'WITHDRAW' | 'TRANSFER'>('ALL');
  const [dateFilter, setDateFilter] = useState('');

   if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
        <span className="ml-2 text-gray-500">Loading transactions...</span>
      </div>
    );

  // Filter logic
  const filteredTransactions = tansactionsData.tansactions.filter((tx: Transaction) => {
    const matchesSearch =
      tx.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.receiver.toLowerCase().includes(searchTerm.toLowerCase()) 
    //   tx.sender?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   tx.receiver?.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || tx.status === statusFilter;
    const matchesType = typeFilter === 'ALL' || tx.type === typeFilter;
    const matchesDate =
      !dateFilter || format(new Date(tx.createdAt), 'yyyy-MM-dd') === dateFilter;

    return matchesSearch && matchesStatus && matchesType && matchesDate;
  });

 
  return (
    <Card className="mt-6 shadow-md">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-xl font-semibold">All Transactions</CardTitle>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          Refresh
        </Button>
      </CardHeader>

      <CardContent>
        {/* Filters */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-3 mb-6">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-500" />
            <Input
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={statusFilter} onValueChange={(v: any) => setStatusFilter(v)}>
            <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Status</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="SUCCESS">Success</SelectItem>
              <SelectItem value="FAILED">Failed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={(v: any) => setTypeFilter(v)}>
            <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Types</SelectItem>
              <SelectItem value="DEPOSIT">Deposit</SelectItem>
              <SelectItem value="WITHDRAW">Withdraw</SelectItem>
              <SelectItem value="TRANSFER">Transfer</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
        </div>

        {/* Transaction Table */}
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3">Sender</th>
                <th className="p-3">Receiver</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Type</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length ? (
                filteredTransactions.map((tx:any) => (
                  <tr key={tx._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{tx.sender || 'N/A'}</td>
                    <td className="p-3">{tx.receiver?.name || 'N/A'}</td>
                    <td className="p-3 font-medium">${tx.amount.toFixed(2)}</td>
                    <td className="p-3">{tx.type}</td>
                    <td
                      className={`p-3 font-semibold ${
                        tx.status === 'SUCCESS'
                          ? 'text-green-600'
                          : tx.status === 'PENDING'
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      }`}
                    >
                      {tx.status}
                    </td>
                    <td className="p-3">
                      {format(new Date(tx.createdAt), 'dd MMM yyyy, hh:mm a')}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-500">
                    No transactions found for selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ManageTransactions;
