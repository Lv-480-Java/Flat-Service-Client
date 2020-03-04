export class FlatResponse {
  public content: Array<Flat>;
}

export class Flat {
  public address: any;
  public creationDate: string;
  public photoUrl: string;
  public title: string;
  public description: string;
  public monthPrice: number;
  public tags: Array<string>;
}
