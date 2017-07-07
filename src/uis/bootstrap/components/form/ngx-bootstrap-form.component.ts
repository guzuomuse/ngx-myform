import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormService } from '../../../../core/services/index';
import { FunctionalService } from '../../services/index';
import { BaseModel } from '../../models/base';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/RX';
import { FormConfig } from '../../interfaces/formconfig';
@Component({
    selector: 'ngx-bootstrap-form',
    templateUrl: 'ngx-bootstrap-form.component.html',
    // providers: [FunctionalService],
    // exportAs: 'ngx-myform',
})

export class NgxBootstrapFormComponent implements OnInit, OnDestroy {
    @Input() formConfig: FormConfig;
    @Output() ngSubmit: EventEmitter<any> = new EventEmitter();
    @Output() ngValueChange: EventEmitter<any> = new EventEmitter();
    form: FormGroup;
    private _subscr: Subscription;
    constructor(private fs: FormService, private fns: FunctionalService) {
    }
    ngOnInit() {
        this.form = this.fs.createFormGroup(this.formConfig.models);
        this._subscr = this.form.valueChanges.subscribe((data) => {
            this.valueChange();
        });
    }
    ngOnDestroy() {
        this._subscr.unsubscribe();
    }
    submit(f) {
        this.ngSubmit.emit(f);
        if (this.formConfig.showErrorsOnSubmit !== false) {
            this.fns.setFormErrorMessage(this.form, this.formConfig.models);
        }
    }
    valueChange() {
        this.ngValueChange.emit(this.form);
    }
}
