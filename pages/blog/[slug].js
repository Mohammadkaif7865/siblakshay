import { useRouter } from 'next/router';

import Head from 'next/head';
import React from 'react';
import Link from 'next/link';

import Header from "../../comps/Header";
import Footer from "../../comps/Footer";
import CallbackForm from "../../comps/CallbackForm";

import { useEffect, useState } from 'react';
import axios from "axios";
import * as CONSTANTS from "../../constants/constants";
import * as functions from "../../functions/functions";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RelatedBlogSlider from "react-slick";

const headers = {
  'Content-Type': 'multipart/form-data',
  'Authorization': CONSTANTS.API_TOKEN
}

// export const getStaticPaths = async () => {
//
//   const res = await axios.get(`${CONSTANTS.API_URL}home/blogspage_data`, {
//     headers: headers
//   }).catch((err) => console.log(err));
//   const data = await res.data;
//
//   const paths = data.blogs.map(blog => {
//     return {
//       params: { slug: blog.slug.toString() }
//     }
//   })
//
//   return {
//     paths,
//     fallback: false
//   }
// }

export const getServerSideProps = async (context) => {
  const slug = context.params.slug;

  const res = await axios.get(`${CONSTANTS.API_URL}home/single_blog/${slug}`, {
      headers: headers,
      withCredentials: true,
    }).catch((err) => console.log(err));
  const data = await res.data;

  return {
    props: { single_blog_data: data }
  }
}

const Details = ({ single_blog_data }) => {

  const router = useRouter();
  const { pathname } = useRouter();

  const { blog, other_blogs, tags_names } = single_blog_data;

  const [queryString, setQueryString] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    // setQueryString(window.location.search);
  }, [pathname]);

  const createMarkup = (content) => {
    return { __html: content };
  }

  var relatedBlogSettings = {
      dots: true,
      infinite: false,
      speed: 300,
      autoplay: true,
      autoplaySpeed: 4000,
      arrows: false,
      slidesToShow: 2,
      slidesToScroll: 1,

      responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
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
              arrows: true,
            }
          }
        ]
  }

  return (
    <>

    {blog && blog.length > 0 ? (
        <>

        <Head>
          <title>{blog[0].meta_title}</title>
          <meta name="keywords" content={blog[0].meta_keywords}/>
          <meta name="description" content={blog[0].meta_description}/>
        </Head>

      <Header props={{queryString: queryString}}/>

        <section>
            <div className="containerFull">

            <div class="webBreadcrumb">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <Link href={'/'+queryString}>
                      <a><img src='/assets/images/blog/icons/Home.png' /><span>Home</span></a>
                    </Link>
                  </li>
                  <li class="breadcrumb-item" aria-current="page">
                    <Link href="javascript:void(0)">
                      <a><span>{blog[0].blog_category_name}</span></a>
                    </Link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page"> <span>{blog[0].name}</span> </li>
                </ol>
              </nav>
            </div>

            <div className="blogSingle">

                <h1 className="heading fontHeading fontWeight700 mb-4 mt-4">{blog[0].name}</h1>

                <div className="iconWrap">
                  <p className="iconBox">
                    <img src='/assets/images/blog/icons/userIcon.png' />
                    <span>By {blog[0].author}</span>
                  </p>
                  <p className="iconBox">
                    <img src='/assets/images/blog/icons/calendarIcon.png' />
                    <span>{functions.formatDate(blog[0].blog_date, 'DD MMM YYYY')}</span>
                  </p>
                  <p className="iconBox">
                    <img src='/assets/images/blog/icons/tagIcon.png' />
                    <span>{tags_names}</span>
                  </p>
                  {/*<p className="iconBox">
                    <img src='/assets/images/blog/icons/commentIcon.png' />
                    <span>0 Comments</span>
                  </p>*/}
                </div>

              </div>

              <div class="singleBlogImg">
                <img src={CONSTANTS.BACKEND_URL+blog[0].image} alt={blog[0].image_alt} />
              </div>

              <div class="webContent singleBlogContent minIcon vectorIcon tableCustom">
                <div dangerouslySetInnerHTML={createMarkup(blog[0].description)}></div>
              </div>

            </div>
        </section>


        <section className="pt-0">
            <div className="containerFull">
              <h4 className="heading fontHeading fontWeight700 mb-4">Related Course</h4>

                <RelatedBlogSlider className="relatedBlogSlider dotSlider" {...relatedBlogSettings}>
                {other_blogs && other_blogs.map((other_blog, index) => {
                  return <div key={index} class="relatedBlogBox">
                    <Link href={'/blog/'+other_blog.slug+queryString}>
                      <a><img src={CONSTANTS.BACKEND_URL+other_blog.image} /></a>
                    </Link>
                  </div>
                  })}
                </RelatedBlogSlider>

            </div>
        </section>

        <CallbackForm props={{queryString: queryString}}/>

    <Footer props={{queryString: queryString}}/>

    </>
      ) : (<></>) }

    </>
  )

}

export default Details;
