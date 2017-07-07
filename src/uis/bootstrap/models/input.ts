import { BaseModel } from './base';
import { InputInterface } from '../interfaces/input';
export class InputModel extends BaseModel {
    readonly type = 'input';
    constructor(options: InputInterface) {
        super(options);
    }
}
