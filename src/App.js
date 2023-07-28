import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Stack, Button } from "@mui/material";
import { useState } from "react";
import FormDialog from "./Form";
import BasicTable from "./Table";

function App() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    number: Number(""),
    address: "",
  });

  return (
    <Box p={3} display="flex" flexDirection="column" gap={3}>
      <Typography variant="h3" align="center">
        Table
      </Typography>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5" align="center">
          User Data
        </Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add User
        </Button>
      </Stack>
      <BasicTable open={open} setUser={setUser} setOpen={setOpen} />
      <FormDialog open={open} setOpen={setOpen} user={user} setUser={setUser} />
    </Box>
  );
}

export default App;
