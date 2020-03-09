import {User} from '../../admin-panel/component/interfaces';

export interface UserComment {
  id?: number;
  userId?: number;
  userAuthor?: User;
  text: string;
  publicationDate?: any;
}
