import Head from 'next/head'
import React from 'react';

// import { format } from 'date-fns';
// import Moment from 'react-moment';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ValueSlider from "react-slick";
import PartnerSlider from "react-slick";
import TestimonialSlider from "react-slick";

import { useEffect, useState } from 'react';
import axios from "axios";
import * as CONSTANTS from "../constants/constants";

import Header from "../comps/Header";
import Footer from "../comps/Footer";
import CallbackForm from "../comps/CallbackForm";

export default function RefundAndCancellation() {

  const createMarkup = (content) => {
    return { __html: content };
  }

  const [queryString, setQueryString] = useState('');

  useEffect(() => {
    // setQueryString(window.location.search);
  }, []);

  return (
    <div>

      <Header props={{queryString: queryString}}/>

        <section>
            <div className="containerFull">
                <h4 className="heading fontHeading fontWeight700">Refund and Cancellation</h4>

                <div className="webContent vectorIcon smallIcon">
                  <ul>
                    <li><strong>Refund For Charge Back Transaction</strong>: In the event, there is any claim for/ of charge back by the User for any reason whatsoever, such User shall immediately approach Lakshya with his/ her claim details and claim a refund from Lakshya alone. Such refund (if any) shall be effected only by Lakshya via payment gateway or by means of a demand draft or such other means as Lakshya deems appropriate. No claims for refund/ charge back shall be made by any User to the Payment Service Provider(s) and in the event, such claim is made it shall not be entertained.</li>
                    <li>In these Terms and Conditions, the term &ldquo;<strong>Charge back</strong>&rdquo; means approved and settled card (Debit or Credit) or netbanking purchase transactions which are at any time refused, debited or charged back to Merchant account (shall also include similar debits to Payment Gateway Service Provider&rsquo;s accounts, if any) by the Acquiring Bank for any reason whatsoever, together with the bank fees, penalties and other charges incidental thereto.</li>
                    <li>Refund for fraudulent/duplicate transaction(s): The User shall directly contact Lakshya for any fraudulent transaction(s) on account of misuse of Card/ Bank details by a fraudulent individual/party and such issues shall be suitably addressed by Lakshya alone in line with their policies and rules.</li>
                    <li>Server Slow Down/Session Timeout: In case the Website or Payment Service Provider&rsquo;s webpage, that is linked to the Website, is experiencing any server related issues like &lsquo;slow down&rsquo; or &lsquo;failure&rsquo; or &lsquo;session timeout&rsquo;, the User shall, before initiating the second payment,, check whether his/her Bank Account has been debited or not and accordingly resort to one of the following options:</li>
                    </ul>
                    <p>(I) In case the Bank Account appears to be debited, ensure that he/ she does not make the payment twice and immediately thereafter contact Lakshya via e-mail or any other mode of contact as provided by Lakshya to confirm payment.</p>
                    <p>(ii) In case the Bank Account is not debited, the User may initiate a fresh transaction to make payment.</p>
                    <p> However, the User agrees that under no circumstances the Payment Gateway Service Provider shall be held responsible for such fraudulent/duplicate transactions and hence no claims should be raised to Payment Gateway Service Provider No communication received by the Payment Service Provider(s) in this regards shall be entertained by the Payment Service Provider(s).</p>
                    <h2><strong>Limitation of Liability</strong></h2>
                    <ul>
                    <li>Lakshya has made this Service available to the User as a matter of convenience. Lakshya expressly disclaims any claim or liability arising out of the provision of this Service. The User agrees and acknowledges that he/ she shall be solely responsible for his/ her conduct and that Lakshya reserves the right to terminate the rights to use of the Service immediately without giving any prior notice thereof.</li>
                    <li>Lakshya and/or the Payment Service Providers shall not be liable for any inaccuracy, error or delay in, or omission of (a) any data, information or message, or (b) the transmission or delivery of any such data, information or message; or (c) any loss or damage arising from or occasioned by any such inaccuracy, error, delay or omission, non-performance or interruption in any such data, information or message. Under no circumstances shall the Lakshya and/or the Payment Service Providers, its employees, directors, and its third-party agents involved in processing, delivering or managing the Services, be liable for any direct, indirect, incidental, special or consequential damages, or any damages whatsoever, including punitive or exemplary arising out of or in any way connected with the provision of or any inadequacy or deficiency in the provision of the Services or resulting from unauthorized access or alteration of transmissions of data or arising from suspension or termination of the Services.</li>
                    <li>Lakshya and the Payment Service Provider(s) assume no liability whatsoever for any monetary or other damage suffered by the User on account of:</li>
                    </ul>
                    <p>(I) the delay, failure, interruption, or corruption of any data or other information transmitted in connection with the use of the Payment Gateway or Services in connection thereto; and/ or</p>
                    <p>(ii) any interruption or errors in the operation of the Payment Gateway.</p>
                    <ul>
                    <li>The User shall indemnify and hold harmless the Payment Service Provider(s) and Lakshya and their respective officers, directors, agents, and employees, from any claim or demand, or actions arising out of or in connection with the utilization of the Services.</li>
                    <li>The User agrees that Lakshya or any of its employees will not be held liable by the User for any loss or damages arising from your use of, or reliance upon the information contained on the Website, or any failure to comply with these Terms and Conditions where such failure is due to circumstance beyond Lakshya&rsquo;s reasonable control.</li>
                    </ul>
                    <h2>&nbsp;<strong>Miscellaneous Conditions :</strong></h2>
                    <ul>
                    <li>Any waiver of any rights available to Lakshya under these Terms and Conditions shall not mean that those rights are automatically waived.</li>
                    <li>The User agrees, understands and confirms that his/ her personal data including without limitation details relating to debit card/ credit card transmitted over the Internet may be susceptible to misuse, hacking, theft and/ or fraud and that Lakshya or the Payment Service Provider(s) have no control over such matters. </li>
                    <li>Although all reasonable care has been taken towards guarding against unauthorized use of any information transmitted by the User, Lakshya does not represent or guarantee that the use of the Services provided by/ through it will not result in theft and/or unauthorized use of data over the Internet.</li>
                    <li>Lakshya, the Payment Service Provider(s) and its affiliates and associates shall not be liable, at any time, for any failure of performance, error, omission, interruption, deletion, defect, delay in operation or transmission, computer virus, communications line failure, theft or destruction or unauthorized access to, alteration of, or use of information contained on the Website.</li>
                    <li>The User may be required to create his/ her own User ID and Password in order to register and/ or use the Services provided by Lakshya on the Website. By accepting these Terms and Conditions the User aggress that his/ her User ID and Password are very important pieces of information and it shall be the User&rsquo;s own responsibility to keep them secure and confidential. In furtherance hereof, the User agrees to;</li>
                    </ul>
                    <ul>
                    <ul>
                    <li>Choose a new password, whenever required for security reasons.</li>
                    <li>Keep his/ her User ID &amp; Password strictly confidential.</li>
                    <li>Be responsible for any transactions made by User under such User ID and Password.</li>
                    </ul>
                    </ul>
                    <p>The User is hereby informed that Lakshya will never ask the User for the User&rsquo;s password in an unsolicited phone call or in an unsolicited email. The User is hereby required to sign out of his/ her Lakshya account on the Website and close the web browser window when the transaction(s) have been completed. This is to ensure that others cannot access the User&rsquo;s personal information and correspondence when the User happens to share a computer with someone else or is using a computer in a public place like a library or Internet caf&eacute;.</p>
                </div>

            </div>
        </section>

        <CallbackForm props={{queryString: queryString}}/>

      <Footer props={{queryString: queryString}}/>

    </div>
  )
}
