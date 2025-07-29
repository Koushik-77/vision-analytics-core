import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  description?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon, 
  description,
  className,
  style 
}: MetricCardProps) {
  const changeColor = {
    positive: 'text-success',
    negative: 'text-destructive',
    neutral: 'text-muted-foreground'
  }[changeType];

  return (
    <div className={cn("metric-card animate-fade-in", className)} style={style}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <span className={cn("text-sm font-medium", changeColor)}>
          {change}
        </span>
        {description && (
          <span className="text-xs text-muted-foreground">{description}</span>
        )}
      </div>
    </div>
  );
}