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
import * as functions from "../functions/functions";

import Header from "../comps/Header";
import Footer from "../comps/Footer";
import CallbackForm from "../comps/CallbackForm";
import CourseForm from "../comps/CourseForm";

const headers = {
  'Content-Type': 'multipart/form-data',
  'Authorization': CONSTANTS.API_TOKEN
}

export const getServerSideProps = async () => {
    const res = await axios.get(`${CONSTANTS.API_URL}home/master_classData`, {
      headers: headers,
      withCredentials: true,
    }).catch((err) => console.log(err));
    const data = await res.data;

    return {
      props: { master_classData: data },
    }
}

export default function MasterClass({ master_classData }) {

  const { masterclasspage, master_classs } = master_classData;

  const [queryString, setQueryString] = useState('');

  const createMarkup = (content) => {
    return { __html: content };
  }

  useEffect(() => {
    // setQueryString(window.location.search);
  }, []);

  return (
    <div>

      <Head>
        <title>{masterclasspage[0].meta_title}</title>
        <meta name="keywords" content={masterclasspage[0].meta_keywords}/>
        <meta name="description" content={masterclasspage[0].meta_description}/>
      </Head>

      <Header props={{queryString: queryString}}/>

        {/*<div className="bannerImg">
          <img src='/assets/images/master-class-banner.png' />
        </div>*/}

        <section className="bgPrimary position-relative p-0">
          <div className="all_courses_section_inner_wrap">
            <div className="substractLeft d-none d-lg-block">
                <picture>
                    <source srcSet='/assets/images/subtract-left.png' type="image/png"/>
                    <img src='/assets/images/subtract-left.png' alt="Substract"/>
                </picture>
            </div>
            <div className="">
                <div className="aboutBannerContent" style={{display: 'flex'}}>
                  <div className="aboutBannerText">
                    <h1 className="large_heading fontHeading">{masterclasspage[0].banner_title}</h1>
                    <p className="text-white">{masterclasspage[0].banner_subtitle}</p>
                  </div>
                  <div className="aboutBannerImg">
                    <img className="d-none d-lg-block" src={CONSTANTS.BACKEND_URL+masterclasspage[0].banner_image} />
                    <img className="d-block d-lg-none" src={CONSTANTS.BACKEND_URL+masterclasspage[0].banner_image} />
                  </div>
                </div>
            </div>
          </div>
        </section>

        <section>
            <div className="containerFull">

                <h4 className="heading fontHeading fontWeight700">{masterclasspage[0].section_1_title}</h4>

                <div className="row">

                {master_classs && master_classs.map((master_class, index) => {
                  return <div key={index} className="col-md-4">
                    <div className="itemCourseSlider masterClassCard">
                        <div className="mainCourse">
                            <div className="innerCourse">
                                <div className="courseCard">
                                  <picture>
                                      <source srcSet={CONSTANTS.BACKEND_URL+master_class.image} type="image/webp" />
                                      <img src={CONSTANTS.BACKEND_URL+master_class.image} />
                                  </picture>
                                  <h4 className="small_heading fontHeading fontWeight600 mt-3">{master_class.name}</h4>

                                  <div className="body">

                                    <div className="horIconText mt-3">
                                      <img src='/assets/images/careers/icons/calendar-checked.png' />
                                      <p className="textTitle">{functions.formatDate(master_class.class_date, 'DD MMM, YYYY | dddd')}</p>
                                    </div>

                                    <div className="horIconText">
                                      <img src='/assets/images/careers/icons/Time.png' />
                                      <p className="textTitle">{functions.formatDate(master_class.class_date, 'h:mm A')}
                                      </p>
                                    </div>

                                  </div>

                                </div>
                                <div className="d-flex flex-wrap justify-content-between">
                                    {master_class.zoom_link_show ? (
                                      <Link href={master_class.zoom_link}>
                                        <a target="_blank" className="btnTheme btn-block">Zoom Meeting</a>
                                      </Link>
                                    ) : (
                                      <Link href="">
                                        <a className="btnTheme btn-block" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Register</a>
                                      </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
                })}


                </div>

            </div>
        </section>

        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Drop your info to proceed</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <CourseForm props={{type: 'modal', active_course_id: '', queryString: queryString}} />
              </div>
            </div>
          </div>
        </div>

        <CallbackForm props={{queryString: queryString}}/>

      <Footer props={{queryString: queryString}}/>

    </div>
  )
}
