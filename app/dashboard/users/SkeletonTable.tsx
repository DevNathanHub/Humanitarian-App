import { Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const SkeletonTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><Skeleton width={100} /></TableCell>
            <TableCell><Skeleton width={150} /></TableCell>
            <TableCell><Skeleton width={80} /></TableCell>
            <TableCell><Skeleton width={120} /></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell><Skeleton width="80%" /></TableCell>
              <TableCell><Skeleton width="60%" /></TableCell>
              <TableCell><Skeleton width="50%" /></TableCell>
              <TableCell><Skeleton width="70%" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SkeletonTable;
