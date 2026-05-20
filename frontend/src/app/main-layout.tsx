"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { Box, Container } from "@mui/material";
import Drawer from "./drawer";
import Footer from "./footer";
import Header from "./header";
import type { NavItem } from "./navigation";

type MainLayoutProps = {
  children: ReactNode;
  title?: string;
  navItems?: NavItem[];
  footerText?: string;
};

export default function MainLayout({
  children,
  title = "Kindergarten App",
  navItems = [],
  footerText = "Team 29 kindergarten management application",
}: MainLayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const hasNavigation = navItems.length > 0;
  const resolvedFooterText = useMemo(
    () => `${new Date().getFullYear()} - ${footerText}`,
    [footerText],
  );

  return (
    <Box sx={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      {hasNavigation && (
        <>
          <Header
            title={title}
            navItems={navItems}
            onOpenDrawer={() => setDrawerOpen(true)}
          />
          <Drawer
            title={title}
            navItems={navItems}
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          />
        </>
      )}

      <Container component="main" sx={{ py: 4, flex: 1 }}>
        {children}
      </Container>

      <Footer text={resolvedFooterText} />
    </Box>
  );
}
