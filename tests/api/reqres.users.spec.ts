import { test, expect } from '@playwright/test';

test.describe('JSONPlaceholder API - posts (adaptado)', () => {
  const base = process.env.BASE_URL_API || 'https://jsonplaceholder.typicode.com';

  test('create -> update (existing) -> delete (created)', async ({ request }) => {
    // Create a new post (response usually returns id 101 but not persisted)
    const create = await request.post(`${base}/posts`, { data: { title: 'qa-senior', body: 'tester', userId: 1 } });
    expect(create.status()).toBe(201);
    const created = await create.json();
    expect(created).toHaveProperty('id');
    const createdId = created.id;
    console.log('createdId=', createdId);

    // Update an existing resource (use a known existing id to avoid json-server internal issues)
    const existingId = 1;
    const update = await request.put(`${base}/posts/${existingId}`, { data: { id: existingId, title: 'qa-senior', body: 'lead', userId: 1 } });
    expect(update.status()).toBe(200);
    const updateBody = await update.json();
    expect(updateBody).toHaveProperty('body', 'lead');

    // Delete the created resource (jsonplaceholder typically responds 200)
    const del = await request.delete(`${base}/posts/${createdId}`);
    expect([200, 204]).toContain(del.status());
  });

  test('list posts contract basic checks', async ({ request }) => {
    const resp = await request.get(`${base}/posts`);
    expect(resp.status()).toBe(200);
    const json = await resp.json();
    expect(Array.isArray(json)).toBeTruthy();
    if (json.length > 0) {
      expect(json[0]).toHaveProperty('id');
      expect(json[0]).toHaveProperty('title');
      expect(json[0]).toHaveProperty('body');
    }
  });
});
