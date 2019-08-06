// tslint:disable:no-expression-statement
import test from 'ava';
import BasicExpression from './BasicExpression'

const rule: any = {
  "field": "brand",
  "operation": "include",
  "type": "basic",
  "values": [
    "Electrolux"
  ]
};

test('basic rule is passed', t => {
const basicExpression: BasicExpression = new BasicExpression(rule);
const result = basicExpression.interpret({"brand": "Electrolux"});
  t.is(result, true);
});

test('basic rule is failed', t => {
const basicExpression: BasicExpression = new BasicExpression(rule);
const result = basicExpression.interpret({"brand": "Samsung"});
  t.is(result, false);
});
