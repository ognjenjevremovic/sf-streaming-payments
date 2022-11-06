export function trimAddress(address: string, charLength: number = 12): string {
  return new Array(2)
    .fill(address)
    .map((addr, idx) =>
      !idx
        ? addr.substring(charLength / 2, 0)
        : addr.substring(addr.length - charLength / 2)
    )
    .join('...');
}
