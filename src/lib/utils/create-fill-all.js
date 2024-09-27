export default function (rLen, cLen) {
  return function (value) {
    var result = new Array(rLen);
    for (let r = 0; r < rLen; r++) {
      result[r] = new Array(cLen);
      for (let c = 0; c < cLen; c++) {
        result[r][c] = value;
      }
    }
    return result;
  }
}