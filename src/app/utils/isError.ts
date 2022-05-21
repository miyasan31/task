export const isError = <T>(value: T | Error): value is Error => value instanceof Error;
