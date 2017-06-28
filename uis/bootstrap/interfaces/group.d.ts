import { BaseInterface } from './base';
import { BaseModel } from '../models/base';
export interface GroupInterface extends BaseInterface {
    group: BaseModel[];
    errorPlace?: string;
}
