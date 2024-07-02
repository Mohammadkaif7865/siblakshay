import Head from 'next/head'
import React from 'react';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import EventSlider from "react-slick";
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
    const res = await axios.get(`${CONSTANTS.API_URL}home/facultyexpertspage_data`, {
      headers: headers,
      withCredentials: true,
    }).catch((err) => console.log(err));
    const data = await res.data;

    return {
      props: { facultyexpertspage_data: data },
    }
}

export default function OurFaculties({ facultyexpertspage_data }) {

  const { facultyexpertspage, courses, faculty } = facultyexpertspage_data;

  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tabNumber) => {
      setActiveTab(tabNumber);
      setToggleOpen(0);
  }

  const [toggleOpen, setToggleOpen] = useState(0);
  const handleToggleOpen = () => {
      setToggleOpen(!toggleOpen);
  }

  const createMarkup = (content) => {
    return { __html: content };
  }

  const [queryString, setQueryString] = useState('');

  var eventSettings = {
      dots: true,
      infinite: false,
      speed: 300,
      autoplay: true,
      autoplaySpeed: 4000,
      arrows: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1
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

  var innerTestimonialSettings = {
      dots: true,
      infinite: false,
      speed: 300,
      autoplay: true,
      autoplaySpeed: 4000,
      arrows: true,
      slidesToShow: 3,
      slidesToScroll: 1,

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

  var partnerSettings = {
      dots: false,
      infinite: false,
      speed: 300,
      autoplay: true,
      autoplaySpeed: 4000,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1,

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

  useEffect(() => {
    // setQueryString(window.location.search);
  }, []);

  return (
    <div>

    <Head>
        <title>{facultyexpertspage[0].meta_title}</title>
        <meta name="keywords" content={facultyexpertspage[0].meta_keywords}/>
        <meta name="description" content={facultyexpertspage[0].meta_description}/>
    </Head>

      <Header props={{queryString: queryString}}/>

      <section className="py-5">
          <div className="containerFull">
              <div className="bannerCourse">

              <div className="bannerCourseInner">
                  <div className="row">
                      <div className="col-lg-6">
                          <div className="leftCourse">
                              <h1 className="large_heading course_heading text-white fontWeight700">{facultyexpertspage[0].banner_title}</h1>
                              <div className="mt-3 mobileColor text-white" dangerouslySetInnerHTML={createMarkup(facultyexpertspage[0].banner_subtitle)}></div>
                          </div>
                      </div>
                      <div className="col-lg-6">
                          <div className="rightBannerCourse">
                              <picture>
                                  <source srcSet={CONSTANTS.BACKEND_URL+facultyexpertspage[0].banner_image} type="image/webp"/>
                                  <img src={CONSTANTS.BACKEND_URL+facultyexpertspage[0].banner_image} alt="Smiling happy indian student with backpack pointing his finger wall"/>
                              </picture>
                          </div>
                      </div>
                  </div>
                </div>

              </div>

          </div>
      </section>


        <section className="pt-0">
            <div className="containerFull">
              <div className="tabBlock resultsTabs resultNewBoxWrap">
                  <div className="tanList">
                    <div className="row">
                      <div className="col-md-10 col-6">

                        <ul className={toggleOpen ? 'is-open' : ''}>

                          {courses && courses.map((course, index) => {
                            return <li key={index} onClick={() => handleTabClick(index + 1)} className={activeTab === index + 1 ? 'active' : ''}>{course.name} </li>
                          })}

                          <li className="toggleOpen" onClick={handleToggleOpen}><a herf=""><span className="fa fa-angle-down"></span></a></li>

                          {/*
                            courses &&
                          <li onClick={() => handleTabClick(courses.length + 1)} className={activeTab === courses.length + 1 ? 'active' : ''} style={{display: 'none'}}>Rank Holders </li>
                          */}

                        </ul>
                      </div>
                      <div className="col-md-2 col-6">

                      </div>
                    </div>
                  </div>
                  <div className="tabContent">
                    {courses && courses.map((course, index) => {
                      return <div key={index}>
                      {activeTab === index + 1 &&
                          <div>
                              <div className="innerTab">

                                <div className="row">
                                {course.results && course.results.map((faculty_item, index) => {
                                  if(faculty_item.designation != '') {
                                    return <div key={index} className="col-md-3 itemFaculty">
                                    <div className="innerFaculty">
                                        <div className="picture">
                                          <picture>
                                              <source srcSet={CONSTANTS.BACKEND_URL+faculty_item.image} type="image/webp"/>
                                              <img src={CONSTANTS.BACKEND_URL+faculty_item.image} alt={faculty_item.name}/>
                                          </picture>
                                        </div>
                                        <div className="nameFaculty">
                                            <h4 className="small_heading fontWeight500">{faculty_item.name}</h4>
                                            <h4 className="small_heading fontWeight500">({faculty_item.faculty_category_name})</h4>
                                            <p>Experience - {faculty_item.designation}</p>
                                        </div>
                                    </div>
                                    </div>
                                  }
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

        <CallbackForm props={{queryString: queryString}}/>

    <Footer props={{queryString: queryString}}/>

    </div>
  )
}
