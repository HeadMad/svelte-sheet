export default function(data, start = 0, deleteCount = 0, insert = '' ) {
  if (Array.isArray(insert)) {
    if (Array.isArray(insert[0]))
      data.forEach((row, r) => row.splice(start, deleteCount, ...insert[r]));
    else
      data.forEach((row, r) => row.splice(start, deleteCount, insert[r]));

  } else {
    data.forEach((row, r) => row.splice(start, deleteCount, insert));
  }

  return data;
}