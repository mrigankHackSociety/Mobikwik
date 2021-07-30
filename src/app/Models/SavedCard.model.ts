import { Deserializable } from '../Shared/Models/deserializable.model';

export class SavedCard implements Deserializable {
    public id!: number;
    public cardNumber!: string;
    public cardType!: string;
    public cardNetwork!: string;
    public cardUserName!: string;
    public cardExpiryMonth!: string;
    public cardExpiryYear!: number;

  deserialize(input: any): this {
      Object.assign(this, input);
      return this;
  }
}
