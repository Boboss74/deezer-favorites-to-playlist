export function requireEnvVarString(name: string): string {
    const value = process.env[name];
    if (value) {
        return value;
    } else {
        throw new Error(`Missing environment variable ${name}`);
    }
}
