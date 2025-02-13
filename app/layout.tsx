import * as React from 'react';
import { NextAppProvider } from '@toolpad/core/nextjs';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LinearProgress from '@mui/material/LinearProgress'
import type { Navigation } from '@toolpad/core/AppProvider';

import theme from '../theme';
import { BusinessCenter, PeopleAlt } from '@mui/icons-material';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'dashboard/users',
    title: 'Users',
    icon: <PeopleAlt />,
  },
  {
    segment: 'dashboard/projects',
    title: 'Projects',
    icon: <BusinessCenter />,
  },
];

const BRANDING = {
  title: 'AID App',
};



export default function RootLayout(props: { children: React.ReactNode }) {
  

  return (
    <html lang="en" data-toolpad-color-scheme="light" suppressHydrationWarning>
      <body>
        
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <React.Suspense fallback={<LinearProgress />}>
            <NextAppProvider
              navigation={NAVIGATION}
              branding={BRANDING}
              
              theme={theme}
            >
              {props.children}
            </NextAppProvider>
            </React.Suspense>
          </AppRouterCacheProvider>
        
      </body>
    </html>
  );
}
