import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { BaseModel } from '../models/base';
import { FormService } from '../../../core/services/index';
@Injectable()
export class FunctionalService {
    constructor(private fs: FormService) {
    }
    setFormErrorMessage(fg: FormGroup, models: BaseModel[]) {
        Object.keys(fg.controls).map(key => {
            const model = models.find(_model => _model.options.id === key);
            switch (model.type) {
                case 'group':
                    const group_fg = <FormGroup>fg.get(model.options.id);
                    const sub_models = <Array<BaseModel>>model.options.group;
                    this.setFormErrorMessage(group_fg, sub_models);
                    break;
                default:
                    this.setModelErrorMessage(fg, model);
            }
        });
    }
    setModelErrorMessage(fg: FormGroup, model: BaseModel) {
        try {
            model.errorMessage = '';
            const control = fg.get(model.options.id);
            // combine async and sync validators's messages
            const sync_validators = model.options.validators;
            let sync_m, async_m;
            if (!sync_validators) {
                sync_m = {};
            } else {
                sync_m = sync_validators.reduce((a, b) => {
                    return Object.assign(a, { [b.key]: b.message ? b.message : ' ' });
                }, {});
            }
            const async_validators = model.options.asyncValidators;
            if (!async_validators) {
                async_m = {};
            } else {
                async_m = async_validators.reduce((a, b) => {
                    return Object.assign(a, { [b.key]: b.message ? b.message : ' ' });
                }, {});
            }
            let m = Object.assign(sync_m, async_m);
            const errors = control.errors;
            for (const key in errors) {
                if (errors.hasOwnProperty(key)) {
                    if (!m[key]) {
                        // tslint:disable-next-line:max-line-length
                        console.error('validator config error! the key must be same as the applied Validator\'s key!\n the key is : \'' + key + '\' ; please check it!');
                    }
                    model.errorMessage += m[key] + ' ';
                }
            }
        } catch (e) {
            // throw e;
        }
    }
    checkAllInvalidAndDirty(fg: FormGroup): boolean {
        return Object.keys(fg.controls).every(key => {
            if (fg.controls[key].constructor.name === 'FormGroup') {
                return this.checkAllInvalidAndDirty(<FormGroup>fg.controls[key]);
            } else {
                return fg.controls[key].valid ? true : (fg.controls[key].dirty && fg.controls[key].invalid);
            }
        });
    }
}
