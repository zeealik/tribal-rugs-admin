import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { Product } from '@/types/product';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

type SortField = 'name' | 'price' | 'ageInYears';
type SortDirection = 'asc' | 'desc';

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onEdit,
  onDelete,
}) => {
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    const compareValue = (x: string | number, y: string | number) => {
      if (typeof x === 'number' && typeof y === 'number') {
        return sortDirection === 'asc' ? x - y : y - x;
      }
      if (typeof x === 'string' && typeof y === 'string') {
        return sortDirection === 'asc' ? x.localeCompare(y) : y.localeCompare(x);
      }
      return 0;
    };

    return compareValue(a[sortField], b[sortField]);
  });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (field !== sortField) return null;
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-4 w-4 inline ml-1" />
    ) : (
      <ChevronDown className="h-4 w-4 inline ml-1" />
    );
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Images</TableHead>
            <TableHead 
              className="w-[150px] cursor-pointer"
              onClick={() => handleSort('name')}
            >
              Name <SortIcon field="name" />
            </TableHead>
            <TableHead className="w-[150px]">Manufacturing</TableHead>
            <TableHead className="w-[150px]">Origin</TableHead>
            <TableHead className="w-[150px]">Material</TableHead>
            <TableHead className="w-[150px]">Colors</TableHead>
            <TableHead className="w-[150px]">Dimensions</TableHead>
            <TableHead 
              className="w-[100px] cursor-pointer"
              onClick={() => handleSort('price')}
            >
              Price <SortIcon field="price" />
            </TableHead>
            <TableHead 
              className="w-[100px] cursor-pointer"
              onClick={() => handleSort('ageInYears')}
            >
              Age <SortIcon field="ageInYears" />
            </TableHead>
            <TableHead className="w-[100px]">Quantity</TableHead>
            <TableHead className="w-[150px]">Details</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedProducts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={12} className="text-center text-muted-foreground">
                No products found
              </TableCell>
            </TableRow>
          ) : (
            sortedProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.images?.join(', ')}</TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.manufacturing}</TableCell>
                <TableCell>{product.origin}</TableCell>
                <TableCell>{product.material}</TableCell>
                <TableCell>{product.colors.join(', ')}</TableCell>
                <TableCell>{`${product.dimensions.width}x${product.dimensions.length} ${product.dimensions.unit}`}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.ageInYears}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.details.length > 20 ? `${product.details.substring(0, 20)}...` : product.details}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(product)}
                      className="hover:bg-gray-100"
                    >
                      <Pencil className="h-4 w-4 text-gray-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(product.id)}
                      className="hover:bg-red-100"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
