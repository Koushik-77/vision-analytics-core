# API Documentation

This document outlines the data structures, mock data generation, and future API integration patterns for the ADmyBRAND Insights dashboard.

## Data Structures

### Core Interfaces

#### MetricData
```typescript
interface MetricData {
  title: string;           // Display name of the metric
  value: string;           // Formatted value (e.g., "$124,563", "1,247")
  change: string;          // Change description (e.g., "+12.5% from last month")
  changeType: 'positive' | 'negative' | 'neutral';  // Determines color coding
  icon: LucideIcon;        // React component for the icon
  description?: string;    // Optional additional context
}
```

**Usage Example**:
```typescript
const revenueMetric: MetricData = {
  title: "Total Revenue",
  value: "$124,563",
  change: "+12.5% from last month",
  changeType: "positive",
  icon: DollarSign,
  description: "Monthly recurring revenue"
};
```

#### CampaignData
```typescript
interface CampaignData {
  id: string;              // Unique identifier
  name: string;            // Campaign name
  status: 'active' | 'paused' | 'completed';  // Current status
  impressions: number;     // Total ad impressions
  clicks: number;          // Total clicks received
  conversions: number;     // Total conversions
  ctr: number;            // Click-through rate (percentage)
  cpc: number;            // Cost per click (dollars)
  spend: number;          // Total spend (dollars)
}
```

**Usage Example**:
```typescript
const campaign: CampaignData = {
  id: "camp_001",
  name: "Summer Sale Campaign",
  status: "active",
  impressions: 125000,
  clicks: 3250,
  conversions: 87,
  ctr: 2.6,
  cpc: 1.25,
  spend: 4062
};
```

#### Chart Data Interfaces

##### RevenueData
```typescript
interface RevenueData {
  month: string;           // Month name (e.g., "Jan", "Feb")
  revenue: number;         // Revenue amount in dollars
}
```

##### AcquisitionData
```typescript
interface AcquisitionData {
  channel: string;         // Acquisition channel name
  customers: number;       // Number of customers acquired
}
```

##### TrafficData
```typescript
interface TrafficData {
  date: string;           // Date string (e.g., "2024-01-01")
  visitors: number;       // Number of unique visitors
}
```

## Mock Data Implementation

### Dashboard Metrics
Located in `src/lib/mockData.ts`, the dashboard provides four key metrics:

```typescript
export const dashboardMetrics: MetricData[] = [
  {
    title: "Total Revenue",
    value: "$124,563",
    change: "+12.5% from last month",
    changeType: "positive",
    icon: DollarSign
  },
  {
    title: "Active Users", 
    value: "1,247",
    change: "+8.2% from last month",
    changeType: "positive",
    icon: Users
  },
  {
    title: "Conversions",
    value: "89",
    change: "-2.1% from last month", 
    changeType: "negative",
    icon: Target
  },
  {
    title: "Growth Rate",
    value: "23.5%",
    change: "+5.3% from last month",
    changeType: "positive", 
    icon: TrendingUp
  }
];
```

### Campaign Performance Data
Sample campaigns with realistic performance metrics:

```typescript
export const campaignData: CampaignData[] = [
  {
    id: "1",
    name: "Summer Sale Campaign",
    status: "active",
    impressions: 125000,
    clicks: 3250,
    conversions: 87,
    ctr: 2.6,
    cpc: 1.25,
    spend: 4062
  },
  // ... additional campaigns
];
```

### Chart Data

#### Revenue Trends (12 months)
```typescript
export const revenueData: RevenueData[] = [
  { month: "Jan", revenue: 65000 },
  { month: "Feb", revenue: 78000 },
  { month: "Mar", revenue: 82000 },
  // ... additional months
];
```

#### Customer Acquisition Channels
```typescript
export const acquisitionData: AcquisitionData[] = [
  { channel: "Organic Search", customers: 245 },
  { channel: "Paid Social", customers: 189 },
  { channel: "Email Marketing", customers: 156 },
  // ... additional channels
];
```

#### Website Traffic (30 days)
```typescript
export const trafficData: TrafficData[] = [
  { date: "2024-01-01", visitors: 1200 },
  { date: "2024-01-02", visitors: 1350 },
  { date: "2024-01-03", visitors: 1180 },
  // ... additional days
];
```

## Real-time Data Simulation

### Metric Updates
The dashboard simulates real-time updates using `generateRandomMetrics()`:

```typescript
export function generateRandomMetrics(): MetricData[] {
  return dashboardMetrics.map(metric => {
    // Generate random variations within realistic ranges
    const baseValue = parseFloat(metric.value.replace(/[$,%]/g, '').replace(',', ''));
    const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
    const newValue = Math.round(baseValue * (1 + variation));
    
    // Format based on metric type
    let formattedValue: string;
    if (metric.title === "Total Revenue") {
      formattedValue = `$${newValue.toLocaleString()}`;
    } else if (metric.title === "Growth Rate") {
      formattedValue = `${newValue}%`;
    } else {
      formattedValue = newValue.toLocaleString();
    }
    
    return {
      ...metric,
      value: formattedValue,
      // Randomly update change percentages
      change: generateRandomChange(),
      changeType: Math.random() > 0.3 ? 'positive' : 
                 Math.random() > 0.5 ? 'negative' : 'neutral'
    };
  });
}
```

### Update Frequency
- **Metrics**: Update every 10 seconds
- **Charts**: Static data (would update with real API)
- **Campaign Table**: Static data with real-time filtering

## Data Validation

### Input Validation
```typescript
// Validate metric data structure
function validateMetricData(data: any): data is MetricData {
  return (
    typeof data.title === 'string' &&
    typeof data.value === 'string' &&
    typeof data.change === 'string' &&
    ['positive', 'negative', 'neutral'].includes(data.changeType)
  );
}

// Validate campaign data structure  
function validateCampaignData(data: any): data is CampaignData {
  return (
    typeof data.id === 'string' &&
    typeof data.name === 'string' &&
    ['active', 'paused', 'completed'].includes(data.status) &&
    typeof data.impressions === 'number' &&
    typeof data.clicks === 'number' &&
    typeof data.conversions === 'number' &&
    typeof data.ctr === 'number' &&
    typeof data.cpc === 'number' &&
    typeof data.spend === 'number'
  );
}
```

## Future API Integration

### Recommended API Structure

#### Metrics Endpoint
```
GET /api/dashboard/metrics
```

**Response**:
```json
{
  "status": "success",
  "data": {
    "metrics": [
      {
        "title": "Total Revenue",
        "value": "$124,563",
        "change": "+12.5%",
        "changeType": "positive",
        "period": "month",
        "updatedAt": "2024-01-15T10:30:00Z"
      }
    ]
  }
}
```

#### Campaigns Endpoint
```
GET /api/campaigns?page=1&limit=10&search=&sort=name&order=asc
```

**Response**:
```json
{
  "status": "success", 
  "data": {
    "campaigns": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 45,
      "totalPages": 5
    }
  }
}
```

#### Charts Data Endpoint
```
GET /api/analytics/revenue?period=12m
GET /api/analytics/acquisition?period=30d  
GET /api/analytics/traffic?period=30d
```

### API Client Implementation

```typescript
// api/client.ts
class DashboardAPI {
  private baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
  
  async getMetrics(): Promise<MetricData[]> {
    const response = await fetch(`${this.baseURL}/dashboard/metrics`);
    const data = await response.json();
    return data.data.metrics;
  }
  
  async getCampaigns(params: {
    page?: number;
    limit?: number;
    search?: string;
    sort?: string;
    order?: 'asc' | 'desc';
  }): Promise<{ campaigns: CampaignData[]; pagination: any }> {
    const queryParams = new URLSearchParams(params as any);
    const response = await fetch(`${this.baseURL}/campaigns?${queryParams}`);
    const data = await response.json();
    return data.data;
  }
  
  async getRevenueData(period: string = '12m'): Promise<RevenueData[]> {
    const response = await fetch(`${this.baseURL}/analytics/revenue?period=${period}`);
    const data = await response.json();
    return data.data;
  }
}

export const dashboardAPI = new DashboardAPI();
```

### React Query Integration

```typescript
// hooks/useMetrics.ts
import { useQuery } from '@tanstack/react-query';
import { dashboardAPI } from '../api/client';

export function useMetrics() {
  return useQuery({
    queryKey: ['dashboard', 'metrics'],
    queryFn: dashboardAPI.getMetrics,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 10000 // Consider data stale after 10 seconds
  });
}

export function useCampaigns(params: any) {
  return useQuery({
    queryKey: ['campaigns', params],
    queryFn: () => dashboardAPI.getCampaigns(params),
    keepPreviousData: true // Keep previous data while loading new
  });
}
```

## Error Handling

### API Error Types
```typescript
interface APIError {
  status: 'error';
  message: string;
  code: string;
  details?: any;
}

interface NetworkError {
  type: 'network';
  message: string;
  retryable: boolean;
}
```

### Error Handling Patterns
```typescript
// Custom hook for error handling
export function useErrorHandler() {
  const showToast = useToast();
  
  return (error: Error | APIError) => {
    if ('status' in error && error.status === 'error') {
      showToast({
        title: 'API Error',
        description: error.message,
        variant: 'destructive'
      });
    } else {
      showToast({
        title: 'Network Error', 
        description: 'Please check your connection and try again',
        variant: 'destructive'
      });
    }
  };
}
```

## Performance Optimization

### Data Caching Strategy
1. **Short-term cache**: 10 seconds for metrics
2. **Medium-term cache**: 5 minutes for campaign data  
3. **Long-term cache**: 1 hour for chart data

### Pagination Implementation
```typescript
interface PaginationParams {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Efficient pagination component
function usePagination(params: PaginationParams) {
  const [currentPage, setCurrentPage] = useState(params.page);
  
  const goToPage = (page: number) => {
    if (page >= 1 && page <= params.totalPages) {
      setCurrentPage(page);
    }
  };
  
  return {
    currentPage,
    goToPage,
    hasNext: currentPage < params.totalPages,
    hasPrev: currentPage > 1
  };
}
```

## Security Considerations

### API Authentication
```typescript
// Include authentication headers
const authHeaders = {
  'Authorization': `Bearer ${getAccessToken()}`,
  'Content-Type': 'application/json'
};

// API client with auth
class AuthenticatedAPI extends DashboardAPI {
  private getAuthHeaders() {
    return {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json'
    };
  }
  
  async authenticatedRequest(url: string, options: RequestInit = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers
      }
    });
  }
}
```

### Data Sanitization
```typescript
// Sanitize user input for API calls
function sanitizeSearchTerm(term: string): string {
  return term
    .trim()
    .replace(/[<>]/g, '') // Remove potential XSS characters
    .substring(0, 100); // Limit length
}

// Validate sort parameters
function validateSortField(field: string): field is keyof CampaignData {
  const allowedFields: (keyof CampaignData)[] = [
    'name', 'impressions', 'clicks', 'conversions', 'spend'
  ];
  return allowedFields.includes(field as keyof CampaignData);
}
```

This API documentation provides the foundation for transitioning from mock data to a real backend API while maintaining the same component interfaces and user experience.