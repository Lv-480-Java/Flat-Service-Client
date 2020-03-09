import {User} from '../../component/Users';

export class RequestsForUserVerification {
  id?: number;
  status: string;
  creationDate: Date;
  verificationDate: Date;
  author: User;
}

