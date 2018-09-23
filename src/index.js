class SmartCalculator {
  constructor(initialValue) {

    this.priority = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2,
      '**': 3
    };
    
    this.operator = [];
    this.operand = [];
    
    this.operand.push(initialValue);
  }

  add(number) {
    this.updateReversePolishExpression('+', number);
    return this;
  }
  
  subtract(number) {
    this.updateReversePolishExpression('-', number);
    return this;
  }

  multiply(number) {
    this.updateReversePolishExpression('*', number);
    return this;
  }

  devide(number) {
    this.updateReversePolishExpression('/', number);
    return this;
  }

  pow(number) {
    this.updateReversePolishExpression('**', number);
    return this;
  }

  updateReversePolishExpression(curOperator, number) {
    
    var lastOperator = this.operator[this.operator.length - 1];
    var lastOperatorPriority = this.priority[lastOperator];
    var curOperatorPriority = this.priority[curOperator];

    var flag = true;

    while(this.operator.length && lastOperatorPriority >= curOperatorPriority) { 
      if(curOperator === '**' && lastOperator === '**') {
        this.operand.push(number);
        this.operand.push(this.operator.pop());
        flag = false;
      } else {
        this.operand.push(this.operator.pop());
        flag = true;
      }
      lastOperator = this.operator[this.operator.length - 1];
      lastOperatorPriority = this.priority[lastOperator]; 
    }

    if(flag) {
      this.operator.push(curOperator);
      this.operand.push(number);
    } else {
      this.operator.push(curOperator);
    }
  }

  toString() {
    while(this.operator.length) {
      this.operand.push(this.operator.pop());
    }

    return calculate(this.operand);
  }
}

function calculate(rpn) { 

  const operators = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
    '**': (x, y) => x ** y
  };

  var stack = [];
  
  for(var i = 0; i < rpn.length; i++) {
    if(rpn[i] in operators) {
      var [y, x] = [stack.pop(), stack.pop()];
      stack.push(operators[rpn[i]](x, y));
    } else {
      stack.push(rpn[i]);
    }
  }
  return stack.pop(); 
}

module.exports = SmartCalculator;
