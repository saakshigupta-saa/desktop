"use client";

import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#111" }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => router.push("/dashboard")}
        >
          Admin Dashboard
        </Typography>

        <Box display="flex" gap={2}>
          <Button
            color="inherit"
            onClick={() => router.push("/dashboard")}
          >
            Dashboard
          </Button>

          <Button
            color="inherit"
            onClick={() => router.push("/users")}
          >
            Users
          </Button>

          <Button
            color="inherit"
            onClick={() => router.push("/products")}
          >
            Products
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}