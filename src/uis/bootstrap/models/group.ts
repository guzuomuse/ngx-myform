import { BaseModel } from './base';
import { GroupInterface } from '../interfaces/group';
export class GroupModel extends BaseModel {
    readonly type = 'group';
    constructor(options: GroupInterface) {
        super(options);
    }
}
