import { createFileRoute, Link } from "@tanstack/react-router";
import { PageTransition } from "@/components/layout/PageTransition";
import { PageHeader } from "@/components/ui-bank/PageHeader";
import { StatCard } from "@/components/ui-bank/StatCard";
import { TransactionList } from "@/components/ui-bank/TransactionList";
import { BankCard } from "@/components/ui-bank/BankCard";
import { balanceHistory, monthlyData, cards, spendingCategories } from "@/data/mockData";
import { formatCurrency } from "@/utils/format";
import {
  HiOutlineWallet, HiOutlineArrowTrendingUp, HiOutlineArrowTrendingDown, HiOutlineBanknotes,
  HiOutlinePaperAirplane, HiOutlineArrowDownTray, HiOutlineArrowUpTray,
} from "react-icons/hi2";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar, CartesianGrid, Cell, Pie, PieChart } from "recharts";

export const Route = createFileRoute("/_app/dashboard")({ component: Dashboard });

function Dashboard() {
  return (
    <PageTransition>
      <PageHeader title="Dashboard" subtitle="Welcome back — here's your money at a glance." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Balance" value={formatCurrency(35021.3)} delta="+12.4% this month" icon={<HiOutlineWallet className="h-5 w-5" />} accent="primary" />
        <StatCard label="Income" value={formatCurrency(9400)} delta="+8.2% vs last" icon={<HiOutlineArrowTrendingUp className="h-5 w-5" />} accent="success" />
        <StatCard label="Expenses" value={formatCurrency(5400)} delta="-3.1% vs last" icon={<HiOutlineArrowTrendingDown className="h-5 w-5" />} accent="destructive" />
        <StatCard label="Savings" value={formatCurrency(4000)} delta="Goal: $5,000" icon={<HiOutlineBanknotes className="h-5 w-5" />} accent="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <div className="lg:col-span-2 rounded-2xl bg-card border border-border p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-display text-lg font-semibold">Balance trend</div>
              <div className="text-xs text-muted-foreground">Last 6 weeks</div>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={balanceHistory}>
                <defs>
                  <linearGradient id="bal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Area type="monotone" dataKey="balance" stroke="var(--color-primary)" strokeWidth={2} fill="url(#bal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl bg-card border border-border p-5 shadow-card">
          <div className="font-display text-lg font-semibold mb-4">Quick actions</div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: HiOutlinePaperAirplane, label: "Send", to: "/transactions/send" },
              { icon: HiOutlineArrowDownTray, label: "Deposit", to: "/transactions/receive" },
              { icon: HiOutlineArrowUpTray, label: "Withdraw", to: "/transactions" },
            ].map(({ icon: Icon, label, to }) => (
              <Link key={label} to={to} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-muted hover:bg-accent transition">
                <div className="h-10 w-10 rounded-full gradient-primary grid place-items-center text-primary-foreground"><Icon className="h-5 w-5" /></div>
                <span className="text-xs font-medium">{label}</span>
              </Link>
            ))}
          </div>
          <div className="mt-5">
            <div className="text-sm font-medium mb-2">My card</div>
            <BankCard card={cards[0]} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <div className="lg:col-span-2 rounded-2xl bg-card border border-border p-5 shadow-card">
          <div className="flex justify-between items-center mb-4">
            <div className="font-display text-lg font-semibold">Recent transactions</div>
            <Link to="/transactions" className="text-sm text-primary font-medium">View all</Link>
          </div>
          <TransactionList limit={6} />
        </div>
        <div className="rounded-2xl bg-card border border-border p-5 shadow-card">
          <div className="font-display text-lg font-semibold mb-4">Spending</div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={spendingCategories} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={3}>
                  {spendingCategories.map((c, i) => <Cell key={i} fill={c.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {spendingCategories.map((c) => (
              <div key={c.name} className="flex items-center text-sm">
                <span className="h-2 w-2 rounded-full mr-2" style={{ background: c.color }} />
                <span className="flex-1">{c.name}</span>
                <span className="font-medium">{formatCurrency(c.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-card border border-border p-5 shadow-card mt-6">
        <div className="font-display text-lg font-semibold mb-4">Income vs Expenses</div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
              <Bar dataKey="income" fill="var(--color-success)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="expense" fill="var(--color-destructive)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </PageTransition>
  );
}
