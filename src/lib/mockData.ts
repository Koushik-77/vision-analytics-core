// Mock data for the analytics dashboard

export interface MetricData {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
}

export interface ChartDataPoint {
  name: string;
  value: number;
  date?: string;
}

export interface CampaignData {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  ctr: number;
  cpc: number;
}

// Key metrics for dashboard cards
export const dashboardMetrics: MetricData[] = [
  {
    title: 'Total Revenue',
    value: '$124,592',
    change: '+12.5% from last month',
    changeType: 'positive'
  },
  {
    title: 'Active Users',
    value: '8,942',
    change: '+3.2% from last month',
    changeType: 'positive'
  },
  {
    title: 'Conversions',
    value: '1,429',
    change: '+8.1% from last month',
    changeType: 'positive'
  },
  {
    title: 'Growth Rate',
    value: '15.8%',
    change: '-2.1% from last month',
    changeType: 'negative'
  }
];

// Revenue data for line chart
export const revenueData: ChartDataPoint[] = [
  { name: 'Jan', value: 85000 },
  { name: 'Feb', value: 92000 },
  { name: 'Mar', value: 89000 },
  { name: 'Apr', value: 105000 },
  { name: 'May', value: 118000 },
  { name: 'Jun', value: 124592 },
];

// User acquisition by channel for bar chart
export const acquisitionData: ChartDataPoint[] = [
  { name: 'Organic Search', value: 3420 },
  { name: 'Paid Search', value: 2890 },
  { name: 'Social Media', value: 1850 },
  { name: 'Email', value: 1240 },
  { name: 'Direct', value: 980 },
  { name: 'Referral', value: 562 },
];

// Traffic sources for donut chart
export const trafficSources: ChartDataPoint[] = [
  { name: 'Organic', value: 45 },
  { name: 'Paid Ads', value: 25 },
  { name: 'Social', value: 15 },
  { name: 'Email', value: 10 },
  { name: 'Direct', value: 5 },
];

// Campaign performance data for table
export const campaignData: CampaignData[] = [
  {
    id: 'camp_001',
    name: 'Summer Sale 2024',
    status: 'active',
    impressions: 125000,
    clicks: 4250,
    conversions: 128,
    spend: 5420,
    ctr: 3.4,
    cpc: 1.28
  },
  {
    id: 'camp_002',
    name: 'Brand Awareness Q2',
    status: 'active',
    impressions: 98000,
    clicks: 2940,
    conversions: 89,
    spend: 3780,
    ctr: 3.0,
    cpc: 1.29
  },
  {
    id: 'camp_003',
    name: 'Product Launch',
    status: 'completed',
    impressions: 156000,
    clicks: 6240,
    conversions: 245,
    spend: 8950,
    ctr: 4.0,
    cpc: 1.43
  },
  {
    id: 'camp_004',
    name: 'Retargeting Campaign',
    status: 'active',
    impressions: 87000,
    clicks: 3480,
    conversions: 156,
    spend: 4250,
    ctr: 4.0,
    cpc: 1.22
  },
  {
    id: 'camp_005',
    name: 'Holiday Promotion',
    status: 'paused',
    impressions: 203000,
    clicks: 7890,
    conversions: 298,
    spend: 12400,
    ctr: 3.9,
    cpc: 1.57
  }
];

// Generate random data for real-time updates
export function generateRandomMetrics(): MetricData[] {
  const baseMetrics = [...dashboardMetrics];
  return baseMetrics.map(metric => ({
    ...metric,
    value: metric.title === 'Total Revenue' 
      ? `$${(Math.random() * 50000 + 100000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
      : metric.title === 'Active Users'
      ? `${(Math.random() * 2000 + 8000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
      : metric.title === 'Conversions'
      ? `${(Math.random() * 500 + 1200).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
      : `${(Math.random() * 10 + 10).toFixed(1)}%`
  }));
}