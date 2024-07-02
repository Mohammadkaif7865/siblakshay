import Head from 'next/head'
import React from 'react';
import Link from 'next/link';

// import { format } from 'date-fns';

import { useEffect, useState } from 'react';
import axios from "axios";
import * as CONSTANTS from "../../constants/constants";
import * as functions from "../../functions/functions";

import Header from "../../comps/Header";
import Footer from "../../comps/Footer";
import CallbackForm from "../../comps/CallbackForm";


const headers = {
  'Content-Type': 'multipart/form-data',
  'Authorization': CONSTANTS.API_TOKEN
}

export const getServerSideProps = async () => {
    const res = await axios.get(`${CONSTANTS.API_URL}home/blogspage_data`, {
      headers: headers,
      withCredentials: true,
    }).catch((err) => console.log(err));
    const data = await res.data;

    return {
      props: { blogspage_data: data },
    }
}

export default function Blog({ blogspage_data }) {

  const { blogspage, blogs } = blogspage_data;

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
        <title>{blogspage[0].meta_title}</title>
        <meta name="keywords" content={blogspage[0].meta_keywords}/>
        <meta name="description" content={blogspage[0].meta_description}/>
    </Head>

      <Header props={{queryString: queryString}}/>

      <div className="bannerTopInnerPage bgPrimary">
          <div className="row align-items-lg-center">
            <div className="col-lg-5">
              <div className="leftInnerPagePr">
                <h1 className="heading bannerHeading programHeading blogIcon fontWeight700 text-white">{blogspage[0].banner_title}</h1>
                <p className="text-white">{blogspage[0].banner_subtitle}</p>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="rightInnerPagePr blogMobileImg">
                <img src={CONSTANTS.BACKEND_URL+blogspage[0].banner_image} alt="Blog Banner"/>
              </div>
            </div>
          </div>
        </div>

        <section>
            <div className="containerFull">
              <h4 className="heading fontHeading fontWeight700 mb-4">{blogspage[0].section_1_title}</h4>

              {/*<div className="row">
                 <div className="col-md-3">
                    <div className="formItemHome">
                       <input type="text" placeholder="Search blog"/>
                    </div>
                 </div>
                 <div className="col-md-3">
                    <div className="formItemHome">
                       <select>
                          <option>Recent Comments</option>
                       </select>
                    </div>
                 </div>
                 <div className="col-md-3">
                    <div className="formItemHome">
                       <select>
                          <option>Archives</option>
                       </select>
                    </div>
                 </div>
                 <div className="col-md-3">
                    <div className="formItemHome">
                       <select>
                          <option>Categories</option>
                       </select>
                    </div>
                 </div>
              </div>*/}

              <div className="row">

                {blogs && blogs.map((blog, index) => {
                  return <div key={index} className="col-md-6">
                  <div className="careerBox trainingProgramBox blogBox">
                    <div className="head">
                      <img src={CONSTANTS.BACKEND_URL+blog.image} />
                    </div>
                    <div className="body">
                      <p className="title mb-2">{blog.name}</p>

                      <div className="iconWrap">
                        <p className="iconBox">
                          <img src='/assets/images/blog/icons/userIcon.png' />
                          <span>By {blog.author}</span>
                        </p>
                        <p className="iconBox">
                          <img src='/assets/images/blog/icons/calendarIcon.png' />
                          <span>{functions.formatDate(blog.blog_date, 'DD MMM YYYY')}</span>
                        </p>
                        {/*<p className="iconBox">
                          <img src='/assets/images/blog/icons/tagIcon.png' />
                          <span>CMA USA</span>
                        </p>*/}
                        {/*<p className="iconBox">
                          <img src='/assets/images/blog/icons/commentIcon.png' />
                          <span>0 Comments</span>
                        </p>*/}
                      </div>

                    </div>
                    <div className="foot">
                      <div className="d-flex flex-wrap">
                        <Link href={'/blog/'+blog.slug+queryString}><a className="text-decoration-underline">Read more</a></Link>
                      </div>
                    </div>
                  </div>
                </div>
                })}

              </div>

              <div className="blogsFooter">

                {/*<nav className="webPagination" aria-label="Page navigation example">
                  <ul className="pagination justify-content-lg-end justify-content-center mt-3 mt-lg-0">
                    <li className="page-item">
                      <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">
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
                </nav>*/}

              </div>

            </div>
        </section>

        <CallbackForm props={{queryString: queryString}}/>

    <Footer props={{queryString: queryString}}/>


    </div>
  )
}
