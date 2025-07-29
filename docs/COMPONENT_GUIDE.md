# Component Guide

This guide provides detailed documentation for all components in the ADmyBRAND Insights dashboard.

## Component Architecture

The dashboard follows a hierarchical component structure with clear separation of concerns:

```
DashboardLayout
├── Sidebar
├── Header
└── DashboardOverview
    ├── MetricCard (x4)
    ├── RevenueChart
    ├── AcquisitionChart
    ├── TrafficChart
    └── CampaignsTable
```

## Layout Components

### DashboardLayout
**Location**: `src/components/dashboard/DashboardLayout.tsx`

Main layout wrapper that provides the overall structure for the dashboard.

```typescript
interface DashboardLayoutProps {
  children: React.ReactNode;
}
```

**Features**:
- Responsive layout with flexible sidebar
- Manages sidebar collapse state
- Provides consistent background and structure

**Usage**:
```tsx
<DashboardLayout>
  <YourPageContent />
</DashboardLayout>
```

### Sidebar
**Location**: `src/components/dashboard/Sidebar.tsx`

Navigation sidebar with collapsible functionality.

```typescript
interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}
```

**Features**:
- Collapsible design (240px expanded, 80px collapsed)
- Navigation links with active state highlighting
- User profile section
- Smooth transition animations

**Navigation Items**:
- Dashboard (/) - BarChart3 icon
- Analytics (/analytics) - TrendingUp icon
- Campaigns (/campaigns) - Target icon
- Reports (/reports) - FileText icon
- Settings (/settings) - Settings icon

### Header
**Location**: `src/components/dashboard/Header.tsx`

Top header with search functionality and user actions.

```typescript
interface HeaderProps {
  sidebarCollapsed: boolean;
  onSidebarToggle: () => void;
}
```

**Features**:
- Dashboard title and description
- Centered search input with icon
- Notification bell with indicator
- Settings button
- User avatar initials (JD)

## Data Display Components

### MetricCard
**Location**: `src/components/dashboard/MetricCard.tsx`

Reusable card component for displaying key performance indicators.

```typescript
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
```

**Features**:
- Icon with primary color background
- Large value display
- Color-coded change indicators
- Optional description text
- Fade-in animation on load

**Change Type Colors**:
- `positive`: Green (`text-success`)
- `negative`: Red (`text-destructive`) 
- `neutral`: Gray (`text-muted-foreground`)

**Example Usage**:
```tsx
<MetricCard
  title="Total Revenue"
  value="$124,563"
  change="+12.5% from last month"
  changeType="positive"
  icon={DollarSign}
  description="Monthly recurring revenue"
/>
```

### CampaignsTable
**Location**: `src/components/dashboard/CampaignsTable.tsx`

Feature-rich data table with sorting, filtering, and export functionality.

**Features**:
- Search functionality across campaign names
- Sortable columns (Name, Impressions, Clicks, Conversions, Spend)
- Status badges with different colors
- CSV export functionality
- Responsive design with horizontal scroll

**Data Structure**:
```typescript
interface CampaignData {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  spend: number;
}
```

**Status Badge Colors**:
- `active`: Green background
- `paused`: Yellow/amber background
- `completed`: Gray background

**Export Feature**:
- Generates CSV with all visible data
- Includes all campaign metrics
- Filename includes current date
- Properly escaped CSV format

## Chart Components

### RevenueChart
**Location**: `src/components/dashboard/charts/RevenueChart.tsx`

Line chart displaying revenue trends over time.

**Features**:
- Responsive line chart using Recharts
- Gradient fill under the line
- Hover tooltips with formatted values
- Smooth curve interpolation
- Primary color theme

**Data Format**:
```typescript
interface RevenueData {
  month: string;
  revenue: number;
}
```

### AcquisitionChart
**Location**: `src/components/dashboard/charts/AcquisitionChart.tsx`

Bar chart showing customer acquisition across different channels.

**Features**:
- Vertical bar chart
- Channel-based data grouping
- Hover tooltips
- Primary color bars
- Responsive design

**Data Format**:
```typescript
interface AcquisitionData {
  channel: string;
  customers: number;
}
```

### TrafficChart
**Location**: `src/components/dashboard/charts/TrafficChart.tsx`

Area chart displaying website traffic analytics.

**Features**:
- Smooth area chart
- Gradient fill
- Time-based x-axis
- Responsive tooltips
- Professional styling

**Data Format**:
```typescript
interface TrafficData {
  date: string;
  visitors: number;
}
```

## Page Components

### DashboardOverview
**Location**: `src/components/dashboard/DashboardOverview.tsx`

Main dashboard page that orchestrates all dashboard components.

**Features**:
- Real-time metric updates (10-second intervals)
- Icon mapping for metrics
- Responsive grid layout
- Coordinated animations

**Icon Mapping**:
- "Total Revenue": DollarSign
- "Active Users": Users  
- "Conversions": Target
- "Growth Rate": TrendingUp

**Real-time Updates**:
- Uses `useEffect` with `setInterval`
- Generates realistic metric variations
- Maintains data consistency
- Smooth transition animations

## Animation Classes

All components use consistent animation classes:

- `animate-fade-in`: Fade in with slight upward movement
- `animate-slide-up`: Slide up from bottom
- `chart-container`: Container with padding and slide-up animation
- `metric-card`: Card styling with fade-in animation

## Styling Guidelines

### Design Tokens
All components use semantic color tokens from the design system:

```css
/* Primary colors */
--primary: hsl(221.2 83.2% 53.3%)
--primary-foreground: hsl(210 40% 98%)

/* Status colors */
--success: hsl(142.1 76.2% 36.3%)
--warning: hsl(47.9 95.8% 53.1%)
--destructive: hsl(0 84.2% 60.2%)

/* Background colors */
--background: hsl(0 0% 100%)
--card: hsl(0 0% 100%)
--muted: hsl(210 40% 96%)
```

### Typography Scale
- `text-xs`: 12px
- `text-sm`: 14px  
- `text-base`: 16px
- `text-lg`: 18px
- `text-xl`: 20px
- `text-2xl`: 24px

### Spacing Scale
- `gap-2`: 8px
- `gap-3`: 12px
- `gap-4`: 16px
- `gap-6`: 24px
- `p-2`: 8px padding
- `p-4`: 16px padding
- `p-6`: 24px padding

## Responsive Behavior

### Mobile (< 768px)
- Sidebar collapses automatically
- Metric cards stack vertically
- Charts maintain aspect ratio
- Tables scroll horizontally

### Tablet (768px - 1024px)
- Sidebar remains expanded
- 2-column metric grid
- Charts scale proportionally
- Full table functionality

### Desktop (> 1024px)
- Full layout with expanded sidebar
- 4-column metric grid
- Large chart displays
- Optimal table layout

## Best Practices

### Component Usage
1. Always use TypeScript interfaces for props
2. Include proper ARIA labels for accessibility
3. Use semantic HTML elements
4. Follow the established color system
5. Include loading states where appropriate

### Performance
1. Use React.memo for expensive components
2. Avoid inline functions in JSX when possible
3. Optimize chart re-renders with proper dependencies
4. Use CSS for animations instead of JavaScript

### Accessibility
1. Include proper heading hierarchy
2. Use semantic color meanings (red for errors, green for success)
3. Ensure keyboard navigation works
4. Maintain sufficient color contrast ratios

## Testing Components

### Manual Testing Checklist
- [ ] Component renders without errors
- [ ] Props are properly typed
- [ ] Responsive design works on all screen sizes
- [ ] Animations are smooth and not janky
- [ ] Colors follow the design system
- [ ] Accessibility features work properly

### Component Props Validation
All components include TypeScript interfaces to catch prop errors at compile time. Make sure to:

1. Define all required props
2. Use optional props (`?`) sparingly
3. Include proper JSDoc comments for complex props
4. Use union types for restricted values (`'positive' | 'negative' | 'neutral'`)

This ensures type safety and better developer experience when using the components.