import { useRouter } from 'next/router';

import Head from 'next/head';
import React from 'react';
import Link from 'next/link';

import Header from "../../comps/Header";
import Footer from "../../comps/Footer";
import CourseForm from "../../comps/CourseForm";

import CountUp from 'react-countup';

import Cookies from 'js-cookie';

import { useEffect, useState } from 'react';
import axios from "axios";
import * as CONSTANTS from "../../constants/constants";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import FacultySlider from "react-slick";
import PartnerSlider from "react-slick";
import RankSlider from "react-slick";
import TestimonialSlider from "react-slick";
import CourseMoreSlider from "react-slick";
import VideoSlider from "react-slick";
import MiniTestiSlider from "react-slick";

const headers = {
  'Content-Type': 'multipart/form-data',
  'Authorization': CONSTANTS.API_TOKEN
}

// export const getStaticPaths = async () => {
//
//   const res = await axios.get(`${CONSTANTS.API_URL}home/coursespage_data`, {
//     headers: headers
//   }).catch((err) => console.log(err));
//   const data = await res.data;
//
//   const paths = data.courses.map(course => {
//     return {
//       params: { slug: course.slug.toString() }
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

  const res = await axios.get(`${CONSTANTS.API_URL}home/single_course/${slug}`, {
      headers: headers,
      withCredentials: true,
    }).catch((err) => console.log(err));
  const data = await res.data;

  return {
    props: { single_course_data: data }
  }
}

const Details = ({ single_course_data }) => {

  const router = useRouter();
  const { query } = router;
  const { pathname } = useRouter();

  const { course, syllabus, highlight, faculty, advantage, partner: partners, rank_holder, testimonial: testimonials, career_option, video: videos, course_faq } = single_course_data;

  const [phoneNumber, setPhoneNumber] = useState('');
  const [clientIP, setClientIP] = useState('');
  const [formSending, setFormSending] = useState(false);

  const [pageUrl, setPageUrl] = useState('');

  const [queryString, setQueryString] = useState('');

  const renderCourseForm = (active_course_id) => {
   return <CourseForm props={{type: 'modal', active_course_id: active_course_id, queryString: queryString}} />;
  }

  useEffect(() => {

    setPageUrl(window.location.href);

    window.scrollTo(0, 0);
    setActiveTab(1);

    fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => setClientIP(data.ip))
    .catch(error => console.log(error));

    // setQueryString(window.location.search);

    // Ensure jQuery code runs after the component has mounted
    $(document).ready(function() {

      $('#course-form').validate({ // Initialize jQuery Validate on #my-form
        rules: {
          city: {
            noSpaces: true
          }
        }
      });

    });


  }, [pathname]);

  // course_enquiry start
  const [course_enquiryInputs, setcourse_enquiryInputs] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
  });

  const handlecourse_enquiryInputChange = (e) => {
    setcourse_enquiryInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitcourse_enquiry = async () => {
    // const formData = new FormData();
    // formData.append("course_id", course[0].id);
    // formData.append("name", course_enquiryInputs.name);
    // formData.append("phone", course_enquiryInputs.phone);
    // formData.append("email", course_enquiryInputs.email);
    // formData.append("city", course_enquiryInputs.city);

    // formData.append("url", CONSTANTS.SITE_URL + pathname);
    // formData.append("clientIP", clientIP);

    // // get url paremeters
    // formData.append("utm_source", query.utm_source ? query.utm_source : "");
    // formData.append("utm_medium", query.utm_medium ? query.utm_medium : "");
    // formData.append(
    //   "utm_campaign",
    //   query.utm_campaign ? query.utm_campaign : ""
    // );
    // formData.append("utm_content", query.utm_content ? query.utm_content : "");
    // formData.append("creative", query.creative ? query.creative : "");
    // formData.append("adgroupid", query.adgroupid ? query.adgroupid : "");
    // formData.append("keyword", query.keyword ? query.keyword : "");
    // formData.append("placement", query.placement ? query.placement : "");
    // formData.append("device", query.device ? query.device : "");
    const QueryData = JSON.parse(sessionStorage.getItem("QueryData")) || {};

    const formData = {
      course_id: course[0].id,
      name: course_enquiryInputs.name,
      phone: course_enquiryInputs.phone,
      email: course_enquiryInputs.email,
      city: course_enquiryInputs.city,
      url: pageUrl,
      clientIP: clientIP,
      ...QueryData,
    };

    const res = await axios
      .post(`${CONSTANTS.API_URL}home/submit_course_enquiry`, formData, {
        headers: headers,
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handlecourse_enquirySubmit = (e) => {
    e.preventDefault();

    if($('#course-form').valid()) {
        setFormSending(true);

        submitcourse_enquiry()
          .then((data) => {
            if(!data.error) {
              // toast.success(data.message);
              window.openSuccessMessageModal();
              setcourse_enquiryInputs({
                name: "",
                phone: "",
                email: "",
                city: "",
              });

              setPhoneNumber('');

              setFormSending(false);

            } else {
              toast.error(data.message);
            }
          });

    }

  };

  const putFileInModal = (e) => {
    window.updateModalFile(e.target.href);
  };

  const removeModalFile = (e) => {
    window.updateModalFile('');
  };

  // course_enquiry end

  const createMarkup = (content) => {
    return { __html: content };
  }


  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tabNumber) => {
      setActiveTab(tabNumber);
  }

  var miniTestiSettings = {
      dots: true,
      infinite: true,
      speed: 300,
      autoplay: true,
      autoplaySpeed: 12000,
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

  var facultySettings = {
      dots: true,
      infinite: true,
      speed: 300,
      autoplay: true,
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
      dots: true,
      infinite: true,
      speed: 300,
      autoplay: true,
      autoplaySpeed: 12000,
      arrows: true,
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
              slidesToScroll: 1
            }
          }
        ]
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
  var innerTestimonialSettings = {
      dots: true,
      infinite: true,
      speed: 300,
      autoplay: true,
      autoplaySpeed: 12000,
      arrows: true,
      slidesToShow: 3,
      slidesToScroll: 3,

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
  var innerCourseSettings = {
      dots: true,
      infinite: true,
      speed: 300,
      autoplay: true,
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

  var exploreSettings = {
      dots: true,
      infinite: true,
      speed: 300,
      autoplay: true,
      autoplaySpeed: 12000,
      arrows: true,
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
              slidesToScroll: 1
            }
          }
        ]
  }

  return (
    <div>
    {course && course.length > 0 ? (
        <>
    <div>


    <Head>
      <title>{course[0].meta_title}</title>
      <meta name="keywords" content={course[0].meta_keywords}/>
      <meta name="description" content={course[0].meta_description}/>

      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
           "@context": "https://schema.org",
           "@type": "BreadcrumbList",
           "itemListElement": [{
             "@type": "ListItem",
             "position": 1,
             "name": "Home",
             "item": `${CONSTANTS.SITE_URL}`
           },{
             "@type": "ListItem",
             "position": 2,
             "name": "Courses",
             "item": `${CONSTANTS.SITE_URL+'/courses'}`
           },{
             "@type": "ListItem",
             "position": 3,
             "name": `${course[0].name}`,
             "item": `${CONSTANTS.SITE_URL+'/course/'+course[0].slug}`
           }]
           }) }}
      />

    </Head>

    <Header props={{queryString: queryString}}/>
        <section className="py-5">
            <div className="containerFull">
                <div className="bannerCourse">

                <div className="bannerCourseInner">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="leftCourse">
                                <h1 className="large_heading course_heading text-white fontWeight700">{course[0].banner_title}</h1>
                                <div className="mt-3 mobileColor text-white" dangerouslySetInnerHTML={createMarkup(course[0].subtitle)}></div>
                                <div className="mt-4 mobileFlex">
                                    <a href="#" className="btnWhite" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Know More</a>
                                    <Link href={CONSTANTS.BACKEND_URL+course[0].brochure}><a onClick={putFileInModal} className="btnPrimaryBorder btnWhiteOutline mx-lg-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop" download target="_blank">Download Brochure</a></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="rightBannerCourse">
                                <picture>
                                    <source srcSet={CONSTANTS.BACKEND_URL+course[0].banner_image} type="image/webp"/>
                                    <img src={CONSTANTS.BACKEND_URL+course[0].banner_image} alt="Smiling happy indian student with backpack pointing his finger wall"/>
                                </picture>
                            </div>
                        </div>
                    </div>
                  </div>

                </div>

                {/*<div className="courseDetails hasBorder">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="itemCourse">
                                <i className="fa fa-briefcase"></i>
                                <h4 className="title fontWeight700">{course[0].duration}</h4>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="itemCourse">
                                <i className="fas fa-users"></i>
                                <h4 className="title fontWeight700">{course[0].schedule}</h4>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="itemCourse">
                                <i className="fas fa-users"></i>
                                <h4 className="title fontWeight700">{course[0].pass_rates}</h4>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="itemCourse">
                                <i className="fas fa-globe"></i>
                                <h4 className="title fontWeight700">{course[0].fees}</h4>
                            </div>
                        </div>
                    </div>
                </div>*/}

            </div>
        </section>

        <div className="bannerBottomCounter bgPrimary counter">
            <div className="containerFull">
                <div className="row">
                    <div className="col-lg-3 col-6">
                        <div className="counterItem">
                            <h3 className="heading fontHeading fontWeight700 text-white"><span className="counter-value"><CountUp end={course[0].short_info_count_1} />+</span></h3>
                            <p>{course[0].duration}</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-6">
                        <div className="counterItem">
                            <h3 className="heading fontHeading fontWeight700 text-white"><span className="counter-value"><CountUp end={course[0].short_info_count_2} />+</span></h3>
                            <p>{course[0].schedule}</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-6">
                        <div className="counterItem">
                            <h3 className="heading fontHeading fontWeight700 text-white"><span className="counter-value"><CountUp end={course[0].short_info_count_3} />+</span></h3>
                            <p>{course[0].pass_rates}</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-6">
                        <div className="counterItem">
                            <h3 className="heading fontHeading fontWeight700 text-white"><span className="counter-value"><CountUp end={course[0].short_info_count_4} />+</span></h3>
                            <p>{course[0].fees}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="webBreadcrumb">
            <div className="containerFull">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link href="/">
                        <a>Home</a>
                      </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link href="/courses">
                        <a>Courses</a>
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">{course[0].name}</li>
                </ol>
            </div>
        </div>

        <section className="pt-5">
            <div className="containerFull">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="courseDescription">
                            <h2 className="heading fontWeight700">{course[0].about_title}</h2>
                            <div className="mt-3" dangerouslySetInnerHTML={createMarkup(course[0].about_description)}></div>
                            <div className="btnBanners bottomBanner mt-3">
                                <a href="#" className="btnTheme" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Apply Now</a>
                                <a href="#" className="btnVideo btnVideo2 ms-lg-4" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><span><i className="fas fa-play"></i></span> Watch now</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="rightSide">
                            <div className="eligibilty">
                                <h3 className="small_heading fontWeight700">Who Should Choose {course[0].name}?</h3>
                                <div dangerouslySetInnerHTML={createMarkup(course[0].eligibility)}>
                                </div>
                            </div>
                            <div className="eligibilty mt-lg-4">
                                <h3 className="small_heading fontWeight700">Enquire Now!</h3>

                                <form onSubmit={handlecourse_enquirySubmit} method="post" action="#" id="course-form">
                                  <div className="enquireForm">
                                      <div className="formItemHome mb-2">
                                          <label htmlFor="name">Your Name*</label>
                                          <input type="text" name="name" id="name" placeholder="Enter your name" onChange={handlecourse_enquiryInputChange} value={course_enquiryInputs.name} minLength="3" required/>
                                      </div>
                                      <div className="formItemHome mb-2">
                                          <label htmlFor="phone">Phone Number*</label>
                                          <div className="row">
                                              <div className="col-lg-12 col-12 pe-lg-2 pe-1">
                                                  {/*<PhoneInput
                                                  defaultCountry="IN"
                                                  value={phoneNumber}
                                                  onChange={setPhoneNumber}
                                                  required
                                                  maxlength="11" />*/}
                                                  <input type="number" name="phone" id="phone" placeholder="Enter your phone" onChange={handlecourse_enquiryInputChange} value={course_enquiryInputs.phone} maxLength="11" required />
                                              </div>
                                          </div>
                                      </div>
                                      <div className="formItemHome mb-2">
                                          <label htmlFor="email">Your Email Address*</label>
                                          <input type="email" name="email" id="email" placeholder="Enter your email address" onChange={handlecourse_enquiryInputChange} value={course_enquiryInputs.email} required/>
                                      </div>
                                      <div className="formItemHome mb-2">
                                          <label htmlFor="city">Your City*</label>
                                          <input type="text" name="city" id="city" placeholder="Enter your city" onChange={handlecourse_enquiryInputChange} value={course_enquiryInputs.city} minLength="3" required/>
                                      </div>
                                      <div className="formItemHome mb-0 mt-4">
                                          <input type="hidden" name="course_id" value={course[0].id} />
                                          <button className="btnSecondary" type="submit" name="submit"  disabled={formSending}>{formSending ? 'Sending...' : 'Submit' }</button>
                                          <p className="form_note">By submitting this form, you agree to our <Link href={'/privacy-policy-and-terms-of-service'+queryString}><a target="_blank">T&C and Privacy Policy</a></Link></p>
                                      </div>
                                  </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="bgcourse">
            <div className="containerFull">

              <div className="row">
                  <div className="col-lg-8">
                      <h2 className="heading fontWeight700">{course[0].name} Syllabus</h2>
                      <div className="textTitle mt-3" dangerouslySetInnerHTML={createMarkup(course[0].syllabus_description)}></div>
                  </div>
                  <div className="col-lg-3 mt-lg-0 mt-3 offset-lg-1">
                      <Link href={CONSTANTS.BACKEND_URL+course[0].brochure}><a className="btnTheme w-100 text-center" onClick={putFileInModal} data-bs-toggle="modal" data-bs-target="#staticBackdrop" download target="_blank">Download Brochure</a></Link>
                  </div>
              </div>


                <div className="tabBlock">
                    <div className="tanList">
                        <ul>
                          {syllabus && syllabus.map((syllabus_item, index) => {
                            return <li key={index} onClick={() => handleTabClick(index + 1)} className={activeTab === index + 1 ? 'active' : ''}>{syllabus_item.name} </li>
                          })}
                        </ul>
                    </div>
                    <div className="tabContent">
                      {syllabus && syllabus.map((syllabus_item, index) => {
                        return <div key={index}>
                        {activeTab === index + 1 &&
                            <div>
                                <div className="innerTab">

                                    <div className="row">
                                        <div className="col-lg-8">
                                            <h4>{syllabus_item.subtitle}</h4>
                                            <div dangerouslySetInnerHTML={createMarkup(syllabus_item.description)} className="mt-3 webContent vectorIcon"></div>
                                        </div>
                                    </div>

                                    {syllabus_item.syllabus_content && syllabus_item.syllabus_content.length > 0 ? (
                                        <>
                                      <div className="accordion mt-4" id="accordionExample">

                                          {syllabus_item.syllabus_content && syllabus_item.syllabus_content.map((syllabus_content_item, index) => {
                                            return <div key={index} className="accordion-item">
                                              <h2 className="accordion-header" id={'heading'+index}>
                                              <button className={"accordion-button "+(index < -1 ? '' : 'collapsed')} type="button" data-bs-toggle="collapse" data-bs-target={'#collapse'+index} aria-expanded={index < -1} aria-controls={'collapse'+index}>
                                              {syllabus_content_item.name}
                                              </button>
                                              </h2>
                                              <div id={'collapse'+index} className={'accordion-collapse collapse '+(index < -1 ? 'show' : '')} aria-labelledby={'heading'+index} data-bs-parent="#accordionExample">
                                                  <div className="webContent vectorIcon accordion-body" dangerouslySetInnerHTML={createMarkup(syllabus_content_item.description)}></div>
                                              </div>
                                          </div>
                                          })}


                                      </div>
                                      </>
                                        ) : (<></>)
                                    }

                                </div>
                            </div>}
                          </div>
                        })}

                    </div>
                </div>
            </div>
        </section>
        <section>
            <div className="containerFull">
                <h2 className="heading fontWeight700">{course[0].highlights_title}</h2>
                <div className="textTitle mt-3" dangerouslySetInnerHTML={createMarkup(course[0].highlights_description)}></div>
                <div className="keyList">
                    <ul>
                    {highlight && highlight.map((highlight_item, index) => {
                      return <li key={index}>{highlight_item.name}</li>
                      })}
                    </ul>
                </div>
                <div className="text-center mt-3">
                    <a href="#" className="btnTheme" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Enquire Now</a>
                </div>
            </div>
        </section>
        <section className="bgLight">
            <div className="containerFull">
                <h4 className="heading fontHeading fontWeight700">Our Faculties</h4>
                <FacultySlider className="facultySlider dotSlider" {...facultySettings}>
                    {faculty && faculty.map((faculty_item, index) => {
                      if(faculty_item.designation != '') {
                        return <div key={index} className="itemFaculty">
                            <div className="innerFaculty">
                                <div className="picture">
                                  <picture>
                                      <source srcSet={CONSTANTS.BACKEND_URL+faculty_item.image} type="image/webp"/>
                                      <img src={CONSTANTS.BACKEND_URL+faculty_item.image} alt="Nikhil Jobanputra"/>
                                  </picture>
                                </div>
                                <div className="nameFaculty">
                                    <h4 className="small_heading fontWeight500">{faculty_item.name}</h4>
                                    <h4 className="small_heading fontWeight500">({course[0].name})</h4>
                                    <p>Experience - {faculty_item.designation}</p>
                                </div>
                            </div>
                        </div>
                      }
                    })}
                </FacultySlider>
            </div>
        </section>
        <section className="bgPrimary py-0">
            <div className="containerFull">
                <div className="headerSection">
                    <h4 className="heading fontHeading text-white fontWeight700">The {course[0].name} Advantage</h4>
                    <div className="mt-2 text-white" dangerouslySetInnerHTML={createMarkup(course[0].advantage_description)}></div>
                </div>
                <div className="row align-items-end">


                <div className="col-lg-7">
                    <div className="rightActor mtSpace">
                        {advantage && advantage.map((advantage_item, index) => {
                          return <div key={index} className="itemActor">
                            <div className="headerActor">
                                <div className="leftHeaderActor">
                                    <picture>
                                        <source srcSet={CONSTANTS.BACKEND_URL+advantage_item.image} />
                                        <img src={CONSTANTS.BACKEND_URL+advantage_item.image} alt={advantage_item.name}/>
                                    </picture>
                                </div>
                                <h4 className="title fontWeight600 fontHeading">{advantage_item.name}</h4>
                            </div>
                            <div dangerouslySetInnerHTML={createMarkup(advantage_item.description)}></div>
                        </div>
                        })}
                    </div>
                </div>

                    <div className="col-lg-5">
                        <div className="leftActor">
                            <picture>
                                <source srcSet='/assets/images/actor-right.png' type="image/webp"/>
                                <img src='/assets/images/actor-right.png' alt="Left Advantage"/>
                            </picture>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <div className="containerFull">
                <h4 className="heading fontHeading fontWeight700">Hiring Partners</h4>
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
        </section>
        <section className="pt-0">
            <div className="containerFull">

                <div className="row button_row">
                  <div className="col-md-9">
                    <h4 className="heading fontHeading fontWeight700">Star Achievers</h4>
                  </div>
                  <div className="col-md-3 button_col">
                    <a href="#" className="btnTheme mt-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Join The League</a>
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
        <section className="bgLight">
            <div className="containerFull">
                <h4 className="heading fontHeading fontWeight700">Testimonials</h4>
                <TestimonialSlider className="testimonialSlider" {...innerTestimonialSettings}>
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
                                      <img src='/assets/images/icons/qoute.webp' alt={testimonial.name}/>
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
                <h4 className="heading fontHeading text-center fontWeight700">Exam Details</h4>
                <div className="centerImg examImg">
                    <picture>
                        <source srcSet={CONSTANTS.BACKEND_URL+course[0].exam_details_image} type="image/webp"/>
                        <img src={CONSTANTS.BACKEND_URL+course[0].exam_details_image} alt="Exam Details"/>
                    </picture>
                </div>
            </div>
        </section>

        {course[0].exemptions_description &&
        <section className="pt-0">
            <div className="containerFull">
                <h4 className="heading fontHeading text-center fontWeight700">Exemptions</h4>
                <div className="row mt-lg-5 mt-4">
                    <div className="col-lg-8 offset-lg-2">
                        <div className="table-responsive" dangerouslySetInnerHTML={createMarkup(course[0].exemptions_description)}>

                        </div>
                    </div>
                </div>
            </div>
        </section>
        }

        <section className="bgLight">
            <div className="containerFull">

                <div className="row button_row">
                  <div className="col-md-9">
                    <h4 className="heading fontHeading fontWeight700">Career Options After {course[0].name}</h4>
                  </div>
                  <div className="col-md-3 button_col">
                    <a href="#" className="btnTheme mt-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Pave Your Way</a>
                  </div>
                </div>

                <div className="careerList">
                    <ul>
                    {career_option && career_option.map((career_option_item, index) => {
                      return <li key={index}>{career_option_item.name}</li>
                      })}
                    </ul>
                </div>
                <div className="rangeSliderBlock">
                    <div className="row">
                        <div className="col-lg-6">
                            <h4 className="title text-center fontHeading fontWeight600">Average Salary for {course[0].name} Professionals</h4>
                            <div className="rangeSliderBar">
                                <div className="mainRange" style={{width:'70%'}}>
                                    <div className="sliderHandler">
                                        <span></span>
                                        <span></span>
                                    </div>
                                    <div className="inlinePrice">
                                        <p>{course[0].min_salary} LPA</p>
                                        <p>{course[0].max_salary} LPA</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <div className="containerFull">
                <div className="certificateBlock">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="leftCertificate">
                                <h4 className="heading fontHeading text-white fontWeight700">{course[0].name} Certificate</h4>
                                <div dangerouslySetInnerHTML={createMarkup(course[0].certificate_description)}></div>
                                <a href="#" className="certificateInline" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                    <div className="labelCertificate">
                                        <img src='/assets/images/icons/certificate.svg' alt="certificate"/>
                                    </div>
                                    <p>Earn Your Certificate</p>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="rightCertificate">
                                <picture>
                                    <source srcSet={CONSTANTS.BACKEND_URL+course[0].certificate_image} type="image/webp"/>
                                    <img src={CONSTANTS.BACKEND_URL+course[0].certificate_image} alt="Certificate"/>
                                </picture>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="pt-lg-0">
            <div className="containerFull">
                <div className="row">
                    <div className="col-lg-5">
                        <div className="leftFee fullHeight">
                            <div className="column1">
                                <h4 className="title fontHeading fontWeight600">Benefits of Learning {course[0].name} with IIC Lakshya</h4>
                                <div className="webContent vectorIcon" dangerouslySetInnerHTML={createMarkup(course[0].benefits_description)}>

                                </div>
                            </div>

                            <MiniTestiSlider className="miniTestiSlider dotSlider" {...miniTestiSettings}>
                                {testimonials && testimonials.map((testimonial, index) => {
                                  if(index < 3) {
                                 return <div key={index} className="itemMiniTesti">
                                  <div className="column1 mt-4">
                                      <div className="innerTestimonial studentText">
                                          <div className="testimonialFooter mt-0">
                                              <div className="leftTest">
                                                  <div className="testimonialUser">
                                                      <picture>
                                                          <source srcSet={CONSTANTS.BACKEND_URL+testimonial.image} type="image/webp"/>
                                                          <img src={CONSTANTS.BACKEND_URL+testimonial.image} alt="Ganga"/>
                                                      </picture>
                                                  </div>
                                                  <h4 className="fontWeight600">{testimonial.name}</h4>
                                              </div>
                                          </div>
                                          <div dangerouslySetInnerHTML={createMarkup(testimonial.description)}></div>
                                      </div>
                                  </div>
                                </div>
                                }
                                })}
                            </MiniTestiSlider>

                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div className="rightFee">
                            <h4 className="heading fontWeight700">Coaching Fees</h4>
                            <div className="startingPrice">
                                <div className="leftPrice">
                                    <h5 className="title">Starting at ₹ {course[0].fee_emi_amount}/month</h5>
                                </div>
                                <a href="#" className="btnWhite" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Apply Now</a>
                            </div>
                            <div className="leftFee programRight">
                                <p className="feesTitle mb-2">Learning Modes</p>
                                {/*<div className="webContent ulBox" dangerouslySetInnerHTML={createMarkup(course[0].fee_description)}></div>*/}
                                <div className="row">
                                  <div className="col-md-12 classBox">
                                    <div className="webContent mb-2">
                                      <p className="boxSubtitle">Offline Classes</p>
                                      <div dangerouslySetInnerHTML={createMarkup(course[0].offline_classes)}></div>
                                    </div>
                                  </div>
                                  <div className="col-md-12 classBox">
                                    <div className="webContent mb-2">
                                      <p className="boxSubtitle">Online Live Classes</p>
                                      <div dangerouslySetInnerHTML={createMarkup(course[0].online_live_classes)}></div>
                                    </div>
                                  </div>
                                  <div className="col-md-12 classBox">
                                    <div className="webContent mb-2">
                                      <p className="boxSubtitle">Hybrid Classes</p>
                                      <div dangerouslySetInnerHTML={createMarkup(course[0].hybrid_classes)}></div>
                                    </div>
                                  </div>
                                </div>
                                <a href="#" className="btnTheme mt-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Know More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="lightBlue2">
            <div className="containerFull">
            <h4 className="heading fontHeading fontWeight700">Check Other Courses</h4>

            <VideoSlider className="videoSlider dotSlider" {...exploreSettings}>

                {videos && videos.map((video, index) => {
                return <div key={index} className="itemCourseSlider freeVideoItem">
                    <div className="innerVideo">
                      <Link href={'/course/'+video.link_slug+queryString}><a>
                        <div className="videoImg">
                            <picture>
                                <source srcSet={CONSTANTS.BACKEND_URL+video.image} />
                                <img src={CONSTANTS.BACKEND_URL+video.image} alt={video.name}/>
                            </picture>
                        </div>
                        <div className="freeVideoDescription">
                            <div className="mt-2" dangerouslySetInnerHTML={createMarkup(video.description)}></div>
                        </div>
                      </a></Link>
                    </div>
                </div>
                })}

            </VideoSlider>

            </div>
        </section>
        <section>
            <div className="containerFull">
                <h3 className="heading fontHeading fontWeight700">FAQs</h3>
                <div className="faq vectorIcon">
                    <div className="accordion mt-4" id="accordionExample2">
                      {course_faq && course_faq.map((course_faq_item, index) => {
                        return <div key={index} className="accordion-item">
                            <h2 className="accordion-header" id={'faqHeading'+index}>
                            <button className={'accordion-button '+(index == 0 ? '' : 'collapsed')} type="button" data-bs-toggle="collapse" data-bs-target={'#faq'+index} aria-expanded={index == 0} aria-controls={'collapse'+index}>
                                {course_faq_item.name}
                            </button>
                            </h2>
                            <div id={'faq'+index} className={'accordion-collapse collapse '+(index == 0 ? 'show' : '')} aria-labelledby={'faqHeading'+index} data-bs-parent="#accordionExample2">
                                <div className="accordion-body">
                                    <div dangerouslySetInnerHTML={createMarkup(course_faq_item.description)}></div>
                                </div>
                            </div>
                        </div>
                        })}
                    </div>
                </div>
            </div>
        </section>
    </div>

    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-md">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">Drop your info to proceed</h5>
            <button type="button" onClick={removeModalFile} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {renderCourseForm(course[0].id)}
          </div>
        </div>
      </div>
    </div>

    <Footer props={{queryString: queryString}}/>
    </>
      ) : (<></>) }

    </div>
  );

}

export default Details;
