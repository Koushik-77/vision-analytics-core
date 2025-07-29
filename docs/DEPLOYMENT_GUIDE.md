# Deployment Guide

Complete guide for deploying the ADmyBRAND Insights dashboard to various hosting platforms.

## Prerequisites

Before deploying, ensure you have:
- Node.js 18+ installed
- Git repository set up
- Project builds successfully locally
- All dependencies properly installed

## Build Process

### Local Build Testing
```bash
# Install dependencies
npm install

# Run development server to test
npm run dev

# Create production build
npm run build

# Test production build locally
npm run preview
```

### Build Output
The build process creates a `dist/` folder containing:
- Optimized HTML, CSS, and JavaScript files
- Compressed assets and images
- Source maps for debugging
- Static files ready for deployment

## Deployment Platforms

### 1. Vercel (Recommended)

Vercel is the recommended platform for React applications with excellent performance and easy setup.

#### Prerequisites
- GitHub/GitLab account
- Vercel account (free tier available)

#### Automatic Deployment (GitHub Integration)

1. **Connect Repository**
   ```bash
   # Push your code to GitHub
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy with Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure build settings (auto-detected):
     - **Framework Preset**: Vite
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`

3. **Environment Variables** (if needed)
   ```
   NODE_ENV=production
   VITE_APP_NAME=ADmyBRAND Insights
   ```

4. **Custom Domain** (Optional)
   - Go to Project Settings → Domains
   - Add your custom domain
   - Configure DNS records as instructed

#### Manual Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (your account)
# - Link to existing project? No
# - Project name: admybrand-insights
# - Directory: ./
```

#### Vercel Configuration File
Create `vercel.json` in project root:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### 2. Netlify

Netlify offers excellent static site hosting with continuous deployment.

#### Automatic Deployment

1. **Connect Repository**
   - Visit [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Build Settings**
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 18

3. **Deploy Settings**
   ```toml
   # netlify.toml
   [build]
     command = "npm run build"
     publish = "dist"
   
   [build.environment]
     NODE_VERSION = "18"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

#### Manual Deployment
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy to Netlify
netlify deploy

# For production deployment
netlify deploy --prod
```

### 3. GitHub Pages

Free hosting option directly from your GitHub repository.

#### Setup GitHub Pages

1. **Repository Settings**
   - Go to repository → Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages`

2. **GitHub Actions Workflow**
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
     pull_request:
       branches: [ main ]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       
       steps:
       - name: Checkout
         uses: actions/checkout@v3
       
       - name: Setup Node.js
         uses: actions/setup-node@v3
         with:
           node-version: '18'
           cache: 'npm'
       
       - name: Install dependencies
         run: npm ci
       
       - name: Build
         run: npm run build
       
       - name: Deploy to GitHub Pages
         uses: peaceiris/actions-gh-pages@v3
         if: github.ref == 'refs/heads/main'
         with:
           github_token: ${{ secrets.GITHUB_TOKEN }}
           publish_dir: ./dist
   ```

3. **Vite Configuration for GitHub Pages**
   Update `vite.config.ts`:
   ```typescript
   export default defineConfig({
     base: '/your-repository-name/', // Replace with your repo name
     // ... other config
   });
   ```

### 4. DigitalOcean App Platform

Scalable hosting with automatic deployments.

#### Deployment Steps

1. **Create App**
   - Visit DigitalOcean App Platform
   - Create new app from GitHub repository

2. **App Configuration**
   ```yaml
   # .do/app.yaml
   name: admybrand-insights
   services:
   - name: web
     source_dir: /
     github:
       repo: your-username/admybrand-insights
       branch: main
     run_command: npx serve dist
     build_command: npm run build
     environment_slug: node-js
     instance_count: 1
     instance_size_slug: basic-xxs
     routes:
     - path: /
   ```

### 5. AWS S3 + CloudFront

Enterprise-grade hosting with global CDN.

#### Setup Process

1. **Create S3 Bucket**
   ```bash
   # Install AWS CLI
   aws configure
   
   # Create bucket
   aws s3 mb s3://admybrand-insights-app
   ```

2. **Build and Upload**
   ```bash
   # Build the project
   npm run build
   
   # Upload to S3
   aws s3 sync dist/ s3://admybrand-insights-app --delete
   ```

3. **Configure Bucket for Static Hosting**
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::admybrand-insights-app/*"
       }
     ]
   }
   ```

4. **CloudFront Distribution**
   - Create CloudFront distribution
   - Origin: S3 bucket
   - Default root object: `index.html`
   - Error pages: Redirect 404 to `/index.html`

## Environment Configuration

### Environment Variables

For different environments, create appropriate env files:

#### Development (`.env.development`)
```env
VITE_APP_NAME=ADmyBRAND Insights (Dev)
VITE_API_URL=http://localhost:3001/api
VITE_ENVIRONMENT=development
```

#### Production (`.env.production`)
```env
VITE_APP_NAME=ADmyBRAND Insights
VITE_API_URL=https://api.admybrand.com
VITE_ENVIRONMENT=production
```

### Build Scripts

Update `package.json` with environment-specific scripts:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:staging": "vite build --mode staging",
    "build:production": "vite build --mode production",
    "preview": "vite preview",
    "deploy:vercel": "vercel --prod",
    "deploy:netlify": "netlify deploy --prod"
  }
}
```

## Performance Optimization

### Build Optimizations

1. **Bundle Analysis**
   ```bash
   # Install bundle analyzer
   npm install --save-dev rollup-plugin-visualizer
   
   # Add to vite.config.ts
   import { visualizer } from 'rollup-plugin-visualizer';
   
   export default defineConfig({
     plugins: [
       // ... other plugins
       visualizer({
         filename: 'dist/stats.html',
         open: true
       })
     ]
   });
   ```

2. **Asset Optimization**
   ```typescript
   // vite.config.ts
   export default defineConfig({
     build: {
       rollupOptions: {
         output: {
           manualChunks: {
           vendor: ['react', 'react-dom'],
             charts: ['recharts'],
             ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu']
           }
         }
       }
     }
   });
   ```

### CDN Configuration

#### Image Optimization
```typescript
// Use optimized image formats
const heroImage = new URL('../assets/dashboard-hero.jpg', import.meta.url).href;

// Lazy load images
<img 
  src={heroImage} 
  alt="Dashboard" 
  loading="lazy"
  decoding="async"
/>
```

#### Cache Headers
Configure hosting platform for optimal caching:
```
# Netlify _headers file
/*
  Cache-Control: public, max-age=31536000, immutable

/*.html
  Cache-Control: public, max-age=0, must-revalidate

/sw.js
  Cache-Control: public, max-age=0, must-revalidate
```

## Monitoring and Analytics

### Error Tracking

1. **Sentry Integration**
   ```bash
   npm install @sentry/react @sentry/tracing
   ```

   ```typescript
   // main.tsx
   import * as Sentry from "@sentry/react";
   
   Sentry.init({
     dsn: "YOUR_SENTRY_DSN",
     environment: import.meta.env.VITE_ENVIRONMENT,
     tracesSampleRate: 1.0,
   });
   ```

2. **Performance Monitoring**
   ```typescript
   // Add to main component
   import { BrowserTracing } from "@sentry/tracing";
   
   Sentry.addIntegration(new BrowserTracing());
   ```

### Analytics

1. **Google Analytics 4**
   ```typescript
   // utils/analytics.ts
   export const trackEvent = (eventName: string, parameters?: any) => {
     if (typeof gtag !== 'undefined') {
       gtag('event', eventName, parameters);
     }
   };
   ```

2. **Custom Analytics**
   ```typescript
   // Track dashboard interactions
   const handleMetricClick = (metricName: string) => {
     trackEvent('metric_click', {
       metric_name: metricName,
       page: 'dashboard'
     });
   };
   ```

## Security Considerations

### Content Security Policy
```html
<!-- index.html -->
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https:;
  connect-src 'self' https://api.admybrand.com;
">
```

### HTTPS Configuration
- Always use HTTPS in production
- Configure HSTS headers
- Use secure cookies for authentication

### Environment Secrets
```bash
# Never commit sensitive data
# Use platform-specific secret management

# Vercel
vercel env add VITE_API_KEY

# Netlify
netlify env:set VITE_API_KEY your-secret-key
```

## Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. **Routing Issues (404s)**
   - Ensure SPA fallback is configured
   - Check `_redirects` or equivalent for your platform

3. **Environment Variable Issues**
   - Verify variables start with `VITE_`
   - Check they're set in deployment platform
   - Ensure they're not undefined in code

4. **Performance Issues**
   - Analyze bundle size
   - Optimize images
   - Enable compression
   - Configure proper caching headers

### Debug Commands
```bash
# Test build locally
npm run build && npm run preview

# Check for TypeScript errors
npx tsc --noEmit

# Analyze bundle
npm run build -- --analyze

# Test on different devices
npx browser-sync start --server dist --files "dist/**/*"
```

## Maintenance

### Regular Updates
- Monitor dependencies for security updates
- Update Node.js version as needed
- Review performance metrics monthly
- Update deployment configurations as platforms evolve

### Backup Strategy
- Regular database backups (if applicable)
- Version control for all code changes
- Documentation updates with each deployment
- Rollback procedures for failed deployments

This deployment guide ensures successful hosting of the ADmyBRAND Insights dashboard with optimal performance and security.
