"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import Navbar from "@/components/Navbar";
import { useProductStore } from "@/store/productStore";

export default function ProductsPage() {
  const router = useRouter();

  const { products, fetchProducts, searchProducts } =
    useProductStore();

  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchProducts(0);
  }, []);

  const handleNext = () => {
    const newSkip = (page + 1) * 12;

    setPage(page + 1);

    fetchProducts(newSkip);
  };

  const handlePrev = () => {
    if (page === 0) return;

    const newSkip = (page - 1) * 12;

    setPage(page - 1);

    fetchProducts(newSkip);
  };

  return (
    <>
      <Navbar />

      <Box p={4}>
        <Typography variant="h4" mb={3}>
          Products
        </Typography>

        <TextField
          fullWidth
          placeholder="Search products..."
          sx={{ mb: 4 }}
          onChange={(e) =>
            searchProducts(e.target.value)
          }
        />

        <Grid container spacing={3}>
          {products.map((product: any) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={product.id}
            >
              <Card
                sx={{
                  backgroundColor: "#111",
                  color: "white",
                  cursor: "pointer",
                  height: "100%",
                }}
                onClick={() =>
                  router.push(`/products/${product.id}`)
                }
              >
                <CardMedia
                  component="img"
                  height="220"
                  image={product.thumbnail}
                  alt={product.title}
                />

                <CardContent>
                  <Typography variant="h6" mb={1}>
                    {product.title}
                  </Typography>

                  <Typography mb={1}>
                    ₹ {product.price}
                  </Typography>

                  <Typography mb={1}>
                    {product.category}
                  </Typography>

                  <Typography>
                    Rating: {product.rating}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box mt={4} display="flex" gap={2}>
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