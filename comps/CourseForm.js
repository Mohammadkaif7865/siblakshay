import { useRouter } from 'next/router';

import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';

import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input';

import { useNavigate, useParams } from 'react-router-dom';

import Cookies from 'js-cookie';

import axios from "axios";
// import { toast } from 'react-toastify';
import * as CONSTANTS from "../constants/constants";

export default function CourseForm({ props }) {

  const { active_course_id, type, queryString } = props;

  const router = useRouter();
  const { query } = router;
  const { pathname } = useRouter();

  const { slug } = useParams();

  const [courses, setCourses] = useState();
  const [single_course, setSingle_course] = useState();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [clientIP, setClientIP] = useState('');
  const [formSending, setFormSending] = useState(false);
  const [pageUrl, setPageUrl] = useState('');

  const headers = {
    'Content-Type': 'multipart/form-data',
    'Authorization': CONSTANTS.API_TOKEN
  }

  const getSingleCourseData = async () => {
    const res = await axios.get(`${CONSTANTS.API_URL}home/single_course/${slug}`, {
        headers: headers,
        withCredentials: true,
      }).catch((err) => console.log(err));
      const data = await res.data;
      if(data.course) {
        setSingle_course(data.course);
        setcourse_enquiryInputs({
          course_id: data.course[0].id,
          name: "",
          phone: "",
          email: "",
          city: "",
        });
      }
  };

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
  useEffect(() => {
    getCoursespageData();
    setPageUrl(window.location.href);

    if(slug != undefined && pathname.includes('/course/')) {
      getSingleCourseData();
    }

    fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => setClientIP(data.ip))
    .catch(error => console.log(error));

    // Ensure jQuery code runs after the component has mounted
    $(document).ready(function() {

      $('#modal-form').validate({ // Initialize jQuery Validate on #my-form
        rules: {
          city: {
            noSpaces: true
          }
        }
      });

    });


  }, [pathname, slug]);

  // course_enquiry start
  const [course_enquiryInputs, setcourse_enquiryInputs] = useState({
    course_id: active_course_id,
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
    const QueryData = JSON.parse(sessionStorage.getItem("QueryData")) || {};

    const formData = {
      course_id: course_enquiryInputs.course_id,
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

    if($('#modal-form').valid()) {
        setFormSending(true);

        submitcourse_enquiry()
          .then((data) => {
            if(!data.error) {
              // toast.success(data.message);
              window.openSuccessMessageModal();
              setcourse_enquiryInputs({
                course_id: "",
                name: "",
                phone: "",
                email: "",
                city: "",
              });

              setPhoneNumber('');

              if(type == 'modal') {
                window.downloadModalFile();
                window.closeStaticBackdropModal();
              }

              setFormSending(false);

            } else {
              // toast.error(data.message);
            }
          })

      }

  };

  // course_enquiry end

  return (
    <div>
      <form onSubmit={handlecourse_enquirySubmit} method="post" action="#" id="modal-form">
        <div className="formHome">
            <div className="formItemHome">
                <label htmlFor="name">Your Name*</label>
                <input type="text" name="name" id="name" placeholder="Enter your name" onChange={handlecourse_enquiryInputChange} value={course_enquiryInputs.name} minLength="3" required />
            </div>
            <div className="formItemHome">
                <label htmlFor="phone">Phone Number*</label>
                <div className="row">
                    <div className="col-lg-12 col-12 pe-lg-2 pe-1">
                        {/*<PhoneInput
                        name="phone"
                        defaultCountry="IN"
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                        required
                        maxlength="11" />*/}
                        <input type="number" name="phone" id="phone" placeholder="Enter your phone" onChange={handlecourse_enquiryInputChange} value={course_enquiryInputs.phone} maxLength="11" required />
                    </div>
                </div>
            </div>
            <div className="formItemHome">
                <label htmlFor="email">Your Email Address*</label>
                <input type="email" name="email" id="email" placeholder="Enter your email address" onChange={handlecourse_enquiryInputChange} value={course_enquiryInputs.email} required/>
            </div>
            <div className="formItemHome">
                <label htmlFor="city">Your City*</label>
                <input type="text" name="city" id="city" placeholder="Enter your city" onChange={handlecourse_enquiryInputChange} value={course_enquiryInputs.city} minLength="3" required/>
            </div>
            <div className="formItemHome">
                <label htmlFor="phone">Courses*</label>
                <select name="course_id" onChange={handlecourse_enquiryInputChange} value={course_enquiryInputs.course_id} required>
                  <option value="">Select course</option>
                  {courses && courses.map((course, index) => {
                    return <option key={index} value={course.id}>{course.name}</option>
                  })}
                </select>
            </div>
            <div className="formItemHome mb-0 mt-4">
                <a href="" target="_blank" id="modalFile"></a>
                <button className="btnTheme" type="submit" name="submit" disabled={formSending}>{formSending ? 'Sending...' : 'Submit' }</button>
                <p className="form_note">By submitting this form, you agree to our <Link href={'/privacy-policy-and-terms-of-service'+queryString}><a target="_blank">T&C and Privacy Policy</a></Link></p>
            </div>
        </div>
      </form>
    </div>
  )
}
