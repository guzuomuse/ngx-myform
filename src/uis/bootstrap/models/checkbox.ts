import { BaseModel } from './base';
import { CheckboxInterface } from '../interfaces/checkbox';
export class CheckboxModel extends BaseModel {
    readonly type = 'checkbox';
    constructor(options: CheckboxInterface) {
        super(options);
    }
}
