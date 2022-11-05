import React, { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function Home() {
  let navigate = useNavigate();
  const [content, setContent] = React.useState('');
  const [snackBar, setSnackBar] = React.useState(false);

  const handleLogout = () => {
    window.api.logout().then(() => {
      navigate('/');
    });
  };
  const handleUpdate = () => {
    window.api.updateFile({content: content}).then((e: any) => {
      setSnackBar(true);
    })
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setSnackBar(false);
  };

  useEffect(() => {
    window.api.readFile().then((e: any) => {
      setContent(e);
    });
  }, []);

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Grid 
            container
            justifyContent="flex-end"
            onClick={handleLogout}
          >
            <Button variant="text">Logout</Button>
          </Grid>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Desktop/readme.json
          </Typography>
          <React.Fragment>
          <Grid item xs={12}>
            <TextField
              id="content"
              name="content"
              label="Content"
              fullWidth
              variant="standard"
              multiline
              minRows={4}
              onChange={handleChange}
              value={content}
            />
          </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                onClick={handleUpdate}
                sx={{ mt: 3, ml: 1 }}
              >
                Update
              </Button>
              <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                open={snackBar}
                autoHideDuration={3000}
                onClose={handleClose}
                message="Successfully updated!"
                action={action}
              />
            </Box>
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}