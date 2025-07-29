import { useEffect, useState } from 'react';
import { MetricCard } from './MetricCard';
import { RevenueChart } from './charts/RevenueChart';
import { AcquisitionChart } from './charts/AcquisitionChart';
import { TrafficChart } from './charts/TrafficChart';
import { CampaignsTable } from './CampaignsTable';
import { dashboardMetrics, generateRandomMetrics, MetricData } from '@/lib/mockData';
import { DollarSign, Users, Target, TrendingUp } from 'lucide-react';

const iconMap = {
  'Total Revenue': DollarSign,
  'Active Users': Users,
  'Conversions': Target,
  'Growth Rate': TrendingUp,
};

export function DashboardOverview() {
  const [metrics, setMetrics] = useState<MetricData[]>(dashboardMetrics);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(generateRandomMetrics());
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back, John! 👋
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your marketing campaigns today.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            changeType={metric.changeType}
            icon={iconMap[metric.title as keyof typeof iconMap]}
            className={`animate-scale-in`}
            style={{ animationDelay: `${index * 100}ms` }}
          />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="xl:col-span-1">
          <RevenueChart />
        </div>
        <div className="xl:col-span-1">
          <AcquisitionChart />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1">
          <TrafficChart />
        </div>
        <div className="xl:col-span-2">
          <CampaignsTable />
        </div>
      </div>
    </div>
  );
}