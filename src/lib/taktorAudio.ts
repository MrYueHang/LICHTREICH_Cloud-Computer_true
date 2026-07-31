export function encodeWav(samples: Float32Array, sampleRate = 32000): ArrayBuffer {
  let offset = 44;
  const buffer = new ArrayBuffer(offset + samples.length * 4);
  const view = new DataView(buffer);

  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + samples.length * 4, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 3, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 4, true);
  view.setUint16(32, 4, true);
  view.setUint16(34, 32, true);
  writeString(view, 36, 'data');
  view.setUint32(40, samples.length * 4, true);

  for (let index = 0; index < samples.length; index += 1, offset += 4) {
    view.setFloat32(offset, samples[index], true);
  }

  return buffer;
}

function writeString(view: DataView, offset: number, value: string): void {
  for (let index = 0; index < value.length; index += 1) {
    view.setUint8(offset + index, value.charCodeAt(index));
  }
}
