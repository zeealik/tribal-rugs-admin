// src/pages/users/UsersPage.tsx
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { User } from '@/types/user';
import { UserForm } from '@/components/users/user-form';
import { useUsers } from '@/hooks/useUsers';
import { UserTable } from '@/components/users/user-table';

const UsersPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const { users, createUser, updateUser, deleteUser } = useUsers();

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  const handleDelete = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser.mutate(userId);
    }
  };

  const handleSubmit = (data: any) => {
    if (selectedUser) {
      updateUser.mutate({ id: selectedUser.id, data });
    } else {
      createUser.mutate(data);
    }
    setIsOpen(false);
    setSelectedUser(undefined);
  };

  if (users.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Users</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedUser(undefined)}>
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedUser ? 'Edit User' : 'Add New User'}</DialogTitle>
            </DialogHeader>
            <UserForm
              user={selectedUser}
              onSubmit={handleSubmit}
              onCancel={() => setIsOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <UserTable
        users={users.data || []}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default UsersPage;