import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 250,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.01'],   // http errors should be less than 1%
    http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
  }
};

export default function () {
  http.get('http://localhost:3000/api/totalReviewScore/9999980');
  sleep(1);
}
