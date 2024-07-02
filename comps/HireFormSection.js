import { useRouter } from 'next/router';

import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';

import axios from "axios";
// import { toast } from 'react-toastify';
import * as CONSTANTS from "../constants/constants";

import HireForm from "../comps/HireForm";

const headers = {
  'Content-Type': 'multipart/form-data',
  'Authorization': CONSTANTS.API_TOKEN
}

export default function HireFormSection({ props }) {

  const { queryString } = props;

  const [setting, setSetting] = useState();

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

  useEffect(() => {
    getGeneralData();
  }, []);

  return (
    <div>
      <section>
          <div className="containerFull">
              <div className="row">
                  <div className="col-lg-6">
                      <div className="leftContactHome">
                          <h4 className="sub_heading fontWeight700">Request a Call Back</h4>
                          <ul className="mt-2">
                              <li><Link href={`tel: ${setting ? setting[0].phone : ''}`}><a><i className="fa fa-phone"></i> {setting ? setting[0].phone : ''}</a></Link></li>
                              <li><Link href={`tel: ${setting ? setting[0].email : ''}`}><a><i className="fa fa-envelope"></i> {setting ? setting[0].email : ''}</a></Link></li>
                          </ul>
                          <div className="imageContact">
                              <picture>
                                  <source srcSet="/assets/images/indian-young-woman-orange-jacket-holds-clipboard-smiles.png" type="image/webp"/>
                                  <img src="/assets/images/indian-young-woman-orange-jacket-holds-clipboard-smiles.png" alt="Beautiful curly Girl Pointing Finger"/>
                              </picture>
                          </div>
                          <div className="rectangle7">
                              <picture>
                                  <source srcSet="/assets/images/rectangle7.png" type="image/webp"/>
                                  <img src="/assets/images/rectangle7.png" alt="Top right elipse"/>
                              </picture>
                          </div>
                          <div className="rectangle6">
                              <picture>
                                  <source srcSet="/assets/images/rectangle6.webp" type="image/webp"/>
                                  <img src="/assets/images/rectangle6.webp" alt="Top Center elipse"/>
                              </picture>
                          </div>
                          <div className="rectangle5">
                              <picture>
                                  <source srcSet="/assets/images/rectangle5.webp" type="image/webp"/>
                                  <img src="/assets/images/rectangle5.webp" alt="Top Left elipse"/>
                              </picture>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-6">
                      <div className="rightContactHome">
                          <h4 className="sub_heading fontWeight700">Are you interested in hiring?</h4>
                          <HireForm props={{type: 'div', queryString: queryString}} />
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </div>
  )
}
