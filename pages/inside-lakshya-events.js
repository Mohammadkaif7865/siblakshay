import Head from 'next/head'
import React from 'react';
import Link from 'next/link';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EventSlider from "react-slick";
import PartnerSlider from "react-slick";
import TestimonialSlider from "react-slick";

// import { format } from 'date-fns';

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
    const res = await axios.get(`${CONSTANTS.API_URL}home/insidelakshyapage_data`, {
      headers: headers,
      withCredentials: true,
    }).catch((err) => console.log(err));
    const data = await res.data;

    return {
      props: { insidelakshyapage_data: data },
    }
}

export default function InsideLakshya({ insidelakshyapage_data }) {

  const { insidelakshyaeventspage, events, clubs } = insidelakshyapage_data;

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

  useEffect(() => {
    // setQueryString(window.location.search);
  }, []);


  return (
    <div>

    <Head>
        <title>{insidelakshyaeventspage[0].meta_title}</title>
        <meta name="keywords" content={insidelakshyaeventspage[0].meta_keywords}/>
        <meta name="description" content={insidelakshyaeventspage[0].meta_description}/>
    </Head>

      <Header props={{queryString: queryString}}/>

      <div className="bannerTopInnerPage bgPrimary">
          <div className="row align-items-lg-center">
            <div className="col-lg-6">
              <div className="leftInnerPagePr">
                <h1 className="heading bannerHeading iconsAbstract programHeading fontWeight700 text-white">{insidelakshyaeventspage[0].banner_title}</h1>
                <p className="text-white">{insidelakshyaeventspage[0].banner_subtitle}</p>
              </div>
            </div>
            <div className="col-lg-5 offset-lg-1">
              <div className="rightInnerPagePr">
                <img src={CONSTANTS.BACKEND_URL+insidelakshyaeventspage[0].banner_image} alt="Training Programmes"/>
              </div>
            </div>
          </div>
        </div>

        <section>
            <div className="containerFull">

                <h4 className="heading fontHeading fontWeight700 mb-4">{insidelakshyaeventspage[0].section_1_title}</h4>
                <div className="webContent">
                  <div dangerouslySetInnerHTML={createMarkup(insidelakshyaeventspage[0].section_1_description)}></div>
                </div>

                <div className="row">

                {events && events.map((event, index) => {
                  return <div key={index} className="col-md-6">
                    <div className="careerBox trainingProgramBox">
                      <div className="head">
                        <img src={CONSTANTS.BACKEND_URL+event.image} />
                        <p className="tag">{functions.formatDate(event.event_date, 'DD MMM YYYY')}</p>
                      </div>
                      <div className="body">
                        <p className="title mb-2">{event.name}</p>
                        <div className="webContent">
                          <div dangerouslySetInnerHTML={createMarkup(event.description)}></div>
                        </div>
                      </div>
                      <div className="foot">

                      {/*
                        <div className="d-flex flex-wrap columnEqual justify-content-between">
                          <Link href="" className="btnTheme" target="_blank">Register now</Link>
                          <Link href="" className="btnIcon btnPrimaryBorder" target="_blank"><img src='/assets/images/inside-lakshya/calendarIcon.png' /> Add to calendar</Link>
                        </div>
                        */}

                      </div>
                    </div>
                  </div>
                  })}

                </div>

            </div>
        </section>

        <section className="pt-0">
            <div className="containerFull">

              <h4 className="heading fontHeading fontWeight700 mb-4">{insidelakshyaeventspage[0].section_2_title}</h4>
              <div className="webContent">
                <div dangerouslySetInnerHTML={createMarkup(insidelakshyaeventspage[0].section_2_description)}></div>
              </div>

                {clubs && clubs.map((club, index) => {
                  return <div key={index} className={`clubBox ${index % 2 == 0 ? '' : 'reverse'}`}>
                    <div className="img">
                      <img src={CONSTANTS.BACKEND_URL+club.image} />
                    </div>
                    <div className="content">
                      <img src={CONSTANTS.BACKEND_URL+club.icon} className="iconImg" />
                      <p className="boxTitle">{club.name}}</p>
                      <div className="webContent">
                        <div dangerouslySetInnerHTML={createMarkup(club.description)}></div>
                      </div>
                      {/*<Link href="" className="btnIcon btnPrimaryBorder" target="_blank">View more</Link>*/}
                    </div>
                  </div>
                  })}

            </div>
        </section>

        {/*
        <section className="pt-0">
            <div className="containerFull">
              <h4 className="heading fontHeading fontWeight700 mb-4">Alumni Events</h4>
              <div className="webContent">
                <p>Get motivated and inspired for your own future career, hear from successful alumni about their careers and experiences and build networks with professionals in your field of interest.</p>
              </div>
              <EventSlider className="eventSlider slickSliderWrap" {...eventSettings}>
                <div className="eventItem">
                  <div className="eventBox">
                    <img src='/assets/images/inside-lakshya/event3.png' />
                    <p className="boxTitle">Alumni Talk Series</p>
                    <div className="webContent">
                      <p>Alumni Talk Series with existing students on a specific topic that will be pre shared. Selected alumni will come to the branch to address the students on different topics. There will be interactions with alumni, sharing of experiences, and</p>
                    </div>
                  </div>
                </div>

                <div className="eventItem">
                  <div className="eventBox">
                    <img src='/assets/images/inside-lakshya/event4.png' />
                    <p className="boxTitle">Alumni Meet</p>
                    <div className="webContent">
                      <p>In the selected branch, alumni from all branches will meet and greet each other and share their experiences. By doing so, the alumni are also able to notice the changes that have taken place over the past few years in the institution.</p>
                    </div>
                  </div>
                </div>

                <div className="eventItem">
                  <div className="eventBox">
                    <img src='/assets/images/inside-lakshya/event5.png' />
                    <p className="boxTitle">Commerce Conference</p>
                    <div className="webContent">
                      <p>International Commerce Conference is a platform for delegates and students all over the world. • In the Month of November • Open for all commerce students and professionals.</p>
                    </div>
                  </div>
                </div>

                <div className="eventItem">
                  <div className="eventBox">
                    <img src='/assets/images/inside-lakshya/event4.png' />
                    <p className="boxTitle">Alumni Meet</p>
                    <div className="webContent">
                      <p>In the selected branch, alumni from all branches will meet and greet each other and share their experiences. By doing so, the alumni are also able to notice the changes that have taken place over the past few years in the institution.</p>
                    </div>
                  </div>
                </div>

                </EventSlider>
            </div>
        </section>
        */}

        <CallbackForm props={{queryString: queryString}}/>

    <Footer props={{queryString: queryString}}/>

    </div>
  )
}
