import { BaseModel } from './base';
import { CheckboxInterface } from '../interfaces/checkbox';
export declare class CheckboxModel extends BaseModel {
    readonly type: string;
    constructor(options: CheckboxInterface);
}
