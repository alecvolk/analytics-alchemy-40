import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  variant?: 'primary' | 'success' | 'warning' | 'accent';
}

export function KPICard({ title, value, change, icon: Icon, variant = 'primary' }: KPICardProps) {
  const gradientClass = {
    primary: 'bg-gradient-primary',
    success: 'bg-gradient-success',
    warning: 'bg-gradient-warning',
    accent: 'bg-gradient-accent',
  }[variant];

  const changeColor = change && change >= 0 ? 'text-success' : 'text-destructive';

  return (
    <Card className="relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {change !== undefined && (
              <p className={cn('text-sm font-medium', changeColor)}>
                {change >= 0 ? '+' : ''}{change}% vs last period
              </p>
            )}
          </div>
          <div className={cn('p-3 rounded-lg', gradientClass)}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
      <div className={cn('h-1', gradientClass)} />
    </Card>
  );
}
