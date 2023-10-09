
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
                        app.get('/api/maths?', (req, res) => {
                            const documentationHTML = `
                            <!DOCTYPE html>
                            <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <title>Math API Documentation</title>
                            </head>
                            <body>
                                <h1>GET : Maths endpoint</h1>
                                <p>List of possible query strings:</p>
                                <hr>
                                <p>? op = + & x = number & y = number<br>"return {\\"op\\":\\"+'', \\"x\\":number, \\"y\\":number, \\"value\\": x + y}"</p>
                                <p>? op = • & x = number & y = number<br>"return {\\"op\\":\\"•\\", \\"x\\":number, \\"y\\":number, \\"value\\": x • y}"</p>
                                <p>? op = * & x = number & y = number<br>"return {\\"op\\":\\"*\\", \\"x\\":number, \\"y\\":number, \\"value\\": x * y}"</p>
                                <p>? op = I & x = number & y = number<br>"return {\\"op\\":\\"I\\", \\"x\\":number, \\"y\\":number, \\"value\\": x I y}"</p>
                                <p>? op = % & x = number & y = number<br>"return {\\"op\\":\\"0/o\\", \\"x\\":number, \\"y\\":number, \\"value\\": x 0/o y}"</p>
                                <p>? op = !& n = integer<br>"return {\\"op\\":\\"0/o\\", \\"n\\":integer, \\"value\\": n!}"</p>
                                <p>? op = p & n = integer<br>"return {\\"op\\":\\"p\\", \\"n\\":integer, \\"value\\":true if n is a prime number}"</p>
                                <p>? op = np & n = integer<br>"return {\\"op\\":\\"np\\", \\"n\\":integer, \\"value\\":nth prime number}"</p>
                            </body>
                            </html>
                            `;
                        
                            res.send(documentationHTML);
                        });
                        controller.get(HttpContext.path.id);
                        return true
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