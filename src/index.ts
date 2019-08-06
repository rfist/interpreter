import UnionExpression from './expressions/UnionExpression'

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
      "conditions": [
        {
          "field": "type",
          "operation": "include",
          "type": "basic",
          "values": [
            "dishwasher"
          ],
        },
        {
          "field": "color",
          "operation": "include",
          "type": "basic",
          "values": [
            "yellow"
          ],
        }
      ],
      "connectiveType": "or",
      "type": "union",
    },
  ],
  "connectiveType": "and",
  "type": "union",
}

const unionExpression: UnionExpression = new UnionExpression(rule);
const context = {
  brand: 'Electrolux',
  type: 'bicycle',
  color: 'yellow',
}
const unionExpressionResult = unionExpression.interpret(context);
console.log('unionExpression', unionExpressionResult);

