// src/components/products/product-form.tsx
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product, CreateProductDTO, UpdateProductDTO } from "@/types/product";

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: CreateProductDTO | UpdateProductDTO) => void;
  onCancel: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    manufacturing: product?.manufacturing || "",
    origin: product?.origin || "",
    material: product?.material || "",
    colors: product?.colors || [],
    dimensions: {
      width: product?.dimensions.width || 0,
      length: product?.dimensions.length || 0,
      unit: product?.dimensions.unit || "",
    },
    ageInYears: product?.ageInYears || 0,
    price: product?.price || 0,
    quantity: product?.quantity || 0,
    details: product?.details || "",
    images: product?.images || [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='max-h-[80vh] overflow-y-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='manufacturing'>Manufacturing</Label>
            <Input
              id='manufacturing'
              value={formData.manufacturing}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  manufacturing: e.target.value,
                }))
              }
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='origin'>Origin</Label>
            <Input
              id='origin'
              value={formData.origin}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, origin: e.target.value }))
              }
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='material'>Material</Label>
            <Input
              id='material'
              value={formData.material}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, material: e.target.value }))
              }
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='colors'>Colors</Label>
            <Input
              id='colors'
              value={formData.colors.join(", ")}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  colors: e.target.value.split(",").map((color) => color.trim()),
                }))
              }
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='width'>Width</Label>
            <Input
              id='width'
              type='number'
              value={formData.dimensions.width}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  dimensions: {
                    ...prev.dimensions,
                    width: parseFloat(e.target.value),
                  },
                }))
              }
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='length'>Length</Label>
            <Input
              id='length'
              type='number'
              value={formData.dimensions.length}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  dimensions: {
                    ...prev.dimensions,
                    length: parseFloat(e.target.value),
                  },
                }))
              }
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='unit'>Unit</Label>
            <Input
              id='unit'
              value={formData.dimensions.unit}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  dimensions: { ...prev.dimensions, unit: e.target.value },
                }))
              }
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='ageInYears'>Age in Years</Label>
            <Input
              id='ageInYears'
              type='number'
              value={formData.ageInYears}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  ageInYears: parseInt(e.target.value),
                }))
              }
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='price'>Price</Label>
            <Input
              id='price'
              type='number'
              value={formData.price}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  price: parseFloat(e.target.value),
                }))
              }
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='quantity'>Quantity</Label>
            <Input
              id='quantity'
              type='number'
              value={formData.quantity}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  quantity: parseInt(e.target.value),
                }))
              }
              required
            />
          </div>
            <div className='space-y-2'>
            <Label htmlFor='details'>Details</Label>
            <textarea
              id='details'
              value={formData.details}
              onChange={(e) =>
              setFormData((prev) => ({ ...prev, details: e.target.value }))
              }
              required
              className='w-full p-2 border rounded'
            />
            </div>
          <div className='space-y-2'>
            <Label htmlFor='images'>Images</Label>
            <Input
              id='images'
              value={formData.images.join(", ")}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  images: e.target.value.split(",").map((image) => image.trim()),
                }))
              }
            />
          </div>
        </div>
        <div className='flex justify-end space-x-2'>
          <Button type='button' variant='outline' onClick={onCancel}>
            Cancel
          </Button>
          <Button type='submit'>{product ? "Update" : "Create"}</Button>
        </div>
      </div>
    </form>
  );
};
