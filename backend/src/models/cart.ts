import { Schema, model, Types } from 'mongoose';

interface CartItem {
  product: Types.ObjectId;
  quantity: number;
}

interface CartInterface {
  items: CartItem[];
}

const CartSchema = new Schema<CartInterface>(
  {
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
      }
    ]
  },
  { versionKey: false, timestamps: true }
);

export default model<CartInterface>('Cart', CartSchema, 'carts');
