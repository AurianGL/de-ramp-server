import { read } from 'jimp';
import { ToCanvasFunc } from './types';

export const getImageData = async (imageUrl: string) => {
	const image = await read(imageUrl);
	const {data, width, height} = image.bitmap;
	return {data, width, height}
};

export const arrayBufferToBufferCycle = (ab: ArrayBufferLike) => {
	var buffer = Buffer.alloc(ab.byteLength);
	var view = new Uint8Array(ab);
	for (var i = 0; i < buffer.length; ++i) {
		buffer[i] = view[i];
	}
	return buffer;
};

export const imageToCanvas: ToCanvasFunc = (props) => {
	const {width, height, arrayBuffer} = props
	const buffer = arrayBufferToBufferCycle(arrayBuffer!)
	const bitmap = {
			width: width,
			height: height,
			data: buffer,
	};
	return bitmap
}