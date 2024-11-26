export default function stringToPrice(str: string) {
  const arr = str.split(',');
  const price = Number(arr.join(''));
  return price;
}
