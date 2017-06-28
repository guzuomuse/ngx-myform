import { BaseModel } from './base';
import { SelectInterface } from '../interfaces/select';
export declare class SelectModel extends BaseModel {
    readonly type: string;
    constructor(options: SelectInterface);
}
