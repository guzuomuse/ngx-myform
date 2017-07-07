import { BaseInterface } from './base';
export interface CheckboxInterface extends BaseInterface {
    value?: boolean;
    required?: boolean;
    checkLabel?: string;
}
