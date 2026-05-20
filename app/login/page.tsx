"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Button } from "@mui/material";
import { useAuthStore } from "@/store/authStore";

export default function DashboardPage() {
  const router = useRouter();
  const { logout } = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <Box p={4}>
      <Typography variant="h4">Dashboard</Typography>

      <Typography mt={2}>
        Welcome Admin 👋
      </Typography>

      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>
  );
}