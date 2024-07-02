import Head from 'next/head'

import React from 'react';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ValueSlider from "react-slick";
import PartnerSlider from "react-slick";
import MobilePartnerSlider from "react-slick";
import MilestonesSlider from "react-slick";

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
    const res = await axios.get(`${CONSTANTS.API_URL}home/aboutpage_data`, {
      headers: headers,
      withCredentials: true,
    }).catch((err) => console.log(err));
    const data = await res.data;

    return {
      props: { aboutpage_data: data },
    }
}

export default function AboutUs({ aboutpage_data }) {

    const { aboutpage, core_values, milestones, branchs, setting, sliders, advantages, videos, partners, mobile_partners, testimonials, medias, courses } = aboutpage_data;

    const createMarkup = (content) => {
      return { __html: content };
    }

    const [queryString, setQueryString] = useState('');


  var valueSettings = {
      dots: true,
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
              slidesToShow: 1,
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

  var milestonesSettings = {
      dots: true,
      infinite: false,
      speed: 300,
      autoplay: true,
      autoplaySpeed: 4000,
      arrows: false,
      slidesToShow: 4,
      slidesToScroll: 4,

      responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
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

  var milestonesItem = {
      dots: true,
      infinite: false,
      speed: 300,
      autoplay: true,
      autoplaySpeed: 4000,
      arrows: false,
      slidesToShow: 4,
      slidesToScroll: 4,

      responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
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
      dots: true,
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
        <title>{aboutpage[0].meta_title}</title>
        <meta name="keywords" content={aboutpage[0].meta_keywords}/>
        <meta name="description" content={aboutpage[0].meta_description}/>
    </Head>

      <Header props={{queryString: queryString}}/>
        {/*<div className="bannerImg">
          <img src='/assets/images/about/aboutBanner.png' />
        </div>*/}

        <section className="bgPrimary position-relative p-0">
          <div className="all_courses_section_inner_wrap">
            <div className="substractLeft d-none d-lg-block">
                <picture>
                    <source srcSet='/assets/images/about/Subtract-about.png' type="image/png"/>
                    <img src='/assets/images/about/Subtract-about.png' alt="Substract"/>
                </picture>
            </div>
            <div className="">
                <div className="aboutBannerContent" style={{display: 'flex'}}>
                  <div className="aboutBannerText">
                    <h1 className="large_heading fontHeading">{aboutpage[0].banner_title}</h1>
                    <p>{aboutpage[0].banner_subtitle}</p>
                  </div>
                  <div className="aboutBannerImg">
                    <img className="d-none d-lg-block" src={CONSTANTS.BACKEND_URL+aboutpage[0].banner_image} />
                    <img className="d-block d-lg-none" src={CONSTANTS.BACKEND_URL+aboutpage[0].banner_image} />
                  </div>
                </div>
            </div>
          </div>
        </section>

        {/*<section className="position-relative pb0" style={{backgroundImage: '/assets/images/about/aboutBg.jpg', backgroundPosition: 'center'}}>
            <div className="substractLeft">
                <picture>
                    <source srcSet='/assets/images/Subtract-about.png' type="image/webp"/>
                    <img src='/assets/images/Subtract-about.png' alt="Substract"/>
                </picture>
            </div>
            <div className="containerFull">
              <div className="row align-items-center">
                <div className="col-md-7">
                  <h1 className="heading bannerHeading fontWeight700 text-white">The <br/>Journey <br/>Towards <br/>Success</h1>
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
                    <div className="col-lg-5 order-lg-1 order-2 mt-3 mt-lg-0">
                      <div className="webImg">
                        <img src={CONSTANTS.BACKEND_URL+aboutpage[0].about_image} className="w100" />
                      </div>
                    </div>
                    <div className="col-lg-7 order-1 order-lg-2">
                        <h4 className="heading mt-lg-0 mt-3 fontHeading fontWeight700">{aboutpage[0].about_title}</h4>
                        <div className="text mt-2">
                        <div className="webContent">
                            <div dangerouslySetInnerHTML={createMarkup(aboutpage[0].about_description)}></div>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div className="containerFull">
            <ValueSlider className="valueSlider slickSliderWrap" {...valueSettings}>

            {core_values && core_values.map((core_value, index) => {
              return <div key={index} className="valueItem">
                  <div className="row align-items-center">
                      <div className="col-lg-7">
                          <h4 className="heading fontHeading fontWeight700">{core_value.name}</h4>
                          <div className="text mt-2">
                            <div className="webContent vectorIcon iconYellow">
                              <div dangerouslySetInnerHTML={createMarkup(core_value.description)}></div>
                            </div>
                          </div>
                      </div>
                      <div className="col-lg-5 mt-lg-0 mt-3">
                        <div className="webImg">
                          <img src={CONSTANTS.BACKEND_URL+core_value.image} className="w100" />
                        </div>
                      </div>
                  </div>
                </div>
                })}
              </ValueSlider>

            </div>
        </section>

        <section className="pb40">
            <div className="containerFull">
              <h4 className="heading fontHeading fontWeight700">{aboutpage[0].rank_title}</h4>
              <div className="webContent vectorIcon iconYellow">
                <div dangerouslySetInnerHTML={createMarkup(aboutpage[0].rank_description_1)}></div>
              </div>
              <div className="row align-items-center">
                  <div className="col-lg-7">
                      <div className="text mt-2">
                        <div className="webContent vectorIcon iconYellow">
                          <div dangerouslySetInnerHTML={createMarkup(aboutpage[0].rank_description_2)}></div>
                        </div>
                      </div>
                  </div>
                  <div className="col-lg-5 mt-lg-0 mt-3">
                    <div className="webImg">
                      <img src={CONSTANTS.BACKEND_URL+aboutpage[0].rank_image} className="w100" />
                    </div>
                  </div>
              </div>
            </div>
        </section>

        <section className="pb40">
            <div className="containerFull">
              <h4 className="heading fontHeading fontWeight700">{aboutpage[0].rank_title_2}</h4>
              <div className="webContent vectorIcon">
                <div dangerouslySetInnerHTML={createMarkup(aboutpage[0].rank_description_3)}></div>
              </div>
            </div>
        </section>

        <section className="pb40">
            <div className="containerFull">
              <h4 className="heading fontHeading fontWeight700">MILESTONES</h4>
            </div>
        </section>

        <section className="bgLightBlue">
            <div className="containerFull">

            <div className="" style={{backgroundImage: "url('/assets/images/about/milestone.png')", backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
              <MilestonesSlider className="milestonesSlider slickSliderWrap" {...milestonesSettings}>

              {milestones && milestones.map((milestone, index) => {
              return <div key={index} className="milestonesItem">
                    <div className={`milestoneBox ${index % 2 == 0 ? '' : 'reverse'}`}>
                      <p className="title">{milestone.name}</p>
                      <div className="webContent">
                        <div dangerouslySetInnerHTML={createMarkup(milestone.description)}></div>
                      </div>
                    </div>
                  </div>
                     })}
                </MilestonesSlider>
                </div>

            </div>
        </section>

        {/*<section className="d-none d-lg-block" style={{padding: '40px 0'}}>
            <div className="containerFull">
            </div>
        </section>*/}

        <section className="pb40">
            <div className="containerFull">
              <h4 className="heading fontHeading fontWeight700">Our Branches</h4>
            </div>
        </section>

        <section className="bgLightBlue">
            <div className="containerFull">
              {/*<h4 className="heading fontHeading fontWeight700">Our Branches</h4>*/}

              <div className="row">

                 {branchs && branchs.map((branch, index) => {
                   return <div key={index} className="col-md-4">
                     <a href={branch.google_map_link} target="_blank" className="branchBox">
                       <p className="title"><img src='/assets/images/about/mapMarker.svg' /> <span>{branch.name}</span></p>
                       <div className="webContent">
                         <div dangerouslySetInnerHTML={createMarkup(branch.description)}></div>
                       </div>
                     </a>
                   </div>
                    })}

              </div>

            </div>
        </section>

        {/*<section>
            <div className="containerFull">
              <div className="row justify-content-center">
                <div className="col-md-5">
                  <div className="counterBox">
                    <div className="icon">
                      <img src='/assets/images/about/Union.png' />
                    </div>
                    <div className="content">
                      <p className="title">13500</p>
                      <div className="webContent">
                        <p>Student Count</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-5 mt-lg-0 mt-3">
                  <div className="counterBox">
                    <div className="icon">
                      <img src='/assets/images/about/Union.png' />
                    </div>
                    <div className="content">
                      <p className="title">500</p>
                      <div className="webContent">
                        <p>Expert Team Members</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </section>*/}

        <section className="pb40 d-none d-lg-block">
            <div className="containerFull">
              <h4 className="heading fontHeading fontWeight700">Hiring Partner</h4>
            </div>
        </section>

        <section className="bgLightBlue pt40 pb40">
            <div className="containerFull">
            <h4 className="heading fontHeading fontWeight700 d-block d-lg-none mb-3">Hiring Partner</h4>

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

        <CallbackForm props={{queryString: queryString}}/>

    <Footer props={{queryString: queryString}}/>

    </div>
  )
}
