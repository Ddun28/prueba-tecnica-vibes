import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IProduct extends Document {
  id: string;
  name: string;
  price: number;
  isAvailable: boolean;
  category: string;
  image: string;
  description?: string;
  sku?: string;
  stock?: number;
  rating?: number;
  reviewCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema({
  id: { 
    type: String, 
    required: true, 
    unique: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  isAvailable: { 
    type: Boolean, 
    required: true,
    default: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  sku: { 
    type: String 
  },
  stock: { 
    type: Number,
    default: 0 
  },
  rating: { 
    type: Number,
    min: 0,
    max: 5,
    default: 0 
  },
  reviewCount: { 
    type: Number,
    default: 0 
  }
}, {
  timestamps: true,
  toJSON: {
   transform: function(doc, ret) {
    delete (ret as { _id?: any })._id;
    delete (ret as { __v?: any }).__v;
    return ret;
    }
  }
});

ProductSchema.index({ name: 'text', description: 'text' });
ProductSchema.index({ price: 1 });
ProductSchema.index({ isAvailable: 1 });
ProductSchema.index({ category: 1 });

export default mongoose.model<IProduct>('Product', ProductSchema);