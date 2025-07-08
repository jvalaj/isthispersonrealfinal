// Backend configuration
export const BACKEND_CONFIG = {
  // Local development
  LOCAL: 'http://localhost:8080/api',
  
  // Production - Update this with your deployed backend URL
  PRODUCTION: 'https://your-backend-url.railway.app/api',
  
  // Get the current backend URL based on environment
  getCurrentUrl: () => {
    if (import.meta.env.DEV) {
      return BACKEND_CONFIG.LOCAL;
    }
    return BACKEND_CONFIG.PRODUCTION;
  }
};

// GraphQL endpoint
export const GRAPHQL_ENDPOINT = `${BACKEND_CONFIG.getCurrentUrl()}/graphql`; 