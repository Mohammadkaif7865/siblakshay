import React, { useEffect, useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import Header from "../comps/Header";
import Footer from "../comps/Footer";
import CallbackForm from "../comps/CallbackForm";
import CourseForm from "../comps/CourseForm";

import axios from "axios";
import * as CONSTANTS from "../constants/constants";

import CountUp from 'react-countup';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CourseSlider from "react-slick";
import VideoSlider from "react-slick";
import PartnerSlider from "react-slick";
import MobilePartnerSlider from "react-slick";
import TestimonialSlider from "react-slick";
import MediaSlider from "react-slick";

const headers = {
  'Content-Type': 'multipart/form-data',
  'Authorization': CONSTANTS.API_TOKEN
}

export const getServerSideProps = async () => {
    const res = await axios.get(`${CONSTANTS.API_URL}home/homepage_data`, {
      headers: headers,
      withCredentials: true,
    }).catch((err) => console.log(err));
    const data = await res.data;

    return {
      props: { homepage_data: data },
    }
}

export default function Home({ homepage_data }) {

  const { homepage, setting, sliders, advantages, videos, partners, mobile_partners, testimonials, medias, courses } = homepage_data;

  const putFileInModal = (e) => {
    window.updateModalFile(e.target.href);
  };

  const removeModalFile = (e) => {
    window.updateModalFile('');
  };

  const createMarkup = (content) => {
    return { __html: content };
  }

  const [queryString, setQueryString] = useState('');

  var settings = {
      dots: true,
      infinite: true,
      speed: 300,
      autoplay: true,
      autoplaySpeed: 12000,
      arrows: false,
      slidesToShow: 3,
      slidesToScroll: 3,
      // rtl: false,
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
  var exploreSettings = {
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
      dots: true,
      infinite: true,
      speed: 300,
      autoplay: true,
      autoplaySpeed: 12000,
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
  var mediaSettings = {
      dots: true,
      infinite: true,
      speed: 300,
      autoplay: true,
      autoplaySpeed: 12000,
      arrows: false,
      slidesToShow: 4,
      slidesToScroll: 4,
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
    <>

      <Head>
        <title>{homepage[0].meta_title}</title>
        <meta name="keywords" content={homepage[0].meta_keywords}/>
        <meta name="description" content={homepage[0].meta_description}/>
        <meta name="google-site-verification" content="gVfsfCzt8KuuYGeiKW6PA1wVysuZ8rNNzXwUtrqbRYU" />

        <script type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
               "@context": "https://schema.org",
               "@type": "Organization",
               "image": "https://www.lakshyacommerce.com/static/media/logo.33a9a921f736b6a8d332.webp",
               "url": "https://www.lakshyacommerce.com",
               "sameAs": ["https://youtube.com/@iiclakshya?si=DcWKdHfmTNJ7gcTe", "https://www.facebook.com/iiclakshyakochi?mibextid=LQQJ4d","https://www.instagram.com/iiclakshya?igsh=MTZma3B2NTVpNXF5ag=="],
               "logo": "https://www.lakshyacommerce.com/static/media/logo.33a9a921f736b6a8d332.webp",
               "name": "Indian Institute of Commerce | Lakshya",
               "description": "Best Commerce, Finance and Accounting Courses | Online and Offline | IIC Lakshya",
               "email": "info@iiclakshya.com",
               "telephone": "+91 90612 77777",
               "address": {
                 "@type": "PostalAddress",
                 "streetAddress": "Adv Easwara lyer Rd, Pullepady Kochi, Kerala 682035",
                 "addressLocality": "Pullepady Kochi",
                 "addressRegion": "Kerala",
                 "addressCountry": "India",
                 "postalCode": "682035"
               }
             }) }}
        />

      </Head>

      <Header props={{queryString: queryString}}/>

      <div className="sliderHome">
              <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-inner">

                    {sliders && sliders.map((slider, index) => {
                      return <div key={index} className={'carousel-item ' + (index == 0 ? 'active' : '') + (index == 1 ? 'bgDarkBlue' : '')}>
                        <div className="containerFull">
                          <div className="row">
                              <div className="col-lg-6">
                                  <div className="bannerLeft">
                                      <h1 className="large_heading fontHeading" dangerouslySetInnerHTML={createMarkup(slider.name)}></h1>
                                      <div dangerouslySetInnerHTML={createMarkup(slider.description)}></div>
                                      <div className="btnBanners">
                                          <Link href={slider.btn_1_link+queryString}>
                                            <a className="btnTheme">{slider.btn_1_text}</a>
                                          </Link>
                                          <Link href={slider.btn_2_link}>
                                            <a className="btnPrimaryBorder mx-lg-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">{slider.btn_2_text}</a>
                                          </Link>
                                      </div>
                                  </div>
                              </div>
                              <div className="col-lg-6">
                                  <div className="bannerRight">
                                      <picture>
                                          <source srcSet={CONSTANTS.BACKEND_URL+slider.image} type="image/webp"/>
                                          <img src={CONSTANTS.BACKEND_URL+slider.image} alt={slider.name}/>
                                      </picture>
                                  </div>
                              </div>
                          </div>
                        </div>
                      </div>
                      })}

                  </div>
                  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"><i className="fas fa-chevron-left"></i></span>
                      <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"><i className="fas fa-chevron-right"></i></span>
                      <span className="visually-hidden">Next</span>
                  </button>
              </div>
          <div className="rightCircle"></div>
      </div>

      {setting &&
      <div className="bannerBottomCounter bgPrimary counter">
          <div className="containerFull">
              <div className="row">
                  <div className="col-lg-3 col-6">
                      <div className="counterItem">
                          <h3 className="heading fontHeading fontWeight700 text-white"><span className="counter-value"><CountUp end={setting[0].faculty} />+</span></h3>
                          <p>Faculty & Program Experts</p>
                      </div>
                  </div>
                  <div className="col-lg-3 col-6">
                      <div className="counterItem">
                          <h3 className="heading fontHeading fontWeight700 text-white"><span className="counter-value"><CountUp end={setting[0].placements} />+</span></h3>
                          <p>Global & National Ranks</p>
                      </div>
                  </div>
                  <div className="col-lg-3 col-6">
                      <div className="counterItem">
                          <h3 className="heading fontHeading fontWeight700 text-white"><span className="counter-value"><CountUp end={setting[0].active_students} />+</span></h3>
                          <p>Active students</p>
                      </div>
                  </div>
                  <div className="col-lg-3 col-6">
                      <div className="counterItem">
                          <h3 className="heading fontHeading fontWeight700 text-white"><span className="counter-value"><CountUp end={setting[0].campuses} />+</span></h3>
                          <p>IIC Lakshya Alumni</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      }

      <section className="bgLight pb-5">
          <div className="containerFull">
              <h4 className="heading fontHeading fontWeight700">{homepage[0].course_title}</h4>
              <CourseSlider className="coursesSlider dotSlider" {...settings}>
              {courses && courses.map((course, index) => {
                  return <div key={index} className="itemCourseSlider">
                      <div className="mainCourse">
                          <div className="innerCourse">
                              <Link href={'/course/'+course.slug+queryString}>
                                <a className="courseCard">
                                  <picture>
                                      <source srcSet={CONSTANTS.BACKEND_URL+course.image} type="image/webp"/>
                                      <img src={CONSTANTS.BACKEND_URL+course.image} alt={course.name}/>
                                  </picture>
                                  <h4 className="small_heading fontHeading fontWeight600 mt-3">{course.name}</h4>
                                  <div className="courseDescriptionHome mt-2" dangerouslySetInnerHTML={createMarkup(course.short_description)}>

                                  </div>
                                </a>
                              </Link>
                              <div className="d-flex flex-wrap columnEqual justify-content-between">
                                  <Link href={CONSTANTS.BACKEND_URL+course.brochure}>
                                     <a onClick={putFileInModal} className="btnTheme" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                      Brochure <i className="fa fa-download"></i>
                                    </a>
                                  </Link>
                                  <Link href={'/course/'+course.slug+queryString}>
                                    <a className="btnPrimaryBorder">Know more</a>
                                  </Link>
                              </div>
                          </div>
                      </div>
                  </div>
                })}
              </CourseSlider>
          </div>
      </section>
      <section className="bgPrimary py-0">
          <div className="containerFull">
              <div className="headerSection">
                  <h4 className="heading fontHeading text-white fontWeight700">{homepage[0].advantage_title}</h4>
                  <div className="mt-2 text-white" dangerouslySetInnerHTML={createMarkup(homepage[0].advantage_description)}></div>
              </div>
              <div className="row align-items-end">

                <div className="col-lg-7">
                    <div className="rightActor">

                      {advantages && advantages.map((advantage, index) => {
                        return <div key={index} className="itemActor">
                            <div className="headerActor">
                                <div className="leftHeaderActor">
                                    <picture>
                                        <source srcSet={CONSTANTS.BACKEND_URL+advantage.image}/>
                                        <img src={CONSTANTS.BACKEND_URL+advantage.image} alt={advantage.name}/>
                                    </picture>
                                </div>
                                <h4 className="title fontWeight600 fontHeading">{advantage.name}</h4>
                            </div>
                            <div dangerouslySetInnerHTML={createMarkup(advantage.description)}></div>
                        </div>
                        })}

                    </div>
                </div>

                  <div className="col-lg-5">
                      <div className="leftActor">
                          <picture>
                              <source srcSet="/assets/images/actor-right.png" type="image/webp"/>
                              <img src="/assets/images/actor-right.png" alt="Left Advantage"/>
                          </picture>
                      </div>
                  </div>

              </div>
          </div>
      </section>
      <section className="bgLight pb-5">
          <div className="containerFull">
              <h4 className="heading fontHeading fontWeight700">{homepage[0].video_title}</h4>
              <VideoSlider className="videoSlider dotSlider" {...exploreSettings}>

                  {videos && videos.map((video, index) => {
                  return <div key={index} className="itemCourseSlider freeVideoItem">
                      <div className="innerVideo">
                          <div className="videoImg">
                              <picture>
                                  <source srcSet={CONSTANTS.BACKEND_URL+video.image} />
                                  <img src={CONSTANTS.BACKEND_URL+video.image} alt={video.name}/>
                              </picture>
                          </div>
                          <div className="freeVideoDescription">
                              <div className="mt-2" dangerouslySetInnerHTML={createMarkup(video.description)}></div>
                          </div>
                      </div>
                  </div>
                  })}

              </VideoSlider>
          </div>
      </section>
      <section>
          <div className="containerFull">
              <h4 className="heading fontHeading fontWeight700">{homepage[0].partner_title}</h4>

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
      <section className="bgLight pb-5">
          <div className="containerFull">
              <h4 className="heading fontHeading fontWeight700">{homepage[0].testimonial_title}</h4>
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
                                      <source srcSet="/assets/images/icons/qoute.png" type="image/webp"/>
                                      <img src="/assets/images/icons/qoute.png" alt={testimonial.name}/>
                                  </picture>
                              </div>
                          </div>
                      </div>
                  </div>
                  })}

              </TestimonialSlider>
          </div>
      </section>
      <section>
          <div className="containerFull">
              <div className="row">
                  <div className="col-lg-6">
                      <h4 className="heading fontHeading fontWeight700">{homepage[0].media_title}</h4>
                      <div className="text mt-2" dangerouslySetInnerHTML={createMarkup(homepage[0].media_description)}></div>
                  </div>
              </div>
              <div className="row mt-4 mt-lg-4">

              <MediaSlider className="mediaSlider dotSlider" {...mediaSettings}>

                {medias && medias.map((media, index) => {
                  return <div key={index} className="mediaItem">
                    <Link href={media.link}>
                        <a target="_blank" className="itemPresence">
                            <div className="itemPresenceHeader">
                              <picture>
                                  <source srcSet={CONSTANTS.BACKEND_URL+media.image} type="image/webp"/>
                                  <img src={CONSTANTS.BACKEND_URL+media.image} alt={media.name}/>
                              </picture>
                          </div>
                          <div className="mt-3" dangerouslySetInnerHTML={createMarkup(media.description)}></div>
                        </a>
                    </Link>
                  </div>
                  })}

              </MediaSlider>

              </div>
          </div>
      </section>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Drop your info to proceed</h5>
              <button type="button" onClick={removeModalFile} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <CourseForm props={{type: 'modal', active_course_id: '', queryString: queryString}} />
            </div>
          </div>
        </div>
      </div>

      <CallbackForm props={{queryString: queryString}}/>

      <Footer props={{queryString: queryString}}/>

    </>
  )
}
