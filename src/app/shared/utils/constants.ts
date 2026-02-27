/**
 * Application constants
 */

export const APP_CONSTANTS = {
  APP_NAME: 'Angular MCP Demo',
  VERSION: '1.0.0',

  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [5, 10, 25, 50, 100],
  },

  TIMEOUTS: {
    API_TIMEOUT: 30000,
    NOTIFICATION_DEFAULT: 5000,
  },

  REGEX: {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE: /^[0-9\-\+\(\)\s]+$/,
    URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  },
};
