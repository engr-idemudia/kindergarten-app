"use client";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { AlertColor } from "@mui/material";
import { useState } from "react";
import { ErrorState, Pagination, Spinner, Toast } from "@/src/components/ui";
import { useAuth } from "@/src/context/AuthContext";
import {
  AssignChildGroupDialog,
  ChildParentsDialog,
  ChildrenTable,
  type Child,
  deleteChild,
  EditChildDialog,
  type EditChildValues,
  GroupDetailsDialog,
  UnassignedChildrenTable,
  updateChild,
  updateChildGroup,
  useChildren,
  useUnassignedChildren,
} from "@/src/modules/children";
import type { Group } from "@/src/modules/groups";
import { getGroupById, useGroupOptions } from "@/src/modules/groups";

export default function KindergartenAdminChildrenPage() {
  const { token, hydrated } = useAuth();
  const [childrenPageNumber, setChildrenPageNumber] = useState(1);
  const [parentsChild, setParentsChild] = useState<Child | null>(null);
  const [childToAssign, setChildToAssign] = useState<Child | null>(null);
  const [childToEdit, setChildToEdit] = useState<Child | null>(null);
  const [editing, setEditing] = useState(false);
  const [childToDelete, setChildToDelete] = useState<Child | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [groupDetails, setGroupDetails] = useState<Group | null>(null);
  const [groupDetailsOpen, setGroupDetailsOpen] = useState(false);
  const [groupDetailsLoading, setGroupDetailsLoading] = useState(false);
  const [groupDetailsError, setGroupDetailsError] = useState<string | null>(
    null,
  );
  const [assigningGroup, setAssigningGroup] = useState(false);
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  } | null>(null);

  const {
    children,
    childPage,
    loading: childrenLoading,
    error: childrenError,
    refetch: refetchChildren,
  } = useChildren(token, childrenPageNumber - 1, 10, hydrated);
  const {
    children: unassignedChildren,
    loading: unassignedLoading,
    error: unassignedError,
    refetch: refetchUnassignedChildren,
  } = useUnassignedChildren(token, hydrated);
  const {
    groups,
    loading: groupsLoading,
    error: groupsError,
  } = useGroupOptions(token, hydrated);

  const handleViewGroup = async (child: Child) => {
    if (!token || !child.group) {
      return;
    }

    try {
      setGroupDetailsOpen(true);
      setGroupDetailsLoading(true);
      setGroupDetailsError(null);
      const group = await getGroupById(child.group.id, token);
      setGroupDetails(group);
    } catch (err) {
      console.error(err);
      setGroupDetails(null);
      setGroupDetailsError(
        err instanceof Error ? err.message : "Failed to load group details",
      );
    } finally {
      setGroupDetailsLoading(false);
    }
  };

  const handleAssignGroup = async (groupId: number | null) => {
    if (!token || !childToAssign) {
      return;
    }

    try {
      setAssigningGroup(true);
      await updateChildGroup(childToAssign.id, token, {
        groupId,
      });
      refetchChildren();
      refetchUnassignedChildren();
      setChildToAssign(null);
      setNotification({
        open: true,
        message: groupId
          ? "Child group updated successfully"
          : "Child group removed successfully",
        severity: "success",
      });
    } catch (err) {
      console.error(err);
      const details = err instanceof Error ? err.message : null;
      setNotification({
        open: true,
        message: details
          ? `Failed to assign group: ${details}`
          : "Failed to assign group",
        severity: "error",
      });
    } finally {
      setAssigningGroup(false);
    }
  };

  const handleEditChild = async (values: EditChildValues) => {
    if (!token || !childToEdit) {
      return;
    }

    try {
      setEditing(true);
      await updateChild(childToEdit.id, token, {
        firstName: values.firstName,
        lastName: values.lastName,
        birthDate: values.birthDate,
        groupId: childToEdit.group?.id ?? null,
      });
      refetchChildren();
      refetchUnassignedChildren();
      setChildToEdit(null);
      setNotification({
        open: true,
        message: "Child updated successfully",
        severity: "success",
      });
    } catch (err) {
      console.error(err);
      const details = err instanceof Error ? err.message : null;
      setNotification({
        open: true,
        message: details
          ? `Failed to update child: ${details}`
          : "Failed to update child",
        severity: "error",
      });
    } finally {
      setEditing(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!token || !childToDelete) {
      return;
    }

    try {
      setDeleting(true);
      await deleteChild(childToDelete.id, token);
      refetchChildren();
      refetchUnassignedChildren();
      setChildToDelete(null);
      setNotification({
        open: true,
        message: "Child deleted successfully",
        severity: "success",
      });
    } catch (err) {
      console.error(err);
      const details = err instanceof Error ? err.message : null;
      setNotification({
        open: true,
        message: details
          ? `Failed to delete child: ${details}`
          : "Failed to delete child",
        severity: "error",
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 1 }}>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="h4" fontWeight={700}>
            Children
          </Typography>
          <Typography color="text.secondary" variant="body2">
            Review all children, see parent information, and assign groups to
            new children.
          </Typography>
        </Stack>

        <Stack spacing={2}>
          <Typography variant="h6" fontWeight={700}>
            Children Without a Group
          </Typography>
          {unassignedLoading && unassignedChildren.length === 0 ? (
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Spinner centered={false} size={24} />
                <Typography>Loading unassigned children...</Typography>
              </Stack>
            </Paper>
          ) : unassignedError ? (
            <ErrorState
              title="Failed to load unassigned children"
              description={unassignedError}
              actionLabel="Try again"
              onAction={() => {
                void refetchUnassignedChildren();
              }}
            />
          ) : (
            <>
              <UnassignedChildrenTable
                rows={unassignedChildren}
                onViewParentsAction={setParentsChild}
                onAssignGroupAction={setChildToAssign}
              />
            </>
          )}
        </Stack>

        <Stack spacing={2}>
          <Typography variant="h6" fontWeight={700}>
            All Children
          </Typography>
          {childrenLoading && children.length === 0 ? (
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Spinner centered={false} size={24} />
                <Typography>Loading children...</Typography>
              </Stack>
            </Paper>
          ) : childrenError ? (
            <ErrorState
              title="Failed to load children"
              description={childrenError}
              actionLabel="Try again"
              onAction={() => {
                void refetchChildren();
              }}
            />
          ) : (
            <>
              <ChildrenTable
                rows={children}
                onViewParentsAction={setParentsChild}
                onManageGroupAction={setChildToAssign}
                onViewGroupAction={handleViewGroup}
                onEditAction={setChildToEdit}
                onDeleteAction={setChildToDelete}
              />
              {childPage && childPage.totalElements > 0 ? (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  {childPage.number * childPage.size + 1}-
                  {Math.min(
                    (childPage.number + 1) * childPage.size,
                    childPage.totalElements,
                  )}{" "}
                  of {childPage.totalElements}
                </Typography>
              ) : null}
              {(childPage?.totalPages ?? 0) > 1 ? (
                <Pagination
                  count={childPage?.totalPages ?? 0}
                  page={childrenPageNumber}
                  onChange={(_, value) => setChildrenPageNumber(value)}
                />
              ) : null}
            </>
          )}
        </Stack>

        <ChildParentsDialog
          child={parentsChild}
          open={!!parentsChild}
          onCloseAction={() => setParentsChild(null)}
        />

        <AssignChildGroupDialog
          child={childToAssign}
          groups={groups}
          groupsLoading={groupsLoading}
          groupsError={groupsError}
          loading={assigningGroup}
          open={!!childToAssign}
          onCloseAction={() => setChildToAssign(null)}
          onSubmitAction={handleAssignGroup}
        />

        <EditChildDialog
          child={childToEdit}
          open={!!childToEdit}
          loading={editing}
          onCloseAction={() => setChildToEdit(null)}
          onSubmitAction={handleEditChild}
        />

        <GroupDetailsDialog
          group={groupDetails}
          open={groupDetailsOpen}
          loading={groupDetailsLoading}
          error={groupDetailsError}
          onCloseAction={() => {
            setGroupDetailsOpen(false);
            setGroupDetails(null);
            setGroupDetailsError(null);
          }}
        />

        <Dialog
          open={!!childToDelete}
          onClose={() => {
            if (!deleting) {
              setChildToDelete(null);
            }
          }}
        >
          <DialogTitle>Delete child</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete{" "}
              {childToDelete
                ? `${childToDelete.firstName} ${childToDelete.lastName}`
                : "this child"}
              ? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setChildToDelete(null)} disabled={deleting}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              color="error"
              variant="contained"
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogActions>
        </Dialog>

        <Toast
          open={!!notification?.open}
          onClose={(_, reason) => {
            if (reason !== "clickaway") {
              setNotification(null);
            }
          }}
          message={notification?.message ?? ""}
          severity={notification?.severity ?? "info"}
        />
      </Stack>
    </Paper>
  );
}
