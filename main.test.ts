import { unstable_dev } from 'wrangler';
import type { UnstableDevWorker } from 'wrangler';
import { suite, expect, test, beforeAll, afterAll } from 'vitest';

suite('Worker', () => {
	let worker: UnstableDevWorker;

	beforeAll(async () => {
		worker = await unstable_dev('src/index.ts', { experimental: { disableExperimentalWarning: true } });
	});

	afterAll(async () => {
		await worker.stop();
	});

	test('root route', async () => {
		const req = new Request('http://something', { method: 'GET' });
		const resp = await worker.fetch(req);
		expect(resp.status).toBe(200);

		const text = await resp.text();
		expect(text).toBe('Hello, Websi!');
	});

	test('JSON route', async () => {
		const req = new Request('http://something/json', { method: 'GET' });
		console.log(req)
		const resp = await worker.fetch(req);
		expect(resp.status).toBe(201);

		const text = await resp.text();
		expect(text).toBe('Hello, Websi!');
	});
});
