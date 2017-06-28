import { BaseModel } from './base';
import { InputInterface } from '../interfaces/input';
export declare class InputModel extends BaseModel {
    readonly type: string;
    constructor(options: InputInterface);
}
