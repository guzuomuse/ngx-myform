import { BaseModel } from './base';
import { GroupInterface } from '../interfaces/group';
export declare class GroupModel extends BaseModel {
    readonly type: string;
    constructor(options: GroupInterface);
}
