import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

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
    const res = await axios.get(`${CONSTANTS.API_URL}home/placementsData`, {
      headers: headers,
      withCredentials: true,
    }).catch((err) => console.log(err));
    const data = await res.data;

    return {
      props: { placementsData: data },
    }
}

export default function Careers({ placementsData }) {

  const { placementspage, placement_categorys, placements, testimonials, prides } = placementsData;

  const [queryString, setQueryString] = useState('');

  const createMarkup = (content) => {
    return { __html: content };
  }

  var testimonialSettings = {
      dots: true,
      infinite: true,
      speed: 300,
      autoplay: true,
      autoplaySpeed: 12000,
      arrows: false,
      slidesToShow: 3,
      slidesToScroll: 3,
      // rtl: true,
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
              slidesToScroll: 1,
              arrows: true
            }
          }
        ]
  }

  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tabNumber) => {
      setActiveTab(tabNumber);
  }

  useEffect(() => {
    // setQueryString(window.location.search);
  }, []);

  return (
    <div>

      <Head>
        <title>{placementspage[0].meta_title}</title>
        <meta name="keywords" content={placementspage[0].meta_keywords}/>
        <meta name="description" content={placementspage[0].meta_description}/>
      </Head>

      <Header props={{queryString: queryString}}/>

      <div className="bannerTopInnerPage bgPrimary">
          <div className="row align-items-lg-center">
            <div className="col-lg-5">
              <div className="leftInnerPagePr">
                <h1 className="heading bannerHeading programHeading placementIcon fontWeight700 text-white">{placementspage[0].banner_title}</h1>
                <p className="text-white">{placementspage[0].banner_subtitle}</p>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="rightInnerPagePr blogMobileImg">
                <img src={CONSTANTS.BACKEND_URL+placementspage[0].banner_image} alt="Placement Banner"/>
              </div>
            </div>
          </div>
        </div>

        <section className="bgLightBlue">
            <div className="containerFull">
                <h4 className="heading fontHeading fontWeight700">{placementspage[0].section_1_title}</h4>
                <div className="webContent text mt-2">
                    <div dangerouslySetInnerHTML={createMarkup(placementspage[0].section_1_description)}></div>
                </div>


                <div className="tabBlock resultsTabs">
                    <div className="tanList">
                      <div className="containerFull">
                          <ul>
                            {placement_categorys &&
                            <li onClick={() => handleTabClick(placement_categorys.length + 1)} className={activeTab === placement_categorys.length + 1 ? 'active' : ''}>Recent </li>
                            }

                            {placement_categorys && placement_categorys.map((placement_category, index) => {
                              return <li key={index} onClick={() => handleTabClick(index + 1)} className={activeTab === index + 1 ? 'active' : ''}>{placement_category.name} </li>
                            })}
                          </ul>
                      </div>
                    </div>
                    <div className="tabContent">

                    {placement_categorys && activeTab === placement_categorys.length + 1 && placements &&
                      <div>
                          <div className="innerTab">

                              <div className="row">

                                {placements && placements.map((placement, index2) => {
                                  return <div key={index2} className="col-md-4">

                                  <Link href="#">
                                    <a data-bs-toggle="modal" data-bs-target={`#placementsModal_${placement.id}`}>
                                      <div className="placementBox">
                                        <div className="img">
                                          <img src={CONSTANTS.BACKEND_URL+placement.image} />
                                        </div>
                                        <div className="boxContent">
                                          <p className="boxTitle">{placement.name}</p>
                                          <p className="desc">{placement.description}</p>
                                          <p className="tags">1d ago, {placement.time}, {placement.location}</p>
                                        </div>
                                      </div>
                                    </a>
                                  </Link>

                                    <div className="modal fade" id={`placementsModal_${placement.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="placementsModal_Label" aria-hidden="true">
                                      <div className="modal-dialog modal-md">
                                        <div className="modal-content">
                                          <div className="modal-header">
                                            <h4 className="modal-title">Job Description - {placement.name}</h4>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                          </div>
                                          <div className="modal-body">

                                            <div className="webContent">
                                              <div dangerouslySetInnerHTML={createMarkup(placement.job_description)}></div>
                                            </div>

                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                  </div>
                                })}

                              </div>

                          </div>
                      </div> }


                      {placement_categorys && placement_categorys.map((placement_category, index) => {
                        return <div key={index}>
                        {activeTab === index + 1 &&
                            <div>
                                <div className="innerTab">

                                  <div className="row">

                                    {placement_category.placements && placement_category.placements.map((placement, index2) => {
                                      return <div key={index2} className="col-md-4">

                                      <Link href="#">
                                          <a data-bs-toggle="modal" data-bs-target={`#placementsModal_${placement.id}`}>
                                          <div className="placementBox">
                                            <div className="img">
                                              <img src={CONSTANTS.BACKEND_URL+placement.image} />
                                            </div>
                                            <div className="boxContent">
                                              <p className="boxTitle">{placement.name}</p>
                                              <p className="desc">{placement.description}</p>
                                              <p className="tags">1d ago, {placement.time}, {placement.location}</p>
                                            </div>
                                          </div>
                                        </a>
                                      </Link>

                                        <div className="modal fade" id={`placementsModal_${placement.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="placementsModal_Label" aria-hidden="true">
                                          <div className="modal-dialog modal-md">
                                            <div className="modal-content">
                                              <div className="modal-header">
                                                <h4 className="modal-title">Job Description - {placement.name}</h4>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                              </div>
                                              <div className="modal-body">

                                                  <div className="webContent">
                                                    <div dangerouslySetInnerHTML={createMarkup(placement.job_description)}></div>
                                                  </div>

                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                      </div>
                                    })}

                                  </div>

                                </div>
                            </div>}
                          </div>
                        })}

                    </div>
                </div>

            </div>
        </section>

        <section>
            <div className="containerFull">
              <h4 className="heading fontHeading fontWeight700 mb-4">{placementspage[0].section_2_title}</h4>
              <div className="webContent text mt-2">
                  <div dangerouslySetInnerHTML={createMarkup(placementspage[0].section_2_description_1)}></div>
              </div>

              <div className="row">
                <div className="col-md-6">
                    <div className="rightContactHome bgLightBlue shadowNone mt-3">
                        <h4 className="sub_heading fontWeight700">Talk to us</h4>
                        <p className="mt-3">Request a Call Back</p>
                        <div className="formHome">
                            <div className="formItemHome">
                                <label htmlFor="name">Your Name*</label>
                                <input type="text" name="name" id="name" placeholder="Enter your name"/>
                            </div>
                            <div className="formItemHome">
                                <label htmlFor="email">Your Email Address</label>
                                <input type="email" name="email" id="email" placeholder="Enter your email address"/>
                            </div>
                            <div className="formItemHome">
                                <label htmlFor="phone">Phone Number</label>
                                <div className="row">
                                    <div className="col-lg-2 col-4">
                                        <select id="phoneNumber">
                                            <option>+91</option>
                                            <option>+92</option>
                                            <option>+93</option>
                                        </select>
                                    </div>
                                    <div className="col-lg-10 col-8">
                                        <input type="tel" name="phone" id="phone" placeholder="Enter your phone number"/>
                                    </div>
                                </div>
                            </div>
                            <div className="formItemHome">
                                <label htmlFor="phone">Interested Courses</label>
                                <select>
                                    <option>Certified Management Accountant</option>
                                    <option>Chartered Accountant</option>
                                    <option>B.Com + ACCA</option>
                                </select>
                            </div>
                            <div className="formItemHome">
                                <label htmlFor="email">File Upload</label>
                                <input type="file" name="file" id="file" />
                            </div>
                            <div className="formItemHome mb-0 mt-4">
                                <button className="btnTheme" type="submit" name="submit">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                  <div className="rightContactHome bgLightBlue shadowNone mt-3">
                    <div className="webContentBox">
                        <div className="webContent">
                          <div dangerouslySetInnerHTML={createMarkup(placementspage[0].section_2_description_2)}></div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
        </section>

        <section className="pt-0">
            <div className="containerFull">
              <h4 className="heading fontHeading fontWeight700 mb-4">{placementspage[0].section_3_title}</h4>
              <div className="webContent text mt-2">
                  <div dangerouslySetInnerHTML={createMarkup(placementspage[0].section_3_description)}></div>
              </div>

              <div className="row">

                {prides && prides.map((pride, index) => {
                  return <div  key={index} className="col-md-4">
                    <div className="prideBox">
                      <div className="img">
                        <img src={CONSTANTS.BACKEND_URL+pride.image} />
                      </div>
                      <div className="boxContent">
                        <p className="boxTitle">{pride.name}</p>
                        <p className="desg">{pride.designation}</p>
                        <p className="desc">{pride.company_name}</p>
                      </div>
                    </div>
                  </div>
                  })}

              </div>

            </div>
        </section>

        <section className="bgLightBlue">
            <div className="containerFull">
                <h4 className="heading fontHeading fontWeight700">{placementspage[0].section_4_title}</h4>

                <TestimonialSlider className="testimonialSlider" {...testimonialSettings}>

                  {testimonials && testimonials.map((testimonial, index) => {
                    return <div key={index} className="tesitItem">
                        <div className="innerTestimonial">
                            <div dangerouslySetInnerHTML={createMarkup(testimonial.description)}></div>
                            <div className="testimonialFooter">
                                <div className="leftTest">
                                    <div className="testimonialUser">
                                        <picture>
                                            <source srcSet={CONSTANTS.BACKEND_URL+testimonial.image} type="image/webp"/>
                                            <img src={CONSTANTS.BACKEND_URL+testimonial.image} alt={testimonial.name}/>
                                        </picture>
                                    </div>
                                    <h4 className="fontWeight600">{testimonial.name}</h4>
                                </div>
                                <div className="qouteTestimonial">
                                    <picture>
                                        <source srcSet='/assets/images/icons/qoute.webp' type="image/webp"/>
                                        <img src='/assets/images/icons/qoute.png' alt={testimonial.name}/>
                                    </picture>
                                </div>
                            </div>
                        </div>
                    </div>
                    })}

                </TestimonialSlider>

            </div>
        </section>

        <CallbackForm props={{queryString: queryString}}/>


    <Footer props={{queryString: queryString}}/>

    </div>
  )
}
