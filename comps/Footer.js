import React, { useContext, useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import Cookies from 'js-cookie';

import axios from "axios";

// import { toast } from 'react-toastify';
import * as CONSTANTS from "../constants/constants";

const headers = {
  'Content-Type': 'multipart/form-data',
  'Authorization': CONSTANTS.API_TOKEN
}

export default function Footer({ props }) {

    const { queryString } = props;

    const router = useRouter();
    const { query } = router;
    const { pathname } = router;

    const isLoginPage = ['/login','/sign-up','/forgot-password','/reset-password','/student-reset-password','/student-otp-verification','/student-forgot-password'].includes(router.pathname);

    const [courses, setCourses] = useState();
    const [clientIP, setClientIP] = useState('');
    const [formSending, setFormSending] = useState(false);

    const [pageUrl, setPageUrl] = useState('');

    const [setting, setSetting] = useState();
    const [branchs, setBranchs] = useState();

    const getGeneralData = async () => {
      const res = await axios.get(`${CONSTANTS.API_URL}home/generalData`, {
          headers: headers,
          withCredentials: true,
        }).catch((err) => console.log(err));
        const data = await res.data;
        if(data.setting) {
          setSetting(data.setting);
        }
        if(data.branchs) {
          setBranchs(data.branchs);
        }
    };

    const getCoursespageData = async () => {
      const res = await axios.get(`${CONSTANTS.API_URL}home/coursespage_data`, {
          headers: headers,
          withCredentials: true,
        }).catch((err) => console.log(err));
        const data = await res.data;
        if(data.courses) {
          setCourses(data.courses);
        }
    };

    useEffect(() => {
      getCoursespageData();
      getGeneralData();
      setPageUrl(window.location.href);

      fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => setClientIP(data.ip))
      .catch(error => console.log(error));

      // Ensure jQuery code runs after the component has mounted
      $(document).ready(function() {

        $('#footer-form').validate({ // Initialize jQuery Validate on #my-form
          rules: {
            city: {
              noSpaces: true
            }
          }
        });

      });

    }, []);

    // subscribe
    const [subscribeInputs, setSubscribeInputs] = useState({
      email: "",
    });

    const handleSubscribeInputChange = (e) => {
      setSubscribeInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };

    const submitSubscriber = async () => {

      const formData = new FormData();
      formData.append('email', subscribeInputs.email);

      const res = await axios
        .post(`${CONSTANTS.API_URL}home/submit_subscriber`, formData, {
            headers: headers,
            withCredentials: true,
          })
        .catch((err) => console.log(err));
      const data = await res.data;
      return data;
    };

    const handleSubscribeSubmit = (e) => {
      e.preventDefault();

      submitSubscriber()
        .then((data) => {
          if(!data.error) {
            // toast.success(data.message);
            setSubscribeInputs({
              email: "",
            });
          } else {
            // toast.error(data.message);
          }
        })

    };

    // callback start
    const [callbackInputs, setCallbackInputs] = useState({
      name: "",
      phone: "",
      email: "",
      city: "",
      course_id: "",
    });

    const handleCallbackInputChange = (e) => {
      setCallbackInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };

    const submitCallback = async () => {
      // const formData = new FormData();
      // formData.append("name", callbackInputs.name);
      // formData.append("phone", callbackInputs.phone);
      // formData.append("email", callbackInputs.email);
      // formData.append("course_id", callbackInputs.course_id);

      // formData.append("url", CONSTANTS.SITE_URL + router.pathname);
      // formData.append("clientIP", clientIP);

      // // get url paremeters
      // formData.append("utm_source", query.utm_source ? query.utm_source : "");
      // formData.append("utm_medium", query.utm_medium ? query.utm_medium : "");
      // formData.append(
      //   "utm_campaign",
      //   query.utm_campaign ? query.utm_campaign : ""
      // );
      // formData.append("utm_content", query.utm_content ? query.utm_content : "");
      // formData.append("creative", query.creative ? query.creative : "");
      // formData.append("adgroupid", query.adgroupid ? query.adgroupid : "");
      // formData.append("keyword", query.keyword ? query.keyword : "");
      // formData.append("placement", query.placement ? query.placement : "");
      // formData.append("device", query.device ? query.device : "");

      const QueryData = JSON.parse(sessionStorage.getItem("QueryData")) || {};

      const formData = {
        course_id: callbackInputs.course_id,
        name: callbackInputs.name,
        phone: callbackInputs.phone,
        email: callbackInputs.email,
        url: pageUrl,
        clientIP: clientIP,
        ...QueryData,
      };

      const res = await axios
        .post(`${CONSTANTS.API_URL}home/submit_callback`, formData, {
          headers: headers,
          withCredentials: true,
        })
        .catch((err) => console.log(err));
      const data = await res.data;
      return data;
    };

    const handleCallbackSubmit = (e) => {
      e.preventDefault();

      if($('#footer-form').valid()) {
        setFormSending(true);

        submitCallback()
          .then((data) => {
            if(!data.error) {
              // toast.success(data.message);

              window.openSuccessMessageModal();
              setCallbackInputs({
                name: "",
                phone: "",
                email: "",
                city: "",
                course_id: "",
              });

              setFormSending(false);

            } else {
              // toast.error(data.message);
            }
          })
      }

    };

    // callback end


  return (
    <div>
        {isLoginPage ? null : (
            <footer className="footer">
                <div className="containerFull">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="footerColumn footerLogo">
                                <Link href={'/'+queryString}><a>
                                    <picture>
                                        <source srcSet="/assets/images/logo.png" type="image/webp" />
                                        <img src="/assets/images/logo.png" alt="Indian Institute of Commerce | Lakshya" />
                                    </picture>
                                </a></Link>
                                <ul className="footerAddress">
                                    <li className="address">
                                      {branchs && branchs.map((location_item, index) => {
                                        return <span key={index}> {index > 0 ? '|' : ''} {location_item.name} </span>
                                      })}
                                    </li>
                                    <li className="address">{setting ? setting[0].address : ''}</li>
                                    <li className="phone">
                                        <div className="d-flex justify-content-start">
                                          <Link href={`tel: ${setting ? setting[0].phone : ''}`}>
                                            <a>{setting ? setting[0].phone : ''}</a>
                                          </Link> <img className="flagImg" src="/assets/images/flag-india.png" />
                                        </div>
                                        <div className="d-flex justify-content-start">
                                          <Link href={`tel: ${setting ? setting[0].phone_2 : ''}`}>
                                            <a>{setting ? setting[0].phone_2 : ''}</a>
                                          </Link> <img className="flagImg" src="/assets/images/flag-uae.png" />
                                        </div>
                                        <p className="mt-1">{setting ? setting[0].timings : ''}</p>
                                    </li>
                                    <li className="email">
                                        <Link href={`mailto: ${setting ? setting[0].email : ''}`}>
                                          <a>{setting ? setting[0].email : ''}</a>
                                        </Link>
                                        <p className="mt-1">Send us your query anytime!</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="footerColumn">
                                <div className="row">
                                    <div className="col-lg-6 col-6">
                                        <h4 className="title fontWeight600">Company</h4>
                                        <ul className="footerLink">
                                            <li><Link href={'/'+queryString}>Home</Link></li>
                                            <li><Link href={'/about-us'+queryString}>About Us</Link></li>
                                            <li><Link href={'/contact-us'+queryString}>Contact Us</Link></li>
                                            <li><Link href={'/hiring-partners'+queryString}>Hiring Partners</Link></li>
                                            <li><Link href={'/training-programs'+queryString}>Training</Link></li>
                                            <li><Link href={'/inside-lakshya-events'+queryString}>Inside Lakshya</Link></li>
                                            <li><Link href={'/results'+queryString}>Results</Link></li>
                                        </ul>
                                    </div>
                                    <div className="col-lg-4 col-6">
                                        <h4 className="title fontWeight600">Quick Links</h4>
                                        <ul className="footerLink">
                                            {courses && courses.map((course, index) => {
                                              return <li key={index}><Link href={'/course/'+course.slug+queryString}>
                                                <a>{course.name}</a>
                                              </Link></li>
                                            })}
                                            <li><Link href={'/'+queryString}>
                                              <a>Result Portal</a>
                                            </Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="footerColumn">

                                <div style={{display: 'none'}} className="footerForm">
                                  <form onSubmit={handleSubscribeSubmit} method="post" action="#">
                                      <input type="email" name="email" onChange={handleSubscribeInputChange} value={subscribeInputs.email} placeholder="Enter your email" required/>
                                      <button type="submit" name="submit" className="btnFooter">Subscribe</button>
                                  </form>
                                </div>

                                <h4 className="title">Social link</h4>
                                <ul className="socialLinks">
                                    <li><Link href={setting ? setting[0].twitter : ''}>
                                      <a target="_blank"><i className="fab fa-twitter"></i></a>
                                    </Link></li>
                                    <li><Link href={setting ? setting[0].youtube : ''}>
                                      <a target="_blank"><i className="fab fa-youtube"></i></a>
                                    </Link></li>
                                    <li><Link href={setting ? setting[0].facebook : ''}>
                                      <a target="_blank"><i className="fab fa-facebook-square"></i></a>
                                    </Link></li>
                                    <li><Link href={setting ? setting[0].instagram : ''}>
                                      <a target="_blank"><i className="fab fa-instagram"></i></a>
                                    </Link></li>
                                </ul>

                                <div className="storeIcons">
                                    <Link href={setting ? setting[0].app_store : ''}>
                                      <a target="_blank">
                                        <picture>
                                            <source srcSet="/assets/images/icons/appstore.png" type="image/webp"/>
                                            <img src="/assets/images/icons/appstore.png" alt="App Store"/>
                                        </picture>
                                      </a>
                                    </Link>
                                    <Link href={setting ? setting[0].google_play : ''}>
                                      <a target="_blank">
                                        <picture>
                                            <source srcSet="/assets/images/icons/googleplay.png" type="image/webp"/>
                                            <img src="/assets/images/icons/googleplay.png" alt="Google Store"/>
                                        </picture>
                                      </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="copyRight">
                        <p>Copyright &copy; 2024 All rights reserved with Learnfluence Education Private Limited</p>
                    </div>
                </div>
                <div className="footerBottomFrom">
                    <div className="containerFull">
                        <div className="row justify-content-center">
                            <div className="col-lg-11 d-none d-sm-block">
                            <form onSubmit={handleCallbackSubmit} method="post" action="#" id="footer-form">
                                <div className="bottomFormMain">
                                      <div className="itemBottomFooter">
                                          <input type="text" name="name" onChange={handleCallbackInputChange} value={callbackInputs.name} className="textInput" placeholder="Enter your name" minLength="3" required/>
                                      </div>
                                      <div className="itemBottomFooter">
                                          <input type="number" name="phone" onChange={handleCallbackInputChange} value={callbackInputs.phone} className="textInput" placeholder="Enter your phone" required maxLength="11"/>
                                      </div>
                                      <div className="itemBottomFooter">
                                          <input type="email" name="email" onChange={handleCallbackInputChange} value={callbackInputs.email} className="textInput" placeholder="Enter your email" required/>
                                      </div>

                                      <div className="itemBottomFooter">
                                          <input type="text" name="city" onChange={handleCallbackInputChange} value={callbackInputs.city} className="textInput" placeholder="Enter your city" minLength="3" required/>
                                      </div>

                                      <div className="itemBottomFooter">
                                        <select name="course_id" onChange={handleCallbackInputChange} value={callbackInputs.course_id} className="textInput" required>
                                          <option value="">Select course</option>
                                          {courses && courses.map((course, index) => {
                                            return <option key={index} value={course.id}>{course.name}</option>
                                          })}
                                        </select>
                                      </div>
                                      <div className="bottomFormBtn">
                                          <button className="btnFormSubmit callBackBtn" disabled={formSending}>{formSending ? 'Sending...' : 'Request call back' }</button>
                                      </div>
                                </div>
                                </form>
                            </div>
                            <div className="d-block d-sm-none">
                                <div className="phoneBottom">
                                    <ul>
                                        <li><Link href={`tel: ${setting ? setting[0].phone : ''}`}><a><i className="fa fa-phone"></i></a></Link></li>
                                        <li><Link href={`https://api.whatsapp.com/send?phone=${setting ? setting[0].whatsapp : ''}`}><a><i className="fab fa-whatsapp"></i></a></Link></li>
                                        <li><Link href="#"><a data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i className="fa fa-paper-plane"></i></a></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="successMessageModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="successMessageModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-md">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">

                        <div className="messageBox_success">
                          <i className="fa fa-check-circle"></i>
                          <p className="box_title">Thank you for your interest</p>
                          <p className="box_message">Our team will get in touch with you shortly</p>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>

            </footer>
        )}
    </div>
  )
}
