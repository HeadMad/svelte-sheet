export default function az(num) {
  const AZ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (num < 26)
    return AZ[num];
  
  return az(Math.floor(num / 26) - 1) + AZ[num % 26];
}