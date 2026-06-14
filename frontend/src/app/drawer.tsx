"use client";

import Link from "next/link";
import {
  Box,
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
  Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { WbSunny, DarkMode } from "@mui/icons-material";

import { useState } from "react";
import type { NavItem } from "./navigation";
import { useThemeMode } from "@/src/context/ThemeContext";
import { useAuth } from "@/src/context/AuthContext";
import LogoutButton from "@/src/components/LogoutButton";

type DrawerProps = {
  title: string;
  navItems: NavItem[];
  open: boolean;
  onClose: () => void;
};

const drawerWidth = 280;

export default function Drawer({
  title,
  navItems,
  open,
  onClose,
}: DrawerProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { mode, toggleTheme } = useThemeMode();
  const { isAuthenticated } = useAuth();

  const toggle = (label: string) => {
    setOpenMenu((prev) => (prev === label ? null : label));
  };

  return (
    <MuiDrawer
      anchor="left"
      onClose={onClose}
      open={open}
      sx={{ display: { xs: "block", md: "none" } }}
    >
      <Box role="presentation" sx={{ width: drawerWidth }}>
        <Box sx={{ px: 2, py: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
        </Box>

        <Divider />

        <List>
          {navItems.map((item) =>
            "href" in item ? (
              <ListItemButton
                key={item.href}
                component={Link}
                href={item.href}
                onClick={onClose}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ) : (
              <Box key={item.label}>
                <ListItemButton onClick={() => toggle(item.label)}>
                  <ListItemText primary={item.label} />
                  {openMenu === item.label ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse
                  in={openMenu === item.label}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.children.map((child) => (
                      <ListItemButton
                        key={child.href}
                        component={Link}
                        href={child.href}
                        onClick={onClose}
                        sx={{ pl: 4 }}
                      >
                        <ListItemText primary={child.label} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </Box>
            ),
          )}
        </List>

        <Divider />

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 2, py: 1.5 }}
        >
          <IconButton
            onClick={toggleTheme}
            color="inherit"
            aria-label="toggle theme"
          >
            {mode === "dark" ? <WbSunny /> : <DarkMode />}
          </IconButton>
          {isAuthenticated && <LogoutButton />}
        </Stack>
      </Box>
    </MuiDrawer>
  );
}
