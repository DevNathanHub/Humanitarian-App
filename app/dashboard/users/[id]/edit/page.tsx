'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { TextField, Button, Container, Typography, CircularProgress } from '@mui/material';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

const EditUser = () => {
  const router = useRouter();
  const { id: userId } = useParams(); // Get user ID from URL

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user data
  useEffect(() => {
    if (!userId) {
      setError('No user ID provided');
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${userId}`);
        if (!res.ok) throw new Error('Failed to fetch user');

        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  // Handle form submission
  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (!res.ok) throw new Error('Failed to update user');

      router.push('/dashboard/users');
    } catch (err) {
      alert((err as Error).message);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Edit User</Typography>
      <form onSubmit={handleUpdateUser}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={user?.email || ''}
          disabled
        />
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={user?.name || ''}
          onChange={(e) => setUser({ ...user!, name: e.target.value })}
        />
        <TextField
          label="Role"
          fullWidth
          margin="normal"
          value={user?.role || ''}
          onChange={(e) => setUser({ ...user!, role: e.target.value })}
        />
        <Button type="submit" variant="contained" color="primary">Update</Button>
      </form>
    </Container>
  );
};

export default EditUser;
