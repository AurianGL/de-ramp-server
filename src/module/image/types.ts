export type imageData = {
  width: number,
  height: number,
  data?: Buffer,
  arrayBuffer?: ArrayBuffer
}

export type ToCanvasFunc = (props: imageData) => ImageBitmap