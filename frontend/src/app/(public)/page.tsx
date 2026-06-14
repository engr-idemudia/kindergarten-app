"use client";

import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Paper,
} from "@mui/material";
import Link from "next/link";

export default function PublicHomePage() {
  return (
    <Container maxWidth="md">
      <Paper
        elevation={3}
        sx={{
          mt: { xs: 6, md: 10 },
          p: { xs: 3, md: 5 },
          textAlign: "center",
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h3"
          fontWeight={700}
          gutterBottom
          sx={{
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            wordBreak: "break-word",
          }}
        >
          Welcome to Kindergarten App
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            mb: 4,
            fontSize: { xs: "1rem", md: "1.25rem" },
          }}
        >
          A modern platform for managing kindergartens, teachers, parents and
          daily activities.
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            component={Link}
            href="/login"
            variant="contained"
            size="large"
          >
            Login
          </Button>

          <Button
            component={Link}
            href="/register"
            variant="outlined"
            size="large"
          >
            Register
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
