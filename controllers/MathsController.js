//import MathModel from '../models/math.js';
//import Repository from '../models/repository.js';
import Controller from './Controller.js';
export default class MathsController extends Controller { 
    constructor(HttpContext) {
        super(HttpContext);
    }

    get() {
        let params = this.HttpContext.path.params
        let nbrParams = Object.keys(params).length;
        console.log("nbrParams");
        let response = params;

        if (!params?.op && nbrParams > 0){
            response.error = "Il manque l'opérateur dans la requête.";
            this.HttpContext.response.JSON(response);
        }
        else if (nbrParams == 0) {
            let html = `
            <strong style="font-family: 'Arial', sans-serif;">
            <h2>GET : Maths endpoint<br>
            Liste des possible "query strings" :</h2>
            <hr>
            <p>
            ? op = + & x = number & y = number<br>
            "return {"op":"+", "x":number, "y":number, "value": x + y}"<br>
            </p>
            <p>
            ? op = • & x = number & y = number<br>
            "return {"op" :" ","x":number,"y":number, "value": x - y}"<br>
            </p>
            <p>
            ? op = * & x = number & y = number<br>
            "return {"op" :"*","x":number,"y":number,"value": x * y}"<br>
            </p>
            <p>
            ? op = I & x = number & y = number<br>
            "return {"op" :"/","x":number,"y":number, "value": x / y}"<br>
            </p>
            <p>
            ? op = % & x = number & y = number<br>
            "return {"op":"%","x":number, "y'':number, "value": x % y}"<br>
            </p>
            <p>
            ? op = !& n = integer<br>
            "return {"op":"%","n":integer,"value": n!}"<br>
            </p>
            <p>
            ? op = p & n = integer<br>
            "return {"op":"p","n":integer, "value":"true si n est un nombre premier}"<br>
            </p>
            <p>
            ? op = np & n = integer<br>
            "return {"op":"n","n":integer,"value":"n'ième nombre premier"}";<br>
            </p>
            </strong>
            `;
            this.HttpContext.response.HTML(html);
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
                            if (isNaN(parseFloat(x) + parseFloat(y))) {
                                if (isNaN(x)) {
                                    response.error = "Le paramètre x n'est pas un nombre.";
                                } else {
                                    response.error = "Le paramètre y n'est pas un nombre.";
                                }
                            } else {
                                response.value = parseFloat(x) + parseFloat(y);                
                            }   
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
                            if (isNaN(parseFloat(x) * parseFloat(y))) {
                                if (isNaN(x)) {
                                    response.error = "Le paramètre x n'est pas un nombre.";
                                } else {
                                    response.error = "Le paramètre y n'est pas un nombre.";
                                }
                            } else {
                                response.value = parseFloat(x) * parseFloat(y);                
                            }   
                        }
                        response.op = '*'
                        this.HttpContext.response.JSON(response);
                        break;
                    case '/':
                        if (!x || !y) {
                            response.error = "Paramètres 'x' et/ou 'y' manquants.";
                        } else if (Object.keys(params).length > 3) {
                            response.error = "Trop de paramètres dans la requête.";
                        } else {
                            const result = parseFloat(x) / parseFloat(y);
                            response.value = isFinite(result) ? result.toString() : "Infinity";
                            if (isNaN(result)) {
                                response.value = "NaN";
                            }
                        }
                        response.op = '/'
                        this.HttpContext.response.JSON(response);
                        break;
                    case '%':
                        if (!x || !y) {
                            response.error = "Paramètres 'x' et/ou 'y' manquants.";
                        } else if (x == 0 || y == 0) {
                            response.error = "Impossible: Modulo par zéro.";
                        } else if (Object.keys(params).length > 3) {
                            response.error = "Trop de paramètres dans la requête.";
                        } else {
                            const result = parseFloat(x) % parseFloat(y);
                            response.value = isFinite(result) ? result.toString() : "Infinity";
                            if (isNaN(result)) {
                                response.value = "NaN";
                            }
                        }
                        response.op = '%'
                        this.HttpContext.response.JSON(response);
                        break;
                    case '!':
                        if (!n) {
                            response.error = "Paramètre n manquant.";
                        } else if (n <= 0) {
                            response.error = "Factorielle d'un nombre plus petit ou égal à zéro.";
                        } else {
                            response.value = this.factorial(Number(n));
                        }
                        this.HttpContext.response.JSON(response);
                        break;
                    case 'p':
                        if (!n) {
                            response.error = "Paramètre n manquant.";
                        } else if (n <= 0) {
                            response.error = "Le nombre n'est pas positif.";
                        } else {
                            if (n % 1 !== 0) {
                                response.error = "Le nombre n'est pas un entier.";
                            } else {
                                response.value = this.isPrime(Number(n));
                            }
                        }
                        this.HttpContext.response.JSON(response);
                        break;
                    case 'np':
                        if (!n) {
                            response.error = "Paramètre n manquant.";
                        } else if (n <= 0) {
                            response.error = "n doit être un nombre positif.";
                        } else {
                            response.value = this.nthPrime(Number(n));
                        }
                        this.HttpContext.response.JSON(response);
                        break;
                    default:
                        response.error = "Opération non valide.";
                }
            }
        }
        //this.HttpContext.response.JSON(response);
    }

    // Méthodes de calcul
    factorial(n) {
        if (n === 0) {
            return 1;
        } else {
            return n * factorielle(n - 1);
        }
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
        if (n === 1) {
            return 2;
        }
        let count = 1;
        let candidate = 3; 
    
        while (count < n) {
            if (isPrime(candidate)) {
                count++;
                if (count === n) {
                    return candidate;
                }
            }
            candidate += 2;
        }
    }
}
