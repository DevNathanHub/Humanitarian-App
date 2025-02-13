'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, Typography } from '@mui/material';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}
  
const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/users/${id}`)
        .then((res) => res.json())
        .then((data) => setUser(data));
    }
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardContent>
        <Typography variant="h5" component="div">{user.name}</Typography>
        <Typography color="text.secondary">{user.email}</Typography>
        <Typography variant="body2">{user.role}</Typography>
      </CardContent>
    </Card>
  );
};

export default UserDetail;
