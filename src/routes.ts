/**
 * An Array of public routes
 * These routes does not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/", "/auth/new-verification"]

/**
 * An Array of authenticated and protected routes
 * These routes require authentication and redirect user to /settings
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register", "/auth/reset", "/auth/new-password"]

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings"
