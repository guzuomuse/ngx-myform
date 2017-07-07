import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { CoreBaseModel } from '../models/base';
@Injectable()
export class FormService {
    fg: FormGroup;
    constructor(private fb: FormBuilder) { }
    private _createFormGroupItem(models: CoreBaseModel[] = []): { [key: string]: any } {
        return models.reduce((current, model) => {
            let item: { [key: string]: any } = {};
            let sub_group_item: { [key: string]: any } = {};
            switch (model.type) {
                case 'group':
                    sub_group_item = this._createFormGroupItem(model.options.group);
                    item = {
                        [model.options.id]: this.fb.group(sub_group_item, {
                            validator: this._getValidators(model.options.validators),
                            asyncValidator: this._getAsyncValidators(model.options.asyncValidators)
                        })
                    };
                    break;
                case 'checkboxgroup':
                    let checkbox_group_options = model.options.options ? model.options.options : [];
                    sub_group_item = checkbox_group_options.reduce((_current, option) => {
                        return Object.assign(_current, {
                            [option.id]: new FormControl({ value: option.value, disabled: option.disabled })
                        });
                    }, {});
                    item = {
                        [model.options.id]: this.fb.group(sub_group_item, {
                            validator: this._getValidators(model.options.validators),
                            asyncValidator: this._getAsyncValidators(model.options.asyncValidators)
                        })
                    };
                    break;
                default:
                    item = { [model.options.id]: new FormControl({ value: model.options.value, disabled: model.options.disabled }, this._getValidators(model.options.validators), this._getAsyncValidators(model.options.asyncValidators)) };
                    break;
            }
            return Object.assign(current, item);
        }, {});
    }
    private _getValidators(config): ValidatorFn {
        const validators_array = config ? config.map(item => {
            return item.validator;
        }) : [];
        return Validators.compose(validators_array);
    }
    private _getAsyncValidators(config): AsyncValidatorFn {
        const validators_array = config ? config.map(item => {
            return item.validator;
        }) : [];
        return Validators.composeAsync(validators_array);
    }
    createFormGroup(models: CoreBaseModel[]): FormGroup {
        let items = this._createFormGroupItem(models);
        return this.fb.group(items);
    }
}
