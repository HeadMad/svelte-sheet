export default function(selection, data) {
  var result = [];
  var rstart, cstart, rend, cend;

  for (let r = 0; r < selection.length; r++) {
    let col = selection[r].indexOf(true);
    if (col === -1) continue;
    rstart = rend = r;
    break;
  }

  for (let r = selection.length - 1; r > rstart; r--) {
    let col = selection[r].indexOf(true);
    if (col === -1) continue;
    rend = r;
    break;
  }
  
  for (let c = 0; c < selection[0].length; c++) {
    for (let r = rstart; r <= rend; r++) {
      if (selection[r][c]) {
        cstart = cend = c;
        break;
      }
    }
    if (cstart !== undefined) break;
  }

  for (let c = selection[0].length - 1; c > cstart; c--) {
    for (let r = rstart; r <= rend; r++) { 
      if (selection[r][c]) {
        cend = c;
        break;
      }
    }
    if (cend !== undefined) break;
  }

  console.log({rstart, rend, cstart, cend});

  let n = 0;
  for (let r = rstart; r <= rend; r++) {
    let row = [];
    let i = 0;
    for (let c = cstart; c <= cend; c++) {
      row[i++] = data[r][c];
    }
    result[n++] = row;
  }
  return result;

}