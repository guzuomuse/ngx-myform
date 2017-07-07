import { BaseModel } from './base';
import { TextareaInterface } from '../interfaces/textArea';
export class TextareaModel extends BaseModel {
    readonly type = 'textarea';
    constructor(options: TextareaInterface) {
        super(options);
    }
}
