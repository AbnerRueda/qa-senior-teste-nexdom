import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 20,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<500']
  }
};

const BASE = __ENV.BASE_URL_API || 'https://reqres.in';

export default function () {
  const res = http.get(\`\${BASE}/api/users?page=2\`);
  check(res, { 'status 200': (r) => r.status === 200, 'body non-empty': (r) => r.body.length > 0 });
  sleep(1);
}
