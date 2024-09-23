export default function(arr, rStart, cStart, rEnd, cEnd, value) {
  var rMax = Math.max(rStart, rEnd);
  var cMax = Math.max(cStart, cEnd);
  var rMin = Math.min(rStart, rEnd);
  var cMin = Math.min(cStart, cEnd);

  for (let r = rMin; r < rMax; r++) {
    for (let c = cMin; c < cMax; c++) 
      arr[r][c] = value;
  }
  return arr;
}