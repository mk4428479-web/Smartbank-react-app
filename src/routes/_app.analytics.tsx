import { createFileRoute } from "@tanstack/react-router";
import { PageTransition } from "@/components/layout/PageTransition";
import { PageHeader } from "@/components/ui-bank/PageHeader";
import { monthlyData, spendingCategories } from "@/data/mockData";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatCurrency } from "@/utils/format";

export const Route = createFileRoute("/_app/analytics")({ component: Analytics });

const tooltipStyle = { background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 };

function Analytics() {
  const totalIn = monthlyData.reduce((s, m) => s + m.income, 0);
  const totalOut = monthlyData.reduce((s, m) => s + m.expense, 0);
  return (
    <PageTransition>
      <PageHeader title="Analytics" subtitle="Insights into your spending and income." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="rounded-2xl bg-card border border-border p-5 shadow-card"><div className="text-sm text-muted-foreground">6mo Income</div><div className="font-display text-2xl font-bold">{formatCurrency(totalIn)}</div></div>
        <div className="rounded-2xl bg-card border border-border p-5 shadow-card"><div className="text-sm text-muted-foreground">6mo Expense</div><div className="font-display text-2xl font-bold">{formatCurrency(totalOut)}</div></div>
        <div className="rounded-2xl gradient-primary text-primary-foreground p-5 shadow-elegant"><div className="text-sm opacity-80">Net savings</div><div className="font-display text-2xl font-bold">{formatCurrency(totalIn - totalOut)}</div></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-card border border-border p-5 shadow-card">
          <div className="font-display font-semibold mb-4">Income vs Expenses</div>
          <div className="h-72">
            <ResponsiveContainer><BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} /><Legend />
              <Bar dataKey="income" fill="var(--color-success)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="expense" fill="var(--color-destructive)" radius={[6, 6, 0, 0]} />
            </BarChart></ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl bg-card border border-border p-5 shadow-card">
          <div className="font-display font-semibold mb-4">Spending categories</div>
          <div className="h-72">
            <ResponsiveContainer><PieChart>
              <Pie data={spendingCategories} dataKey="value" nameKey="name" outerRadius={100} label>
                {spendingCategories.map((c, i) => <Cell key={i} fill={c.color} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart></ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl bg-card border border-border p-5 shadow-card lg:col-span-2">
          <div className="font-display font-semibold mb-4">Savings trend</div>
          <div className="h-72">
            <ResponsiveContainer><LineChart data={monthlyData.map(m => ({ ...m, net: m.income - m.expense }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="net" stroke="var(--color-primary)" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart></ResponsiveContainer>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
