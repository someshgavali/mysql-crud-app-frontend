import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

export default function FormDialog({ open, setOpen, user, setUser }) {
  useEffect(
    () => {
      if (user.id) setUser(user);
    },
    // eslint-disable-next-line
    []
  );

  const addUserToDB = () => {
    if (user.id) {
      axios.put(`http://localhost:8000/users/${user.id}`, user).then(() => {});
      setUser({
        name: "",
        email: "",
        number: Number(""),
        address: "",
      });
    } else {
      axios
        .post("http://localhost:8000/users", user)
        .then((res) => {
          setUser({
            name: "",
            email: "",
            number: Number(""),
            address: "",
          });
          console.log(res.data.message);
        })
        .catch((err) => {
          console.log("Error couldn't create TODO");
          console.log(err.message);
        });
    }

    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setUser({
      name: "",
      email: "",
      number: Number(""),
      address: "",
    });
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle> {user.id ? "Update User" : "Add User"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <TextField
            margin="dense"
            id="mobile"
            label="Mobile Number"
            type="tel"
            fullWidth
            variant="standard"
            value={user.number}
            onChange={(e) => setUser({ ...user, number: e.target.value })}
          />
          <TextField
            margin="dense"
            id="address"
            label="Address"
            type="textarea"
            fullWidth
            multiline
            rows={2}
            variant="standard"
            value={user.address}
            onChange={(e) => setUser({ ...user, address: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => addUserToDB()}>
            {user.id ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
