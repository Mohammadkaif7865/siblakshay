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
    const res = await axios.get(`${CONSTANTS.API_URL}home/hireData`, {
      headers: headers,
      withCredentials: true,
    }).catch((err) => console.log(err));
    const data = await res.data;

    return {
      props: { hireData: data },
    }
}

export default function Hire({ hireData }) {

  const { hirepage, candidates } = hireData;

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
        <title>{hirepage[0].meta_title}</title>
        <meta name="keywords" content={hirepage[0].meta_keywords}/>
        <meta name="description" content={hirepage[0].meta_description}/>
      </Head>

      <Header props={{queryString: queryString}}/>

      <div className="bannerTopInnerPage bgPrimary">
          <div className="row align-items-lg-center">
            <div className="col-lg-5">
              <div className="leftInnerPagePr">
                <h1 className="heading bannerHeading programHeading blogIcon fontWeight700 text-white">{hirepage[0].banner_title}</h1>
                <p className="text-white">{hirepage[0].banner_subtitle}</p>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="rightInnerPagePr pt-0 hirePaddMobile blogMobileImg">
                <img className="d-lg-block d-none" src={CONSTANTS.BACKEND_URL+hirepage[0].banner_image} alt="Hire from us"/>
                <img className="d-lg-none d-block" src={CONSTANTS.BACKEND_URL+hirepage[0].banner_image} alt="Hire from us"/>
              </div>
            </div>
          </div>
        </div>

        <section>
            <div className="containerFull">

                <h4 className="heading fontHeading fontWeight700">{hirepage[0].section_1_title}</h4>

                <div className="row">

                {candidates && candidates.map((candidate, index) => {
                  return <div key={index} className="col-md-4">
                    <div className="branchBox hireBox">
                      <p className="title"><span>{candidate.name}</span></p>
                      <div className="webContent">
                          <div className="boxContent">
                            <div className="img">
                              <img src={CONSTANTS.BACKEND_URL+candidate.image} />
                            </div>
                            <div className="boxInnerContent">
                              <p className="boxTitle">{candidate.designation}</p>
                              <p className="country">{candidate.country}</p>
                            </div>
                          </div>
                          <p className="yearsTitle">{candidate.experience}</p>
                      </div>
                    </div>
                  </div>
                  })}

                </div>

            </div>
        </section>

        <CallbackForm props={{queryString: queryString}}/>

      <Footer props={{queryString: queryString}}/>

    </div>
  )
}
