import { BaseInterface } from './base';
export interface CheckboxGroupInterface extends BaseInterface {
    inline?: boolean;
    options?: {
        id: string;
        value?: boolean;
        disabled?: boolean;
        required?: boolean;
        checkLabel?: string;
    }[];
}
