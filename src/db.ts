import pg, { Client } from 'pg';

export const client = new Client({
	user: 'postgres',
	host: 'localhost',
	database: 'deramp',
	password: 'postgres',
	port: 5432,
});


// image migration
// const query = `
//   CREATE TABLE image (
//     name varchar,
//     deadPixel bigint
//   );
// `;

// client
// 	.query(query)
// 	.then(res => {
// 		console.log('TABLE is successfully crated');
// 	})
// 	.catch(err => {
// 		console.error('erreur in query', err);
// 	})
// 	.finally(() => {
// 		// client.end();
// 	});
