import MathModel from '../models/math.js';
import Repository from '../models/repository.js';
import Controller from './Controller';

class MathsController extends Controller {
    constructor(HttpContext) {
        super(HttpContext, new Repository(new MathModel()));
    }

    processMathOperation(op, x, y, n) {
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
            case '!':
                return this.factorial(n);
            case 'p':
                return this.isPrime(n);
            case 'np':
                return this.nthPrime(n);
            default:
                throw new Error(`Opération non prise en charge : '${op}'`);
        }
    }

    factorial(n) {
        if (n < 0) {
            throw new Error("Factorielle n'est définie que pour les entiers non négatifs.");
        } else if (n === 0 || n === 1) {
            return 1;
        } else {
            return n * this.factorial(n - 1);
        }
    }

    isPrime(n) {
        if (n <= 1) {
            return false;
        }
        if (n <= 3) {
            return true;
        }
        if (n % 2 === 0 || n % 3 === 0) {
            return false;
        }
        for (let i = 5; i * i <= n; i += 6) {
            if (n % i === 0 || n % (i + 2) === 0) {
                return false;
            }
        }
        return true;
    }

    nthPrime(n) {
        if (n < 1) {
            throw new Error("Entrez une valeur n valide (n doit être un entier positif).");
        }

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

    performMathOperation() {
        const { op, x, y, n } = this.HttpContext.path.params;

        if (isNaN(x) || isNaN(y) || isNaN(n)) {
            return {
                op,
                x,
                y,
                n,
                error: "Les paramètres doivent être des nombres valides.",
            };
        }

        try {
            const result = this.processMathOperation(op, parseFloat(x), parseFloat(y), parseInt(n));
            return {
                op,
                x: parseFloat(x),
                y: parseFloat(y),
                n: parseInt(n),
                value: result,
            };
        } catch (error) {
            return {
                op,
                x,
                y,
                n,
                error: error.message,
            };
        }
    }
}