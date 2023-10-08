import MathModel from '../models/math.js';
import Repository from '../models/repository.js';
import Controller from './Controller';

class MathsController extends Controller {
    constructor(HttpContext) {
        super(HttpContext);
    }
    get() {
        const { op, x, y, n } = this.HttpContext.path.params;

        // Vérifiez les paramètres manquants
        if (!op) {
            this.HttpContext.response.unprocessableEntity("Opération manquante.");
            return;
        }

        // Effectuez des opérations en fonction de l'opération spécifiée
        switch (op) {
            case '+':
                if (!x || !y) {
                    this.HttpContext.response.unprocessableEntity("Paramètres x et y manquants.");
                    return;
                }
                this.add(Number(x), Number(y));
                break;
            case '-':
                if (!x || !y) {
                    this.HttpContext.response.unprocessableEntity("Paramètres x et y manquants.");
                    return;
                }
                this.subtract(Number(x), Number(y));
                break;
            case '*':
                if (!x || !y) {
                    this.HttpContext.response.unprocessableEntity("Paramètres x et y manquants.");
                    return;
                }
                this.multiply(Number(x), Number(y));
                break;
            case '/':
                if (!x || !y) {
                    this.HttpContext.response.unprocessableEntity("Paramètres x et y manquants.");
                    return;
                }
                this.divide(Number(x), Number(y));
                break;
            case '%':
                if (!x || !y) {
                    this.HttpContext.response.unprocessableEntity("Paramètres x et y manquants.");
                    return;
                }
                this.modulo(Number(x), Number(y));
                break;
            case '!':
                if (!n) {
                    this.HttpContext.response.unprocessableEntity("Paramètre n manquant.");
                    return;
                }
                this.factorial(Number(n));
                break;
            case 'p':
                if (!n) {
                    this.HttpContext.response.unprocessableEntity("Paramètre n manquant.");
                    return;
                }
                this.isPrime(Number(n));
                break;
            case 'np':
                if (!n) {
                    this.HttpContext.response.unprocessableEntity("Paramètre n manquant.");
                    return;
                }
                this.nthPrime(Number(n));
                break;
            default:
                this.HttpContext.response.unprocessableEntity("Opération non valide.");
        }
    }

    add(x, y) {
        const result = x + y;
        this.HttpContext.response.ok({ result });
    }

    subtract(x, y) {
        const result = x - y;
        this.HttpContext.response.ok({ result });
    }

    multiply(x, y) {
        const result = x * y;
        this.HttpContext.response.ok({ result });
    }

    divide(x, y) {
        if (y === 0) {
            this.HttpContext.response.unprocessableEntity("Division par zéro.");
            return;
        }
        const result = x / y;
        this.HttpContext.response.ok({ result });
    }

    modulo(x, y) {
        if (y === 0) {
            this.HttpContext.response.unprocessableEntity("Modulo par zéro.");
            return;
        }
        const result = x % y;
        this.HttpContext.response.ok({ result });
    }

    factorial(n) {
        if (n < 0) {
            this.HttpContext.response.unprocessableEntity("Factorielle d'un nombre négatif.");
            return;
        }
        let result = 1;
        for (let i = 1; i <= n; i++) {
            result *= i;
        }
        this.HttpContext.response.ok({ result });
    }

    isPrime(n) {
        if (n <= 1) {
            this.HttpContext.response.ok({ result: false });
            return;
        }
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) {
                this.HttpContext.response.ok({ result: false });
                return;
            }
        }
        this.HttpContext.response.ok({ result: true });
    }

    nthPrime(n) {
        if (n <= 0) {
            this.HttpContext.response.unprocessableEntity("n doit être un nombre positif.");
            return;
        }
        let count = 0;
        let num = 2;
        while (count < n) {
            if (this.isPrime(num).result) {
                count++;
            }
            num++;
        }
        this.HttpContext.response.ok({ result: num - 1 });
    }
}

export default MathsController;