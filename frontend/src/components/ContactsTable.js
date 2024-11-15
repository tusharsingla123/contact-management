import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TableSortLabel,
  TablePagination,
  Typography,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ContactsTable = ({ contacts, fetchContacts }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("firstName");

  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit-contact/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/contacts/${id}`);
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedContacts = contacts.slice().sort((a, b) => {
    const orderModifier = order === "asc" ? 1 : -1;

    if (orderBy === "firstName") {
      return a.firstName[0].localeCompare(b.firstName[0]) * orderModifier;
    }
    return a[orderBy].localeCompare(b[orderBy]) * orderModifier;
  });

  const paginatedContacts = sortedContacts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const totalPages = Math.ceil(contacts.length / rowsPerPage);
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sortDirection={orderBy === "firstName" ? order : false}>
              <TableSortLabel
                active={orderBy === "firstName"}
                direction={orderBy === "firstName" ? order : "asc"}
                onClick={() => handleRequestSort("firstName")}
              >
                First Name
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === "lastName" ? order : false}>
              <TableSortLabel
                active={orderBy === "lastName"}
                direction={orderBy === "lastName" ? order : "asc"}
                onClick={() => handleRequestSort("lastName")}
              >
                Last Name
              </TableSortLabel>
            </TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Job Title</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedContacts.map((contact) => (
            <TableRow key={contact._id}>
              <TableCell>{contact.firstName}</TableCell>
              <TableCell>{contact.lastName}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phoneNumber}</TableCell>
              <TableCell>{contact.company}</TableCell>
              <TableCell>{contact.jobTitle}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(contact._id)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(contact._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box display="flex" flexDirection="column" alignItems="center">
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={contacts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Typography variant="body2" align="center" marginTop={2}>
          Page {page + 1} of {totalPages}
        </Typography>
      </Box>
    </TableContainer>
  );
};

export default ContactsTable;
