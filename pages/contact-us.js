import React from 'react';
import Head from 'next/head'

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
    const res = await axios.get(`${CONSTANTS.API_URL}home/contactuspage_data`, {
      headers: headers,
      withCredentials: true,
    }).catch((err) => console.log(err));
    const data = await res.data;

    return {
      props: { contactuspage_data: data },
    }
}

export default function ContactUs({ contactuspage_data }) {

  const { contactuspage, branchs } = contactuspage_data;

  const [queryString, setQueryString] = useState('');

  // get data from api end

  const [activeTab, setActiveTab] = useState(7);
  const handleTabClick = (tabNumber) => {
      setActiveTab(tabNumber);
  }

  const createMarkup = (content) => {
    return { __html: content };
  }

  useEffect(() => {
    // setQueryString(window.location.search);
  }, []);

  return (
    <div>

    <Head>
        <title>{contactuspage[0].meta_title}</title>
        <meta name="keywords" content={contactuspage[0].meta_keywords}/>
        <meta name="description" content={contactuspage[0].meta_description}/>
    </Head>

      <Header props={{queryString: queryString}}/>
      <CallbackForm props={{queryString: queryString}}/>

      <section className="pb40">
          <div className="containerFull">
            <h4 className="heading fontHeading fontWeight700 text-center">{contactuspage[0].section_1_title}</h4>
          </div>
      </section>
      <div className="tabBlock locationTabs">
          <div className="tanList">
            <div className="containerFull">
                <ul>
                  {branchs && branchs.map((location_item, index) => {
                    return <li key={index} onClick={() => handleTabClick(index + 1)} className={activeTab === index + 1 ? 'active' : ''}>{location_item.name} </li>
                  })}
                </ul>
            </div>
          </div>
          <div className="tabContent">
            {branchs && branchs.map((location_item, index) => {
              return <div key={index}>
              {activeTab === index + 1 &&
                  <div>
                      <div className="innerTab">
                        <div className="locationMap">
                          <iframe src={location_item.google_map} width="100%" height="450" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                      </div>
                  </div>}
                </div>
              })}

          </div>
      </div>

    <Footer props={{queryString: queryString}}/>

    </div>
  )
}
