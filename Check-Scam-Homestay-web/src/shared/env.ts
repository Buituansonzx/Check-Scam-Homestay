export function getEnvString(name: string): string | undefined {
  const value = process.env.API_BASE_URL;
  console.log(value);
  if (typeof value === 'string' && value.trim().length > 0) return value;
  return undefined;
}
