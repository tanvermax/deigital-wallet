export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  isActive:boolean,
createdAt:string
}

export interface Wallet {
  balance: number;
  currency: string;
  lastUpdated: string;
  totalDeposits: number;
  totalWithdrawals: number;
}

export interface Transaction {
  _id: string;
  type: string;
  amount: number;
  description: string;
  createdAt: string;
  status: 'completed' | 'pending' | 'failed';
  recipient?: string;
  reference: string;
  receiver:string,
  name?:string
}

export interface QuickAction {
  id: string;
  label: string;
  description: string;
  icon: string;
  variant: 'default' | 'destructive' | 'outline' | 'secondary';
  href?: string;
  action?: () => void;
}