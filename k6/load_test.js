import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 15,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<500'],
    checks: ['rate>0.95']
  }
};

const BASE = __ENV.BASE_URL_API || 'https://jsonplaceholder.typicode.com';

export default function () {
  const res = http.get(`${BASE}/posts`);
  check(res, {
    'status is 200': (r) => r.status === 200,
    'body non-empty': (r) => r.body && r.body.length > 0
  });
  sleep(1);
}
