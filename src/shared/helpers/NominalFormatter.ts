export function nominalFormatter(x: number) {
  let nominal = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `Rp ${nominal}`;
}
