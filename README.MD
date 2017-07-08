# ngx-myform
Easy to use,Flexible,Simple,Powerful Angular 4+ module with Bootstrap v4 ui for Rapid Form Development;
# Demo screenShot:
### pic1:Normal
![pic1](https://lh3.googleusercontent.com/so_mv_BInMgU7BKhkzOVMdaYg8Hr0n4H9y0pZ1FSo2T7NJIGHZmm0d9_QJqWIeNV8NCq_dhp8HmMeU7GGDC7szqrwBJYj0SuCmyCxnbFAMSNO-WPq4kR-KqJ1STBA6pdovdiL-EwlpUSsXaFleuu3IxcqMJT3FimlBmj7cLx8r5zwgmjE4i9CzyGOUQaLHRM91HRUo0720_aoF3rhC-MCfh75M2d9sZg8Tki-H3X7Mx2Yz_K1Cy8le1dCGkcs5lceUMB5ly8q0J7wTAb-kIMt-64MtiLbKBq8WhJW-X8MPTKcRjOm2c9z9AZXO7hSmMHHBciq9WlqO9ejDUJWNKRmf50nCW2TcGbIOsMyyIJ04lmkYsVCYN6vQQ0nw2LYV9zIii5PPhFjahsMy8UiXkFmeaYoTXcl-Oh1P9H0Ar5KCjoCCVlMr2KbNNSyeu0xri0M_CcrQ_nIvMaK5b40aIFkG_wTFT-YKETzCMPE59Xo7VSI4xxArxu940F3Y3qUAM6dA-N9UpI33K4ttpfSVgZ4jjFvAsSHQ8M1UcQa7EJmzT535555uecUlJ6-VNBpePV95YT2SaSNDv0YaPcjZrrC3oJfj-yzCK5V63e6EHbpfYx_y5BbRg=w636-h741-no)
### pic2:Use Bootstrap 4 Grid
![pic2](https://lh3.googleusercontent.com/O_gzb66MBoAoy2RfyKqeIJbOl3zhW5P4OUU0M4ICj9Kt_1ygTzTcvZZiTzx6oPpQKJYzmtR8ntIXE3vtoz6jhpMUFAKrneCLt38XXrh8Jmo5-7DMpjUoMSfXsoLSbbb15kiqR6jQ4zH4RDFxXZYWB28vQi-XMlp3JXiKzqiPbLKA0bteZ7Y-FsLoyJDII8ARg3ilAUsn6EIijq4S3iX-iFCxhblAboMZg789JDeo7HCQy5i7uixeFdNVDQO9I1_r5owBXV6nAUSWbKHY0vVUAEtHYkT2Y8hcuEoYKTvfYfvyihR8YkoWNT5LBoj8NrPljoJku3hcitNoWfS97qR_xPlhZFG--tOLAt_53CwF67RmtzRcuNYaMUBNcPcOgs2migW0Zq6KN_FnttUd3wdF5Pr5f-qm4zTASuAOuNrBXkpIJTAJzdW6FjgZCelB23KG7YxW_E2QhEyywzYE3BPPyx7GSCrvKOtuyWRf5VOknm5nxfNcUwAhkDlQJz-KKAVn2dcQmStqOOAUOiZPa5HvqkycL_mrX2doeCtEbgqyl3yevfGpvP_asijKr2sjB-0Ue0_S0ZWrjd_dIGQc6KJAmRankmICuuHl-z9rU1WdmAP_EcXWd48CUDA=w736-h742-no)

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
import { FormGroup } from '@angular/forms';
import { FormConfig, InputModel, GroupModel, TextareaModel, SelectModel, RadiogroupModel, CheckboxGroupModel, CheckboxModel } from 'ngx-myform';
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
function test_math_2(g: FormGroup) {
  return g.get('test_sub_group_1').value === g.get('test_sub_group_2').value ? null : { notmatch: true };
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
})
export Class YorComponent implements OnInit {
  constructor(){      
  }
   models = [
    new InputModel({
      id: 'username',
      label: {
        html: 'username:',
        class: ['label_class_1', 'label_class_2'],
      },
      validators: [
        { key: 'required', validator: Validators.required, message: 'username is required' },
        { key: 'minlength', validator: Validators.minLength(3), message: 'username must 3 chars at least' }
      ],
      wrappersClass: {
        mainWrapper: ['test1', 'test_sub_1', 'test_sub_2'],
      },
    }),

    new InputModel({
      id: 'age',
      label: {
        html: 'your age:'
      },
      disabled: true,
      value: "it's a secret :)"
    }),
    new InputModel({
      id: 'niceperson',
      label: {
        html: 'a nice persion?'
      },
      value: 'definitly',
      attributes: {
        readonly: 'readonly',
      }
    }),
    new InputModel({
      id: 'avatar',
      label: {
        html: 'avatar:'
      },
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
      label: {
        html: 'What do you like:'
      },
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
          label: {
            html: 'password:'
          },
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
          label: {
            html: 're-password:'
          },
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
      label: {
        html: 'email:'
      },
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
      label: {
        html: 'phone number:',
      },
      validators: [
        { key: 'required', validator: Validators.required, message: 'please fill the phone number' }
      ],
    }),
    new InputModel({
      id: 'verificationcode',
      label: {
        html: 'verification code:'
      },
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
      label: {
        html: 'country:'
      },
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
      label: {
        html: 'accupation:',
      },
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
      label: {
        html: 'gender:',
      },
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

  ngOnInit(){
  }
  test_submit(form) {
    console.log('test_submit', form.value);
  }
  test_change(data) {
    console.log('test_change', data);
  }
...
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
