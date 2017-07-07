import { BaseInterface } from '../interfaces/base';
export class CoreBaseModel {
    readonly type: string;
    errorMessage: '';
    options: { [key: string]: any };
    constructor(_options: BaseInterface) {
        this.options = _options;
    }
}
