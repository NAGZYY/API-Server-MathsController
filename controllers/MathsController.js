import Controller from './Controller';

class MathsController extends Controller {
  constructor(HttpContext, repository = null) {
    super(HttpContext, repository);
  }

  add(x, y) {
    return x + y;
  }

  subtract(x, y) {
    return x - y;
  }

  multiply(x, y) {
    return x * y;
  }

  divide(x, y) {
    if (y === 0) {
      throw new Error("Division par zéro n'est pas autorisé.");
    }
    return x / y;
  }

  modulo(x, y) {
    return x % y;
  }

  factorial(n) {
    if (n === 0) return 1;
    return n * this.factorial(n - 1);
  }

  isPrime(n) {
    if (n <= 1) return false;
    for (let i = 2; i * i <= n; i++) {
      if (n % i === 0) return false;
    }
    return true;
  }

  nthPrime(n) {
    let count = 0;
    let num = 2;
    while (count < n) {
      if (this.isPrime(num)) {
        count++;
      }
      num++;
    }
    return num - 1;
  }
}