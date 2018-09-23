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

    this.result = -1;
  }

  add(number) {
    var plus = '+';
    if(!this.operator.length) {
      this.operator.push(plus);	
    } else {
      this.checkPriority(plus);
    }
    this.operand.push(number);
    return this;
  }
  
  subtract(number) {
    var minus = '-';
    if(!this.operator.length) {
      this.operator.push(minus);	
    } else {
      this.checkPriority(minus);
    }
    this.operand.push(number);
    return this;
  }

  multiply(number) {
    var mult = '*';
    if(!this.operator.length) {
      this.operator.push(mult);	
    } else {
      this.checkPriority(mult);
    }
    this.operand.push(number);
    return this;
  }

  devide(number) {
    var div = '/';
    if(!this.operator.length) {
      this.operator.push(div);	
    } else {
      this.checkPriority(div);
    }
    this.operand.push(number);
    return this;
  }

  pow(number) {
    var pow = '**';
    if(!this.operator.length) {
      this.operator.push(pow);	
    } else {
      this.checkPriority(pow);
    }
    this.operand.push(number);
    return this;
  }

  checkPriority(curOperator) {
    var lastOperator = this.operator[this.operator.length - 1];
    var lastOperatorPriority = this.priority[lastOperator];

    var curOperatorPriority = this.getPriority(curOperator);

    while(this.operator.length && lastOperatorPriority >= curOperatorPriority) {  
      this.operand.push(this.operator.pop());
      lastOperator = this.operator[this.operator.length - 1];
      lastOperatorPriority = this.getPriority(lastOperator);  
    }
    this.operator.push(curOperator);
  }

  getPriority(operator) {
    return this.priority[operator];
  }

  toString() {//toString()
    while(this.operator.length) {
      this.operand.push(this.operator.pop());
    }
    this.result = calculate(this.operand);

    return this.result;
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
