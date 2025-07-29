import { cn } from '@/lib/utils';
import { 
  BarChart3, 
  Home, 
  Users, 
  TrendingUp, 
  Settings, 
  Database,
  Target,
  Menu
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Campaigns', href: '/campaigns', icon: Target },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Reports', href: '/reports', icon: TrendingUp },
  { name: 'Data Sources', href: '/sources', icon: Database },
  { name: 'Settings', href: '/settings', icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <div className={cn(
      "bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Logo & Toggle */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-sidebar-foreground">ADmyBRAND</h1>
                <p className="text-xs text-sidebar-foreground/60">Insights</p>
              </div>
            </div>
          )}
          
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
          >
            <Menu className="w-4 h-4 text-sidebar-foreground" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.href === '/'}
            className={({ isActive }) =>
              cn(
                "sidebar-nav-item",
                isActive && "active"
              )
            }
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm font-medium">{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-sidebar-primary rounded-full flex items-center justify-center">
            <span className="text-xs font-semibold text-sidebar-primary-foreground">JD</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground">John Doe</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">john@admybrand.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}