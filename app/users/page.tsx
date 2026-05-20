"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Box,
  Typography,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";

import Navbar from "@/components/Navbar";
import { useUserStore } from "@/store/userStore";

export default function UsersPage() {
  const router = useRouter();

  const { users, fetchUsers, searchUsers } = useUserStore();

  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchUsers(0);
  }, []);

  const handleNext = () => {
    const newSkip = (page + 1) * 10;

    setPage(page + 1);

    fetchUsers(newSkip);
  };

  const handlePrev = () => {
    if (page === 0) return;

    const newSkip = (page - 1) * 10;

    setPage(page - 1);

    fetchUsers(newSkip);
  };

  return (
    <>
      <Navbar />

      <Box p={4}>
        <Typography variant="h4" mb={2}>
          Users
        </Typography>

        <TextField
          fullWidth
          placeholder="Search users..."
          sx={{ mb: 3 }}
          onChange={(e) => searchUsers(e.target.value)}
        />

        <Box
          sx={{
            backgroundColor: "#111",
            borderRadius: 2,
            p: 2,
            mt: 2,
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Name
                </TableCell>

                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Email
                </TableCell>

                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Gender
                </TableCell>

                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Phone
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.length > 0 ? (
                users.map((user: any) => (
                  <TableRow
                    key={user.id}
                    hover
                    onClick={() =>
                      router.push(`/users/${user.id}`)
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell sx={{ color: "white" }}>
                      {user.firstName} {user.lastName}
                    </TableCell>

                    <TableCell sx={{ color: "white" }}>
                      {user.email}
                    </TableCell>

                    <TableCell sx={{ color: "white" }}>
                      {user.gender}
                    </TableCell>

                    <TableCell sx={{ color: "white" }}>
                      {user.phone}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    sx={{ color: "white" }}
                  >
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>

        <Box mt={3} display="flex" gap={2}>
          <Button
            variant="outlined"
            onClick={handlePrev}
          >
            Prev
          </Button>

          <Button
            variant="contained"
            onClick={handleNext}
          >
            Next
          </Button>
        </Box>
      </Box>
    </>
  );
}