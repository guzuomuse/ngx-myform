import { ValidatorFn, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
export interface BaseInterface {
    id: string;
    value?: string;
    disabled?: boolean;
    attributes?: {
        [key: string]: string;
    };
    events?: {
        [key: string]: () => void;
    };
    validators?: {
        key: string;
        validator: ValidatorFn | ValidationErrors;
        message?: string;
    }[];
    asyncValidators?: {
        key: string;
        validator: AsyncValidatorFn | ValidationErrors;
        message?: string;
    }[];
}
