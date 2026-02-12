export function getEnvString(name: string): string | undefined {
  const env: Record<string, string | undefined> = {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    API_BASE_URL: process.env.API_BASE_URL,
    REACT_APP_API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
    GOOGLE_AUTH_URL: process.env.GOOGLE_AUTH_URL,
    FACEBOOK_AUTH_URL: process.env.FACEBOOK_AUTH_URL,
    API_TIMEOUT_MS: process.env.API_TIMEOUT_MS,
  };
  return env[name];
}
