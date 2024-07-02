import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EventSlider from "react-slick";
import PartnerSlider from "react-slick";
import TestimonialSlider from "react-slick";

import { useEffect, useState } from 'react';
import axios from "axios";
import * as CONSTANTS from "../constants/constants";
import * as functions from "../functions/functions";

import Header from "../comps/Header";
import Footer from "../comps/Footer";
import CallbackForm from "../comps/CallbackForm";

const headers = {
  'Content-Type': 'multipart/form-data',
  'Authorization': CONSTANTS.API_TOKEN
}

export const getServerSideProps = async () => {
    const res = await axios.get(`${CONSTANTS.API_URL}home/galleryData`, {
      headers: headers,
      withCredentials: true,
    }).catch((err) => console.log(err));
    const data = await res.data;

    return {
      props: { galleryData: data },
    }
}

export default function Gallery({ galleryData }) {

      const { gallerypage, years, gallery_videos } = galleryData;

      const [activeTab, setActiveTab] = useState(1);
      const handleTabClick = (tabNumber) => {
          setActiveTab(tabNumber);
      }

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
          <title>{gallerypage[0].meta_title}</title>
          <meta name="keywords" content={gallerypage[0].meta_keywords}/>
          <meta name="description" content={gallerypage[0].meta_description}/>
      </Head>

      <Header props={{queryString: queryString}}/>

      <div className="bannerTopInnerPage bannerIcon bgPrimary">
          <div className="row align-items-lg-center">
            <div className="col-lg-5">
              <div className="leftInnerPagePr">
                <h1 className="heading bannerHeading programHeading fontWeight700 text-white">{gallerypage[0].banner_title}</h1>
                <p className="text-white">{gallerypage[0].banner_subtitle}</p>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="rightInnerPagePr text-end blogMobileImg">
                <img src={CONSTANTS.BACKEND_URL+gallerypage[0].banner_image} alt="Gallery Banner"/>
              </div>
            </div>
          </div>
        </div>

        <section>
            <div className="containerFull">

            <div className="tabBlock resultsTabs">
                <div className="tanList">
                    <ul>
                      {years && years.map((year, index) => {
                        return <li key={index} onClick={() => handleTabClick(index + 1)} className={activeTab === index + 1 ? 'active' : ''}>{year.year} </li>
                      })}

                      {years &&
                      <li onClick={() => handleTabClick(years.length + 1)} className={activeTab === years.length + 1 ? 'active' : ''}>Videos </li>
                      }

                    </ul>
                </div>
                <div className="tabContent">
                  {years && years.map((year, index) => {
                    return <div key={index}>
                    {activeTab === index + 1 &&
                        <div>
                            <div className="innerTab">

                                <div className="row">

                                {year.gallery_images && year.gallery_images.map((gallery_image, index2) => {
                                  return <div key={index2} className="col-md-6">

                                    <div className="careerBox trainingProgramBox">
                                      <div className="head">
                                        <img src={CONSTANTS.BACKEND_URL+gallery_image.image} />
                                        <p className="tag">{functions.formatDate(gallery_image.gallery_date, 'DD MMM YYYY')}</p>
                                      </div>
                                      <div className="body">
                                        <p className="title mb-2">{gallery_image.name}</p>
                                      </div>
                                    </div>

                                  </div>
                                })}


                                </div>

                            </div>
                        </div>}
                      </div>
                    })}


                    {years && activeTab === years.length + 1 && gallery_videos &&
                      <div>
                          <div className="innerTab">

                              <div className="row">

                                {gallery_videos && gallery_videos.map((gallery_video, index2) => {
                                  return <div key={index2} className="col-md-6">

                                    <div className="careerBox trainingProgramBox">
                                      <div className="head">
                                        <video src={CONSTANTS.BACKEND_URL+gallery_video.video} controls></video>
                                        <p className="tag">{functions.formatDate(gallery_video.gallery_date, 'DD MMM YYYY')}</p>
                                      </div>
                                      <div className="body">
                                        <p className="title mb-2">{gallery_video.name}</p>
                                      </div>
                                    </div>

                                  </div>
                                })}

                              </div>

                          </div>
                      </div> }

                </div>
            </div>



              <div className="blogsFooter">

                {/*
                <nav className="webPagination" aria-label="Page navigation example">
                  <ul className="pagination justify-content-lg-end justify-content-center">
                    <li className="page-item">
                      <a className="page-link" href="#" tabindex="-1" aria-disabled="true">
                        <i className="fa fa-angle-left"></i>
                      </a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item active"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        <i className="fa fa-angle-right"></i>
                      </a>
                    </li>
                  </ul>
                </nav>
                */}

              </div>

            </div>
        </section>

        <CallbackForm props={{queryString: queryString}}/>

      <Footer props={{queryString: queryString}}/>

    </div>
  )
}
