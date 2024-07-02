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

import Header from "../comps/Header";
import Footer from "../comps/Footer";
import CallbackForm from "../comps/CallbackForm";

const headers = {
  'Content-Type': 'multipart/form-data',
  'Authorization': CONSTANTS.API_TOKEN
}

export const getServerSideProps = async () => {
    const res = await axios.get(`${CONSTANTS.API_URL}home/resultsData`, {
      headers: headers,
      withCredentials: true,
    }).catch((err) => console.log(err));
    const data = await res.data;

    return {
      props: { resultsData: data },
    }
}

export default function Results({ resultsData }) {

  const { resultspage: resultspage_1, courses: courses_1, rank_holders: rank_holders_1, years: years_1 } = resultsData;

  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tabNumber) => {
      setActiveTab(tabNumber);
      setToggleOpen(0);
  }

  const [toggleOpen, setToggleOpen] = useState(0);
  const handleToggleOpen = () => {
      setToggleOpen(!toggleOpen);
  }

  const [queryString, setQueryString] = useState('');

  const [resultspage, setResultspage] = useState(resultspage_1);
  const [courses, setCourses] = useState(courses_1);
  const [rank_holders, setRank_holders] = useState(rank_holders_1);
  const [years, setYears] = useState(years_1);

  const createMarkup = (content) => {
    return { __html: content };
  }

  const [yearSelect, setYearSelect] = useState('');

  const handleYearSelectChange = (event) => {
      setYearSelect(event.target.value);
  };

  const getResultsData = async () => {
    const res = await axios.get(`${CONSTANTS.API_URL}home/resultsData?year=${yearSelect}`, {
        headers: headers,
        withCredentials: true,
      }).catch((err) => console.log(err));
      const data = await res.data;
      if(data.courses) {
        setCourses(data.courses);
      }
      if(data.rank_holders) {
        setRank_holders(data.rank_holders);
      }
  };

  useEffect(() => {
    // setQueryString(window.location.search);
    getResultsData();
  }, [yearSelect]);

  return (
    <div>

      <Head>
          <title>{resultspage[0].meta_title}</title>
          <meta name="keywords" content={resultspage[0].meta_keywords}/>
          <meta name="description" content={resultspage[0].meta_description}/>
      </Head>

      <Header props={{queryString: queryString}}/>

      <div className="bannerTopInnerPage bannerIcon bgPrimary">
          <div className="row align-items-lg-center">
            <div className="col-lg-4">
              <div className="leftInnerPagePr">
                <h1 className="heading bannerHeading programHeading fontWeight700 text-white">{resultspage[0].banner_title}</h1>
                <p className="text-white">{resultspage[0].banner_subtitle}</p>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="rightInnerPagePr text-end blogMobileImg">
                <img src={CONSTANTS.BACKEND_URL+resultspage[0].banner_image} alt="Result Banner"/>
              </div>
            </div>
          </div>
        </div>

        <section>
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

                        {/*{courses &&
                        <li onClick={() => handleTabClick(courses.length + 1)} className={activeTab === courses.length + 1 ? 'active' : ''} style={{display: 'none'}}>Rank Holders </li>
                        }*/}

                      </ul>
                    </div>
                    <div className="col-md-2 col-6">
                      <div className="formHome yearFilter mb-mt-0">
                        <div className="formItemHome">
                            <select name="year" value={yearSelect} onChange={handleYearSelectChange} required>
                              <option value="">Year</option>
                              {years && years.map((year, index) => {
                                return <option key={index} value={year.year}>{year.year}</option>
                              })}
                            </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tabContent">
                  {courses && courses.map((course, index) => {
                    return <div key={index}>
                    {activeTab === index + 1 &&
                        <div>
                            <div className="innerTab">

                                <div className="row row-cols-lg-5 row-cols-2">

                                {course.results && course.results.map((rank_holder, index2) => {
                                  return <div key={index2} className="col">
                                    <div className="resultBox">
                                      <div className={`head ${rank_holder.score ? '' : 'no_score'}`}>
                                        <p className="shape"></p>
                                        <p className="rank">{rank_holder.score ? rank_holder.score : 0}</p>
                                        <img src={CONSTANTS.BACKEND_URL+rank_holder.image} />
                                      </div>
                                      <div className="body">
                                        <p className="boxTitle">{rank_holder.name}</p>
                                        <p className="rank">Score {rank_holder.score ? rank_holder.score : 0}</p>
                                        <p className="course">{rank_holder.course_name}</p>
                                        {rank_holder.subject &&
                                          <p className="subject">{rank_holder.subject}</p>
                                        }
                                        {rank_holder.year &&
                                          <p className="year">{rank_holder.year}</p>
                                        }
                                      </div>
                                    </div>
                                  </div>
                                })}

                                </div>

                            </div>
                        </div>}
                      </div>
                    })}


                    {courses && activeTab === courses.length + 1 && rank_holders &&
                      <div style={{display: 'none'}}>
                          <div className="innerTab">

                              <div className="row">

                                {rank_holders && rank_holders.map((rank_holder, index2) => {
                                  return <div key={index2} className="col-md-4">
                                    <div className="resultBox">
                                      <div className={`head ${rank_holder.score ? '' : 'no_score'}`}>
                                        <p className="shape"></p>
                                        <p className="rank">{rank_holder.score ? rank_holder.score : 0}</p>
                                      </div>
                                      <div className="body">
                                        <img src={CONSTANTS.BACKEND_URL+rank_holder.image} />
                                        <p className="boxTitle">{rank_holder.name}</p>
                                        <p className="course">{rank_holder.course_name}</p>
                                        {rank_holder.subject &&
                                          <p className="subject">{rank_holder.subject}</p>
                                        }
                                        {rank_holder.year &&
                                          <p className="year">{rank_holder.year}</p>
                                        }
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
