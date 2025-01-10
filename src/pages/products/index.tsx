// src/pages/products/ProductsPage.tsx
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { Product } from '@/types/product';
import { ProductForm } from '@/components/products/product-form';
import { useProducts } from '@/hooks/useProducts';
import { ProductTable } from '@/components/products/product-table';

const ProductsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const { products, createProduct, updateProduct, deleteProduct } = useProducts();

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const handleDelete = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct.mutate(productId);
    }
  };

  const handleSubmit = (data: any) => {
    if (selectedProduct) {
      updateProduct.mutate({ id: selectedProduct.id, data });
    } else {
      createProduct.mutate(data);
    }
    setIsOpen(false);
    setSelectedProduct(undefined);
  };

  if (products.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
        <Button onClick={() => setSelectedProduct(undefined)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
          </DialogTrigger>
          <DialogContent>
        <DialogHeader>
          <DialogTitle>{selectedProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        </DialogHeader>
          <ProductForm
            product={selectedProduct}
            onSubmit={handleSubmit}
            onCancel={() => setIsOpen(false)}
          />
          </DialogContent>
        </Dialog>
      </div>

      <ProductTable
        products={products.data || []}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ProductsPage;
