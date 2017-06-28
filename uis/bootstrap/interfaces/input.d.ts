import { BaseInterface } from './base';
export interface InputInterface extends BaseInterface {
    prefix?: {
        value?: string;
        attributes?: {
            [key: string]: string;
        };
    };
    suffix?: {
        value?: string;
        attributes?: {
            [key: string]: string;
        };
    };
}
