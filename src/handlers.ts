import { Request, Response } from 'express';
import { readImage } from './image';

interface HelloResponse {
	hello: string;
}

type HelloBuilder = (name: string) => HelloResponse;

const helloBuilder: HelloBuilder = name => ({ hello: name });

export const rootHandler = (_req: Request, res: Response) => {
	return res.send('API is working');
};

export const helloHandler = (req: Request, res: Response) => {
	const { params } = req;
	const { name = 'World' } = params;
	const response = helloBuilder(name);

	return res.json(response);
};

export const imageHandler = async (req: Request, res: Response) => {
	const { params } = req;
	const { name } = params;
	const response = await readImage(name);
	return res.json(response);
};
