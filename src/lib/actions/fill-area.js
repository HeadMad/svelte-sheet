export default function(arr, [rStart, cStart], [rEnd, cEnd], value) {
  var rMax = Math.max(rStart, rEnd);
  var cMax = Math.max(cStart, cEnd);
  var rMin = Math.min(rStart, rEnd);
  var cMin = Math.min(cStart, cEnd);

  if (value === undefined) {
    for (let r = rMin; r <= rMax; r++) 
      for (let c = cMin; c <= cMax; c++) 
        arr[r][c] = !arr[r][c];

  } else {
    for (let r = rMin; r <= rMax; r++) 
      for (let c = cMin; c <= cMax; c++) 
        arr[r][c] = value;
  }

  return arr;
}