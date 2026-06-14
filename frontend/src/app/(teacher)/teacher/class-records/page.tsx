"use client";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useAuth } from "@/src/context/AuthContext";
import { useClassRecords } from "@/src/modules/children/hooks/useClassRecords";
import { Spinner, ErrorState, Table } from "@/src/components/ui";

export default function ClassRecordsPage() {
  const { token, hydrated } = useAuth();
  const { children, loading, error } = useClassRecords(token, hydrated);

  return (
    <Paper sx={{ p: 3, borderRadius: 1 }}>
      <Stack spacing={2}>
        <Typography variant="h4" fontWeight={700}>
          Class Records
        </Typography>
        <Typography color="text.secondary">
          Children in your assigned group
        </Typography>

        {loading ? (
          <Stack direction="row" spacing={2} alignItems="center">
            <Spinner centered={false} size={24} />
            <Typography>Loading class records...</Typography>
          </Stack>
        ) : error ? (
          <ErrorState
            title="Failed to load class records"
            description={error}
            actionLabel={undefined}
          />
        ) : children.length === 0 ? (
          <Typography color="text.secondary">
            No children found in your group.
          </Typography>
        ) : (
          <Table
            columns={[
              { key: "firstName", label: "First Name" },
              { key: "lastName", label: "Last Name" },
              {
                key: "birthDate",
                label: "Date of Birth",
                render: (child) => child.birthDate ?? "-",
              },
              {
                key: "groupName",
                label: "Group Name",
                render: (child) => child.group?.name ?? "-",
              },
            ]}
            rows={children}
            rowKey={(child) => String(child.id)}
          />
        )}
      </Stack>
    </Paper>
  );
}
