"use client";

import type { ReactNode } from "react";
import {
  Box,
  Paper,
  Stack,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export type TableColumn<T> = {
  key: keyof T | string;
  label: ReactNode;
  align?: "left" | "right" | "center";
  render?: (row: T) => ReactNode;
};

export type TableProps<T> = {
  columns: TableColumn<T>[];
  rows: T[];
  rowKey?: (row: T, index: number) => string;
  size?: "small" | "medium";
};

export default function Table<T>({
  columns,
  rows,
  rowKey,
  size = "small",
}: TableProps<T>) {
  const cellValue = (column: TableColumn<T>, row: T): ReactNode =>
    column.render
      ? column.render(row)
      : (row as Record<string, ReactNode>)[String(column.key)];

  return (
    <>
      {/* Tablet and desktop: standard table */}
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ display: { xs: "none", sm: "block" } }}
      >
        <MuiTable size={size}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell align={column.align} key={String(column.key)}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow hover key={rowKey?.(row, index) ?? String(index)}>
                {columns.map((column) => (
                  <TableCell align={column.align} key={String(column.key)}>
                    {cellValue(column, row)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>

      {/* Mobile: stacked cards */}
      <Stack spacing={1.5} sx={{ display: { xs: "flex", sm: "none" } }}>
        {rows.map((row, index) => (
          <Paper
            key={rowKey?.(row, index) ?? String(index)}
            variant="outlined"
            sx={{ p: 2 }}
          >
            <Stack spacing={1}>
              {columns.map((column) => (
                <Box
                  key={String(column.key)}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary", fontWeight: 600 }}
                  >
                    {column.label}
                  </Typography>
                  <Box sx={{ textAlign: "right" }}>
                    {cellValue(column, row)}
                  </Box>
                </Box>
              ))}
            </Stack>
          </Paper>
        ))}
      </Stack>
    </>
  );
}
