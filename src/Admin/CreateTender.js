import React, { useEffect, useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

import { TextareaAutosize } from '@mui/base/TextareaAutosize';


import { Grid } from '@material-ui/core';
import axios from 'axios';
import Swal from 'sweetalert2'
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";

import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems, secondaryListItems } from "./listItems";
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableHead, TableRow } from '@material-ui/core';
// import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';


// import axios from "axios";
// import Swal from "sweetalert2";
// import Chart from "./Chart";
// import Deposits from "./Deposits";
// import Orders from "./Orders";
import { useDropzone } from 'react-dropzone';
import CreateTender from "./CreateTender";
import Adminheader from "./Adminheader";
import Graph from "./Graph";
function Copyright() {
  // classes created because it is needed in the footer.
  const classes = useStyles();
  return (
    <Container className={classes.footer}>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Container>
  );
}
const options = ['Update', 'Delete'];

// Define ITEM_HEIGHT
const ITEM_HEIGHT = 48;

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    // content which is class of main needs to be flex and column direction
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  },
  // added the footer class
  footer: {
    padding: theme.spacing(2),
    marginTop: "auto",
    backgroundColor: "white",
    // just this item, push to bottom
    alignSelf: "flex-end"
  }
}));

function TenderForm() {

  const classes = useStyles();

  const [form, setForm] = useState({
    name: '',
    title: '',
    Emd: '',
    State: '',
    description: '',
    scheme: '',
    tender_value: '',
    gross_area: '',
    doc: '',
    ward: '',
    cts_number: '',
    startDate: '',
    endDate: '',
    user: ''
  });

  //   const handleChange = (event) => {
  //     setForm({
  //       ...form,
  //       [event.target.name]: event.target.value
  //     });
  //   };

  const handleSubmit = (event) => {
    event.preventDefault();

    const dataToPost = {
      ...form,

    };
    console.log(dataToPost, 'dataToPost');
    axios.post('https://api.vba.net.in/api/create', dataToPost, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`
      }

    })
      .then(response => {
        console.log(response.data);
        // handle success
        if (response.status === 200) {
          alert('Tender has been created successfully!')
          console.log(response.data);
          window.location.reload();
          //   Swal("Success!", "Tender has been created successfully!", "success");
        }
      })
      .catch(error => {
        alert('There was an error creating the tender.')
        console.error('There was an error!', error);
        // handle error
        // Swal("Error!", "There was an error creating the tender.", "error");
      });
  };
  // 

  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const tenderData = async () => {
    const res = await axios.get('https://api.vba.net.in/api/gettender');
    console.log(res.data.tenders, 'res');
    setData(res.data.tenders);
    setCount(res.data.count);
  }
  // 
  const limitText = (text, limit = 10) => {
    const words = text.split(' ');
    if (words.length > limit) {
      return (
        <>
          {words.slice(0, limit).join(' ')}{' '}
          <a href="#" onClick={(e) => {
            e.preventDefault();
            Swal.fire({
              title: 'Details',
              text: text,
              confirmButtonText: 'Close'
            });
          }}>Show More</a>
        </>
      );
    }
    return text;
  };

  // 

  const [folders, setFolders] = useState([]);
  //   const [form, setForm] = useState({ doc: '' });

  useEffect(() => {
    tenderData()
    axios.get('https://api.vba.net.in/api/get/documents', {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        // console.log(response.data.message,'257')
        const files = response.data.message.map(item => item.file);
        setFolders(files);
        console.log(files, 'files')
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);
  // 
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://api.vba.net.in/api/admin/users', {
        headers: {
          'Authorization': `${token}`
        }

      });
      const societyUsers = response.data.user.filter(user => user.role === 'society');
      // console.log(societyUsers, 'society users');
      setUsers(societyUsers);
    };
    fetchUsers();
  }, []);
  // 
  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {

  }, [])

  const [currentTender, setCurrentTender] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [currentItem, setCurrentItem] = useState(null);
  const handleClick = (item) => (event) => {
    setAnchorEl(event.currentTarget);
    setCurrentItem(item);
  };


  const handleClose = (option) => {
    // console.log(option, item, '287')
    setAnchorEl(null);
    if (option === 'Update') {
      // console.log(item, 'item')
      setCurrentTender(currentItem);
      setModalOpen(true);
    } else if (option === 'Delete') {
      // Handle delete logic here
    }
  };

  // 
  const handleTenderChange = (event) => {
    setCurrentTender({
      ...currentTender,
      [event.target.name]: event.target.value,
    });
  };
  // 
  const handleUpdate = async (event) => {
    console.log(currentTender._id, 'currentTender.id')
    event.preventDefault();
    try {
      const response = await fetch(`https://api.vba.net.in/api/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          id: currentTender._id,
          ...currentTender
        }),
      });
      if (!response.ok) throw new Error('Response not ok');
      const updatedTender = await response.json();
      // Update the tender in your state here
      setModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Adminheader />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}></Grid>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={4}>
                <TextField label="Title" name="title" value={form.title} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={4}>
                <TextField label="Emd" name="Emd" value={form.Emd} onChange={handleChange} fullWidth />
              </Grid>

              <Grid item xs={8}>
                <TextField label="description" name="description" value={form.description} onChange={handleChange} fullWidth
                  multiline
                  rows={4} />
              </Grid>
              <Grid item xs={8}>
                <TextField label="property_history" name="property_history" value={form.property_history} onChange={handleChange} fullWidth
                  multiline
                  rows={4} />
              </Grid>
              <Grid item xs={4}>
                <TextField label="State" name="State" value={form.State} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={4}>

                <TextField label="scheme" name="scheme" value={form.scheme} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={4}>
                <TextField label="tender_value" name="tender_value" value={form.tender_value} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={4}>
                <TextField label="gross_area" name="gross_area" value={form.gross_area} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={4}>
                <TextField label="ward" name="ward" value={form.ward} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={4}>
                <TextField label="CTS Number" name="cts_number" value={form.cts_number} onChange={handleChange} fullWidth />
              </Grid>
              {/* doc */}
              <Grid item xs={4}>
                <TextField
                  label="doc"
                  name="doc"
                  value={form.doc}
                  onChange={handleChange}
                  select
                  fullWidth
                >

                  {folders && folders.map((folder, index) => (
                    <MenuItem key={index} value={folder}>
                      {folder}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              {/*  */}
              <Grid item xs={4}>
                <TextField label="Start Date" name="startDate" type="date" value={form.startDate} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth />
              </Grid>
              <Grid item xs={4}>
                <TextField label="End Date" name="endDate" type="date" value={form.endDate} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth />
              </Grid>
            </Grid>
            {/*  */}
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id="user-select-label">Select User</InputLabel>
                <Select
                  labelId="user-select-label"
                  value={form.user}
                  onChange={handleChange}
                  name="user"
                >
                  {users.map((user) => (
                    <MenuItem key={user._id} value={user._id}>{user.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/*  */}
            <Grid container justify="center" style={{ marginTop: '20px' }}>
              <Button type="submit" variant="contained" color="primary">Submit</Button>
            </Grid>
          </form>
          <Grid />
          <br />
          <Paper className={classes.paper}>
            <Typography style={{ textAlign: 'center' }}>
              Tenders List
            </Typography>
            <br />
            <TextField
              label="Search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <table className="table align-middle mb-0 bg-white">
              <thead className="bg-light">
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>State</th>
                  <th>Property History</th>
                  <th>Description</th>
                  <th>EMD</th>
                  <th>Tender Value</th>
                  <th>Gross Area</th>
                  <th>Document</th>
                  <th>Ward</th>
                  <th>CTS Number</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Action</th>

                </tr>
              </thead>
              <tbody>
                {data && data.filter((item) => item.title.includes(searchTerm))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (

                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.title}</td>
                      <td>{item.State}</td>
                      <td>{limitText(item.property_history)}</td>
                      <td>{limitText(item.description)}</td>
                      <td>{item.Emd}</td>
                      <td>{item.tender_value}</td>
                      <td>{item.gross_area}</td>
                      <td>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => window.open(item.doc, "_blank")}
                        >
                          View
                        </Button>
                      </td>
                      <td>{item.ward}</td>
                      <td>{item.cts_number}</td>
                      <td>{item.startDate}</td>
                      <td>{item.endDate}</td>
                      <td>
                        <IconButton
                          aria-label="more"
                          aria-controls="long-menu"
                          aria-haspopup="true"
                          onClick={handleClick(item)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          id="long-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={open}
                          onClose={handleClose}
                          PaperProps={{
                            style: {
                              maxHeight: ITEM_HEIGHT * 4.5,
                              width: '20ch',
                            },
                          }}
                        >
                          {options.map((option) => (
                            <MenuItem key={option} onClick={() => handleClose(option, item)}>
                              {option}
                            </MenuItem>
                          ))}
                        </Menu>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <TablePagination
              component="div"
              count={data ? data.length : 0}
              page={page}
              onChangePage={(event, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onChangeRowsPerPage={(event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0);
              }}
            />
          </Paper>
        </Container>

      </main>

      {/*  */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>Update Tender</DialogTitle>
        <DialogContent>
          {currentTender && (
            <form id="updateForm" onSubmit={handleUpdate}>
              <TextField label="Name" name="name" value={currentTender.name} onChange={handleTenderChange} fullWidth />
              <TextField label="Title" name="title" value={currentTender.title} onChange={handleTenderChange} fullWidth
                multiline />
              <TextField label="Emd" name="Emd" value={currentTender.Emd} onChange={handleTenderChange} fullWidth />
              <TextField label="State" name="State" value={currentTender.State} onChange={handleTenderChange} fullWidth />
              <TextField label="description" name="description" value={currentTender.description} onChange={handleTenderChange} fullWidth
                multiline />
              <TextField label="property_history" name="property_history" value={currentTender.property_history} onChange={handleTenderChange} fullWidth
                multiline />
              <TextField label="scheme" name="scheme" value={currentTender.scheme} onChange={handleTenderChange} fullWidth />
              <TextField label="tender_value" name="tender_value" value={currentTender.tender_value} onChange={handleTenderChange} fullWidth />
              <TextField label="gross_area" name="gross_area" value={currentTender.gross_area} onChange={handleTenderChange} fullWidth />
              <TextField label="ward" name="ward" value={currentTender.ward} onChange={handleTenderChange} fullWidth />
              <TextField label="CTS Number" name="cts_number" value={currentTender.cts_number} onChange={handleTenderChange} fullWidth />
              <TextField label="Start Date" name="startDate" type="date" value={currentTender.startDate} onChange={handleTenderChange} InputLabelProps={{ shrink: true }} fullWidth />
              <TextField label="End Date" name="endDate" type="date" value={currentTender.endDate} onChange={handleTenderChange} InputLabelProps={{ shrink: true }} fullWidth />
            </form>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button type="submit" form="updateForm" variant="contained" color="primary">Update</Button>
        </DialogActions>
      </Dialog>
      {/*  */}

      {/*  */}
    </div>

  );
}

export default TenderForm;