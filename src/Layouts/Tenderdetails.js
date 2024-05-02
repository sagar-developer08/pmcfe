import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from 'axios';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
// import '../../public/assets'
import { Modal, Tab, Nav, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

function Tenderdetails() {
  // 
  const params = useParams()
  const [tenderDataUp, setTenderDataUp] = useState(null);
  // const userId = JSON.parse(localStorage.getItem('userId'));
  // console.log(userId, 'userid')
  const token2 = localStorage.getItem("token")
  console.log(token2, 'token')
  // useEffect(() => {
  const fetchData = async () => {
    try {
      if (token2) {
        const body = {
          name: params.id,
        }
        console.log(body, 'body')
        const response = await axios.post(`https://sgqfr6s6f8.execute-api.ap-south-1.amazonaws.com/production/api/getdetails/tender`, body, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });

        console.log(response.data.data, 'res')
        setTenderDataUp(response.data.data.paid);
        return
      }

    } catch (error) {
      console.error(error);
    }
  };
  // console.log(tenderDataUp, 'tenderdataup')


  // }, []);


  // 

  const [tender, setTender] = useState(null);
  const [tenderData, setTenderData] = useState(null);
  console.log(params.id, 'params')

  // userid
  const [userId, setUserId] = useState(null)

  const [accountHolderName, setAccountHolderName] = useState('The Worli Ambedkar Nagar CHS');
  const [accountNumber, setAccountNumber] = useState('0564000113295000');
  const [ifscCode, setIfscCode] = useState('PUNB0056400');
  const [bankName, setBankName] = useState('Punjab National Bank');
  const [accountType, setAccountType] = useState('Saving');
  const [branch, setBranch] = useState('Worli')

  const getData = async (id) => {

    const data = await axios.get(`https://sgqfr6s6f8.execute-api.ap-south-1.amazonaws.com/production/api/get/tender/${params.id}`)

    setTenderData(data.data.tender)
    console.log(data.data.tender.user, 'data')
    setUserId(data.data.tender.user)
    setTender(data.data.tender.title);
  }

  useEffect(() => {
    const fetchBankDetails = async () => {
      const response = await axios.post('https://sgqfr6s6f8.execute-api.ap-south-1.amazonaws.com/production/api/getbank', { id: userId });
      const bankDetails = response.data;
      if (bankDetails.data && bankDetails.data.length > 0) {
        const details = bankDetails.data[0];
      // Set bank details to states
      setAccountHolderName(details.account_holder_name);
      setAccountNumber(details.account_number);
      setIfscCode(details.bank_ifsc);
      setBankName(details.bank_name);
      setAccountType(details.account_type);
      setBranch(details.bank_branch);
      }
        
      // setBranch(bankDetails.branch);
    };

    if (userId) {
      fetchBankDetails();
    }
  }, [userId]);



  // console.log(tenderData, 'tender')

  // 
  const [showDetails, setShowDetails] = useState(false);
  const handleCloseDetails = () => setShowDetails(false);
  // 
  const [data, setData] = useState([]);

  const [id, setId] = useState(null);
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // login
  const handleLogin = async (event) => {
    event.preventDefault();

    const user = { email: loginEmail, password: loginPassword, role: 'developer' };

    try {
      // const history = useHistory();

      const response = await axios.post('https://sgqfr6s6f8.execute-api.ap-south-1.amazonaws.com/production/api/login', user);
      // console.log(response, 'res');
      if (response.status === 200) {
        console.log(response.data)
        localStorage.setItem('token', response.data.token); // Save the token in localStorage
        localStorage.setItem('userId', JSON.stringify(response.data)); // Save the user ID in localStorage
        localStorage.setItem('userId.role', response.data.user.role); // Save the user ID in localStorage
        window.location.reload();
        // console.log(user,'l')
        // if (response.data.user.role === 'admin') {
        //   navigate('/admin');
        //   return
        // } 
        // if (response.data.user.role === 'developer') {
        //   navigate('/tender-details');
        //   return
        // }
        Swal.fire({
          icon: "success",
          title: "Login success",
          showConfirmButton: false,
          timer: 1500
        });
        setShow(false);


        // Redirect to the tender details page
        // window.location.href = '/tender-details/' + response.data.tenderId;
      } else {
        // Handle login failure
        Swal.fire({
          icon: "error",
          title: "Login failed",
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  // 
  const handleDetails = async (item_id) => {
    console.log(item_id);
    setId(item_id);
    const userId = JSON.parse(localStorage.getItem('userId'));
    console.log(userId, 'userid')
    // try {
    //   const body = {
    //     name: req.body.name,
    //     usertender: req.body.usertender,
    //     file: req.file.location,
    //   };
    //   // const body {
    //   //   // name:"",
    //   //   // usertender:
    //   // }
    //     const response = await axios.post(`https://sgqfr6s6f8.execute-api.ap-south-1.amazonaws.com/production/api/`)
    // } catch (error) {

    // }
    // navigate(`/tender-details/${item_id}`);
    //   // Get the tender ID and user ID
    //   const tenderId = item._id;
    //   const userId = /* Your code to get the user ID from localStorage */;

    //   // Call the API
    //   try {
    //     const response = await axios.get(`https://sgqfr6s6f8.execute-api.ap-south-1.amazonaws.com/production/api/details?userId=${userId}&tenderId=${tenderId}`);
    //     console.log(response.data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // } else {
    //   // Your existing code to show the login/register modal
    // }
  }
  // regiter

  const handleRegister = async (event) => {
    event.preventDefault();

    const user = { name, email, password, role: "developer" };

    try {
      const response = await axios.post('https://sgqfr6s6f8.execute-api.ap-south-1.amazonaws.com/production/api/register', user);
      console.log(response, 'res');
      if (response.status === 200) {
        Swal.fire({
          // position: "top-end",
          icon: "success",
          title: "sucessfully registered",
          showConfirmButton: false,
          timer: 1500
        });
        setShow(false); // Close the modal
        setName(''); // Clear the name field
        setEmail(''); // Clear the email field
        setPassword('')
        return
      }

      if (response.status === 201) {
        Swal.fire({
          // position: "top-end",
          icon: "error",
          title: "already register",
          showConfirmButton: false,
          timer: 1500
        });
        return
      }

    } catch (error) {
      Swal.fire({
        // position: "top-end",
        icon: "error",
        title: "unable to register user",
        showConfirmButton: false,
        timer: 1500
      });
      console.error(error);
    }
  };
  // second modal
  const [file, setFile] = useState(null);
  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  // submit second modal
  const handleSubmit = async (event) => {
    try {
      // console.log(event.target);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', id);
      formData.append('usertender', JSON.parse(localStorage.getItem('userId')).user._id);

      for (let pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }
      try {
        const response = await axios.post('https://sgqfr6s6f8.execute-api.ap-south-1.amazonaws.com/production/api/tenderapply', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(response, 'res')
        if (response.status === 200) {

          Swal.fire({
            // position: "top-end",
            icon: "success",
            title: "sucessfully applied ,wait for admin approval",
            showConfirmButton: false,
            timer: 1500
          });
          window.location.reload();
          setShowDetails(false);
          return
        }
        if (response.data.message == 'already applied') {
          Swal.fire({
            // position: "top-end",
            icon: "success",
            title: "Already Applied wait for aproval",
            showConfirmButton: false,
            timer: 1500
          });

          setShowDetails(false);
        }

        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // api call to see the details if paid or not
  const token = localStorage.getItem('token');
  // const userId = 
  // console.log(userId, 'userid')
  // const token = localStorage.getItem('token');

  // 

  // const token = localStorage.getItem('token');
  const getDatatender = async (id) => {
    const token = localStorage.getItem('token');

    if (token) {
      const body = {
        usertender: JSON.parse(localStorage.getItem('userId')).user._id,
        // add other data you want to send in the body
      };

      axios.post(`https://sgqfr6s6f8.execute-api.ap-south-1.amazonaws.com/production/api/tender/user`, body, {
        headers: {
          'Authorization': `${token}`
        }
      })
        .then(response => {
          console.log(response.data);
          setTenderData(response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }




  // 
  useEffect(() => {
    getData()
    getDatatender()
    fetchData();
  }, [])
  // 
  return (



    <>
      {/* <div className="preloader">
        <div className="loader">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div> */}
      <div className="mobile-search">
        <div className="container">
          <div className="row">
            <div className="col-11">
              <label>What are you lookking for?</label>
              <input type="text" placeholder="Search Products, Category, Brand" />
            </div>
            <div className="col-1 d-flex justify-content-end align-items-center">
              <div className="search-cross-btn">
                <i className="bi bi-x" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Header />
      <div className="breadcrumb breadcrumb-style-one mb-0 " style={{ paddingBottom: '50px' }}>
        {/* <div className="container"> */}
        <div className="col-lg-12 text-center">
          {/* <h3 className="breadcrumb-title">{tender && tender}</h3>
           */}
          <p className="h1" style={{ fontWeight: 900, color: 'white' }}>{tender && tender}</p>
          {/* <h3 className="breadcrumb-title fs-1 fs-md-2 fs-lg-3">{tender && tender}</h3> */}
          {/* <br /><br /> */}
          {/* <ul className="d-flex justify-content-center breadcrumb-items"> */}
          {/* <li className="breadcrumb-item"><i className="bi bi-house-door" /> <a >Home</a></li> */}
          <li className="breadcrumb-item active"></li>
          {/* </ul> */}
        </div>
        {/* </div> */}
      </div>
      <section className="tender-details-section pt-110">
        <div className="container">
          <div className="row gy-5">
            <div className="col-lg-6">
              <div className="widget-right-area">

                <div className="single-widget">
                  <h5 className="wdget-title">Procurement Summary</h5>
                  <ul className="widget-list">
                    <li><span>City,State :</span><span>{tenderData && tenderData.State}</span></li>
                    {/* <li><span>Title :</span><span style={{fontSize:"12px",fontWeight:'bold'}}>{tenderData && tenderData.title}</span></li> */}
                    <li><span>DeadLine :</span><span>{tender && tenderData.endDate}</span></li>
                  </ul>

                </div>
                {/*  */}
                <div className="single-widget">
                  <h5 className="wdget-title">Other Information </h5>
                  <ul className="widget-list">
                    {/* <li><span>City,State :</span><span>{tenderData && tenderData.State}</span></li> */}
                    {/* <li><span>Title :</span><span style={{fontSize:"12px",fontWeight:'bold'}}>{tenderData && tenderData.title}</span></li> */}
                    {/* <li><span>DeadLine :</span><span>{tender && tenderData.endDate}</span></li> */}
                    <li><span>Document Ref. No :</span><span>View details</span></li>
                    <li><span>Tender Fee :</span><span>Non refundable {tenderData && tenderData.tender_value} ₹
                    </span></li>

                    {
                      localStorage.getItem('token') && localStorage.getItem('userId.role') === 'developer' ? (
                        <>
                          <li><span>EMD Value :</span><span>{tenderData && tenderData.Emd} ₹</span></li>
                          <li><span>Gross Area :</span><span>{tenderData && tenderData.gross_area} Sq.Mt</span></li>
                          <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={
                              <Tooltip>
                                Pay to see details
                              </Tooltip>
                            }
                          >
                            <li><span>Doc :</span><span>View details</span></li>
                          </OverlayTrigger>
                        </>


                      ) : (
                        <li><span>Other Information :</span><span> viewable on login</span></li>
                      )
                    }


                  </ul>
                  {/* <div style={{ display: 'flex', marginTop: '10px' }}>
                    {localStorage.getItem('token') && localStorage.getItem('userId.role') === 'developer' ? (
                      <button style={{ backgroundColor: 'green', color: 'white', borderRadius: '5px' }} onClick={() => { handleDetails(tenderData && tenderData._id); setShowDetails(true) }}>
                        {tenderDataUp === false ? 'Verifying in progress' : tenderDataUp === true ? 'Verified check details in account section' : 'Submit Tender Fee'}
                      </button>

                    ) : (
                      <button style={{ backgroundColor: 'red', color: 'white', borderRadius: '5px' }} onClick={handleShow}>Login to see details</button>
                    )}
                  </div> */}
                  {/* <div style={{ display: 'flex', marginTop: '10px' }}>
                    {localStorage.getItem('token') && localStorage.getItem('userId.role') === 'developer' ? (
                      <button style={{ backgroundColor: 'green', color: 'white', borderRadius: '5px' }} onClick={() => { handleDetails(tenderData && tenderData._id); setShowDetails(true) }}>
                        {tenderDataUp === false ? 'Payment Verification Pending' : tenderDataUp === true ? 'Verified, go to My Account to download' : 'Submit Tender Fee'}
                      </button>
                    ) : (
                      <button style={{ backgroundColor: 'red', color: 'white', borderRadius: '5px' }} onClick={handleShow}>Login to see details</button>
                    )}
                  </div> */}
                  <div style={{ display: 'flex', marginTop: '10px' }}>
                    {localStorage.getItem('token') && localStorage.getItem('userId.role') === 'developer' ? (
                      <button
                        style={{ backgroundColor: 'green', color: 'white', borderRadius: '5px' }}
                        onClick={() => {
                          if (tenderDataUp === true) {
                            window.location.href = '#/user/tender';
                          } else {
                            handleDetails(tenderData && tenderData._id);
                            setShowDetails(true);
                          }
                        }}
                      >
                        {tenderDataUp === false ? 'Payment Verification Pending' : tenderDataUp === true ? 'Verified, go to My Account to download' : 'Submit Tender Fee'}
                      </button>
                    ) : (
                      <button style={{ backgroundColor: 'red', color: 'white', borderRadius: '5px' }} onClick={handleShow}>Login to see details</button>
                    )}
                  </div>
                </div>

                {/*  */}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="item-describe-area">
                <h4>Description</h4><br />
                <p className="paragraph">{tenderData && tenderData.description}</p>
                <br />
                <div className="tab-content" id="pills-tabContent">
                  <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                    <h4>Property History</h4><br />

                    <div className="paragraph">
                      {tenderData && tenderData.property_history}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*  */}
      <Footer />


      <Modal show={show} onHide={() => setIsOpen(false)}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>Login to see details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tab.Container defaultActiveKey="login">
            <Nav variant="pills">
              <Nav.Item>
                <Nav.Link eventKey="login">Login</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="register">Register</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </Form>
              </Tab.Pane>
              <Tab.Pane eventKey="register">
                <Form onSubmit={handleRegister}>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />                  </Form.Group>
                  <Button variant="primary" type="submit" >
                    Register
                  </Button>
                </Form>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Modal.Body>
      </Modal>

      {/* payment modal */}


      <Modal show={showDetails} onHide={handleCloseDetails} dialogClassName="modal-90w" aria-labelledby="example-custom-modal-styling-title">
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title" style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>
            Account Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ margin: '10px 0', fontWeight: 'bold' }}> Account Holder Name: {accountHolderName}</p>
            <p style={{ margin: '10px 0', fontWeight: 'bold' }}>Account Number: {accountNumber}</p>
            <p style={{ margin: '10px 0', fontWeight: 'bold' }}>IFSC Code: {ifscCode}</p>
            <p style={{ margin: '10px 0', fontWeight: 'bold' }}>Bank Name: {bankName}</p>
            <p style={{ margin: '10px 0', fontWeight: 'bold' }}>Account Type: {accountType}</p>
            <p style={{ margin: '10px 0', fontWeight: 'bold' }}>Branch: {branch}</p>
            <hr />
            <h4>Submit Transaction Details</h4>
            <input type="file" onChange={handleFileUpload} style={{ margin: '20px 0' }} />
            <button onClick={handleSubmit} style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold' }}>Submit</button>
          </div>
        </Modal.Body>
      </Modal>

    </>
  )
}

export default Tenderdetails