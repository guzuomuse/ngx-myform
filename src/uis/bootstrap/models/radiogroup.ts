import { BaseModel } from './base';
import { RadiogroupInterface } from '../interfaces/radiogroup';
export class RadiogroupModel extends BaseModel {
    readonly type = 'radiogroup';
    constructor(options: RadiogroupInterface) {
        super(options);
    }
}
