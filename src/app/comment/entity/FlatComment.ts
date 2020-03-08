import {User} from '../../admin-panel/component/interfaces';

export interface FlatComment {
  id?: number;
  flatId?: number;
  userAuthor?: User;
  text: string;
  publicationDate?: any;
}
