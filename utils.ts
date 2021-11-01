export const n = (n: string): number => parseInt(n);

export function frmt(str: string) {
  return str.trim().replace(/\D+/g, '');
}
