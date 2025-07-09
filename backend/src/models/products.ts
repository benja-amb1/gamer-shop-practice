import { Schema, model } from 'mongoose';

interface ProductInterface {
  title: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  stock: boolean;
}

const ProductSchema = new Schema<ProductInterface>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    stock: { type: Boolean, required: true },
  },
  { versionKey: false, timestamps: true }
);

export default model<ProductInterface>('Product', ProductSchema, 'products');
