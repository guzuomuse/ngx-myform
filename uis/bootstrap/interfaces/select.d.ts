import { BaseInterface } from './base';
export interface SelectInterface extends BaseInterface {
    options?: {
        label: string;
        value: string;
    }[];
}
