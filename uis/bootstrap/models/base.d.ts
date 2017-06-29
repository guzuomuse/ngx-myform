import { BaseInterface } from '../../../core/interfaces/base';
export declare class BaseModel {
    readonly type: string;
    options: {
        [key: string]: any;
    };
    constructor(options: BaseInterface);
}
