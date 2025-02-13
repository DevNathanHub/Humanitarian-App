'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography } from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import SkeletonTable from './SkeletonTable';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

const UsersPage = () => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true); // Start loading
      const res = await fetch('/api/users', { cache: 'no-store' });

      if (!res.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle delete user
  const handleDeleteUser = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });

      if (!res.ok) {
        throw new Error('Failed to delete user');
      }

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (err) {
      alert((err as Error).message);
    }
  };

  // Handle navigation
  const handleEditUser = (id: string) => router.push(`/dashboard/users/${id}/edit`);
  const handleViewUser = (id: string) => router.push(`/dashboard/users/${id}`);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {error && <Typography color="error">{error}</Typography>}

      {loading ? (
        <SkeletonTable />
      ) : users.length === 0 ? (
        <Typography>No users found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleViewUser(user.id)} color="primary">
                      <Visibility />
                    </IconButton>
                    <IconButton onClick={() => handleEditUser(user.id)} color="secondary">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteUser(user.id)} color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default UsersPage;
