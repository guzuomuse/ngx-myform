import { BaseInterface } from '../../../core/interfaces/base';
export interface BaseInterface extends BaseInterface {
    formGroup?: {
        attributes?: {
            [key: string]: string;
        };
    };
    label?: {
        value?: string;
        attributes?: {
            [key: string]: string;
        };
    };
    wrapper?: {
        attributes?: {
            [key: string]: string;
        };
    };
}
