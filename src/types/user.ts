export interface User {
  _id: string;
  name: string;
  email: string;
  role:string,
  phone: string;
  avatar?: string;
  // isActive: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  isActive:"ACTIVE"|"BLOCK",
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
  amount: number | 0;
  description: string;
  createdAt: string;
  status: 'completed' | 'pending' | 'failed';
  recipient?: string;
  totolammount:number,
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