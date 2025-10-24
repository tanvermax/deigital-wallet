"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  phone: string;
  currentBalance: number;
}

interface AddMoneyFormData {
  userId: string;
  amount: string;
  paymentMethod: string;
  transactionId: string;
  notes: string;
}

export default function AddMoneyInterface() {
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<AddMoneyFormData>({
    userId: "",
    amount: "",
    paymentMethod: "",
    transactionId: "",
    notes: ""
  });

  // Mock data - replace with actual API call
  const users: User[] = [
    { id: "1", name: "John Doe", phone: "+1234567890", currentBalance: 1500 },
    { id: "2", name: "Jane Smith", phone: "+0987654321", currentBalance: 2300 },
    { id: "3", name: "Bob Johnson", phone: "+1122334455", currentBalance: 500 },
  ];

  const paymentMethods = [
    { value: "bank_transfer", label: "Bank Transfer" },
    { value: "credit_card", label: "Credit Card" },
    { value: "digital_wallet", label: "Digital Wallet" },
    { value: "cash", label: "Cash" },
    { value: "other", label: "Other" },
  ];

  const handleUserSelect = (userId: string) => {
    const user = users.find(u => u.id === userId);
    setSelectedUser(user || null);
    setFormData(prev => ({ ...prev, userId }));
  };

  const handleInputChange = (field: keyof AddMoneyFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!formData.userId || !formData.amount || !formData.paymentMethod) {
      toast.error("Please fill in all required fields")
        
      setLoading(false);
      return;
    }

    if (parseFloat(formData.amount) <= 0) {
      toast.error("Amount must be greater than 0")

     
      setLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would make your actual API call
      console.log("Adding money:", {
        ...formData,
        amount: parseFloat(formData.amount)
      });

      // Success toast
      toast.success(`$${formData.amount} added to ${selectedUser?.name}'s wallet`)
      
    

      // Reset form
      setFormData({
        userId: "",
        amount: "",
        paymentMethod: "",
        transactionId: "",
        notes: ""
      });
      setSelectedUser(null);

    } catch (error) {
        toast.error("Failed to add money. Please try again.")
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.userId && formData.amount && formData.paymentMethod;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add Money to User Wallet</CardTitle>
          <CardDescription>
            As an agent, you can add funds to any user's wallet. Fill in the details below.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Selection */}
            <div className="space-y-2">
              <Label htmlFor="user">Select User *</Label>
              <Select value={formData.userId} onValueChange={handleUserSelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a user" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      <div className="flex flex-col">
                        <span className="font-medium">{user.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {user.phone} • Balance: ${user.currentBalance}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* User Info Display */}
            {selectedUser && (
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Name:</span> {selectedUser.name}
                    </div>
                    <div>
                      <span className="font-medium">Phone:</span> {selectedUser.phone}
                    </div>
                    <div>
                      <span className="font-medium">Current Balance:</span> 
                      <span className="font-bold text-green-600 ml-1">
                        ${selectedUser.currentBalance}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Amount and Payment Method */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount ($) *</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method *</Label>
                <Select 
                  value={formData.paymentMethod} 
                  onValueChange={(value) => handleInputChange('paymentMethod', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map((method) => (
                      <SelectItem key={method.value} value={method.value}>
                        {method.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Transaction ID and Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="transactionId">Transaction ID</Label>
                <Input
                  id="transactionId"
                  placeholder="Optional transaction reference"
                  value={formData.transactionId}
                  onChange={(e) => handleInputChange('transactionId', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Input
                  id="notes"
                  placeholder="Additional notes (optional)"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                />
              </div>
            </div>

            {/* Summary */}
            {formData.amount && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold">Transaction Summary</h4>
                      <p className="text-sm text-muted-foreground">
                        Adding ${parseFloat(formData.amount).toFixed(2)} to {selectedUser?.name || "user"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-600">
                        New Balance: ${((selectedUser?.currentBalance || 0) + parseFloat(formData.amount || '0')).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={!isFormValid || loading}
                className="min-w-32"
                size="lg"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Processing...
                  </>
                ) : (
                  "Add Money"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}