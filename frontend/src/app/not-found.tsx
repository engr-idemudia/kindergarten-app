"use client";

import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";

export default function NotFound() {
  const router = useRouter();
  const { role, hydrated } = useAuth();

  const handleBack = () => {
    if (role === "PARENT") router.push("/parent/dashboard");
    else if (role === "TEACHER") router.push("/teacher/dashboard");
    else if (role === "SUPER_ADMIN" || role === "KINDERGARTEN_ADMIN")
      router.push("/kindergarten-admin/dashboard");
    else router.push("/login");
  };

  return (
    <Container maxWidth="sm">
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
          sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
        >
          Coming soon
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 4 }}>
          This page is not ready yet. We are still building it — please check
          back later.
        </Typography>

        <Box>
          <Button
            variant="contained"
            size="large"
            onClick={handleBack}
            disabled={!hydrated}
          >
            Back to dashboard
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
