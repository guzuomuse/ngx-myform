import { BaseInterface } from './base';
export interface RadiogroupInterface extends BaseInterface {
    legend?: {
        value?: string,
        attributes?: { [key: string]: string },
    };
    inline?: boolean;
    options?: {
        label: string,
        value: string,
        disabled?: boolean,
        checked?: boolean,
        attributes?: { [key: string]: string },
    }[];
}
