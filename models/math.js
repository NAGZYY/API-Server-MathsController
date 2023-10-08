import Model from './model.js';

export default class Contact extends Model {
    constructor() {
        super();

        this.addField('op', 'stringNotEmpty');
        this.addField('x', 'float');
        this.addField('y', 'float');
    }
}