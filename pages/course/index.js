import React, { useEffect, useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';

import Header from "../../comps/Header";
import Footer from "../../comps/Footer";

import axios from "axios";
import * as CONSTANTS from "../../constants/constants";

const headers = {
  'Content-Type': 'multipart/form-data',
  'Authorization': CONSTANTS.API_TOKEN
}

export const getServerSideProps = async () => {
    const res = await axios.get(`${CONSTANTS.API_URL}home/coursespage_data`, {
      headers: headers,
      withCredentials: true,
    }).catch((err) => console.log(err));
    const data = await res.data;

    return {
      props: { coursespage_data: data },
    }
}

export default function Courses({ coursespage_data }) {

  const { coursespage, courses } = coursespage_data;

  const [queryString, setQueryString] = useState('');
  // get data from api end

  const createMarkup = (content) => {
    return { __html: content };
  }

  useEffect(() => {
    // setQueryString(window.location.search);
  }, []);

  return (
    <>

        <Head>
            <title>{coursespage[0].meta_title}</title>
            <meta name="keywords" content={coursespage[0].meta_keywords}/>
            <meta name="description" content={coursespage[0].meta_description}/>
        </Head>

        <Header props={{queryString: queryString}}/>
          <section className="bgPrimary position-relative all_courses_section">
            <div className="all_courses_section_inner_wrap">
              <div className="elipse1">
                  <picture>
                      <source srcSet="/assets/images/ellipse.png" type="image/webp"/>
                      <img src="/assets/images/ellipse.png" alt="Elipse"/>
                  </picture>
              </div>
              <div className="elipse2">
                  <picture>
                      <source srcSet="/assets/images/ellipse.png" type="image/webp"/>
                      <img src="/assets/images/ellipse.png" alt="Elipse"/>
                  </picture>
              </div>
              <div className="elipse3">
                  <picture>
                      <source srcSet="/assets/images/ellipse2.png" type="image/webp"/>
                      <img src="/assets/images/ellipse2.png" alt="Elipse"/>
                  </picture>
              </div>
              <div className="substractLeft">
                  <picture>
                      <source srcSet="/assets/images/subtract-left.png" type="image/webp"/>
                      <img src="/assets/images/subtract-left.png" alt="Substract"/>
                  </picture>
              </div>
              <div className="containerFull">
                  <h1 className="heading fontWeight700 text-white">Courses</h1>
                  <div className="row mt-lg-4">
                  {courses && courses.map((course, index) => {
                      return <div key={index} className="col-lg-3">
                          <div className="courseItem">
                              <Link href={'/course/'+course.slug+queryString}><a>
                                  <picture>
                                      <source srcSet={CONSTANTS.BACKEND_URL+course.image} type="image/webp"/>
                                      <img src={CONSTANTS.BACKEND_URL+course.image} alt={course.name}/>
                                  </picture>
                                  <div className="courseName">
                                      <p className="fontWeight600">{course.name}</p>
                                  </div>
                              </a></Link>
                          </div>
                      </div>
                    })}
                  </div>
              </div>
              <div className="substractRight">
                  <picture>
                      <source srcSet="/assets/images/subtract-right.png" type="image/webp"/>
                      <img src="/assets/images/subtract-right.png" alt="Substract"/>
                  </picture>
              </div>
              <div className="elipse4">
                  <picture>
                      <source srcSet="/assets/images/ellipse.png" type="image/webp"/>
                      <img src="/assets/images/ellipse.png" alt="Elipse"/>
                  </picture>
              </div>
              <div className="elipse5">
                  <picture>
                      <source srcSet="/assets/images/ellipse.png" type="image/webp"/>
                      <img src="/assets/images/ellipse.png" alt="Elipse"/>
                  </picture>
              </div>
            </div>
          </section>
    </>
  )
}
