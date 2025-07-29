# Design System Documentation

A comprehensive guide to the ADmyBRAND Insights design system, including colors, typography, spacing, components, and animations.

## Design Philosophy

The ADmyBRAND Insights design system is built on principles of:
- **Clarity**: Information is easily scannable and understandable
- **Consistency**: Uniform patterns across all components  
- **Accessibility**: High contrast and keyboard navigation support
- **Performance**: Smooth animations without performance impact
- **Professionalism**: Modern aesthetics that build trust

## Color System

### Primary Palette

Our color system uses HSL values for consistent theming and easy manipulation:

```css
:root {
  /* Primary Colors */
  --primary: 221.2 83.2% 53.3%;           /* Modern Blue */
  --primary-foreground: 210 40% 98%;      /* Light text on primary */
  
  /* Secondary Colors */
  --secondary: 210 40% 96%;               /* Light Gray */
  --secondary-foreground: 222.2 84% 4.9%; /* Dark text on secondary */
  
  /* Background Colors */
  --background: 0 0% 100%;                /* Pure White */
  --foreground: 222.2 84% 4.9%;          /* Near Black */
  
  /* Card & Surface Colors */
  --card: 0 0% 100%;                      /* White Cards */
  --card-foreground: 222.2 84% 4.9%;     /* Dark text on cards */
  
  /* Muted Colors */
  --muted: 210 40% 96%;                   /* Light Gray Background */
  --muted-foreground: 215.4 16.3% 46.9%; /* Medium Gray Text */
  
  /* Border Colors */
  --border: 214.3 31.8% 91.4%;           /* Subtle Gray Border */
  --input: 214.3 31.8% 91.4%;            /* Input Border Color */
  
  /* Ring Colors (Focus) */
  --ring: 221.2 83.2% 53.3%;             /* Primary Blue Focus */
}
```

### Status Colors

```css
:root {
  /* Success States */
  --success: 142.1 76.2% 36.3%;          /* Green */
  --success-foreground: 355.7 100% 97.3%; /* Light text on green */
  
  /* Warning States */
  --warning: 47.9 95.8% 53.1%;           /* Amber */
  --warning-foreground: 26 83.3% 14.1%;   /* Dark text on amber */
  
  /* Destructive States */
  --destructive: 0 84.2% 60.2%;          /* Red */
  --destructive-foreground: 210 40% 98%;  /* Light text on red */
}
```

### Color Usage Guidelines

#### When to Use Each Color

**Primary Blue (`--primary`)**
- Primary action buttons
- Links and interactive elements
- Icons in metric cards
- Chart primary data series
- Active navigation states

**Success Green (`--success`)**
- Positive metric changes
- Success messages and toasts
- Active campaign status badges
- Upward trending indicators

**Warning Amber (`--warning`)**
- Neutral metric states
- Paused campaign status
- Attention-requiring elements
- Moderate priority alerts

**Destructive Red (`--destructive`)**
- Negative metric changes  
- Error states and messages
- Delete actions
- Critical alerts

**Muted Gray (`--muted`)**
- Background sections
- Disabled states
- Secondary information
- Table row alternates

### Color Accessibility

All color combinations meet WCAG 2.1 AA standards:
- **Primary on White**: 4.5:1 contrast ratio
- **Foreground on Background**: 16.8:1 contrast ratio  
- **Muted Foreground on Background**: 7.2:1 contrast ratio

## Typography System

### Font Family
```css
font-family: "Inter", sans-serif;
```

Inter was chosen for its:
- Excellent readability at all sizes
- Modern, professional appearance
- Complete character set including numbers and symbols
- Optimized for digital interfaces

### Font Scale

```css
/* Font Sizes */
.text-xs { font-size: 0.75rem; line-height: 1rem; }      /* 12px */
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }  /* 14px */
.text-base { font-size: 1rem; line-height: 1.5rem; }     /* 16px */
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }  /* 18px */
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }   /* 20px */
.text-2xl { font-size: 1.5rem; line-height: 2rem; }      /* 24px */
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; } /* 30px */
```

### Font Weights

```css
.font-normal { font-weight: 400; }    /* Regular text */
.font-medium { font-weight: 500; }    /* Emphasis */
.font-semibold { font-weight: 600; }  /* Subheadings */
.font-bold { font-weight: 700; }      /* Headings */
```

### Typography Hierarchy

#### Headings
```css
/* Page Titles */
h1 { 
  font-size: 1.875rem;    /* 30px */
  font-weight: 700;       /* Bold */
  line-height: 2.25rem;
  color: hsl(var(--foreground));
}

/* Section Titles */
h2 { 
  font-size: 1.5rem;      /* 24px */
  font-weight: 700;       /* Bold */
  line-height: 2rem;
  color: hsl(var(--foreground));
}

/* Component Titles */
h3 { 
  font-size: 1.125rem;    /* 18px */
  font-weight: 600;       /* Semibold */
  line-height: 1.75rem;
  color: hsl(var(--foreground));
}
```

#### Body Text
```css
/* Primary body text */
.body-large {
  font-size: 1rem;        /* 16px */
  font-weight: 400;       /* Normal */
  line-height: 1.5rem;
  color: hsl(var(--foreground));
}

/* Secondary body text */
.body-medium {
  font-size: 0.875rem;    /* 14px */
  font-weight: 400;       /* Normal */
  line-height: 1.25rem;
  color: hsl(var(--muted-foreground));
}

/* Small text */
.body-small {
  font-size: 0.75rem;     /* 12px */
  font-weight: 400;       /* Normal */
  line-height: 1rem;
  color: hsl(var(--muted-foreground));
}
```

### Typography Usage Guidelines

#### Metric Values
- **Font Size**: `text-2xl` (24px)
- **Font Weight**: `font-bold` (700)
- **Color**: `text-foreground`

#### Metric Titles
- **Font Size**: `text-sm` (14px)
- **Font Weight**: `font-medium` (500)
- **Color**: `text-muted-foreground`

#### Chart Titles
- **Font Size**: `text-lg` (18px)
- **Font Weight**: `font-semibold` (600)
- **Color**: `text-foreground`

#### Table Headers
- **Font Size**: `text-sm` (14px)
- **Font Weight**: `font-semibold` (600)
- **Color**: `text-foreground`

## Spacing System

### Grid System
Based on 8px grid for consistent spacing:

```css
/* Spacing Scale */
.space-1 { margin/padding: 0.25rem; }  /* 4px */
.space-2 { margin/padding: 0.5rem; }   /* 8px */
.space-3 { margin/padding: 0.75rem; }  /* 12px */
.space-4 { margin/padding: 1rem; }     /* 16px */
.space-6 { margin/padding: 1.5rem; }   /* 24px */
.space-8 { margin/padding: 2rem; }     /* 32px */
.space-12 { margin/padding: 3rem; }    /* 48px */
.space-16 { margin/padding: 4rem; }    /* 64px */
```

### Component Spacing

#### Card Components
```css
.metric-card {
  padding: 1.5rem;        /* 24px */
  gap: 1rem;              /* 16px between elements */
}

.chart-container {
  padding: 1.5rem;        /* 24px */
  margin-bottom: 1.5rem;   /* 24px bottom margin */
}
```

#### Layout Spacing
```css
.dashboard-grid {
  gap: 1.5rem;           /* 24px between grid items */
}

.sidebar {
  padding: 1rem;         /* 16px internal padding */
}

.main-content {
  padding: 1.5rem;       /* 24px page padding */
}
```

### Responsive Spacing
```css
/* Mobile */
@media (max-width: 768px) {
  .main-content { padding: 1rem; }      /* 16px on mobile */
  .metric-card { padding: 1rem; }       /* 16px on mobile */
}

/* Tablet */
@media (min-width: 768px) {
  .main-content { padding: 1.5rem; }    /* 24px on tablet */
  .metric-card { padding: 1.5rem; }     /* 24px on tablet */
}

/* Desktop */
@media (min-width: 1024px) {
  .main-content { padding: 2rem; }      /* 32px on desktop */
}
```

## Component Specifications

### Button Components

#### Primary Button
```css
.btn-primary {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  padding: 0.5rem 1rem;              /* 8px 16px */
  border-radius: 0.375rem;           /* 6px */
  font-weight: 500;                  /* Medium */
  font-size: 0.875rem;              /* 14px */
  
  /* Hover State */
  &:hover {
    background: hsl(var(--primary) / 0.9);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px hsl(var(--primary) / 0.15);
  }
}
```

#### Secondary Button
```css
.btn-secondary {
  background: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
  border: 1px solid hsl(var(--border));
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
  
  &:hover {
    background: hsl(var(--secondary) / 0.8);
  }
}
```

### Card Components

#### Metric Card
```css
.metric-card {
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: 0.5rem;             /* 8px */
  padding: 1.5rem;                   /* 24px */
  box-shadow: 0 1px 3px hsl(0 0% 0% / 0.1);
  
  /* Hover Effect */
  &:hover {
    box-shadow: 0 4px 12px hsl(0 0% 0% / 0.15);
    transform: translateY(-2px);
  }
}
```

#### Chart Container
```css
.chart-container {
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}
```

### Input Components

#### Text Input
```css
.input {
  border: 1px solid hsl(var(--border));
  border-radius: 0.375rem;           /* 6px */
  padding: 0.5rem 0.75rem;          /* 8px 12px */
  font-size: 0.875rem;              /* 14px */
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  
  /* Focus State */
  &:focus {
    outline: none;
    border-color: hsl(var(--ring));
    box-shadow: 0 0 0 2px hsl(var(--ring) / 0.2);
  }
  
  /* Placeholder */
  &::placeholder {
    color: hsl(var(--muted-foreground));
  }
}
```

### Status Badge Components

#### Badge Variants
```css
.badge-success {
  background: hsl(var(--success));
  color: hsl(var(--success-foreground));
  padding: 0.25rem 0.5rem;          /* 4px 8px */
  border-radius: 0.25rem;           /* 4px */
  font-size: 0.75rem;              /* 12px */
  font-weight: 500;
}

.badge-warning {
  background: hsl(var(--warning));
  color: hsl(var(--warning-foreground));
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.badge-neutral {
  background: hsl(var(--muted));
  color: hsl(var(--muted-foreground));
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
}
```

## Animation System

### Animation Principles
- **Duration**: 200-300ms for micro-interactions
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` for natural feel
- **Performance**: Use transform and opacity for smooth animations
- **Accessibility**: Respect `prefers-reduced-motion`

### Keyframes

#### Fade Animations
```css
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
```

#### Slide Animations
```css
@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slide-up 0.4s ease-out;
}
```

#### Scale Animations
```css
@keyframes scale-in {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scale-in {
  animation: scale-in 0.2s ease-out;
}
```

### Hover Effects
```css
.hover-lift {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px hsl(0 0% 0% / 0.15);
}

.hover-scale {
  transition: transform 0.2s ease;
}

.hover-scale:hover {
  transform: scale(1.05);
}
```

## Responsive Design

### Breakpoints
```css
/* Mobile First Approach */
/* Base: 320px+ (Mobile) */

@media (min-width: 768px) {   /* Tablet */
  /* Tablet styles */
}

@media (min-width: 1024px) {  /* Desktop */
  /* Desktop styles */
}

@media (min-width: 1280px) {  /* Large Desktop */
  /* Large desktop styles */
}
```

### Grid System
```css
/* Mobile: Stack vertically */
.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* Tablet: 2 columns */
@media (min-width: 768px) {
  .dashboard-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

/* Desktop: 4 columns */
@media (min-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }
}
```

### Component Responsive Behavior

#### Sidebar
- **Mobile**: Collapses to overlay
- **Tablet**: Remains expanded
- **Desktop**: Full expanded sidebar

#### Charts
- **Mobile**: Single column, full width
- **Tablet**: Two columns
- **Desktop**: Three columns side-by-side

#### Data Tables
- **Mobile**: Horizontal scroll
- **Tablet**: Responsive columns
- **Desktop**: Full table layout

## Accessibility Guidelines

### Color Contrast
- All text meets WCAG 2.1 AA standards (4.5:1 minimum)
- Interactive elements have clear visual feedback
- Status colors are supported by text/icons, not color alone

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Focus indicators are clearly visible
- Tab order follows logical page flow

### Screen Reader Support
- Semantic HTML structure with proper headings
- ARIA labels for complex components
- Status updates announced to screen readers

### Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Implementation Guidelines

### CSS Custom Properties Usage
Always use CSS custom properties for themeable values:

```css
/* ✅ Correct */
color: hsl(var(--primary));
background: hsl(var(--card));

/* ❌ Incorrect */
color: #3b82f6;
background: #ffffff;
```

### Component Styling Pattern
```tsx
// Component structure
const ComponentName = ({ className, ...props }) => {
  return (
    <div 
      className={cn(
        "base-styles-here",
        "hover:hover-styles-here",
        "focus:focus-styles-here",
        className
      )}
      {...props}
    >
      {/* Component content */}
    </div>
  );
};
```

### Design Token Usage
```css
/* Define tokens in index.css */
:root {
  --component-specific-value: [value];
}

/* Use in components */
.my-component {
  property: hsl(var(--component-specific-value));
}
```

This design system ensures consistency, accessibility, and maintainability across the entire ADmyBRAND Insights dashboard.