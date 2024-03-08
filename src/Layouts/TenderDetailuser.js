import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Table, Modal, Button } from 'react-bootstrap';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { ProgressBar } from 'react-bootstrap'; // import ProgressBar from react-bootstrap




// import './TenderDetailuser.css';
function TenderDetailuser() {

  const token = localStorage.getItem('token')
  // console.log(token, 'token');
  // navigate
  const [responseData, setResponseData] = useState([]);

  const navigate = useNavigate()
  const data = async () => {
    try {
      const res = await axios.post('http://localhost:8000/api/myaccount', {}, {
        headers: {
          Authorization: `${localStorage.getItem('token')}`
        }
      })
      setResponseData(res.data.data);
      console.log(res.data.data, 'usertenderres')
    } catch (error) {
      console.log(error);
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "login to access my account",
        showConfirmButton: false,
        timer: 1500
      })
      localStorage.clear();
      navigate('/');
    }
  }

  const [uploading, setUploading] = useState(false);


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
  useEffect(() => {
    data()
  }, [])

  // 
  const [showModal, setShowModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const [tenderId, setTenderId] = useState(null); // <-- add this line
  const handleButtonClick = (tenderId,) => {
    console.log(tenderId);
    setTenderId(tenderId); // <-- add this line
    // You now have the tenderId here. You can use it to make your API call.
    setShowModal(true);
    // console.log(tenderId);
    // ... rest of your code ...
  };

  const handleFileUpload = async () => {
    setUploading(true); 
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files', selectedFiles[i]);
      formData.append('tenderId', tenderId); // <-- add this line
    }

    try {
      const res = await axios.post('http://localhost:8000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${localStorage.getItem('token')}`
        }
      });
      console.log(res.data);
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };


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
      <div className="breadcrumb breadcrumb-style-one mb-0 ">
        <div className="container">
          <div className="col-lg-12 text-center">
            <h1 className="breadcrumb-title">Your Submitted Tenders</h1>
            <ul className="d-flex justify-content-center breadcrumb-items">
              {/* <li className="breadcrumb-item">
                <i className="bi bi-house-door" /> <a >Home</a>
              </li> */}
              <li className="breadcrumb-item ">Your Tenders</li>
            </ul>
          </div>
        </div>
      </div>

      {/* auction */}


      <div className="auction-wrapper pt-110">
        <div className="container d-flex justify-content-center align-items-center">
        <div className="table-responsive">
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
                <th>uploaded document</th>
                <th>Payment proof</th>
                <th>Allotment</th>
              </tr>
            </thead>
            <tbody>
              {responseData.map((item, index) => (
              
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name.title}</td>
                  <td>{item.name.State}</td>
                  <td>{limitText(item.name.property_history)}</td>
                  <td>{limitText(item.name.description)}</td>
                  <td>{item.name.Emd}</td>
                  <td>{item.name.tender_value}</td>
                  <td>{item.name.gross_area}</td>
                  {/* <td>
              <a href={item.paid ? item.doc : '#'} target="_blank" rel="noopener noreferrer" style={{ pointerEvents: item.paid ? 'auto' : 'none' }}>
                {item.paid ? 'Document' : <span className="verification">Verification in progress</span>}
              </a>
            </td> */}
                  <td>
                    <a href={item.paid ? item.name.doc : '#'} target="_blank" rel="noopener noreferrer" style={{ pointerEvents: item.paid ? 'auto' : 'none' }}

                    >
                      {item.paid ? 'Document' : <span className="verification">Verification in progress</span>}
                    </a>
                  </td>
                  <td>{item.name.ward}</td>
                  <td>{item.name.cts_number}</td>
                  <td>{item.name.startDate}</td>
                  <td>{item.name.endDate}</td>
                  <td>
                    {item && (item.paid ? (
                      <button style={{ backgroundColor: "#4CAF50", color: "white", padding: "14px 20px", margin: "8px 0", border: "none", cursor: "pointer", width: "100%" }}
                        onClick={() => handleButtonClick(item._id)}
                      >upload</button>

                    ) : (
                      'Verifying'
                    ))}
                  </td>
                  <td>
                    {item && item.fileUrls.map((url, urlIndex) => (
                      <a key={urlIndex} href={url} target="_blank" rel="noopener noreferrer">
                        Document {urlIndex + 1}
                      </a>
                    ))}
                  </td>
                  <td>
                    {item && item.file &&
                      <a href={item.file} target="_blank" rel="noopener noreferrer"

                      >
                        <button style={{ backgroundColor: "#4CAF50", color: "white", padding: "14px 20px", margin: "8px 0", border: "none", cursor: "pointer", width: "100%" }}
                        // onClick={handleButtonClick}

                        >View</button>
                      </a>
                    }
                  </td>
                  <td>
                    {item && item.alloted}
                  </td>
                </tr>

              ))}
              {/* <tr>
                     <button className="btn btn-primary" onClick={() => setShowModal(true)}>Upload Files</button>
              </tr> */}
            </tbody>
          </table>
        </div>
        </div>
      </div>
      {/*  */}
      <Footer />
      {/*  */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Files</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="file" multiple onChange={handleFileChange} />
          {uploading && <ProgressBar animated now={100} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFileUpload}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
      {/*  */}
    </>

  )
}

export default TenderDetailuser