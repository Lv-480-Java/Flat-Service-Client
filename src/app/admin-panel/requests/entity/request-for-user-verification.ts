import {User} from '../../component/Users';

export interface RequestsForUserVerification {
  id?: number;
  status: string;
  creationDate: Date;
  verificationDate: Date;
  author: User;
}

