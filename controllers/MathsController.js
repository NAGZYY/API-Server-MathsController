import MathModel from '../models/math.js';
import Repository from '../models/repository.js';
import Controller from './Controller';

class MathsController extends Controller {
    constructor(HttpContext) {
        super(HttpContext, new Repository(new MathModel()));
    }

  processMathOperation(op, x, y) {
    switch (op) {
      case '+':
        return x + y;
      case '-':
        return x - y;
      case '*':
        return x * y;
      case '/':
        if (y === 0) {
          throw new Error("Division par zéro n'est pas autorisée.");
        }
        return x / y;
      case '%':
        return x % y;
      default:
        throw new Error(`Opération non prise en charge : '${op}'`);
    }
  }

  performMathOperation() {
    const { op, x, y } = this.HttpContext.path.params;

    if (isNaN(x) || isNaN(y)) {
      return {
        op,
        x,
        y,
        error: "'x' et 'y' doit être des nombres",
      };
    }

    try {
      const result = this.processMathOperation(op, parseFloat(x), parseFloat(y));
      return {
        op,
        x: parseFloat(x),
        y: parseFloat(y),
        value: result,
      };
    } catch (error) {
      return {
        op,
        x,
        y,
        error: error.message,
      };
    }
  }
}

export default MathsController;