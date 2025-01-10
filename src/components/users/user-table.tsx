// src/components/users/UserTable.tsx with sorting
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
import { User } from '@/types/user';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

type SortField = 'name' | 'email' | 'role' | 'age' | 'address' | 'phoneNumber';
type SortDirection = 'asc' | 'desc';

export const UserTable: React.FC<UserTableProps> = ({
  users,
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

  const sortedUsers = [...users].sort((a, b) => {
    const compareValue = (x: string | number, y: string | number) => {
      if (typeof x === 'number' && typeof y === 'number') {
        return sortDirection === 'asc' ? x - y : y - x;
      }
      return sortDirection === 'asc' ? String(x).localeCompare(String(y)) : String(y).localeCompare(String(x));
    };

    return compareValue(a[sortField] ?? '', b[sortField] ?? '');
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
            <TableHead 
              className="w-[150px] cursor-pointer"
              onClick={() => handleSort('name')}
            >
              Name <SortIcon field="name" />
            </TableHead>
            <TableHead 
              className="w-[200px] cursor-pointer"
              onClick={() => handleSort('email')}
            >
              Email <SortIcon field="email" />
            </TableHead>
            <TableHead 
              className="w-[100px] cursor-pointer"
              onClick={() => handleSort('role')}
            >
              Role <SortIcon field="role" />
            </TableHead>
            <TableHead 
              className="w-[100px] cursor-pointer"
              onClick={() => handleSort('age')}
            >
              Age <SortIcon field="age" />
            </TableHead>
            <TableHead 
              className="w-[200px] cursor-pointer"
              onClick={() => handleSort('address')}
            >
              Address <SortIcon field="address" />
            </TableHead>
            <TableHead 
              className="w-[150px] cursor-pointer"
              onClick={() => handleSort('phoneNumber')}
            >
              Phone Number <SortIcon field="phoneNumber" />
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedUsers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-muted-foreground">
                No users found
              </TableCell>
            </TableRow>
          ) : (
            sortedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${user.role === 'admin' ? 'bg-blue-100 text-blue-800' : 
                      user.role === 'moderator' ? 'bg-green-100 text-green-800' : 
                      'bg-gray-100 text-gray-800'}`}>
                    {user.role}
                  </span>
                </TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(user)}
                      className="hover:bg-gray-100"
                    >
                      <Pencil className="h-4 w-4 text-gray-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(user.id)}
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