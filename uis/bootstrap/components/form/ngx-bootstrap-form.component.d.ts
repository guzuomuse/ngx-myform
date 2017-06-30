import { OnInit, EventEmitter } from '@angular/core';
import { FormService } from '../../../../core/services/index';
import { BaseModel } from '../../models/base';
import { FormBuilder, FormGroup } from '@angular/forms';
export declare class NgxBootstrapFormComponent implements OnInit {
    private fs;
    private fb;
    models: BaseModel[];
    fg: FormGroup;
    ngSubmit: EventEmitter<any>;
    constructor(fs: FormService, fb: FormBuilder);
    ngOnInit(): void;
    submit(f: any): void;
}
