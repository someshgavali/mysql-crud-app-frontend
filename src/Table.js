import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import axios from "axios";

export default function BasicTable({ open, setUser, setOpen }) {
  const [userData, setUserData] = useState();
  const [UIUpdate, setUIUpdate] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8000/users").then((res) => {
      console.log(res.data);
      setUserData(res.data);
    });
    // eslint-disable-next-line
  }, [open, UIUpdate]);

  const deleteDataFromDB = (id) => {
    axios.delete(`http://localhost:8000/users/${id}`).then(() => {});
    setUIUpdate(!UIUpdate);
  };

  const updateDataInDB = (data) => {
    setOpen(true);
    setUser(data);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Sr No</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Mobile No</TableCell>
            <TableCell align="center">Address</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData &&
            userData.map((row, i) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell align="center">{i + 1}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.number}</TableCell>
                <TableCell align="center">{row.address}</TableCell>
                <TableCell>
                  <Stack direction="row" gap={1}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => {
                        updateDataInDB(row);
                      }}>
                      Edit
                    </Button>{" "}
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => deleteDataFromDB(row.id)}>
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
