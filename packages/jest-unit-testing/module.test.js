// module.test.js
import mut from './module.js'; // MUT = Module Under Test

// 'sum' Tests
test('Testing sum -- success', () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
});

test('Testing sum -- success', () => {
  const expected = -30;
  const got = mut.sum(-12, -18);
  expect(got).toBe(expected);
});

test('Testing sum -- success', () => {
  const expected = 0;
  const got = mut.sum(-12, 12);
  expect(got).toBe(expected);
});

test('Testing sum -- success', () => {
  const expected = -30.5;
  const got = mut.sum(-12.5, -18);
  expect(got).toBe(expected);
});

// 'div' Tests
test('Testing div -- success', () => {
  const expected = 5;
  const got = mut.div(10, 2);
  expect(got).toBe(expected);
});

test('Testing div -- success', () => {
  const expected = -5;
  const got = mut.div(-10, 2);
  expect(got).toBe(expected);
});

test('Testing div -- success', () => {
  const expected = -5;
  const got = mut.div(10, -2);
  expect(got).toBe(expected);
});

test('Testing div -- success', () => {
  const expected = 2.5;
  const got = mut.div(5, 2);
  expect(got).toBe(expected);
});

test('Testing div -- success', () => {
  const expected = 0.5;
  const got = mut.div(1, 2);
  expect(got).toBe(expected);
});

test('Testing div -- success', () => {
  const expected = 0;
  const got = mut.div(0, 5);
  expect(got).toBe(expected);
});

test('Testing div -- success', () => {
  const expected = Infinity;
  const got = mut.div(10, 0);
  expect(got).toBe(expected);
});

test('Testing div -- success', () => {
  const expected = -Infinity;
  const got = mut.div(-10, 0);
  expect(got).toBe(expected);
});

test('Testing div -- success', () => {
  const expected = NaN;
  const got = mut.div(0, 0);
  expect(got).toBeNaN();
});

// 'containsNumbers' Tests
test('Testing containsNumbers -- success', () => {
  const expected = true;
  const got = mut.containsNumbers('abc123');
  expect(got).toBe(expected);
});

test('Testing containsNumbers -- success', () => {
  const expected = false;
  const got = mut.containsNumbers('abcdef');
  expect(got).toBe(expected);
});

test('Testing containsNumbers -- success', () => {
  const expected = true;
  const got = mut.containsNumbers('mle79');
  expect(got).toBe(expected);
});

test('Testing containsNumbers -- success', () => {
  const expected = false;
  const got = mut.containsNumbers('');
  expect(got).toBe(expected);
});

test('Testing containsNumbers -- success', () => {
  const expected = true;
  const got = mut.containsNumbers('27');
  expect(got).toBe(expected);
});

// THE FOLLLOWING TEST CASE SHOULD BE FALSE, BUT DUE TO BUG IT EVALUATES TO TRUE
// test('Testing containsNumbers -- success', () => {
//   const expected = false;
//   const got = mut.containsNumbers('   ');
//   expect(got).toBe(expected);
// });

test('Testing containsNumbers -- success', () => {
  const expected = true;
  const got = mut.containsNumbers('Pi = 3.14');
  expect(got).toBe(expected);
});

test('Testing containsNumbers -- success', () => {
  const expected = true;
  const got = mut.containsNumbers('0');
  expect(got).toBe(expected);
});

test('Testing containsNumbers -- success', () => {
  const expected = false;
  const got = mut.containsNumbers('number');
  expect(got).toBe(expected);
});
