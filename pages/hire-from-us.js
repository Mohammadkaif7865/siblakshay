import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ValueSlider from "react-slick";
import PartnerSlider from "react-slick";
import MobilePartnerSlider from "react-slick";
import TestimonialSlider from "react-slick";
import RankSlider from "react-slick";

import { useEffect, useState } from 'react';
import axios from "axios";
import * as CONSTANTS from "../constants/constants";

import Header from "../comps/Header";
import Footer from "../comps/Footer";
import HireFormSection from "../comps/HireFormSection";


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

  const { hirepage, candidates, rank_holder, partners, mobile_partners } = hireData;

  const [queryString, setQueryString] = useState('');

  const createMarkup = (content) => {
    return { __html: content };
  }

  var rankSettings = {
      dots: true,
      infinite: true,
      speed: 300,
      autoplay: false,
      autoplaySpeed: 12000,
      arrows: true,
      slidesToShow: 4,
      slidesToScroll: 4,

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
      arrows: false,
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
              slidesToScroll: 1,
              arrows:true
            }
          }
        ]
  }

  var mobilePartnerSettings = {
      dots: true,
      infinite: true,
      speed: 300,
      autoplay: true,
      autoplaySpeed: 4000,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
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

                <div className="row">
                  <div className="col-md-7">
                    <h4 className="heading fontHeading fontWeight700">{hirepage[0].section_1_title}</h4>
                    <div className="webContent vectorIcon mt-2">
                      <div dangerouslySetInnerHTML={createMarkup(hirepage[0].section_1_description)}></div>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="webImg">
                      <img src={CONSTANTS.BACKEND_URL+hirepage[0].section_1_image} className="w-100" />
                    </div>
                  </div>
                </div>

            </div>
        </section>

        <section className="bgLight">
            <div className="containerFull">

                <div className="row button_row mb-3">
                  <div className="col-md-9">
                    <h4 className="heading fontHeading fontWeight700">{hirepage[0].section_2_title}</h4>
                  </div>
                  <div className="col-md-3 button_col">

                  </div>
                </div>

                <RankSlider className="rankSlider dotSlider" {...rankSettings}>
                  {rank_holder && rank_holder.map((rank_holder_item, index) => {
                    return <div key={index} className="rankItem">
                        <div className="rankInner">

                            <div className="picture">
                              <picture srcSet={CONSTANTS.BACKEND_URL+rank_holder_item.image} type="image/webp"/>
                              <img src={CONSTANTS.BACKEND_URL+rank_holder_item.image} alt={rank_holder_item.name}/>
                            </div>

                            <div className={`rankRibbon ${rank_holder_item.score == 0 ? 'justify-content-center' : ''}`}>
                                <div className="leftRank">
                                    <h3>{rank_holder_item.name}</h3>
                                </div>
                                <div className="rightRank">
                                  {rank_holder_item.score != 0 &&
                                    <h5>{rank_holder_item.score}</h5>
                                  }
                                </div>
                            </div>
                        </div>
                    </div>
                    })}
                </RankSlider>
            </div>
        </section>


        <section className="pb-0">
            <div className="containerFull">
                <h4 className="heading fontHeading fontWeight700">{hirepage[0].section_3_title}</h4>

                <div className='d-none d-lg-block'>
                <PartnerSlider className="partnerSlider dotSlider" {...partnerSettings}>

                {partners && partners.map((partner, i) => {
                  return <div key={i}>
                      <div className="partnerItem">
                        {
                          partner[0] && partner[0].map((partner_item, j) => {
                            return <div key={j} className="partnerInner">
                                <picture>
                                    <source srcSet={CONSTANTS.BACKEND_URL+partner_item.image} type="image/webp"/>
                                    <img src={CONSTANTS.BACKEND_URL+partner_item.image} alt={partner_item.name}/>
                                </picture>
                            </div>
                        })
                      }
                      </div>
                  </div>
                  })}

                </PartnerSlider>
                </div>
                <div className="d-lg-none d-block">
                <MobilePartnerSlider className="mobilePartnerSlider dotSlider" {...mobilePartnerSettings}>
                {mobile_partners && mobile_partners.map((mobile_partner, i) => {
                  return <div key={i}>
                      <div className="partnerItem">
                        {
                          mobile_partner[0] && mobile_partner[0].map((mobile_partner_item, j) => {
                            return <div key={j} className="partnerInner">
                                <picture>
                                    <source srcSet={CONSTANTS.BACKEND_URL+mobile_partner_item.image} type="image/webp"/>
                                    <img src={CONSTANTS.BACKEND_URL+mobile_partner_item.image} alt={mobile_partner_item.name}/>
                                </picture>
                            </div>
                        })
                      }
                      </div>
                  </div>
                  })}
                </MobilePartnerSlider>
                </div>

            </div>
        </section>

        <HireFormSection props={{queryString: queryString}}/>

      <Footer props={{queryString: queryString}}/>

    </div>
  )
}
