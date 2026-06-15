"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  ResetPasswordFormData,
} from "@/src/validation/resetPasswordSchema";
import {
  Alert,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { resetPassword } from "@/src/services/auth";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") ?? "";

  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setServerError(null);
    try {
      await resetPassword(token, data.newPassword);
      setSuccess(true);
      setTimeout(() => router.push("/login"), 2500);
    } catch {
      setServerError(
        "This reset link is invalid or has expired. Please request a new one.",
      );
    }
  };

  if (!token) {
    return (
      <Paper sx={{ maxWidth: 420, mx: "auto", mt: 8, p: 3 }}>
        <Stack spacing={2}>
          <Typography variant="h4">Reset password</Typography>
          <Alert severity="error">
            Missing reset token. Please use the link from your email.
          </Alert>
          <Button component={Link} href="/forgot-password" variant="text">
            Request a new link
          </Button>
        </Stack>
      </Paper>
    );
  }

  return (
    <Paper sx={{ maxWidth: 420, mx: "auto", mt: 8, p: 3 }}>
      <Stack spacing={2}>
        <Typography variant="h4">Reset password</Typography>

        {success ? (
          <Alert severity="success">
            Your password has been reset. Redirecting to login...
          </Alert>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Typography variant="body2" color="text.secondary">
                Enter a new password for your account.
              </Typography>

              {serverError && <Alert severity="error">{serverError}</Alert>}

              <TextField
                label="New password"
                type="password"
                {...register("newPassword")}
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
              />

              <Button type="submit" variant="contained" disabled={isSubmitting}>
                Reset password
              </Button>
            </Stack>
          </form>
        )}
      </Stack>
    </Paper>
  );
}
