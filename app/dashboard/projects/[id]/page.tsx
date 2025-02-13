'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Container, Typography, Paper, CircularProgress, Alert, List, ListItem, ListItemText } from '@mui/material';

interface Comment {
  id: string;
  body: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  comments?: Comment[];
}

const ProjectDetail = () => {
  const { id } = useParams(); // Ensure params are correctly accessed
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch project data from API
  const fetchProject = async (projectId: string) => {
    try {
      const res = await fetch(`/api/projects/${projectId}`, { cache: 'no-store' });

      if (!res.ok) {
        throw new Error('Failed to fetch project');
      }

      const data = await res.json();
      setProject(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProject(id);
    }
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!project) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="warning">Project not found</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          {project.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          {project.description}
        </Typography>

        <Typography variant="h6" sx={{ mt: 4 }}>
          Comments:
        </Typography>
        {project.comments && project.comments.length > 0 ? (
          <List>
            {project.comments.map((comment) => (
              <ListItem key={comment.id} divider>
                <ListItemText primary={comment.body} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No comments yet.
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default ProjectDetail;
