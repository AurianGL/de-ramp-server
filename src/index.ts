import express from 'express';
import { rootHandler, helloHandler, imageHandler } from './handlers';
import cors from 'cors';
import { client } from './db';

var corsOptions = {
	origin: ['http://localhost:3000', 'https://auriangl.com'],
	"methods": "GET,HEAD",
	"preflightContinue": false,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

client.connect();
const app = express();
app.use(cors(corsOptions));
const port = process.env.PORT || '8000';

app.get('/', rootHandler);
app.get('/hello/:name', helloHandler);
app.get('/image/:name', imageHandler);
// app.get('/deramp/:id', imagesHandler);

app.listen(port, () => {
	console.info(`server is listening on port ${port}`);
});
