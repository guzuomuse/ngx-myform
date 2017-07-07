import { BaseModel } from './base';
import { CheckboxGroupInterface } from '../interfaces/checkboxgroup';
export class CheckboxGroupModel extends BaseModel {
    readonly type = 'checkboxgroup';
    constructor(options: CheckboxGroupInterface) {
        super(options);
    }
}
