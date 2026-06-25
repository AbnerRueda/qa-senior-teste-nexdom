import { test, expect } from '@playwright/test';

test.describe('ReqRes API - users', () => {
  const base = process.env.BASE_URL_API || 'https://reqres.in';

  test('create -> update -> delete (adaptado)', async ({ request }) => {
    // Create
    const create = await request.post(\`\${base}/api/users\`, { data: { name: 'qa-senior', job: 'tester' } });
    expect(create.status()).toBe(201);
    const body = await create.json();
    expect(body).toHaveProperty('id');

    const id = body.id;

    // Update
    const update = await request.put(\`\${base}/api/users/\${id}\`, { data: { name: 'qa-senior', job: 'lead' } });
    expect([200, 201]).toContain(update.status());
    const updateBody = await update.json();
    expect(updateBody).toHaveProperty('job', 'lead');

    // Delete
    const del = await request.delete(\`\${base}/api/users/\${id}\`);
    expect([204, 200]).toContain(del.status());
  });

  test('list users contract basic checks', async ({ request }) => {
    const resp = await request.get(\`\${base}/api/users?page=2\`);
    expect(resp.status()).toBe(200);
    const json = await resp.json();
    expect(json).toHaveProperty('data');
    expect(Array.isArray(json.data)).toBeTruthy();
    if (json.data.length > 0) {
      expect(json.data[0]).toHaveProperty('id');
      expect(json.data[0]).toHaveProperty('email');
    }
  });
});
