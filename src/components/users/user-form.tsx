// src/components/users/user-form.tsx
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/types/user";
export interface UserFormProps {
  user?: User;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  fields: {
    name: string;
    label: string;
    type: string;
    required: boolean;
    min?: number;
  }[];
}

export const UserForm: React.FC<UserFormProps> = ({
  user,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "user",
    password: "",
    age: user?.age || 0,
    address: user?.address || "",
    phoneNumber: user?.phoneNumber || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
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
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          type='email'
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          required
        />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='role'>Role</Label>
        <Input
          id='role'
          value={formData.role}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, role: e.target.value }))
          }
          required
        />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='age'>Age</Label>
        <Input
          id='age'
          type='number'
          value={formData.age}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, age: Number(e.target.value) }))
          }
          required
        />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='address'>Address</Label>
        <Input
          id='address'
          value={formData.address}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, address: e.target.value }))
          }
        />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='phoneNumber'>Phone Number</Label>
        <Input
          id='phoneNumber'
          value={formData.phoneNumber}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }))
          }
        />
      </div>
      {!user && (
        <div className='space-y-2'>
          <Label htmlFor='password'>Password</Label>
          <Input
            id='password'
            type='password'
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            required
          />
        </div>
      )}
      <div className='flex justify-end space-x-2'>
        <Button type='button' variant='outline' onClick={onCancel}>
          Cancel
        </Button>
        <Button type='submit'>{user ? "Update" : "Create"}</Button>
      </div>
    </form>
  );
};
