import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      if (nextUrl.pathname.startsWith("/example")) {
        return isLoggedIn;
      }

      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;




/*INITIAL CONFIGURATION FOR NEXTAUTH.JS WITH CUSTOM AUTHORIZATION LOGIC AND PLACEHOLDER FOR PROVIDERS. THIS FILE DEFINES THE BEHAVIOR OF THE AUTHENTICATION SYSTEM, INCLUDING PAGE REDIRECTIONS BASED ON USER AUTHENTICATION STATUS.*/
/*export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/example');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig; */