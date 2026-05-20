"use client";

import { useRouter } from "next/navigation";
import { Box, Button, Typography } from "@mui/material";

import Navbar from "@/components/Navbar";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <>
      <Navbar />

      <Box p={4}>
        <Typography variant="h3">
          Dashboard
        </Typography>

        <Typography variant="h5" mt={2}>
          Welcome Admin 👋
        </Typography>

        <Button
          variant="contained"
          sx={{ mt: 4 }}
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/login");
          }}
        >
          Logout
        </Button>

        <Button
          variant="outlined"
          sx={{ mt: 4, ml: 2 }}
          onClick={() => router.push("/users")}
        >
          Go to Users
        </Button>

        <Button
          variant="outlined"
          sx={{ mt: 4, ml: 2 }}
          onClick={() => router.push("/products")}
        >
          Go to Products
        </Button>
      </Box>
    </>
  );
}