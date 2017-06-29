import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseModel } from '../../models/base';
export declare class NgxBootstrapControlComponent implements OnInit {
    model: BaseModel;
    group: FormGroup;
    single_item_error_message: string;
    multi_items_error_message: string;
    ngOnInit(): void;
    onValueChanges(): void;
    checkAllInvalidDirty(fg: FormGroup): boolean;
    setErrorMessage(control: FormGroup, error_type: any): any;
}
