//import { API_EndPoint } from './router.js';
export const API_EndPoint = async function (HttpContext) {
    if (!HttpContext.path.isAPI) {
        return false;
    } else {
        let controllerName = HttpContext.path.controllerName;
        if (controllerName != undefined) {
            try {
                // dynamically import the targeted controller
                // if the controllerName does not exist the catch section will be called
                const { default: Controller } = (await import('./controllers/' + controllerName + '.js'));

                // instanciate the controller       
                let controller = new Controller(HttpContext);
                switch (HttpContext.req.method) {
                    case 'GET':
                        controller.get(HttpContext.path.id);
                        
                        const { op, x, y, n } = HttpContext.path.params;

                        if (!op) {
                            HttpContext.response.badRequest("L'opération 'op' est manquante.");
                            return true;
                        }
        
                        if (op === '+') {
                            const result = controller.performMathOperation(op, x, y);
                            HttpContext.response.json(result);
                            return true;
                        } else if (op === '-') {
                            const result = controller.performMathOperation(op, x, y);
                            HttpContext.response.json(result);
                            return true;
                        } else if (op === '*') {
                            const result = controller.performMathOperation(op, x, y);
                            HttpContext.response.json(result);
                            return true;
                        } else if (op === '/') {
                            const result = controller.performMathOperation(op, x, y);
                            HttpContext.response.json(result);
                            return true;
                        } else if (op === '%') {
                            const result = controller.performMathOperation(op, x, y);
                            HttpContext.response.json(result);
                            return true;
                        } else if (op === '!') {
                            if (!n) {
                                HttpContext.response.badRequest("Le paramètre 'n' est manquant pour l'opération '!' (factorielle).");
                                return true;
                            }
                            const result = controller.performMathOperation(op, x, y, n);
                            HttpContext.response.json(result);
                            return true;
                        } else if (op === 'p') {
                            if (!n) {
                                HttpContext.response.badRequest("Le paramètre 'n' est manquant pour l'opération 'p' (vérification de nombre premier).");
                                return true;
                            }
                            const result = controller.performMathOperation(op, x, y, n);
                            HttpContext.response.json(result);
                            return true;
                        } else if (op === 'np') {
                            if (!n) {
                                HttpContext.response.badRequest("Le paramètre 'n' est manquant pour l'opération 'np' (n-ième nombre premier).");
                                return true;
                            }
                            const result = controller.performMathOperation(op, x, y, n);
                            HttpContext.response.json(result);
                            return true;
                        } else {
                            HttpContext.response.badRequest(`L'opération '${op}' n'est pas prise en charge.`);
                            return true;
                        }
                        return true;
                    case 'POST':
                        if (HttpContext.payload)
                            controller.post(HttpContext.payload);
                        else
                            HttpContext.response.unsupported();
                        return true;
                    case 'PUT':
                        if (HttpContext.payload)
                            controller.put(HttpContext.payload);
                        else
                            HttpContext.response.unsupported();
                        return true;
                    case 'DELETE':
                        controller.remove(HttpContext.path.id);
                        return true;
                    default:
                        HttpContext.response.notImplemented();
                        return true;
                }
            } catch (error) {
                console.log("API_EndPoint Error message: \n", error.message);
                console.log("Stack: \n", error.stack);
                HttpContext.response.notFound();
                return true;
            }
        } else {
            // not an API endpoint
            // must be handled by another middleware
            return false;
        }
    }
}