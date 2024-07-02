import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ValueSlider from "react-slick";
import PartnerSlider from "react-slick";
import MobilePartnerSlider from "react-slick";
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

export default function HiringPartners({ placementsData }) {

  const { placementspage, placement_categorys, placements, testimonials, prides, partners, mobile_partners } = placementsData;

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
                    <h1 className="large_heading fontHeading" dangerouslySetInnerHTML={createMarkup(placementspage[0].banner_title)}></h1>
                    <p>{placementspage[0].banner_subtitle}</p>
                  </div>
                  <div className="aboutBannerImg">
                    <img className="d-none d-lg-block" src={CONSTANTS.BACKEND_URL+placementspage[0].banner_image} />
                    <img className="d-block d-lg-none" src={CONSTANTS.BACKEND_URL+placementspage[0].banner_image} />
                  </div>
                </div>
            </div>
          </div>
        </section>

        <section className="bgLightBlue">
            <div className="containerFull">
                <h4 className="heading fontHeading fontWeight700">{placementspage[0].section_1_title}</h4>
                <div className="webContent text mt-2">
                    <div dangerouslySetInnerHTML={createMarkup(placementspage[0].section_1_description)}></div>
                </div>

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

        <section className="pb-0">
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
