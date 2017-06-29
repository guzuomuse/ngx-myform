(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/forms'), require('@angular/platform-browser')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', '@angular/forms', '@angular/platform-browser'], factory) :
	(factory((global['ngx-myform'] = global['ngx-myform'] || {}),global._angular_core,global._angular_common,global._angular_forms,global._angular_platformBrowser));
}(this, (function (exports,_angular_core,_angular_common,_angular_forms,_angular_platformBrowser) { 'use strict';

var NgxBootstrapControlComponent = (function () {
    function NgxBootstrapControlComponent() {
        this.single_item_error_message = '';
        this.multi_items_error_message = '';
    }
    /**
     * @return {?}
     */
    NgxBootstrapControlComponent.prototype.ngOnInit = function () {
        this.onValueChanges();
    };
    /**
     * @return {?}
     */
    NgxBootstrapControlComponent.prototype.onValueChanges = function () {
        var _this = this;
        var /** @type {?} */ control = (this.group.get(this.model.options.id));
        if (control) {
            control.valueChanges.subscribe(function () {
                _this.single_item_error_message = _this.multi_items_error_message = '';
                if (control.controls) {
                    if (_this.checkAllInvalidDirty(control)) {
                        _this.setErrorMessage(control, 'multi_items_error_message');
                    }
                }
                else if (control.dirty && control.invalid) {
                    _this.setErrorMessage(control, 'single_item_error_message');
                }
            });
        }
    };
    /**
     * @param {?} fg
     * @return {?}
     */
    NgxBootstrapControlComponent.prototype.checkAllInvalidDirty = function (fg) {
        return Object.keys(fg.controls).every(function (key) {
            return fg.controls[key].valid ? true : (fg.controls[key].dirty && fg.controls[key].invalid);
        });
    };
    /**
     * @param {?} control
     * @param {?} error_type
     * @return {?}
     */
    NgxBootstrapControlComponent.prototype.setErrorMessage = function (control, error_type) {
        try {
            // combine async and sync validators's messages
            var /** @type {?} */ sync_validators = (this.model.options.validators);
            var /** @type {?} */ sync_m = void 0, /** @type {?} */ async_m = void 0;
            if (!sync_validators) {
                sync_m = {};
            }
            else {
                sync_m = sync_validators.reduce(function (a, b) {
                    return Object.assign(a, (_a = {}, _a[b.key] = b.message ? b.message : 'please set some messages', _a));
                    var _a;
                }, {});
            }
            var /** @type {?} */ async_validators = (this.model.options.asyncValidators);
            if (!async_validators) {
                async_m = {};
            }
            else {
                async_m = async_validators.reduce(function (a, b) {
                    return Object.assign(a, (_a = {}, _a[b.key] = b.message ? b.message : 'please set some messages', _a));
                    var _a;
                }, {});
            }
            var /** @type {?} */ m = Object.assign(sync_m, async_m);
            var /** @type {?} */ errors = control.errors;
            for (var /** @type {?} */ key in errors) {
                if (errors.hasOwnProperty(key)) {
                    this[error_type] += m[key] + ' ';
                }
            }
            return this[error_type] ? this[error_type] : '';
        }
        catch (e) {
            // throw e;
        }
    };
    return NgxBootstrapControlComponent;
}());
NgxBootstrapControlComponent.decorators = [
    { type: _angular_core.Component, args: [{
                selector: 'ngx-bootstrap-control',
                template: "<ng-container *ngIf=\"model\" [formGroup]='group'> <div [modelAttributes]='model.options.formGroup?.attributes' [defaultClasses]=\"['form-group']\" [class.has-danger]=\"single_item_error_message\"> <label *ngIf=\"model.options.label\" for=\"{{model.options.id}}\" [modelAttributes]='model.options.label?.attributes' [innerHTML]='model.options.label?.value | sanitizeHtml'></label> <div [modelAttributes]='model.options.wrapper?.attributes' [class.input-group]='model.options.prefix || model.options.suffix'> <ng-container [ngSwitch]=\"model.type\"> <ng-container *ngSwitchCase=\"'input'\"> <div *ngIf=\"model.options.prefix\" [innerHTML]=\"model.options.prefix?.value | sanitizeHtml\" [modelAttributes]='model.options.prefix?.attributes' [defaultClasses]=\"['input-group-addon']\"></div> <input id=\"{{model.options.id}}\" [formControlName]='model.options.id' [modelEvents]=\"model.options.events\" [modelAttributes]=\"model.options.attributes\" [defaultClasses]=\"['form-control']\"> <div *ngIf=\"model.options.suffix\" [innerHTML]=\"model.options.suffix?.value | sanitizeHtml\" [modelAttributes]='model.options.suffix?.attributes' [defaultClasses]=\"['input-group-addon']\"></div> </ng-container> <ng-container *ngSwitchCase=\"'textarea'\"> <textarea id=\"{{model.options.id}}\" [formControlName]='model.options.id' [modelEvents]=\"model.options.events\" [modelAttributes]=\"model.options.attributes\" [defaultClasses]=\"['form-control']\"></textarea> </ng-container> <ng-container *ngSwitchCase=\"'select'\"> <select id=\"{{model.options.id}}\" [formControlName]='model.options.id' [modelEvents]=\"model.options.events\" [modelAttributes]=\"model.options.attributes\" [defaultClasses]=\"['form-control']\"> <option *ngFor=\"let option of model.options.options\" [value]='option.value'> {{option.label}} </option> </select> </ng-container> <ng-container *ngSwitchCase=\"'checkbox'\"> <label class=\"form-check-label\"> <input type=\"checkbox\" class=\"form-check-input\" id=\"{{model.options.id}}\" [formControlName]='model.options.id' [modelEvents]=\"model.options?.events\" [modelAttributes]=\"model.options.attributes\" [checked]=\"model.options.checked\"> {{model.options.checkLabel}} </label> </ng-container> <ng-container *ngSwitchCase=\"'radiogroup'\"> <fieldset> <legend [modelAttributes]='model.options.legend?.attributes'> {{model.options.legend?.value}} </legend> <div *ngFor=\"let option of model.options.options\" class='form-check' [class.disabled]='option.disabled'> <label class=\"form-check-label\"> <input type=\"radio\" [formControlName]='model.options.id' class=\"form-check-input\" [value]=\"option.value\" [checked]=\"option.checked\" [attr.disabled]='option.disabled' [modelEvents]=\"option.events\" [modelAttributes]=\"option.attributes\"> {{option.label}}  </label> </div> </fieldset> </ng-container> <ng-container *ngSwitchCase=\"'group'\" [formGroupName]='model.options.id'> <ngx-bootstrap-control *ngFor=\"let group_model of model.options.group\" [model]='group_model' [group]='group.get(model.options.id)'> </ngx-bootstrap-control> <div *ngIf=\"multi_items_error_message\" class='has-danger'> <div class=\"form-control-feedback\">{{multi_items_error_message}}</div> </div> </ng-container> <!--<div *ngSwitchDefault>output2</div>--> </ng-container> </div> <div *ngIf=\"single_item_error_message\" class='form-control-feedback'>{{single_item_error_message}} </div> </div> </ng-container>",
            },] },
];
/**
 * @nocollapse
 */
NgxBootstrapControlComponent.ctorParameters = function () { return []; };
NgxBootstrapControlComponent.propDecorators = {
    'model': [{ type: _angular_core.Input },],
    'group': [{ type: _angular_core.Input },],
};

var FormService = (function () {
    /**
     * @param {?} fb
     */
    function FormService(fb) {
        this.fb = fb;
    }
    /**
     * @param {?} group
     * @param {?=} groupExtra
     * @return {?}
     */
    FormService.prototype.createFormGroup = function (group, groupExtra) {
        var _this = this;
        if (groupExtra === void 0) { groupExtra = null; }
        var /** @type {?} */ formGroup = {};
        try {
            group.forEach(function (model) {
                var /** @type {?} */ item = model.options;
                if (model.type === 'group') {
                    groupExtra = {
                        validator: _angular_forms.Validators.compose(_this.getValidators(item.validators)),
                        asyncValidator: _angular_forms.Validators.composeAsync(_this.getValidators(item.asyncValidators)),
                    };
                    formGroup[item.id] = _this.createFormGroup(item.group, groupExtra);
                }
                else {
                    formGroup[item.id] = new _angular_forms.FormControl({
                        value: item.value,
                        disabled: item.disabled
                    }, _angular_forms.Validators.compose(_this.getValidators(item.validators)), _angular_forms.Validators.composeAsync(_this.getValidators(item.asyncValidators)));
                }
            });
            return this.fb.group(formGroup, groupExtra);
        }
        catch (e) {
            // throw e;
        }
    };
    /**
     * @param {?} config
     * @return {?}
     */
    FormService.prototype.getValidators = function (config) {
        return config ? config.map(function (item) {
            return item.validator;
        }) : [];
    };
    return FormService;
}());
FormService.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
FormService.ctorParameters = function () { return [
    { type: _angular_forms.FormBuilder, },
]; };

var ModelAttributesDirective = (function () {
    /**
     * @param {?} renderer
     * @param {?} el
     */
    function ModelAttributesDirective(renderer, el) {
        this.renderer = renderer;
        this.el = el;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ModelAttributesDirective.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes['modelAttributes']) {
            for (var /** @type {?} */ key in this.modelAttributes) {
                if (this.modelAttributes.hasOwnProperty(key)) {
                    var /** @type {?} */ value = this.modelAttributes[key];
                    if (key.toLowerCase() === 'disabled' || key.toLowerCase() === 'value') {
                        return;
                    }
                    else {
                        this.renderer.setAttribute(this.el.nativeElement, key, value);
                    }
                }
            }
        }
        if (changes['defaultClasses']) {
            try {
                this.defaultClasses.forEach(function (item) {
                    _this.renderer.addClass(_this.el.nativeElement, item);
                });
            }
            catch (e) { }
        }
    };
    return ModelAttributesDirective;
}());
ModelAttributesDirective.decorators = [
    { type: _angular_core.Directive, args: [{ selector: '[modelAttributes]' },] },
];
/**
 * @nocollapse
 */
ModelAttributesDirective.ctorParameters = function () { return [
    { type: _angular_core.Renderer2, },
    { type: _angular_core.ElementRef, },
]; };
ModelAttributesDirective.propDecorators = {
    'modelAttributes': [{ type: _angular_core.Input },],
    'defaultClasses': [{ type: _angular_core.Input },],
};

var ModelEventsDirective = (function () {
    /**
     * @param {?} renderer
     * @param {?} el
     */
    function ModelEventsDirective(renderer, el) {
        this.renderer = renderer;
        this.el = el;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ModelEventsDirective.prototype.ngOnChanges = function (changes) {
        if (changes['modelEvents']) {
            for (var /** @type {?} */ key in this.modelEvents) {
                if (this.modelEvents.hasOwnProperty(key)) {
                    this.renderer.listen(this.el.nativeElement, key, this.modelEvents[key]);
                }
            }
        }
    };
    return ModelEventsDirective;
}());
ModelEventsDirective.decorators = [
    { type: _angular_core.Directive, args: [{ selector: '[modelEvents]' },] },
];
/**
 * @nocollapse
 */
ModelEventsDirective.ctorParameters = function () { return [
    { type: _angular_core.Renderer2, },
    { type: _angular_core.ElementRef, },
]; };
ModelEventsDirective.propDecorators = {
    'modelEvents': [{ type: _angular_core.Input },],
};

var SanitizeHtmlPipe = (function () {
    /**
     * @param {?} _sanitizer
     */
    function SanitizeHtmlPipe(_sanitizer) {
        this._sanitizer = _sanitizer;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    SanitizeHtmlPipe.prototype.transform = function (value) {
        return this._sanitizer.bypassSecurityTrustHtml(value);
    };
    return SanitizeHtmlPipe;
}());
SanitizeHtmlPipe.decorators = [
    { type: _angular_core.Pipe, args: [{
                name: 'sanitizeHtml'
            },] },
];
/**
 * @nocollapse
 */
SanitizeHtmlPipe.ctorParameters = function () { return [
    { type: _angular_platformBrowser.DomSanitizer, },
]; };

var BaseModel = (function () {
    /**
     * @param {?} options
     */
    function BaseModel(options) {
        this.options = options;
    }
    return BaseModel;
}());

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var InputModel = (function (_super) {
    __extends(InputModel, _super);
    /**
     * @param {?} options
     */
    function InputModel(options) {
        var _this = _super.call(this, options) || this;
        _this.type = 'input';
        return _this;
    }
    return InputModel;
}(BaseModel));

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GroupModel = (function (_super) {
    __extends$1(GroupModel, _super);
    /**
     * @param {?} options
     */
    function GroupModel(options) {
        var _this = _super.call(this, options) || this;
        _this.type = 'group';
        return _this;
    }
    return GroupModel;
}(BaseModel));

var __extends$2 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TextareaModel = (function (_super) {
    __extends$2(TextareaModel, _super);
    /**
     * @param {?} options
     */
    function TextareaModel(options) {
        var _this = _super.call(this, options) || this;
        _this.type = 'textarea';
        return _this;
    }
    return TextareaModel;
}(BaseModel));

var __extends$3 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SelectModel = (function (_super) {
    __extends$3(SelectModel, _super);
    /**
     * @param {?} options
     */
    function SelectModel(options) {
        var _this = _super.call(this, options) || this;
        _this.type = 'select';
        return _this;
    }
    return SelectModel;
}(BaseModel));

var __extends$4 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CheckboxModel = (function (_super) {
    __extends$4(CheckboxModel, _super);
    /**
     * @param {?} options
     */
    function CheckboxModel(options) {
        var _this = _super.call(this, options) || this;
        _this.type = 'checkbox';
        return _this;
    }
    return CheckboxModel;
}(BaseModel));

var __extends$5 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var RadiogroupModel = (function (_super) {
    __extends$5(RadiogroupModel, _super);
    /**
     * @param {?} options
     */
    function RadiogroupModel(options) {
        var _this = _super.call(this, options) || this;
        _this.type = 'radiogroup';
        return _this;
    }
    return RadiogroupModel;
}(BaseModel));

var NgxMyFormModule = (function () {
    function NgxMyFormModule() {
    }
    /**
     * @return {?}
     */
    NgxMyFormModule.forRoot = function () {
        return {
            ngModule: NgxMyFormModule,
            providers: [
                FormService,
            ]
        };
    };
    return NgxMyFormModule;
}());
NgxMyFormModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                imports: [
                    _angular_common.CommonModule,
                    _angular_forms.FormsModule,
                    _angular_forms.ReactiveFormsModule,
                ],
                declarations: [
                    NgxBootstrapControlComponent,
                    ModelAttributesDirective,
                    ModelEventsDirective,
                    SanitizeHtmlPipe,
                ],
                exports: [
                    NgxBootstrapControlComponent,
                    ModelAttributesDirective,
                    ModelEventsDirective,
                    SanitizeHtmlPipe,
                ]
            },] },
];
/**
 * @nocollapse
 */
NgxMyFormModule.ctorParameters = function () { return []; };

exports.NgxMyFormModule = NgxMyFormModule;
exports.FormService = FormService;
exports.InputModel = InputModel;
exports.GroupModel = GroupModel;
exports.TextareaModel = TextareaModel;
exports.SelectModel = SelectModel;
exports.CheckboxModel = CheckboxModel;
exports.RadiogroupModel = RadiogroupModel;
exports.ModelAttributesDirective = ModelAttributesDirective;
exports.ModelEventsDirective = ModelEventsDirective;
exports.SanitizeHtmlPipe = SanitizeHtmlPipe;
exports.NgxBootstrapControlComponent = NgxBootstrapControlComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));
