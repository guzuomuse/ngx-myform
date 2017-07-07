import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormService } from './core/services/index';
import { FunctionalService } from './uis/bootstrap/services/index';
import { ModelAttributesDirective, ModelEventsDirective } from './core/directives/index';
import { SanitizeHtmlPipe } from './core/pipes/index';
// export { NgxBootstrapControlComponent } from './uis/bootstrap/components/control/ngx-bootstrap-control.component';
import { NgxBootstrapControlComponent, NgxBootstrapFormComponent } from './uis/bootstrap/components/index';
export * from './core/services/index';
export * from './uis/bootstrap/models/index';
export * from './uis/bootstrap/services/index';
export * from './core/directives/index';
export * from './core/pipes/index';
export * from './uis/bootstrap/components/index';
export * from './uis/bootstrap/interfaces/formconfig';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    NgxBootstrapControlComponent,
    NgxBootstrapFormComponent,
    ModelAttributesDirective,
    ModelEventsDirective,
    SanitizeHtmlPipe,
  ],
  exports: [
    NgxBootstrapControlComponent,
    NgxBootstrapFormComponent,
    ModelAttributesDirective,
    ModelEventsDirective,
    SanitizeHtmlPipe,
  ]
})
export class NgxMyFormModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxMyFormModule,
      providers: [
        FormService,
        FunctionalService,
      ]
    };
  }
}
