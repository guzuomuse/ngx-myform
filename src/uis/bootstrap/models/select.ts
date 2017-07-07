import { BaseModel } from './base';
import { SelectInterface } from '../interfaces/select';
export class SelectModel extends BaseModel {
    readonly type = 'select';
    multiple?= 'multiple';
    constructor(options: SelectInterface) {
        super(options);
        if (this.options.attributes) {
            let _temp_key: string;
            if (Object.keys(this.options.attributes).some((key) => {
                _temp_key = key;
                return key.toLocaleLowerCase() === 'multiple';
            })) {
                this.multiple = this.options.attributes[_temp_key];
                delete this.options.attributes[_temp_key];
            } else {
                this.multiple = '';
            }
        } else {
            this.multiple = '';
        }
    }
}
