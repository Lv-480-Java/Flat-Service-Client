import {Flat} from '../../flat/flat-filter/entity/Flat';
import {User} from './Users';

export interface RequestForBanFlat {
  id?: string;
  status: string;
  creationDate: string;
  author: User;
  flat: Flat;
}
