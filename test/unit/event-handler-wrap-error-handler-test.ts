import simple from 'simple-mock';
import { wrapErrorHandler } from '../../src/event-handler/wrap-error-handler';

test('error thrown in error handler', t => {
  t.plan(2);

  const messages = [];
  simple.mock(console, 'log', messages.push.bind(messages));
  expect(
    wrapErrorHandler(() => {
      throw new Error('oopsydoopsy');
    }, new Error('oops'))
  ).not.toThrow();

  t.ok(messages.find(message => /FATAL/.test(message)));
  simple.restore();
});

test('error handler returns rejected Error', t => {
  t.plan(2);

  const messages = [];
  simple.mock(console, 'log', messages.push.bind(messages));
  const promise = Promise.reject(new Error('oopsydoopsy'));
  expect(
    wrapErrorHandler(() => promise, new Error('oops'))
  ).not.toThrow();


  promise.catch(() => {
    t.ok(messages.find(message => /FATAL/.test(message)));
    simple.restore();
  });
});
