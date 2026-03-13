import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

export default function TableView({
  title,
  subtitle,
  buttonLabel,
  columns,
  rows,
  onAdd,
  onEdit,
  onDelete,
}) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);

  const handleDeleteClick = (row) => {
    setRowToDelete(row);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setRowToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (rowToDelete && onDelete) {
      await onDelete(rowToDelete);
    }
    handleCloseDeleteDialog();
  };

  return (
    <Box className="views-content">
      <Paper elevation={0} className="view-section-card">
        <Box className="view-section-header">
          <Box>
            <Typography className="view-section-title">
              {title}
            </Typography>

            <Typography className="view-section-subtitle">
              {subtitle}
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            className="view-action-btn"
            onClick={onAdd}
          >
            {buttonLabel}
          </Button>
        </Box>
      </Paper>

      <Paper elevation={0} className="view-table-card">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className="view-table-head-row">
                <TableCell className="view-table-head-cell">
                  No.
                </TableCell>

                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    className="view-table-head-cell"
                  >
                    {col.label}
                  </TableCell>
                ))}

                <TableCell
                  className="view-table-head-cell"
                  align="right"
                />
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={row.id} hover>
                  <TableCell className="view-table-cell">
                    {index + 1}
                  </TableCell>

                  {columns.map((col) => (
                    <TableCell
                      key={col.key}
                      className="view-table-cell"
                    >
                      {row[col.key]}
                    </TableCell>
                  ))}

                  <TableCell
                    className="view-actions-cell"
                    align="right"
                  >

                    <IconButton onClick={() => onEdit?.(row)}>
                      <EditRoundedIcon className="view-icon-edit" />
                    </IconButton>

                    <IconButton onClick={() => handleDeleteClick(row)}>
                      <DeleteRoundedIcon className="view-icon-delete" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Confirm Delete</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{rowToDelete?.title || rowToDelete?.name || rowToDelete?.module_code}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}