# ngx-myform
Easy to Sse,Flexible,Simple,Powerful Angular 4+ module with Bootstrap v4 ui for Rapid Form Development;

## Table of Contents

[Installation](#installation):

[Usage](#usage)

[FormConfig](#formconfig)

[ControlTypes](#controltypes)

[livedemo](#livedeo)



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

## License

MIT © [guzuomuse]
"# ngx-myform" 
