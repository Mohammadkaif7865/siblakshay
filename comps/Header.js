import React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Cookies from 'js-cookie';

import axios from "axios";
import * as CONSTANTS from "../constants/constants";

const headers = {
  'Content-Type': 'multipart/form-data',
  'Authorization': CONSTANTS.API_TOKEN
}

export default function Header({ props }) {

  const { queryString } = props;

  const router = useRouter();
  const { query } = router;

  const isLoginPage = ['/login','/sign-up','/forgot-password','/reset-password','/student-reset-password','/student-otp-verification','/student-forgot-password'].includes(router.pathname);

  const [courses, setCourses] = useState();
  const [setting, setSetting] = useState();

  const getCoursespageData = async () => {
    const res = await axios.get(`${CONSTANTS.API_URL}home/coursespage_data`, {
        headers: headers,
        withCredentials: true,
      }).catch((err) => console.log(err));
      const data = await res.data;
      if(data.courses) {
        setCourses(data.courses);
      }
  };

  const getGeneralData = async () => {
    const res = await axios.get(`${CONSTANTS.API_URL}home/generalData`, {
        headers: headers,
        withCredentials: true,
      }).catch((err) => console.log(err));
      const data = await res.data;
      if(data.setting) {
        setSetting(data.setting);
      }
  };

  const setSessionInBackend = async (userData) => {
    console.log(userData, "data");
    const res = await axios
      .post(`${CONSTANTS.API_URL}home/createSession`, userData, {
        headers: headers,
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    if (data.session) {
      sessionStorage.setItem("QueryData", JSON.stringify(data.session));
    }
  };

  const getSessionStorage = async () => {
    const res = await axios
      .get(`${CONSTANTS.API_URL}home/getSession`, {
        headers: headers,
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    if (data.session) {
      sessionStorage.setItem("QueryData", JSON.stringify(data.session));
    }
  };

  useEffect(() => {
    getCoursespageData();
    getGeneralData();

    if (router.query && (query.utm_source || query.utm_medium || query.utm_campaign || query.utm_content || query.creative || query.adgroupid || query.keyword || query.placement || query.device)) {

      // save utms in cookies
      const utms = {};
      utms.utm_source = query.utm_source ? encodeURIComponent(query.utm_source) : '';
      utms.utm_medium = query.utm_medium ? encodeURIComponent(query.utm_medium) : '';
      utms.utm_campaign = query.utm_campaign ? encodeURIComponent(query.utm_campaign) : '';
      utms.utm_content = query.utm_content ? encodeURIComponent(query.utm_content) : '';
      utms.creative = query.creative ? encodeURIComponent(query.creative) : '';
      utms.adgroupid = query.adgroupid ? encodeURIComponent(query.adgroupid) : '';
      utms.keyword = query.keyword ? encodeURIComponent(query.keyword) : '';
      utms.placement = query.placement ? encodeURIComponent(query.placement) : '';
      utms.device = query.device ? encodeURIComponent(query.device) : '';

      // Set a cookie that expires in 1 day
      // Cookies.set('utms_cookie', JSON.stringify(utms), { expires: 1 });

    }

  }, [router.query, router.query.utm_source, router.query.utm_medium, router.query.utm_campaign, router.query.utm_content, router.query.creative, router.query.adgroupid, router.query.keyword, router.query.placement, router.query.device]);

  useEffect(() => {
    const existData = sessionStorage.getItem("QueryData");
    console.log(existData, "existData");
    if (existData === null || existData === undefined) {
      const urlParams = window.location.href?.split("?");
      console.log(urlParams, "urlParams");
      if (urlParams && urlParams.length > 1) {
        const paramsArray = urlParams[1].split("&");

        const paramsObject = {};

        paramsArray.forEach((param) => {
          const [key, value] = param.split("=");
          const decodedValue = decodeURIComponent(value?.replace(/\+/g, " "));
          if (
            decodedValue !== "" &&
            decodedValue !== "undefined" &&
            decodedValue !== null
          ) {
            paramsObject[key] = decodedValue;
          }
        });
        // Cookies.set("QueryData", JSON.stringify(paramsObject));
        setSessionInBackend(paramsObject);
        // return;
      }
    }
    getSessionStorage();
  }, [router]);

  return (
    <div>
        {isLoginPage ? null : (
          <div>
            <header className="header stricky stricky-fixed">
                <div className="topHeader">
                    <div className="containerFull">
                        <div className="inlineHeader">
                            <p className="text-white"></p>
                            <Link href={'/about-us'+queryString}>
                              <a className="btnHeaderLink">Learn more</a>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="MainHeader">
                    <div className="containerFull">
                        <div className="inlineHeader">
                            <div className="leftLogo">
                                <div className="logoImg">
                                    <Link href={'/'+queryString}><a>
                                        <picture>
                                            <source srcSet={setting ? CONSTANTS.BACKEND_URL+setting[0].logo : "/assets/images/logo.png"} type="image/webp" />
                                            <img src={setting ? CONSTANTS.BACKEND_URL+setting[0].logo : "/assets/images/logo.png"} alt="Indian Institute of Commerce | Lakshya" />
                                        </picture>
                                    </a></Link>
                                </div>
                                <div className="dropdown hide_mb">
                                    <button className="btnTheme dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        Courses
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        {courses && courses.map((course, index) => {
                                          return <li key={index}><Link href={'/course/'+course.slug+queryString}><a className="dropdown-item">{course.name}</a></Link></li>
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className="rightHeader">
                                <div className="menuList">
                                    <ul>
                                        <li><Link href={'/'+queryString}><a>Home</a></Link></li>
                                        <li><Link href={'/our-faculties'+queryString}><a>Our Faculties</a></Link></li>
                                        <li><Link href={'/contact-us'+queryString}><a>Contact us</a></Link></li>
                                        <li className="dropdown">
                                            <a className="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                                More
                                            </a>
                                            <ul className="dropdown-menu web-dropdown-menu" aria-labelledby="dropdownMenuButton2">
                                                <li><Link href={'/about-us'+queryString}><a className="dropdown-item">About us</a></Link></li>
                                                <li><Link href={'/careers'+queryString}><a className="dropdown-item">Career</a></Link></li>
                                                <li><Link href={'/training-programs'+queryString}><a className="dropdown-item">Training</a></Link></li>
                                                <li><Link href={'/inside-lakshya-events'+queryString}><a className="dropdown-item">Inside Lakshya</a></Link></li>
                                                <li><Link href={'/hire-from-us'+queryString}><a className="dropdown-item">Hire from us</a></Link></li>
                                                <li><Link href={'/master-class'+queryString}><a className="dropdown-item">Master Class</a></Link></li>
                                                <li><Link href={'/results'+queryString}><a className="dropdown-item">Results</a></Link></li>
                                                <li><Link href={'/hiring-partners'+queryString}><a className="dropdown-item">Hiring Partners</a></Link></li>
                                                <li><Link href={'/gallery'+queryString}><a className="dropdown-item">Gallery</a></Link></li>
                                                <li><Link href={'/blogs'+queryString}><a className="dropdown-item">Blog</a></Link></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div className="headerRightBtn">
                                    <Link href={'https://study.lakshyacommerce.com/'}>
                                      <a className="btnTheme" target="_blank">Sign Up</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <button className="extraMenu" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><i className="fa fa-bars"></i></button>

            <div className="offcanvas headerOffcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                  <div className="offcanvas-header">
                      <div className="offcanvaLogo">
                            <Link href={'/'+queryString}><a>
                                <picture>
                                    <source srcSet={setting ? CONSTANTS.BACKEND_URL+setting[0].logo : "/assets/images/logo.png"} type="image/webp" />
                                    <img src={setting ? CONSTANTS.BACKEND_URL+setting[0].logo : "/assets/images/logo.png"} alt="Indian Institute of Commerce | Lakshya" />
                                </picture>
                            </a></Link>
                        </div>
                      <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                  </div>
                  <div className="offcanvas-body">
                      <div className="extraMenuItems" id="mobileSub">
                          <ul>
                              <li data-bs-dismiss="offcanvas"><Link href={'/'+queryString}><a>Home</a></Link></li>
                              <li data-bs-dismiss="offcanvas"><Link href={'/our-faculties'+queryString}><a>Our Faculties</a></Link></li>
                              <li data-bs-dismiss="offcanvas"><Link href={'/contact-us'+queryString}><a>Contact us</a></Link></li>
                              <li className="itemSub"><Link href={'/'+queryString}><a data-bs-dismiss="offcanvas">Courses</a></Link> <button className="subBtn" data-bs-toggle="collapse" data-bs-target="#websiteDesign" aria-expanded="true" aria-controls="websiteDesign"><i className="fa fa-chevron-down"></i></button>
                                      <ul id="websiteDesign" className="collapse"  data-bs-parent="#mobileSub">
                                          {courses && courses.map((course, index) => {
                                            return <li key={index} data-bs-dismiss="offcanvas"><Link href={'/course/'+course.slug+queryString}><a>{course.name}</a></Link></li>
                                          })}
                                      </ul>
                                  </li>

                                  <li className="itemSub"><Link href={'/'+queryString}><a data-bs-dismiss="offcanvas">More</a></Link> <button className="subBtn" data-bs-toggle="collapse" data-bs-target="#smoMenu" aria-expanded="true" aria-controls="smoMenu"><i className="fa fa-chevron-down"></i></button>
                                      <ul id="smoMenu" className="collapse" data-bs-parent="#mobileSub">
                                          <li data-bs-dismiss="offcanvas"><Link href={'/about-us'+queryString}><a className="dropdown-item">About us</a></Link></li>

                                          <li data-bs-dismiss="offcanvas"><Link href={'/careers'+queryString}><a className="dropdown-item">Career</a></Link></li>
                                          <li data-bs-dismiss="offcanvas"><Link href={'/training-programs'+queryString}><a className="dropdown-item">Training</a></Link></li>
                                          <li data-bs-dismiss="offcanvas"><Link href={'/inside-lakshya-events'+queryString}><a className="dropdown-item">Inside Lakshya</a></Link></li>
                                          <li data-bs-dismiss="offcanvas"><Link href={'/hire-from-us'+queryString}><a className="dropdown-item">Hire from us</a></Link></li>
                                          <li data-bs-dismiss="offcanvas"><Link href={'/master-class'+queryString}><a className="dropdown-item">Master Class</a></Link></li>
                                          <li data-bs-dismiss="offcanvas"><Link href={'/results'+queryString}><a className="dropdown-item">Results</a></Link></li>
                                          <li data-bs-dismiss="offcanvas"><Link href={'/hiring-partners'+queryString}><a className="dropdown-item">Hiring Partners</a></Link></li>
                                          <li data-bs-dismiss="offcanvas"><Link href={'/gallery'+queryString}><a className="dropdown-item">Gallery</a></Link></li>
                                          <li data-bs-dismiss="offcanvas"><Link href={'/blogs'+queryString}><a className="dropdown-item">Blog</a></Link></li>
                                      </ul>
                                  </li>
                                  <li data-bs-dismiss="offcanvas">
                                    <Link href={'https://study.lakshyacommerce.com/'}>
                                      <a className="btnTheme" target="_blank">Sign Up</a>
                                    </Link>
                                  </li>
                          </ul>
                      </div>
                  </div>
              </div>

          </div>
        )}
    </div>
  )
}
