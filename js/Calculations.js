class Calculations {
  
  static doMath = (currentResult = null, value = null, operator = null) => {
    
    switch(operator) {
      case 'plus':
        return currentResult + value;

      case 'minus':
        return currentResult - value;

      case 'multiply':
        return currentResult * value;

      case 'divide':
        return currentResult / value;
    }
  }

  static returnOperator = (operator = null) => {

    switch(operator) {
      case 'plus':
        return '+';

      case 'minus':
        return '−';

      case 'multiply':
        return '×';

      case 'divide':
        return '÷';

      case 'equal':
        return '=';
    }
  }
}