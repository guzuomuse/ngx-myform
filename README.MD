# ngx-myform
Easy to use,Flexible,Simple,Powerful Angular 4+ module with Bootstrap v4 ui for Rapid Form Development;
# Demo screenShot:
### pic1:Normal
![pic1](https://lh3.googleusercontent.com/m4fZd7U4NhNMPj65LNOLc0edVcoOzv9EmMLwKFSL4DbDfV9yWzyDhNo3yjWqCWpknneJO4-Rtwuu5uh5uEwVWzT2pxVqaJUWahJljBp-X1EWizlll92TkByMbq0TbnhtvAm6KibYa65mbJrvuvHGin_jbZGHmo74I4iSdpbmF04U9M3JNn-Mr_uRuO4oTkWYp7UbCMcQS1vIuzIALil4m4iSK0SYF_wmPeR8pgDxPcybaSdkAuMCCi4xJCKNaOoJYQfNwrX98fuzJUFCaNqAt9Ns2zpLJ80mKyN2HT3hJxNYSbKVIM6sYybpCoHmzRVIMmpIY3eljMSpMIDxTHTuAiyY29JjN8gTEQJ-dW3I5StP8kS7zAs1PG5_D7vABHjWEpSn7P_1HUnT44SZxHa1GF7bQEoEkWFDgHNR611vrb29drA28wVY87jLr8bb4rQwQEyT-FCWZ7KAlKKf6vI3sEU8nP2a7t02AJQfdV9az-jLW7ycJqt2mS-K11SBFVTNd4afXCwfEQHFR-xMFrro-CU4714D99dDceybtYcyOvTdNBQYIR1wcN5bMb8fDJ1v5nvEUxX9ZK4yuZ42_TuPvM_utO-V66UXSVuFTLId8BVo3aMdiZ--qALXNi4fdBDQsQNDEhhF45d2yiVBvjSVkNu6MACTum9KBGPK7DFcQxPG=w636-h741-no)
### pic2:Use Bootstrap 4 Grid
![pic2](https://lh3.googleusercontent.com/EjMbZ_jRuvz1XF4OsqC_on45U35Q-lZwmTr69o06S6O2yqzVJnOXbP5ppS6arktcpqbCvBMD8IiVLuDJQ57vyXR1cmU2TW6l2FhO3XWWnjzTceUDVxraWkT1Oq5_S9cG4H3hcwF-6zlzDGCuTKSCLHhYcihR65utQXAvRNZBdXcwEicIBUkJyl0whFBGkOZBUr03vajyczOvVa-gV1Vu1MnJN23en1ZsWSRMq0fa8n50gubZAsLkepU8tUXpn7B0Ni7AVT0Vehht7qanfyvcdUKcoT_kQ7RUUZi6cbQREN2OGBLW385_M58Iu9B6oogcYCK24bd8UU86IBBxB9ADdVFXWggk9EsaxArajbKI_K5Uw9SBqcBowUc9Xbk05SIh8QNGZPsHbuuETuwrP4lvO9UlZltJOuyN3ZuHm1uKIYTZtN0fraOJ0hQQtxxNxmAEg7XgL9xZETPSRCKL4s_03R-uRlFr88FF_Qh6tkd66aRq6VoNHWljdmKqStcxXz0VRGgAiqu4WxOrXL70tIXtiZfYV04gBYbilgOeWnhIZTIwxXI7r0gEiE7EPtRRNMT-HRbJlIfzmZt6FIqgviy0jATnmfP9S_6uI9H2HaE3lSRyO0Y7pV_aiZ3vnYFslBFKsd27N_dtmnV1y8CdR975B8vnpu84ENnNsrLPoyfJTw1g=w726-h742-no)

## Table of Contents

[Installation](#installation)

[Usage](#usage)

[FormConfig](#formconfig)

[ModelTypes](#modeltypes)

[ModelConfig](#modelconfig)

[demo repository](https://github.com/guzuomuse/ngx-myform-demo)



## Installation

```bash
$ npm install ngx-myform --save
$ yarn add ngx-myform
```
## Usage

Once you have installed the library, you need some preparations:

1: set bootstrap v4 global style
   if your app based on angular-cli see [here](https://github.com/angular/angular-cli/wiki/stories-global-styles); how to configure global style
   for example:
   ```json
  "styles": [
      "../node_modules/bootstrap/dist/css/bootstrap.css",
      "styles.css"
  ],
   ```
2: import the module:
```typescript
// Import your library
import { NgxMyFormModule } from 'ngx-myform';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxMyFormModule.forRoot(),
    ...
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
3:in you component `YourComponent.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { FormConfig, InputModel, GroupModel, TextareaModel, SelectModel, RadiogroupModel, CheckboxGroupModel, CheckboxModel, } from 'ngx-myform';
import { FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
function customeValidator(): ValidatorFn {
  return (g: FormGroup) => {
    return g.get('password').value === g.get('repassword').value
      ? null : { mismatch: true };
  }
}
function customValidatorOtherFormat(g: FormGroup) {
  return g.get('password').value === g.get('repassword').value
    ? null : { mismatch: true };
}
function customEmailValidator(): ValidatorFn {
  return (c: AbstractControl) => {
    if (!c.value) { return null; }
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(c.value) ? null : { email_validator_key: true }
  }
}
function customEmailduplicated(control: AbstractControl) {
  const q = new Promise<{ [key: string]: boolean }>((resolve, reject) => {
    setTimeout(() => {
      if (control.value === 'test@gmail.com') {
        resolve({ 'duplicated': true });
      } else {
        resolve(null);
      }
    }, 1000);
  });
  return q;
}
function customCheckboxGroupValidator_1(g: FormGroup) {
  return g.get('checkbox_4').value
    ? null : { shouldlike: true };
}
function customCheckboxGroupValidator_2(g: FormGroup) {
  const num = Object.keys(g.controls).reduce((curr, key) => {
    if (g.get(key).value) {
      curr++;
    }
    return curr;
  }, 0);
  return num > 2 ? null : {
    shouldlikeatleast: true
  }
}
@Component({
  selector: 'app-demo1',
  templateUrl: './demo1.component.html',
  styleUrls: ['./demo1.component.css'],
})
export class Demo1Component implements OnInit {
  models = [
    new InputModel({
      id: 'username',
      label: 'username:(use custom class `label_class_1`)',
      validators: [
        { key: 'required', validator: Validators.required, message: 'username is required' },
        { key: 'minlength', validator: Validators.minLength(3), message: 'username must 3 chars at least' }
      ],
      wrappersClass: {
        labelWrapper: ['label_class_1'],
      },
    }),

    new InputModel({
      id: 'age',
      label: 'your age:',
      disabled: true,
      value: "it's a secret :)"
    }),
    new InputModel({
      id: 'niceperson',
      label: '<div style="color:blue;">a nice person?(html label support)</div>',
      value: 'definitly',
      attributes: {
        readonly: 'readonly',
      }
    }),
    new InputModel({
      id: 'avatar',
      label: 'avatar:',
      attributes: {
        type: 'file',
        multiple: 'multiple'
      },
      events: {
        change: (e) => {
          console.log(e.target.files);
        }
      }
    }),
    new CheckboxGroupModel({
      id: 'intrests',
      // inline: false,
      label: 'what do you like:',

      options: [
        {
          id: 'checkbox_1',
          checkLabel: 'basketball',
        },
        {
          id: 'checkbox_2',
          checkLabel: 'football',
        },
        {
          id: 'checkbox_3',
          checkLabel: 'swimming',
        },
        {
          id: 'checkbox_4',
          checkLabel: 'reading',
        },
        {
          id: 'checkbox_5',
          checkLabel: 'music',
        },
      ],
      validators: [
        { key: 'shouldlike', validator: customCheckboxGroupValidator_1, message: 'why not like reading?' },
        { key: 'shouldlikeatleast', validator: customCheckboxGroupValidator_2, message: 'you should like at least 3 item' }
      ],
    }),
    new GroupModel({
      id: 'passwordGroup',
      group: [
        new InputModel({
          id: 'password',
          label: 'password:',
          // disabled: true,
          attributes: {
            type: 'password',
          },
          validators: [
            { key: 'required', validator: Validators.required, message: 'password is required' }
          ],
        }),
        new InputModel({
          id: 'repassword',
          label: 're-password:',

          attributes: {
            type: 'password',
          },
          validators: [
            { key: 'required', validator: Validators.required, message: 'please retype your password' }
          ],
        }),
      ],
      validators: [
        { key: 'mismatch', validator: customeValidator(), message: 'the password not match' },
      ],
    }),
    new InputModel({
      id: 'email',
      label: 'email:',

      prefix: {
        html: '@',
        class: ['input-group-addon'],
      },
      validators: [
        { key: 'email_validator_key', validator: customEmailValidator(), message: 'invalid Email' }
      ],
      asyncValidators: [
        { key: 'duplicated', validator: customEmailduplicated, message: 'Email is already existed!' }
      ],
      wrappersClass: {
        controlWrapper: ['input-group']
      },
    }),
    new InputModel({
      id: 'phone',
      label: 'phone number:',

      validators: [
        { key: 'required', validator: Validators.required, message: 'please fill the phone number' }
      ],
    }),
    new InputModel({
      id: 'verificationcode',
      label: 'verifacation code:',

      validators: [{ key: 'required', validator: Validators.required, message: 'this is required' }],
      suffix: {
        html: '<button type="button" class="btn btn-success" onclick="alert(\'send me verificaton code!\');">send code</button>',
        class: ['border-0', 'ml-3', 'p-0'],
      },
      wrappersClass: {
        controlWrapper: ['input-group']
      },
    }),
    new SelectModel({
      id: 'country',
      label: 'country:',

      value: 'england',
      options: [
        { label: 'select one country', value: '' },
        { label: 'China', value: 'china' },
        { label: 'USA', value: 'usa' },
        { label: 'Japan', value: 'japan' },
        { label: 'England', value: 'england' },
        { label: 'France', value: 'france' },
      ],
      validators: [
        { key: 'required', validator: Validators.required, message: 'country is required' }
      ],
      events: {
        change: () => {
          console.log('ok--changed!');
        }
      }
    }),
    new SelectModel({
      id: 'occupation',
      attributes: {
        multiple: 'multiple',
      },
      label: 'occupation:',
      validators: [{ key: 'required', validator: Validators.required, message: 'occupation is required' }],
      options: [
        { label: 'Programmer', value: 'programmer' },
        { label: 'Teacher', value: 'teacher' },
        { label: 'Dodctor', value: 'doctor' },
        { label: 'Driver', value: 'driver' }
      ],
    }),
    new RadiogroupModel({
      id: 'gender:',
      label: 'gender:',
      legend: {
        value: 'Radio Group Legend!',
      },
      inline: true,
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'xxx', value: 'xxx', disabled: true }
      ],
      validators: [
        { key: 'required', validator: Validators.required, message: 'the gender is required' }
      ],
    }),
    new CheckboxModel({
      id: 'agree',
      value: true,
      required: true,
      checkLabel: 'agree some terms?',
      validators: [
        { key: 'required', validator: Validators.required, message: 'you must agree these terms' }
      ],
    }),
  ];
  formConfig: FormConfig = {
    models: this.models,
    attributes: {
      autocomplete: 'off',
    },
    showErrorsOnSubmit: true,
  };
  constructor() { }
  ngOnInit() {
  }

  test_submit(form) {
    console.log('test_submit', form.value);
  }
  test_change(data) {
    console.log('test_change', data);
  }
}

```
4: in the template `YourComponent.html`;
```html
<ngx-bootstrap-form [formConfig]="formConfig" (ngSubmit)="test_submit($event);" #myform (ngValueChange)='test_change($event);'>
  <button class="btn btn-primary" type="submit">submit</button>
</ngx-bootstrap-form>
```
## FormConfig
say it's easy to use,because,you just need to configure a json format data; and bind this data to the `ngx-bootstrap-form` form component;
```typescript
interface FormConfig {
    models: BaseModel[],
    attributes?: { [key: string]: string },
    wrappersClass?: WrappersClassInterFace,
    showErrorsOnSubmit?: boolean;
}
```
# models:
models is an array in which the basic form elements are include for exaple: `InputModel` represents input element
`SelectModel` represents select element.
# attributes:
you can use dynamically set any attibute for your form
attributes:{
   'autocomplete':'off',
}
the form will add  `"autocomplete"="off"` to you form
# wrappersClass:
before talking about The "wrappersClass";let's see the  DOM structuor for a model,pseudo code:
```html
<div mainWrapper>
  <label labelWrapper></label>
  <div secondaryWrapper>
    <div controlWrapper>
      <div prefix></div>
      input|select|radio|checkbox|radiogroup|checkgroup...
      <div suffix></div>
    </div>
    <div form-conrol-feedback>some error message</div>
  </div>
</div>
```
if you are familar with bootstrap v4 it should be easy to understand;it's based on the bootstrap form structor;
so,the purpose of `WrappersClass` is just **Globally** configure  for form layout while every model also  has this individually;

you can custom any class with:
```html
{
   models:...
   attributes:...
   wrappersClass:{
      mainWrapper:['custom_class_1','custom_class_2',...],
      labelWrapper:[...],
      ....
   },
   ...
}
```
## ModelTypes

`InputModel, TextareaModel, SelectModel, CheckboxModel, RadiogroupModel, CheckboxGroupModel,GroupModel`

GroupModel is a special model which used for creating FormGroup; for example:
```typescript
models=[
   new InputModel({...}),
   ...
   new GroupModel({
      id:'anyid',
      group:[// the `group` is the same as the `model`;
         new InputModel({...}),
         new SelectModel({...}),
         ....
      ],
   }),
   new CheckBoxModel({...}),
   ...
];
```
## ModelConfig
   ```typescript
   {
    id: string;
    value?: string | boolean;
    disabled?: boolean;
    attributes?: { [key: string]: string };
    events?: { [key: string]: (any) => void };
    validators?: {
        key: string,
        validator: ValidatorFn | ValidationErrors,
        message?: string,
    }[];
    asyncValidators?: {
        key: string,
        validator: AsyncValidatorFn | ValidationErrors,
        message?: string,
    }[];
    wrappersClass?: WrappersClassInterFace;
    label?: {
        html?: string,
        class?: Array<string>,
    };
    prefix?: {
        html?: string,
        class?: Array<string>,
    };
    suffix?: {
        html?: string,
        class?: Array<string>,
    };    
   }
   ```
## License

MIT © [guzuomuse]
"# ngx-myform" 
