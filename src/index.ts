import express from 'express';
import { rootHandler, helloHandler, imageHandler } from './handlers';
import cors from 'cors';

const app = express();
app.use(cors());
const port = process.env.PORT || '8000';

app.get('/', rootHandler);
app.get('/hello/:name', helloHandler);
app.get('/image/:name', imageHandler);

app.listen(port, () => {
	console.info(`server is listening on port ${port}`);
});
