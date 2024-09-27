export default function(selection, data) {
  var result = [];
  var rstart, cstart, rend, cend;

  for (let r = 0; r < selection.length; r++) {
    let col = selection[r].indexOf(true);
    if (col === -1) continue;
    rstart = rend =r;
    cstart = col;
    cend = selection[r].lastIndexOf(true);
    break;
  }

  for (let r = selection.length - 1; r > rstart; r--) {
    console.log('second')
    let col = selection[r].indexOf(true);
    if (col === -1) continue;
    rend = r;
    cstart = Math.min(cstart, col);
    cend = Math.max(cend, selection[r].lastIndexOf(true));
    break;
  }

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