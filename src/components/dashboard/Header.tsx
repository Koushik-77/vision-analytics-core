import { Bell, Search, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  sidebarCollapsed: boolean;
  onSidebarToggle: () => void;
}

export function Header({ sidebarCollapsed, onSidebarToggle }: HeaderProps) {
  return (
    <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
          <p className="text-sm text-muted-foreground">Monitor your marketing performance</p>
        </div>
      </div>

      {/* Center - Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search campaigns, metrics..."
            className="pl-10 bg-muted/50 border-border"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs"></span>
        </Button>
        
        <Button variant="ghost" size="sm">
          <Settings className="w-4 h-4" />
        </Button>

        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <span className="text-xs font-semibold text-primary-foreground">JD</span>
        </div>
      </div>
    </header>
  );
}