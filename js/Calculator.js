class Calculator {
  constructor() {

    this.result = document.querySelector('.calculator__result-primary');
    this.subRes = document.querySelector('.calculator__result-secondary');
    this.numbers = [...document.querySelectorAll('[data-number]')];
    this.options = [...document.querySelectorAll('[data-option]')];
    this.operators = [...document.querySelectorAll('[data-operator]')];
    
    this.numbers.forEach(number => number.addEventListener('click', this.addNumber));
    this.options.forEach(option => option.addEventListener('click', this.addOption));
    this.operators.forEach(operator => operator.addEventListener('click', this.calculate));
    
    this.calculations = [];
    this.newNumber = false;
    this.reset = false;
    this.lastOperator = null;
    this.currentResult = 0;
    
    this.clear();
  }

  addNumber = (e) => {

    if(this.reset) this.clear();
    
    this.number = e.target.textContent;

    if(this.result.value === '0') this.result.value = this.number;
    else if(this.newNumber) this.result.value = this.number;
    else this.result.value += this.number;

    this.newNumber = false;
  }

  addOption = (e) => {
    
    this.option = e.target.dataset.option;
    this.lastChar = this.result.value[this.result.value.length - 1];
    
    if(this.option === 'dot') {
      (this.lastChar === '.' || this.result.value.indexOf('.') !== -1) 
        ? this.result.value
        : this.result.value += '.';
    }
    
    else if(this.option === 'clearEntry') this.result.value = '0';
    
    else if(this.option === 'clear') this.clear();
    
    else if(this.option === 'reverse') this.result.value = this.result.value * -1;

    else if(this.option === 'undo') {

      (this.result.value.length === 1) 
        ? this.result.value = '0' 
        : this.result.value = this.result.value.substring(0, this.result.value.length - 1);
    }
  }

  calculate = (e) => {

    this.operator = e.target.dataset.operator;
    this.value = Number(this.result.value);
    this.subRes.style.visibility = 'visible';

    if(this.operator === 'pow') {
      this.subRes.value = ` sqr(${this.result.value})`;
      this.result.value = Math.pow(this.result.value, 2);
    }

    else if(this.operator === 'sqrt') {
      this.subRes.value = ` ${e.target.textContent}(${this.result.value})`;
      this.result.value = Math.sqrt(this.result.value);
    }

    else if(this.operator === 'fraction') {
      this.subRes.value = ` 1/(${this.result.value})`;
      this.result.value = 1 / this.result.value;
    }

    else if(this.operator === 'percent') this.result.value = parseFloat(((this.currentResult * this.value) / 100).toPrecision(14));

    else {

      if(this.operator === 'equal' && this.newNumber && this.lastOperator !== null && this.lastOperator !== 'equal'){
        
        if(this.calculations.length > 2) 
        this.value = this.calculations.map(item => item).reverse().find(item => typeof item === 'number');

        this.calculations = [this.currentResult, Calculations.returnOperator(this.lastOperator), this.value, Calculations.returnOperator(this.operator)];
        
        this.currentResult = Calculations.doMath(this.currentResult, this.value, this.lastOperator);
        this.currentResult = (parseFloat(this.currentResult.toPrecision(14)));
        
        this.result.value = this.currentResult;
        this.subRes.value = this.calculations.join(' ');

      } else {

        if(this.newNumber) {
          this.lastOperator = this.operator;
          this.calculations[this.calculations.length-1] = Calculations.returnOperator(this.operator);
          this.subRes.value = this.calculations.join(' ');
          this.reset = false;
          return;
        }
        
        (this.lastOperator === null) 
          ? this.currentResult = this.value
          : this.currentResult = Calculations.doMath(this.currentResult, this.value, this.lastOperator);
         
        (this.operator !== 'equal')
          ? this.lastOperator = this.operator 
          : this.reset = true;
        
        this.newNumber = true;
        this.calculations.push(this.value);
        this.calculations.push(Calculations.returnOperator(this.operator));

        this.currentResult = (parseFloat(this.currentResult.toPrecision(14)));
        this.result.value = this.currentResult;

        this.subRes.value = this.calculations.join(' ');
      }
    }
  }

  clear = () => {
    this.subRes.style.visibility = 'hidden';
    this.result.value = '0';
    this.subRes.value = '';
    this.calculations = [];
    this.newNumber = false;
    this.reset = false;
    this.lastOperator = null;
    this.currentResult = 0;
  }
}