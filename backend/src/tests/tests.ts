import request from 'supertest';
import { app } from '../server'; // Assuming your Express server is exported as `app`

describe('Server Test', () => {
  it('should respond with 200 status code when the server is up and running', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  it('should return "Hello, world!" when the server is up and running', async () => {
    const response = await request(app).get('/');
    expect(response.text).toBe('Hello, world!');
  });

  // Add more test cases as needed to cover other routes and functionalities
});
