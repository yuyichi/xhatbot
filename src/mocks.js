// mocks.js
// 1. Import mocking utils
import { setupWorker, rest } from 'msw'
import Mock from 'mockjs';

// 2. Define request handlers and response resolvers
const worker = setupWorker(
  rest.get('http://localhost:6008/api/example', (req, res, ctx) => {
    console.log(req)
    return res(
      ctx.delay(1500),
      ctx.status(202, 'Mocked status'),
      ctx.json({
        message: 'This is a mocked error',
      }),
    )
  }),
  rest.get('http://localhost:6008/getList', (req, res, ctx) => {
    console.log(req)
    return res(
      ctx.delay(1000),
      ctx.status(200, 'Mocked status'),
      ctx.json(Mock.mock({
        'data|10': [{
          'id|+1': 1,
          'name': '业务名称'
        }],
        total: 10,
       }),
    ))
  },
))

console.log('worker')
// 3. Start the Service Worker
worker.start()