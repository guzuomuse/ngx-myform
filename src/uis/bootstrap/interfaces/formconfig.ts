import { BaseModel } from '../models/base';
import { WrappersClassInterFace } from './base';
export interface FormConfig {
    models: BaseModel[];
    attributes?: { [key: string]: string };
    wrappersClass?: WrappersClassInterFace;
    showErrorsOnSubmit?: boolean;
}
