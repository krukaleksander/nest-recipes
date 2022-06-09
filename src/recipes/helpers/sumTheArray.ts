export function sumTheArray(arr: number[]): number {
  return arr.reduce(
    (previousValue, currentValue) => (currentValue += previousValue),
    0,
  );
}
