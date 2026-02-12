export function getEnvString(name: string): string | undefined {
  const value = process.env[name];
  if (typeof value === 'string' && value.trim().length > 0) return value;
  return undefined;
}
