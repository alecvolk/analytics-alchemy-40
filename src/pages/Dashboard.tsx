import { DollarSign, TrendingUp, Target } from 'lucide-react';
import { useDashboardStore } from '@/store/dashboardStore';
import { KPICard } from '@/components/KPICard';
import { ExportButtons } from '@/components/ExportButtons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const COLORS = ['hsl(217, 91%, 60%)', 'hsl(244, 58%, 64%)', 'hsl(263, 70%, 50%)', 'hsl(142, 76%, 36%)'];

export default function Dashboard() {
  const { metrics } = useDashboardStore();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
        </div>
        <ExportButtons />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <KPICard
          title="Total Revenue"
          value={`$${metrics.revenue.toLocaleString()}`}
          change={12.5}
          icon={DollarSign}
          variant="primary"
        />
        <KPICard
          title="Average Order Value"
          value={`$${metrics.aov.toFixed(2)}`}
          change={5.3}
          icon={TrendingUp}
          variant="success"
        />
        <KPICard
          title="Conversion Rate"
          value={`${metrics.conversionRate.toFixed(1)}%`}
          change={-2.1}
          icon={Target}
          variant="warning"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Revenue Trend (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={metrics.revenueHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Revenue']}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(217, 91%, 60%)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Revenue by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={metrics.categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {metrics.categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Revenue']}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Category Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={metrics.categoryBreakdown}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Revenue']}
              />
              <Bar dataKey="value" fill="hsl(217, 91%, 60%)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
