export function concatUint8Array(data: Uint8Array[]): Uint8Array {
  let totalLength = 0;
  for (let i = 0; i < data.length; i++) {
    totalLength += data[i].length;
  }
  if (totalLength === 0) {
    // no data received
    return new Uint8Array(0);
  }

  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (let i = 0; i < data.length; i++) {
    result.set(data[i], offset);
    offset += data[i].length;
  }

  return result;
}
