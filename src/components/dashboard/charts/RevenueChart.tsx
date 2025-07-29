import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { revenueData } from '@/lib/mockData';

export function RevenueChart() {
  return (
    <div className="chart-container animate-slide-up">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Revenue Trend</h3>
        <p className="text-sm text-muted-foreground">Monthly revenue performance</p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="name" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
              formatter={(value: any) => [`$${value.toLocaleString()}`, 'Revenue']}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 0, r: 6 }}
              activeDot={{ r: 8, stroke: 'hsl(var(--primary))', fill: 'hsl(var(--background))' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}