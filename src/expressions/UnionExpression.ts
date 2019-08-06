import AbstractInterface from './AbstractExpession.interface';
import BasicExpression from './BasicExpression';
enum CONNECTIVE_TYPES {
  OR='or',
  AND='and'
}

export default class UnionExpression implements AbstractInterface {
  private readonly connectiveType: CONNECTIVE_TYPES;
  private readonly conditions: AbstractInterface[];
  constructor(data: any) {
    this.connectiveType = data.connectiveType;
    this.conditions = data.conditions.map(( condition:any ) => {
      const type = condition.type ? condition.type : 'basic';
      switch (type) {
        case 'basic':
          return new BasicExpression(condition);
        case 'union':
          return new UnionExpression(condition);
        default:
          throw new Error(`Unknown condition ${condition}`);
      }
    });
  }

  public interpret(context: any): boolean{
    const isPassed = (condition: AbstractInterface) => condition.interpret(context);
    switch (this.connectiveType) {
      case CONNECTIVE_TYPES.OR:
        return this.conditions.some(isPassed);
      default:
      case CONNECTIVE_TYPES.AND:
        return this.conditions.every(isPassed);
    }
  }
}
