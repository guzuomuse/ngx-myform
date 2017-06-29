# ngx-myform
inspried by this [ng2-dynamic-forms](https://github.com/udos86/ng2-dynamic-forms) 

but i just want to use bootstrap v4
and hope customing something such as validator message more easier.
...

## Installation

To install this library, run:

```bash
$ npm install ngx-myform --save
```

## Consuming the library

Once you have installed the library, you can import it in any Angular application:

## How to Use
1: import the module:

```typescript

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { NgxMyFormModule } from 'ngx-myform';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxMyFormModule.forRoot(),
    // Specify your library as an import
    OtherLibraryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
2:in you component `YourComponent.ts`

```typescript

import { FormGroup } from '@angular/forms';
import { FormService, InputModel, GroupModel, TextareaModel, SelectModel, CheckboxModel, RadiogroupModel } from 'ngx-myform';
@Component({
...
})
...
export Class YorComponent {
...
  fg:FormGroup;
  models = [
      new InputModel({
        id: 'my_id',
        value: 'defaut value',
        // disabled:true,
        validators: [
          {
            // the key's value must be the ValidatorError's key;
            key: 'required',
            validator: Validators.required,
            message: 'here is my custom required message',
          },
          { key: 'minlength', validator: Validators.minLength(3), message: 'at lease 3 charactors' }
        ],
        wrapper: {
          // wapper a dive around the input,textarea,select...model with a div ,with this you can specify some attributes for exaple class:'col-md-6 my_custom_class',
          attributes: {
            class: 'input_wrapper_class_1 test_class_2'
          }
        },
        label: {
          value: '<div class="class_1">here is label value</div>',
          // use attributes to set other attributes of the label,for exaple when using bootstrap grid can set 'class' attribute 'col-md-3' etc
          attributes: {
            class: 'label_class_1 label_class_2'
          }
        },
        attributes: {
          // custom the control's attributes. for example class and autofocus
          class: 'class_1 class_2',
          autofocus: 'autofocus',
        },
        // custom some events for this control,any event you want as long as this event is valid for the control
        events: {
          change: () => {
            console.log('changed!');
          },
          keyup: () => {
            console.log('keyup!');
          },
        },
        prefix: {
          // prefix some html before the control,for example using bootstrap's addon
          // and also a suffix with same config just after the control
          value: '<div class="ceshi_addon_1 ceshi_addon_2">let me try</div>',
          attributes: {
            class: 'test_prefix_1',
          }
        },
      }),
      new SelectModel({
        id: 'select_1',
        value: 'value2',
        label: { value: 'select lable', },
        options: [
          { label: 'select_display_label', value: 'value1' },
          { label: 'display_label_2', value: 'value2' }
        ],
      }),
      new TextareaModel({
        id: 'test_textarea',
        validators: [
          { key: 'required', validator: Validators.required, message: 'fill it for me!' }
        ],
      }),
      new InputModel({
        id: 'test2',
      }),
      // a group model container other model such as input select textare ... with the group property.
      new GroupModel({
        id: 'test3',
        // group level validator
        validators: [{ key: 'pattern', validator: Validators.pattern(/test/), message: '正则错误--u893yy' }],
        group: [
          new CheckboxModel({
            id: 'test_3_3',
            label: {
              value: 'layout label for checkbox',
            },
            checkLabel: 'this is the checklable',
            value: 'anyvalue',
            checked: true,
            // disabled:true,
          }),
          new InputModel({
            id: 'test3_1',
            validators: [
              { key: 'required', validator: Validators.required, message: 'this is required!' },
              { key: 'minlength', validator: Validators.minLength(5), message: '5 chars at least' }
            ],
          }),
          new InputModel({
            id: 'test3_2',
            validators: [
              { key: 'required', validator: Validators.required, message: '这个也得写！' }
            ],
          }),
        ],
      }),
      new RadiogroupModel({
        id: 'test_radio_group',
        legend: {
          value: 'here is legend',
          attributes: {
            class: 'class_legend_1 class_legend_2',
          },
        },
        options: [
          { label: 'here is label1', value: 'value_1', },
          { label: 'label2', value: '2', checked: true },
          { label: 'label3', value: 'value3', disabled: true }
        ],
      }),
    ];
  constructor(private fs:FormService){
    
  }
  ngOnInit(){
    this.fg=this.fs.createFormGroup(models);
  }
...
}
```
3: in the template `YourComponent.html`;
```html
<form [formGroup]='fg'>
  <ngx-bootstrap-control *ngFor="let model of models" [model]='model' [group]='fg'>
  </ngx-bootstrap-control>
  <button class="btn btn-primary">submit</button>
</form>
```

## License

MIT © [guzuomuse]
"# ngx-myform" 
