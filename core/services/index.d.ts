import { FormGroup, FormBuilder } from '@angular/forms';
export declare class FormService {
    private fb;
    fg: FormGroup;
    constructor(fb: FormBuilder);
    createFormGroup(group: Array<any>, groupExtra?: {
        [key: string]: any;
    } | null): FormGroup;
    getValidators(config: any): any;
}
