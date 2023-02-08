import cron from 'node-cron';
import dateFormat from 'dateformat';
import Express from 'express';
import { mkdir, writeFile } from 'fs/promises';

const countMap = new Map<string, number>();

mkdir('./out/')
	.catch(() => console.error());

Express()
	.get('/count/:id', (request, response) => {
		let identify = request.params.id;
		let count = countMap.get(request.params.id) ?? 0;
		countMap.set(identify, ++count);

		response
			.contentType('application/json')
			.send({ count });
	})
	.listen(80);

cron.schedule('0 * * * *', (now) => {
	if (!(now instanceof Date) || countMap.size === 0) return;

	const counts = [...countMap.values()];
	const countObj = [...countMap.keys()]
		.reduce((obj, key, i) => Object.assign(obj, { [key]: counts[i] }), {});

	writeFile(
		`./out/counts_${dateFormat(now, 'yyyy-mm-dd_HH-MM')}.json`,
		JSON.stringify(countObj, undefined, 2),
	)
		.then(() => countMap.clear())
		.catch(() => console.error());
});
