import AbstractInterface from './AbstractExpession.interface';
enum OPERATIONS {
  INCLUDE='include'
}

export default class BasicExpression implements AbstractInterface {
  private readonly operation: OPERATIONS;
  private readonly field: string;
  private readonly values: any[];
  constructor(data: any) {
    this.operation = data.operation;
    this.field = data.field;
    this.values = data.values;
  }

  public interpret(context: any){
    switch (this.operation) {
      case OPERATIONS.INCLUDE:
        return this.values.includes(context[this.field]);
    }
  }

}
