"use client";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import type { Child } from "../model/child";

export type EditChildValues = {
    firstName: string;
    lastName: string;
    birthDate: string | null;
};

type EditChildDialogProps = {
    child: Child | null;
    open: boolean;
    loading?: boolean;
    onCloseAction: () => void;
    onSubmitAction: (values: EditChildValues) => void;
};

export default function EditChildDialog({
    child,
    open,
    loading = false,
    onCloseAction,
    onSubmitAction,
}: EditChildDialogProps) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthDate, setBirthDate] = useState("");

    useEffect(() => {
        if (child) {
            setFirstName(child.firstName);
            setLastName(child.lastName);
            setBirthDate(child.birthDate ?? "");
        }
    }, [child]);

    const handleSubmit = () => {
        onSubmitAction({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            birthDate: birthDate ? birthDate : null,
        });
    };

    const isValid = firstName.trim().length > 0 && lastName.trim().length > 0;

    return (
        <Dialog open={open} onClose={() => (!loading ? onCloseAction() : undefined)} fullWidth maxWidth="xs">
            <DialogTitle>Edit child</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <TextField
                        label="First name"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        fullWidth
                        disabled={loading}
                    />
                    <TextField
                        label="Last name"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        fullWidth
                        disabled={loading}
                    />
                    <TextField
                        label="Birth date"
                        type="date"
                        value={birthDate}
                        onChange={(event) => setBirthDate(event.target.value)}
                        fullWidth
                        disabled={loading}
                        InputLabelProps={{ shrink: true }}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCloseAction} disabled={loading}>
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={loading || !isValid}
                >
                    {loading ? "Saving..." : "Save"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
