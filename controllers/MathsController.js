import MathModel from '../models/math.js';
import Repository from '../models/repository.js';
import Controller from './Controller';

class MathsController extends Controller {
    constructor(HttpContext) {
        super(HttpContext);
    }

    get() {
        let params = this.HttpContext.path.params
        let nbrParams = Object.keys(params).length;

        const response = params;

        if (!params?.op && nb_params > 0){
            response.error = "Missing 'op' parameter in request.";
            this.HttpContext.response.JSON(response);
        }
        else if (nbrParams == 0) {
            this.help();
        } else {

            let op = params.op;
            let x = params?.x;
            let y = params?.y;
            let n = params?.n;

            // Vérifiez les paramètres manquants
            if (!op) {
                response.error = "Opération manquante.";
            } else {
                // Effectuez des opérations en fonction de l'opération spécifiée
                switch (op) {
                    case ' ':
                        if (!x || !y) {
                            response.error = "Paramètres 'x' et/ou 'y' manquants.";
                        } else if (Object.keys(params).length > 3) {
                            response.error = "Trop de paramètre dans la requête.";
                        } else {
                            response.value = parseFloat(x) + parseFloat(y);                     
                        }
                        response.op = '+'
                        this.HttpContext.response.JSON(response);
                        break;
                    case '+':
                        if (!x || !y) {
                            response.error = "Paramètres x et y manquants.";
                        } else if (Object.keys(params).length > 3) {
                            response.error = "Trop de paramètre dans la requête.";
                        } else {
                            response.value = parseFloat(x) + parseFloat(y);
                        }
                        response.op = '+'
                        this.HttpContext.response.JSON(response);
                        break;
                    case '-':
                        if (!x || !y) {
                            response.error = "Paramètres x et y manquants.";
                        } else if (Object.keys(params).length > 3) {
                            response.error = "Trop de paramètre dans la requête.";
                        } else {
                            response.value = parseFloat(x) - parseFloat(y);
                        }
                        response.op = '-'
                        this.HttpContext.response.JSON(response);
                        break;
                    case '*':
                        if (!x || !y) {
                            response.error = "Paramètres x et y manquants.";
                        } else if (Object.keys(params).length > 3) {
                            response.error = "Trop de paramètre dans la requête.";
                        } else {
                            response.value = parseFloat(x) * parseFloat(y);
                        }
                        response.op = '*'
                        this.HttpContext.response.JSON(response);
                        break;
                    case '/':
                        if (!x || !y) {
                            response.error = "Paramètres x et y manquants.";
                        } else if (y === 0) {
                            response.error = "Division par zéro.";
                        } else if (Object.keys(params).length > 3) {
                            response.error = "Trop de paramètre dans la requête.";
                        } else {
                            response.value = parseFloat(x) / parseFloat(y);
                        }
                        response.op = '/'
                        this.HttpContext.response.JSON(response);
                        break;
                    case '%':
                        if (!x || !y) {
                            response.error = "Paramètres x et y manquants.";
                        } else if (y === 0) {
                            response.error = "Modulo par zéro.";
                        } else if (Object.keys(params).length > 3) {
                            response.error = "Trop de paramètre dans la requête.";
                        } else {
                            response.value = parseFloat(x) % parseFloat(y);
                        }
                        response.op = '%'
                        this.HttpContext.response.JSON(response);
                        break;
                    case '!':
                        if (!n) {
                            response.error = "Paramètre n manquant.";
                        } else if (n < 0) {
                            response.error = "Factorielle d'un nombre négatif.";
                        } else {
                            response.result = this.factorial(Number(n));
                        }
                        this.HttpContext.response.JSON(response);
                        break;
                    case 'p':
                        if (!n) {
                            response.error = "Paramètre n manquant.";
                        } else if (n <= 1) {
                            response.result = false;
                        } else {
                            response.result = this.isPrime(Number(n));
                        }
                        this.HttpContext.response.JSON(response);
                        break;
                    case 'np':
                        if (!n) {
                            response.error = "Paramètre n manquant.";
                        } else if (n <= 0) {
                            response.error = "n doit être un nombre positif.";
                        } else {
                            response.result = this.nthPrime(Number(n));
                        }
                        this.HttpContext.response.JSON(response);
                        break;
                    default:
                        response.error = "Opération non valide.";
                }
            }
        }
    }

    // ... les autres méthodes de calcul ...

    // Modifiez ces méthodes pour renvoyer les résultats au lieu d'utiliser "this.HttpContext.response.ok({ result })"
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
        return x / y;
    }

    modulo(x, y) {
        return x % y;
    }

    factorial(n) {
        let result = 1;
        for (let i = 1; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    isPrime(n) {
        if (n <= 1) {
            return false;
        }
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) {
                return false;
            }
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

export default MathsController;
