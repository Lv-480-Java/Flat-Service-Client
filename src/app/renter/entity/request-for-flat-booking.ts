import {User} from "../../admin-panel/component/Users";
import {Flat} from "../../flat/flat-filter/entity/Flat";


export class RequestsForFlatBooking {
  public content: Array<RequestForFlatBooking>
}

export class RequestForFlatBooking {
  id?: number;
  status: string;
  creationDate: Date;
  verificationDate: Date;
  author: User;
  flat: Flat;
}
