export type Transaction = {
  id: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  type: "credit" | "debit";
  status: "completed" | "pending" | "failed";
};

export const transactions: Transaction[] = [
  { id: "TX1001", name: "Apple Store", category: "Shopping", date: "2026-06-06", amount: -1299, type: "debit", status: "completed" },
  { id: "TX1002", name: "Salary - Acme Corp", category: "Income", date: "2026-06-05", amount: 8400, type: "credit", status: "completed" },
  { id: "TX1003", name: "Whole Foods", category: "Groceries", date: "2026-06-04", amount: -124.55, type: "debit", status: "completed" },
  { id: "TX1004", name: "Uber Ride", category: "Transport", date: "2026-06-04", amount: -18.4, type: "debit", status: "completed" },
  { id: "TX1005", name: "Netflix", category: "Entertainment", date: "2026-06-03", amount: -15.99, type: "debit", status: "completed" },
  { id: "TX1006", name: "Transfer from Sarah", category: "Transfer", date: "2026-06-02", amount: 250, type: "credit", status: "completed" },
  { id: "TX1007", name: "Electric Bill", category: "Utilities", date: "2026-06-01", amount: -89.2, type: "debit", status: "pending" },
  { id: "TX1008", name: "Amazon", category: "Shopping", date: "2026-05-30", amount: -76.3, type: "debit", status: "completed" },
  { id: "TX1009", name: "Freelance Payout", category: "Income", date: "2026-05-28", amount: 1200, type: "credit", status: "completed" },
  { id: "TX1010", name: "Starbucks", category: "Food", date: "2026-05-27", amount: -6.75, type: "debit", status: "completed" },
];

export const monthlyData = [
  { month: "Jan", income: 8200, expense: 5100 },
  { month: "Feb", income: 8400, expense: 4800 },
  { month: "Mar", income: 9100, expense: 5600 },
  { month: "Apr", income: 8700, expense: 5200 },
  { month: "May", income: 9600, expense: 6100 },
  { month: "Jun", income: 9400, expense: 5400 },
];

export const balanceHistory = [
  { day: "W1", balance: 18200 },
  { day: "W2", balance: 19450 },
  { day: "W3", balance: 21100 },
  { day: "W4", balance: 22480 },
  { day: "W5", balance: 23210 },
  { day: "W6", balance: 24820 },
];

export const spendingCategories = [
  { name: "Shopping", value: 1420, color: "var(--color-chart-1)" },
  { name: "Food", value: 680, color: "var(--color-chart-2)" },
  { name: "Transport", value: 320, color: "var(--color-chart-3)" },
  { name: "Utilities", value: 540, color: "var(--color-chart-4)" },
  { name: "Entertainment", value: 240, color: "var(--color-chart-5)" },
];

export type Card = {
  id: string;
  type: "Visa" | "Mastercard";
  variant: "debit" | "credit";
  last4: string;
  holder: string;
  expiry: string;
  frozen: boolean;
  limit?: number;
  balance?: number;
};

export const cards: Card[] = [
  { id: "c1", type: "Visa", variant: "debit", last4: "4827", holder: "Alex Morgan", expiry: "09/28", frozen: false, balance: 24820 },
  { id: "c2", type: "Mastercard", variant: "credit", last4: "1193", holder: "Alex Morgan", expiry: "12/27", frozen: false, limit: 10000, balance: 2340 },
  { id: "c3", type: "Visa", variant: "credit", last4: "7642", holder: "Alex Morgan", expiry: "03/29", frozen: true, limit: 5000, balance: 0 },
];

export type Account = {
  id: string;
  name: string;
  type: "Savings" | "Current";
  number: string;
  balance: number;
  currency: string;
};

export const accounts: Account[] = [
  { id: "a1", name: "Primary Savings", type: "Savings", number: "•••• 4892", balance: 24820.5, currency: "USD" },
  { id: "a2", name: "Everyday Current", type: "Current", number: "•••• 7711", balance: 4310.8, currency: "USD" },
  { id: "a3", name: "Vacation Fund", type: "Savings", number: "•••• 2204", balance: 6890.0, currency: "USD" },
];

export type Loan = {
  id: string;
  name: string;
  amount: number;
  remaining: number;
  emi: number;
  tenure: number;
  status: "active" | "approved" | "pending" | "closed";
  rate: number;
};

export const loans: Loan[] = [
  { id: "L1", name: "Home Loan", amount: 220000, remaining: 184200, emi: 1620, tenure: 240, status: "active", rate: 6.4 },
  { id: "L2", name: "Car Loan", amount: 28000, remaining: 12400, emi: 540, tenure: 60, status: "active", rate: 7.2 },
  { id: "L3", name: "Personal Loan", amount: 8000, remaining: 8000, emi: 280, tenure: 36, status: "pending", rate: 11.5 },
];

export type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "info" | "success" | "warning" | "alert";
  read: boolean;
};

export const notifications: Notification[] = [
  { id: "n1", title: "Payment received", message: "$1,200 from Freelance Payout", time: "2h ago", type: "success", read: false },
  { id: "n2", title: "Card transaction", message: "Apple Store charged $1,299", time: "5h ago", type: "info", read: false },
  { id: "n3", title: "Loan EMI due", message: "Home loan EMI of $1,620 due Jun 12", time: "1d ago", type: "warning", read: false },
  { id: "n4", title: "Security alert", message: "New login from MacBook · Chrome", time: "2d ago", type: "alert", read: true },
  { id: "n5", title: "KYC verified", message: "Your identity verification is complete", time: "5d ago", type: "success", read: true },
];
