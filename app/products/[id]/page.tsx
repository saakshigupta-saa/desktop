"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";

import axios from "axios";

import Navbar from "@/components/Navbar";

export default function ProductDetailPage() {
  const params = useParams();

  const router = useRouter();

  const id = params?.id as string;

  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://dummyjson.com/products/${id}`
        );

        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />

      <Box p={4}>
        <Button
          variant="outlined"
          onClick={() => router.push("/products")}
        >
          Back
        </Button>

        <Card
          sx={{
            mt: 3,
            backgroundColor: "#111",
            color: "white",
            maxWidth: 500,
          }}
        >
          <CardMedia
            component="img"
            height="350"
            image={product.thumbnail}
            alt={product.title}
          />

          <CardContent>
            <Typography variant="h4" mb={2}>
              {product.title}
            </Typography>

            <Typography mb={1}>
              Price: ₹ {product.price}
            </Typography>

            <Typography mb={1}>
              Category: {product.category}
            </Typography>

            <Typography mb={1}>
              Rating: {product.rating}
            </Typography>

            <Typography mb={1}>
              Stock: {product.stock}
            </Typography>

            <Typography>
              {product.description}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}