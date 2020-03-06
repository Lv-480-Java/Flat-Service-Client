import {User} from '../../../user';

export class RequestsForUserVerification{
  id?: number;
  status: string;
  creationDate: Date;
  verificationDate: Date;
  user: User;
}
