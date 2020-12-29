import Jimp from 'jimp';
import { client } from "./db"

const numberOfDeadPixels = async (name: string) => {
	const nQuery = {
		name: 'fetch-deadPixel',
		text: `SELECT deadPixel FROM image WHERE name = $1`,
		values: [name]
	};
	try {
		const res = await client.query(nQuery)
		return res.rows[0].deadpixel
	} catch (error) {
		console.error(error)
		return
	}
}

const incrementDeadPixels = async (name: string, deadPixels: number) => {
	const nQuery = {
		name: 'update-deadPixel',
		text: `UPDATE image SET deadPixel = $1 WHERE name = $2;`,
		values: [deadPixels, name]
	};
	try {
		const res = await client.query(nQuery)
		return res
	} catch (error) {
		console.error(error)
		return
	} 
}

const arrayBufferToBufferCycle = (ab: ArrayBufferLike) => {
	var buffer = Buffer.alloc(ab.byteLength);
	var view = new Uint8Array(ab);
	for (var i = 0; i < buffer.length; ++i) {
		buffer[i] = view[i];
	}
	return buffer;
};

const deleteLastNPixels = (image: Jimp, n: number) => {
	const data = image.bitmap.data.buffer;
	const length = Math.max(data.byteLength - n, 0);
	const arrayBuffer = data.slice(0, length);
	const buffer = arrayBufferToBufferCycle(arrayBuffer);
	return buffer;
};

export const readImage = async (imageName: string) => {
	const image = await Jimp.read(`src/assets/${imageName}.jpg`);
	console.log(imageName);
	const n: number = await numberOfDeadPixels(imageName)
	console.log('deadPixels :', n)
	const buffer =deleteLastNPixels(image,  n);
	console.log(buffer.length)
	const aleteredImage = {
		bitmap: {
			width: image.bitmap.width,
			height: image.bitmap.height,
			data: buffer,
		},
	};
	// console.log(aleteredImage);
	const deadPixels = n + 4
	incrementDeadPixels(imageName, deadPixels)
	return aleteredImage;
};
