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
  onView,
  onEdit,
  onDelete,
}) {
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
                    key={col}
                    className="view-table-head-cell"
                  >
                    {col}
                  </TableCell>
                ))}

                <TableCell
                  className="view-table-head-cell"
                  align="right"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={row.id} hover>
                  <TableCell className="view-table-cell">
                    {index + 1}
                  </TableCell>

                  {Object.values(row)
                    .slice(1)
                    .map((value, i) => (
                      <TableCell
                        key={i}
                        className="view-table-cell"
                      >
                        {value}
                      </TableCell>
                    ))}

                  <TableCell className="view-actions-cell">
                    <IconButton onClick={() => onView?.(row)}>
                      <VisibilityRoundedIcon className="view-icon-view" />
                    </IconButton>

                    <IconButton onClick={() => onEdit?.(row)}>
                      <EditRoundedIcon className="view-icon-edit" />
                    </IconButton>

                    <IconButton onClick={() => onDelete?.(row)}>
                      <DeleteRoundedIcon className="view-icon-delete" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}