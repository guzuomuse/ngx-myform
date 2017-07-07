import { BaseInterface } from './base';
export interface SelectInterface extends BaseInterface {
    // multiple?: boolean;
    options?: {
        label: string,
        value: string,
    }[];
}
