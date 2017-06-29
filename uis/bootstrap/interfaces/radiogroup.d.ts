import { BaseInterface } from './base';
export interface RadiogroupInterface extends BaseInterface {
    legend?: {
        value?: string;
        attributes?: {
            [key: string]: string;
        };
    };
    options?: {
        label: string;
        value: string;
        disabled?: boolean;
        checked?: boolean;
        events?: {
            [key: string]: () => void;
        };
        attributes?: {
            [key: string]: string;
        };
    }[];
}
