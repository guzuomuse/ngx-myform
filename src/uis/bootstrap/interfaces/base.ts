import { BaseInterface } from '../../../core/interfaces/base';
export interface WrappersClassInterFace {
    mainWrapper?: Array<string>;
    labelWrapper?: Array<string>;
    secondaryWrapper?: Array<string>;
    controlWrapper?: Array<string>;
}
export interface BaseInterface extends BaseInterface {
    wrappersClass?: WrappersClassInterFace;
    label?: string;
    prefix?: {
        html?: string,
        class?: Array<string>,
    };
    suffix?: {
        html?: string,
        class?: Array<string>,
    };
}
