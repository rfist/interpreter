// tslint:disable:no-expression-statement
import test from 'ava';
import UnionExpression from './UnionExpression'

const rule = {
  "conditions": [
    {
      "field": "brand",
      "operation": "include",
      "type": "basic",
      "values": [
        "Electrolux"
      ],
    },
    {
      "field": "model",
      "operation": "include",
      "type": "basic",
      "values": [
        "test"
      ],
    }
  ],
  "connectiveType": "and",
  "type": "union",
}

const orRule = {
  "conditions": [
    {
      "field": "brand",
      "operation": "include",
      "type": "basic",
      "values": [
        "Electrolux"
      ],
    },
    {
      "field": "model",
      "operation": "include",
      "type": "basic",
      "values": [
        "test"
      ],
    }
  ],
  "connectiveType": "or",
  "type": "union",
}

test('union and rule is passed', t => {
  const context = {
    brand: 'Electrolux',
    model: 'test',
  };
  const unionExpression = new UnionExpression(rule);
  const result = unionExpression.interpret(context);
  t.is(result, true);
});

test('union and rule with wrong field is failed', t => {
  const context = {
    brand: 'Electrolux',
    model: 'model',
  };
  const unionExpression = new UnionExpression(rule);
  const result = unionExpression.interpret(context);
  t.is(result, false);
});

test('union and rule with omitted field is failed', t => {
  const context = {brand: 'Samsung'};
  const unionExpression = new UnionExpression(rule);
  const result = unionExpression.interpret(context);
  t.is(result, false);
});

test('union or rule is passed', t => {
  const context = {
    brand: 'Electrolux',
  };
  const unionExpression = new UnionExpression(orRule);
  const result = unionExpression.interpret(context);
  t.is(result, true);
});

test('union or rule with one correct field is passed', t => {
  const context = {
    brand: 'Electrolux',
    model: 'model',
  };
  const unionExpression = new UnionExpression(orRule);
  const result = unionExpression.interpret(context);
  t.is(result, true);
});

test('union or rule with wrong or missed field is failed', t => {
  const context = { title: "Samsung"};
  const unionExpression = new UnionExpression(orRule);
  const result = unionExpression.interpret(context);
  t.is(result, false);
});
