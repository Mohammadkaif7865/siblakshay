import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ValueSlider from "react-slick";
import PartnerSlider from "react-slick";
import TestimonialSlider from "react-slick";

import { useEffect, useState } from 'react';
import axios from "axios";
import * as CONSTANTS from "../constants/constants";

import Header from "../comps/Header";
import Footer from "../comps/Footer";
import CallbackForm from "../comps/CallbackForm";

const headers = {
  'Content-Type': 'multipart/form-data',
  'Authorization': CONSTANTS.API_TOKEN
}

export const getServerSideProps = async () => {
    const res = await axios.get(`${CONSTANTS.API_URL}home/careerspage_data`, {
      headers: headers,
      withCredentials: true,
    }).catch((err) => console.log(err));
    const data = await res.data;

    return {
      props: { careerspage_data: data },
    }
}

export default function Careers({ careerspage_data }) {

  const { careerspage, careers, testimonials: testimonial } = careerspage_data;

  const createMarkup = (content) => {
    return { __html: content };
  }
  var innerTestimonialSettings = {
      dots: true,
      infinite: false,
      speed: 300,
      autoplay: true,
      autoplaySpeed: 4000,
      arrows: true,
      slidesToShow: 3,
      slidesToScroll: 3,

      responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
  }

  const [careerId, setCareerId] = useState('');
  const [queryString, setQueryString] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [clientIP, setClientIP] = useState('');
  const [formSending, setFormSending] = useState(false);
  const [pageUrl, setPageUrl] = useState('');
  const [selectedDocumentFile, setSelectedDocumentFile] = useState();

  // careers form start
  const handleDocumentFileChange = (event) => {
    setSelectedDocumentFile(event.target.files[0]);
  };

  const [careersFormInputs, setCareersFormInputs] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
  });

  const handleCareersFormInputChange = (e) => {
    setCareersFormInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitCareersForm = async () => {
    const QueryData = JSON.parse(sessionStorage.getItem("QueryData")) || {};

    const formData = {
      career_id: careerId,
      name: careersFormInputs.name,
      phone: careersFormInputs.phone,
      email: careersFormInputs.email,
      city: careersFormInputs.city,
      url: pageUrl,
      clientIP: clientIP,
      document: selectedDocumentFile,
      ...QueryData,
    };
    const res = await axios
      .post(`${CONSTANTS.API_URL}home/submitCareersForm`, formData, {
        headers: headers,
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleCareersFormSubmit = (e) => {
    e.preventDefault();

    if($('#career-form').valid()) {
        setFormSending(true);

        submitCareersForm()
          .then((data) => {
            if(!data.error) {
              // toast.success(data.message);
              window.openSuccessMessageModal();
              setCareersFormInputs({
                name: "",
                phone: "",
                email: "",
                city: "",
              });

              setPhoneNumber('');
              window.closeStaticBackdropModal();

              setFormSending(false);

            } else {
              // toast.error(data.message);
            }
          })

      }

  };

  // careers form end


  useEffect(() => {
    // setQueryString(window.location.search);

    setPageUrl(window.location.href);

    fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => setClientIP(data.ip))
    .catch(error => console.log(error));

    // Ensure jQuery code runs after the component has mounted
    $(document).ready(function() {

      $('#career-form').validate({ // Initialize jQuery Validate on #my-form
        rules: {
          city: {
            noSpaces: true
          }
        }
      });

    });

  }, []);

  return (
    <div>

      <Head>
          <title>{careerspage[0].meta_title}</title>
          <meta name="keywords" content={careerspage[0].meta_keywords}/>
          <meta name="description" content={careerspage[0].meta_description}/>
      </Head>

      <Header props={{queryString: queryString}}/>

      <div className="bannerTopInnerPage bannerIcon bgPrimary">
          <div className="row align-items-lg-center">
            <div className="col-lg-4">
              <div className="leftInnerPagePr">
                  <h1 className="heading bannerHeading programHeading fontWeight700 text-white">{careerspage[0].banner_title}</h1>
                  <p className="text-white">{careerspage[0].banner_subtitle}</p>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="rightInnerPagePr blogMobileImg">
                <img src={CONSTANTS.BACKEND_URL+careerspage[0].banner_image} alt="Career Banner"/>
              </div>
            </div>
          </div>
        </div>

        {/*<section className="bgPrimary position-relative pb0">
            <div className="substractLeft">
                <picture>
                    <source srcSet='/assets/images/Subtract-about.webp' type="image/webp"/>
                    <img src='/assets/images/Subtract-about.png' alt="Substract"/>
                </picture>
            </div>
            <div className="containerFull">
              <div className="row align-items-center">
                <div className="col-md-7">
                  <h1 className="heading bannerHeading fontWeight700 text-white">Careers</h1>
                </div>
                <div className="col-md-5">
                  <div className="aboutBannerImg">
                    <img src='/assets/images/about/pngwing 3-min.png' />
                  </div>
                </div>
              </div>
            </div>
        </section>*/}

        <section>
            <div className="containerFull">
                <h4 className="heading fontHeading fontWeight700">{careerspage[0].section_1_title}</h4>
                <div className="webContent text mt-2">
                    <div dangerouslySetInnerHTML={createMarkup(careerspage[0].section_1_description)}></div>
                </div>


                <div className="row">

                {careers && careers.map((career, index) => {
                  return <div key={index} className="col-md-4">
                      <div className="careerBox">
                        <div className="head">
                          <div className="icon">
                            <img src={CONSTANTS.BACKEND_URL+career.image} />
                          </div>
                          <p className="title">{career.name}</p>
                        </div>
                        <div className="body">
                          <div className="d-flex flex-wrap columnEqual justify-content-between">
                            <div className="horIconText">
                              <img src='/assets/images/careers/icons/calendar-checked.png' />
                              <p className="textTitle">{career.experience}</p>
                            </div>
                            <div className="horIconText">
                              <img src='/assets/images/careers/icons/user.png' />
                              <p className="textTitle">{career.vacancy}</p>
                            </div>
                          </div>

                          <div className="horIconText">
                            <img src='/assets/images/careers/icons/office-bag.png' />
                            <p className="textTitle">{career.package}</p>
                          </div>

                          <div className="horIconText">
                            <img src='/assets/images/careers/icons/location.png' />
                            <p className="textTitle">{career.location}</p>
                          </div>

                        </div>
                        <div className="foot">
                          <div className="d-flex flex-wrap columnEqual justify-content-between">
                            <Link href="">
                              <a className="btnTheme" data-bs-toggle="modal" data-bs-target="#careersFormModal" onClick={() => setCareerId(career.id)}>Apply now</a>
                            </Link>
                            <Link href="">
                              <a className="btnPrimaryBorder" data-bs-toggle="modal" data-bs-target={`#careersModal_${career.id}`}>View details</a>
                            </Link>

                              <div className="modal fade" id={`careersModal_${career.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="careersModal_Label" aria-hidden="true">
                                <div className="modal-dialog modal-md">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h4 className="modal-title">Description - {career.name}</h4>
                                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">

                                      <div className="webContent">
                                        <div dangerouslySetInnerHTML={createMarkup(career.description)}></div>
                                      </div>

                                    </div>
                                  </div>
                                </div>
                              </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  })}

                </div>

            </div>
        </section>

        <section className="bgLightBlue">
            <div className="containerFull">
                <h4 className="heading fontHeading fontWeight700">{careerspage[0].section_2_title}</h4>
                <div className="webContent text mt-2">
                    <div dangerouslySetInnerHTML={createMarkup(careerspage[0].section_2_description)}></div>
                </div>

                <TestimonialSlider className="testimonialSlider" {...innerTestimonialSettings}>
                  {testimonial && testimonial.map((testimonial_item, index) => {
                    return <div key={index} className="tesitItem">
                        <div className="innerTestimonial p-0">
                            <div className="p-3">
                                <div dangerouslySetInnerHTML={createMarkup(testimonial_item.description)}></div>
                                <div className="testimonialFooter">
                                    <div className="leftTest">
                                        <div className="testimonialUser">
                                            <picture>
                                                <source srcSet={CONSTANTS.BACKEND_URL+testimonial_item.image} type="image/webp"/>
                                                <img src={CONSTANTS.BACKEND_URL+testimonial_item.image} alt={testimonial_item.name}/>
                                            </picture>
                                        </div>
                                        <h4 className="fontWeight600">{testimonial_item.name}</h4>
                                    </div>
                                    <div className="qouteTestimonial">
                                        <picture>
                                            <source srcSet='/assets/images/icons/qoute.webp' type="image/webp"/>
                                            <img src='/assets/images/icons/qoute.png' alt="Ganga"/>
                                        </picture>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    })}
                </TestimonialSlider>

            </div>
        </section>


        <div className="modal fade" id="careersFormModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="careersFormModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="careersFormModalLabel">Drop your info to proceed</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleCareersFormSubmit} method="post" action="#" id="career-form">
                  <div className="formHome">
                      <div className="formItemHome">
                          <label htmlFor="name">Your Name*</label>
                          <input type="text" name="name" id="name" placeholder="Enter your name" onChange={handleCareersFormInputChange} value={careersFormInputs.name} minLength="3" required />
                      </div>
                      <div className="formItemHome">
                          <label htmlFor="phone">Phone Number*</label>
                          <div className="row">
                              <div className="col-lg-12 col-12 pe-lg-2 pe-1">
                                  {/*<PhoneInput
                                  name="phone"
                                  defaultCountry="IN"
                                  value={phoneNumber}
                                  onChange={setPhoneNumber}
                                  required
                                  maxlength="11" />*/}
                                  <input type="number" name="phone" id="phone" placeholder="Enter your phone" onChange={handleCareersFormInputChange} value={careersFormInputs.phone} maxLength="11" required />
                              </div>
                          </div>
                      </div>
                      <div className="formItemHome">
                          <label htmlFor="email">Your Email Address*</label>
                          <input type="email" name="email" id="email" placeholder="Enter your email address" onChange={handleCareersFormInputChange} value={careersFormInputs.email} required/>
                      </div>
                      <div className="formItemHome">
                          <label htmlFor="city">Your City*</label>
                          <input type="text" name="city" id="city" placeholder="Enter your city" onChange={handleCareersFormInputChange} value={careersFormInputs.city} minLength="3" required/>
                      </div>
                      <div className="formItemHome">
                          <label htmlFor="email">File Upload*</label>
                          <input type="file" name="document" id="document" onChange={handleDocumentFileChange} required/>
                      </div>
                      <div className="formItemHome mb-0 mt-4">
                          <button className="btnTheme" type="submit" name="submit" disabled={formSending}>{formSending ? 'Sending...' : 'Submit' }</button>
                          <p className="form_note">By submitting this form, you agree to our <Link href={'/privacy-policy-and-terms-of-service'+queryString}><a target="_blank">T&C and Privacy Policy</a></Link></p>
                      </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>


    <Footer props={{queryString: queryString}}/>

    </div>
  )
}
