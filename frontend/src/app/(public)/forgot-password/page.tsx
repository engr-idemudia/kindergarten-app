"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  ForgotPasswordFormData,
} from "@/src/validation/forgotPasswordSchema";
import {
  Alert,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { forgotPassword } from "@/src/services/auth";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await forgotPassword(data.email);
    } catch {
      // Intentionally ignored: never reveal whether the email exists.
    } finally {
      setSubmitted(true);
    }
  };

  return (
    <Paper sx={{ maxWidth: 420, mx: "auto", mt: 8, p: 3 }}>
      <Stack spacing={2}>
        <Typography variant="h4">Forgot password</Typography>

        {submitted ? (
          <>
            <Alert severity="success">
              If an account exists for that email, a reset link has been sent.
              Please check your inbox.
            </Alert>
            <Button component={Link} href="/login" variant="text">
              Back to login
            </Button>
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Typography variant="body2" color="text.secondary">
                Enter your email address and we will send you a link to reset
                your password.
              </Typography>

              <TextField
                label="Email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              <Button type="submit" variant="contained" disabled={isSubmitting}>
                Send reset link
              </Button>

              <Button component={Link} href="/login" variant="text">
                Back to login
              </Button>
            </Stack>
          </form>
        )}
      </Stack>
    </Paper>
  );
}
