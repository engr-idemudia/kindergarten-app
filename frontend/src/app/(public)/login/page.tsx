"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/src/validation/loginSchema";
import {
  Box,
  Button,
  Divider,
  Link as MuiLink,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { login } from "@/src/services/auth";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { redirectByRole } from "@/src/shared/utils/redirectByRole";
import type { MyJwtPayload } from "@/src/context/AuthContext";
import Link from "next/link";

export default function LoginPage() {
  const { login: saveToken } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const demoAccounts = [
    { role: "Super Admin", email: "superadmin@idemudia.dev" },
    { role: "Admin", email: "admin@idemudia.dev" },
    { role: "Teacher", email: "demo@teacher.com" },
    { role: "Parent", email: "demo@parent.com" },
  ];

  const fillDemo = (email: string) => {
    setValue("email", email, { shouldValidate: true, shouldDirty: true });
    setValue("password", "password123", {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await login(data.email, data.password);
      saveToken(res.token);

      const payload = jwtDecode<MyJwtPayload>(res.token);
      redirectByRole(payload.roles, router);
    } catch (err: any) {
      setError("password", {
        type: "server",
        message: "Invalid email or password",
      });
    }
  };

  return (
    <Box sx={{ maxWidth: 420, mx: "auto", mt: 8 }}>
      <Box
        sx={{
          border: "1px solid",
          borderColor: "primary.main",
          borderRadius: 1,
          p: 1.5,
          mb: 2,
        }}
      >
        <Typography variant="subtitle2" gutterBottom>
          Demo logins — click a role to fill the form
        </Typography>
        {demoAccounts.map((acc) => (
          <Typography
            key={acc.email}
            variant="body2"
            onClick={() => fillDemo(acc.email)}
            sx={{ cursor: "pointer", "&:hover": { color: "primary.main" } }}
          >
            <strong>{acc.role}:</strong> {acc.email}
          </Typography>
        ))}
        <Divider sx={{ my: 1 }} />
        <Typography variant="body2">
          Password: <strong>password123</strong>
        </Typography>
      </Box>

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Typography variant="h4">Login</Typography>

            <TextField
              label="Email"
              InputLabelProps={{ shrink: true }}
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="Password"
              type="password"
              InputLabelProps={{ shrink: true }}
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Button type="submit" variant="contained" disabled={isSubmitting}>
              Sign in
            </Button>

            <MuiLink
              component={Link}
              href="/forgot-password"
              variant="body2"
              sx={{ alignSelf: "flex-end" }}
            >
              Forgot password?
            </MuiLink>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
