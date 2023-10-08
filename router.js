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
                        // Extraire les paramètres op, x et y de HttpContext.path.params
                        const { op, x, y } = HttpContext.path.params;

                        // Vérifier si les paramètres sont présents
                        if (op && x !== undefined && y !== undefined) {
                            try {
                                let result;
                                if (op === '+') {
                                    result = controller.add(parseFloat(x), parseFloat(y));
                                } else if (op === '-') {
                                    result = controller.subtract(parseFloat(x), parseFloat(y));
                                } else if (op === '*') {
                                    result = controller.multiply(parseFloat(x), parseFloat(y));
                                } else if (op === '/') {
                                    result = controller.divide(parseFloat(x), parseFloat(y));
                                } else if (op === '%') {
                                    result = controller.modulo(parseFloat(x), parseFloat(y));
                                } else {
                                    HttpContext.response.badRequest(`Invalid operation: ${op}`);
                                    return true;
                                }

                                HttpContext.response.JSON({
                                    op,
                                    x,
                                    y,
                                    value: result
                                });
                                return true;
                            } catch (error) {
                                HttpContext.response.badRequest(error.message);
                                return true;
                            }
                        } else {
                            HttpContext.response.badRequest('Missing or invalid parameters');
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