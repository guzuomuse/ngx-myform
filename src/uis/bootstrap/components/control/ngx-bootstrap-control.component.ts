import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AbstractControl, FormGroup, FormControl } from '@angular/forms';
import { BaseModel } from '../../models/base';
import { Subscription } from 'rxjs/RX';
import { FunctionalService } from '../../services/index';
import { WrappersClassInterFace } from '../../interfaces/base';

import { Renderer2, ElementRef } from '@angular/core';
@Component({
    selector: 'ngx-bootstrap-control',
    templateUrl: './ngx-bootstrap-control.component.html',
    styleUrls: [
        './ngx-bootstrap-control.component.css',
    ],
    // providers: [FunctionalService],
})
export class NgxBootstrapControlComponent implements OnInit, OnDestroy {
    @Input() model: BaseModel;
    @Input() fg: FormGroup;
    @Input() globalWrappersClass: WrappersClassInterFace;
    mergedWrappersClass: WrappersClassInterFace;
    private _subscr: Subscription;
    constructor(private fns: FunctionalService, private renderer: Renderer2, private el: ElementRef) {
    }
    ngOnInit() {
        // combine global class and individual
        const individual_wrappers_class = this.model.options.wrappersClass || {};
        const global_wrappers_class = this.globalWrappersClass || {};
        this.mergedWrappersClass = this.mergeWrappersClass(individual_wrappers_class, global_wrappers_class);
        if (true) {
            this.renderer.setProperty(this.el.nativeElement, 'multiple', 'multiple');
        }
        this.onStatusChanges();
    }
    ngOnDestroy() {
        this._subscr.unsubscribe();
    }
    onStatusChanges() {
        let control = this.fg.get(this.model.options.id) as FormGroup;
        if (control) {
            this._subscr = control.statusChanges.subscribe(() => {
                this.model.errorMessage = '';
                if (control.controls) {
                    if (this.fns.checkAllInvalidAndDirty(<FormGroup>control)) {
                        this.fns.setModelErrorMessage(this.fg, this.model);
                    }
                } else {
                    if (control.dirty && control.invalid) {
                        this.fns.setModelErrorMessage(this.fg, this.model);
                    }
                }
            });
        }
    }
    mergeWrappersClass(individual_config, global_config) {
        // deep clone https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Deep_Clone
        const _individual_config = JSON.parse(JSON.stringify(individual_config));
        const _global_config = JSON.parse(JSON.stringify(global_config));
        const just_for_keys = Object.assign(_individual_config, _global_config);
        Object.keys(just_for_keys).map(key => {
            const individual_array: Array<string> = individual_config[key] || [];
            const global_array: Array<string> = global_config[key] || [];
            const combined_array = individual_array.concat(global_array.filter(item => {
                return individual_array.indexOf(item) < 0;
            }));
            just_for_keys[key] = combined_array;
        });
        return just_for_keys;
    }
}
