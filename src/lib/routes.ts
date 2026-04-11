/**
 * Centralized route definitions to avoid hardcoded paths
 * Used across the app for consistent routing
 */

export const ROUTES = {
  // Auth routes
  AUTH: '/auth',
  LOGIN: '/login',
  SIGNUP: '/signup',
  AUTH_CALLBACK: '/auth/callback',

  // App routes
  APP: '/app',
  HOME: '/app',
  ONBOARDING: '/onboarding',

  // Legal & Help routes
  SUPPORT: '/support',
  CONTACT: '/contact',
  ABOUT: '/about',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  MEDICAL_DISCLAIMER: '/medical-disclaimer',

  // Landing
  LANDING: '/',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RouteValue = typeof ROUTES[RouteKey];
