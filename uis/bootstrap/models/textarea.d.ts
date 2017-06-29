import { BaseModel } from './base';
import { TextareaInterface } from '../interfaces/textArea';
export declare class TextareaModel extends BaseModel {
    readonly type: string;
    constructor(options: TextareaInterface);
}
