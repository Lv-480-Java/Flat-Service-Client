import {Flat} from '../../../flat/flat-filter/entity/Flat';
import {RequestsForUserVerification} from './request-for-user-verification';
import {User} from '../../component/Users';

export interface RequestsForFlatVerification  {
  id?: number;
  status: string;
  creationDate: Date;
  verificationDate: Date;
  author: User;
  flat: Flat;
}
