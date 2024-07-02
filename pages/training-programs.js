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


const headers = {
  'Content-Type': 'multipart/form-data',
  'Authorization': CONSTANTS.API_TOKEN
}

export const getServerSideProps = async () => {
    const res = await axios.get(`${CONSTANTS.API_URL}home/trainingProgramsData`, {
      headers: headers,
      withCredentials: true,
    }).catch((err) => console.log(err));
    const data = await res.data;

    return {
      props: { trainingProgramsData: data },
    }
}

export default function TrainingPrograms({ trainingProgramsData }) {

  const { trainingprogramspage, trainings } = trainingProgramsData;

  const createMarkup = (content) => {
    return { __html: content };
  }

  const [queryString, setQueryString] = useState('');

  useEffect(() => {
    // setQueryString(window.location.search);
  }, []);

  return (
    <div>

        <Head>
            <title>{trainingprogramspage[0].meta_title}</title>
            <meta name="keywords" content={trainingprogramspage[0].meta_keywords}/>
            <meta name="description" content={trainingprogramspage[0].meta_description}/>
        </Head>

        <Header props={{queryString: queryString}}/>

        <div className="bannerTopInnerPage bgPrimary">
          <div className="row align-items-lg-center">
            <div className="col-lg-5">
              <div className="leftInnerPagePr">
                <h1 className="heading bannerHeading programHeading fontWeight700 text-white">{trainingprogramspage[0].banner_title}</h1>
                <p className="text-white">{trainingprogramspage[0].banner_subtitle}</p>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="rightInnerPagePr">
                <img src={CONSTANTS.BACKEND_URL+trainingprogramspage[0].banner_image} alt="Training Programmes"/>
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
                  <h1 className="heading bannerHeading fontWeight700 text-white">Training <br/>Programmes</h1>
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

                <div className="row">

                {trainings && trainings.map((training, index) => {
                  return <div key={index} className="col-md-4">
                    <div className="careerBox trainingProgramBox">
                      <div className="head">
                        <img src={CONSTANTS.BACKEND_URL+training.image} />
                        <p className="tag">{functions.formatDate(training.training_date, 'MMM DD YYYY')}</p>
                      </div>
                      <div className="body">
                        <p className="title">{training.name}</p>
                        <div className="webContent">
                          <div dangerouslySetInnerHTML={createMarkup(training.description)}></div>
                        </div>
                      </div>
                      <div className="foot">
                        <div className="d-flex flex-wrap columnEqual justify-content-between">
                          <Link href="#">
                            <a data-bs-toggle="modal" data-bs-target={`#trainingProgramsModal_${'1'}`} className="btnPrimaryBorder" target="_blank">View details</a>
                          </Link>

                          <div className="modal fade" id={`trainingProgramsModal_${'1'}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="placementsModal_Label" aria-hidden="true">
                            <div className="modal-dialog modal-md">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h4 className="modal-title">Full Description</h4>
                                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">

                                  <div className="webContent">
                                    <div dangerouslySetInnerHTML={createMarkup(training.full_description)}></div>
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

    <Footer props={{queryString: queryString}}/>

    </div>
  )
}
