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

export default function PrivacyPolicy() {

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
                <h4 className="heading fontHeading fontWeight700">Privacy Policy and Terms of Service</h4>

                <div className="webContent vectorIcon smallIcon">
                  <p>Learnfluence Education Private Limited respects and protects the privacy of the individuals that access the information and use the services provided through them. Individually identifiable information about the User is not willfully disclosed to any third party without first receiving the User&rsquo;s permission, as covered in this Privacy Policy.</p>
                  <p>This Privacy Policy describes Learnfluence Education Private Limited&rsquo;s treatment of personally identifiable information that Learnfluence Education Private Limited collects when the User is on Learnfluence Education Private Limited&rsquo;s website. Learnfluence Education Private Limited does not collect any unique information about the User (such as User&rsquo;s name, email address, age, gender, etc.) except when the User specifically and knowingly provides such information on the Website. Like any business interested in offering the highest quality of service to clients, Learnfluence Education Private Limited may, from time to time, send an email and other communication to the User to tell them about the various services, features, functionality, and content offered by Learnfluence Education Private Limited&rsquo;s website or seek voluntary information from you.</p>
                  <p>Please be aware, however, that Learnfluence Education Private Limited will release specific personal information about the User if required to do so in the following circumstances:</p>
                  <ul>
                     <li>In order to comply with any valid legal process such as a search warrant, statute, or court order, or</li>
                     <li>If any of the User&rsquo;s actions on Learnfluence Education Private Limited&rsquo;s website violate the Terms of Service or any of Learnfluence Education Private Limited&rsquo;s guidelines for specific services, or</li>
                     <li>to protect or defend Learnfluence Education Private Limited&rsquo;s legal rights or property, the Learnfluence Education Private Limited site, or Learnfluence Education Private Limited Users; or</li>
                     <li>to investigate, prevent, or take action regarding illegal activities, suspected fraud, situations involving potential threats to the security, the integrity of Learnfluence Education Private Limited&rsquo;s website/offerings.</li>
                  </ul>
                  <h4><strong>Terms and Conditions For Online-Payments To Be Made To LEARNFLUENCE EDUCATION PVT LTD.</strong></h4>
                  <p><strong>Online Charges Payments </strong></p>
                  <p>This online payment system is provided by LEARNFLUENCE EDUCATION PVT LTD. LEARNFLUENCE EDUCATION PVT LTD may update these terms from time to time and any changes will be effective immediately on being set out on this portal. Please ensure that you are aware of the current terms. The country of domicile of LEARNFLUENCE EDUCATION PVT LTD is India and legal jurisdiction is Ernakulam, India. </p>
                  <p>Please read these terms carefully before using the online payment facility. Using the online payment facility on www.lakshyaca.com indicates that you accept these terms. If you do not accept these terms do not use this facility. </p>
                  <p><strong>All payments are subject to the following conditions: </strong></p>
                  <p>* The description of items are specific to you when you log in with your user id and unique password.</p>
                  <p>* All Charges quoted are in Indian Rupees.</p>
                  <p>* LEARNFLUENCE EDUCATION PVT LTD reserves the right to change the Charges at any time. </p>
                  <p>* Your payment to LEARNFLUENCE EDUCATION PVT LTD., will normally reach LEARNFLUENCE EDUCATION PVT LTD account, within two working days.</p>
                  <p> * We cannot accept liability for a payment not reaching the correct account of LEARNFLUENCE EDUCATION PVT LTD, due to quoting an incorrect account number or incorrect details, by you. Neither can we accept liability if payment is refused or declined by the Netbanking/credit/debit card supplier for any reason.</p>
                  <p> * If the Banker/card supplier declines payment, LEARNFLUENCE EDUCATION PVT LTD is under no obligation to bring this fact to your attention. </p>
                  <p>* It is for you (the Customer) to check with your bank/credit/debit card supplier that payment has been deducted from your account. </p>
                  <p>* In no event, LEARNFLUENCE EDUCATION PVT LTD will be liable for any damages whatsoever arising out of the use, computer virus, malware, inability to use, or the results of use of this site or any websites linked to this site, or the materials or information contained at any or all such sites, whether based on warranty, contract, tort or any other legal theory and whether or not advised of the possibility of such damages.</p>
                  <p><strong>Refund Policy</strong></p>
                  <p>Refunds, if applicable, at the discretion of the Management, will only be made as per the sources of Net Banking/debit/credit card used for the original transaction. For the avoidance of doubt, nothing in this Policy shall require LEARNFLUENCE EDUCATION PVT LTD to refund the Charges (or part thereof) unless such Charges (or part thereof) have previously been paid by the customer through online payment mode and the same has been credited into the accounts of LEARNFLUENCE EDUCATION PVT LTD and has the approval of the Management for refund. </p>
                  <p><strong>Refund Processing &amp; Cancellation Duration</strong></p>
                  <p>There is no Refund Processing &amp; Cancellation duration for Lakshya. Refunds, if applicable upon emergency situations as per the request of the end-user, at the discretion of the Management, will only be made as per the sources of Net Banking/debit/credit card used for the original transaction. In such a case, Refund processing will be done within 7-12 days from the date of approval.</p>
                  <p><strong>Privacy Policy </strong></p>
                  <p>This Privacy Policy applies to all of the Fees, Payment of Dues, Charges and related payments payable to LEARNFLUENCE EDUCATION PVT LTD through online mode. Sometimes, we may post specific privacy notices to explain in more detail. If you have any questions about this Privacy Policy, please feel free to contact us through our email info@lakshyaca.com.</p>
                  <p><strong>Changes to our Privacy Policy</strong></p>
                  <p>LEARNFLUENCE EDUCATION PVT LTD reserves the entire right to modify / amend / remove this privacy statement anytime and without any reason. Nothing contained herein creates or is intended to create a contract/agreement between LEARNFLUENCE EDUCATION PVT LTD and any user visiting the website or providing identifying information of any kind.</p>
                  <p> <strong>DND (Do Not Disturb) </strong></p>
                  <p>Policy If you wish to stop any further sms/email alerts/contacts/calls from our side, all you need to do is to send an email to info@lakshyaca.com with your registered mobile number and you will be excluded from the &lsquo;alerts list&rsquo;. Contact Email info@lakshyaca.com</p>
                  <p><strong>Terms of Payment</strong> </p>
                  <ul>
                     <li>Charges, Taxes applicable for online payment through Payment Gateway will be borne by the customer.</li>
                     <li>In respect of any failed transactions of any of the Customers, processed through this service, the amount will be refunded after deducting the transaction charges.</li>
                  </ul>
                  <h4><strong>Limitation of Liability</strong></h4>
                  <ul>
                     <li>Lakshya has made this Service available to the User as a matter of convenience. Lakshya expressly disclaims any claim or liability arising out of the provision of this Service. The User agrees and acknowledges that he/ she shall be solely responsible for his/ her conduct and that Lakshya reserves the right to terminate the rights to use of the Service immediately without giving any prior notice thereof.</li>
                     <li>Lakshya and/or the Payment Service Providers shall not be liable for any inaccuracy, error or delay in, or omission of (a) any data, information or message, or (b) the transmission or delivery of any such data, information or message; or (c) any loss or damage arising from or occasioned by any such inaccuracy, error, delay or omission, non-performance or interruption in any such data, information or message. Under no circumstances shall the Lakshya and/or the Payment Service Providers, its employees, directors, and its third-party agents involved in processing, delivering or managing the Services, be liable for any direct, indirect, incidental, special or consequential damages, or any damages whatsoever, including punitive or exemplary arising out of or in any way connected with the provision of or any inadequacy or deficiency in the provision of the Services or resulting from unauthorized access or alteration of transmissions of data or arising from suspension or termination of the Services</li>
                     <li>Lakshya and the Payment Service Provider(s) assume no liability whatsoever for any monetary or other damage suffered by the User on account of:
                     <p>(I) the delay, failure, interruption, or corruption of any data or other information transmitted in connection with the use of the Payment Gateway or Services in connection thereto; and/ or</p>
                     <p>(ii) any interruption or errors in the operation of the Payment Gateway.</p>
                     </li>
                  </ul>

                  <ul>
                     <li>The User shall indemnify and hold harmless the Payment Service Provider(s) and Lakshya and their respective officers, directors, agents, and employees, from any claim or demand, or actions arising out of or in connection with the utilization of the Services.</li>
                     <li>The User agrees that Lakshya or any of its employees will not be held liable by the User for any loss or damages arising from your use of, or reliance upon the information contained on the Website, or any failure to comply with these Terms and Conditions where such failure is due to circumstance beyond Lakshya&rsquo;s reasonable control.</li>
                  </ul>
                  <h4> <strong>Miscellaneous Conditions :</strong></h4>
                  <ul>
                     <li>Any waiver of any rights available to Lakshya under these Terms and Conditions shall not mean that those rights are automatically waived.</li>
                     <li>The User agrees, understands and confirms that his/ her personal data including without limitation details relating to debit card/ credit card transmitted over the Internet may be susceptible to misuse, hacking, theft and/ or fraud and that Lakshya or the Payment Service Provider(s) have no control over such matters.</li>
                     <li>Although all reasonable care has been taken towards guarding against unauthorized use of any information transmitted by the User, Lakshya does not represent or guarantee that the use of the Services provided by/ through it will not result in theft and/or unauthorized use of data over the Internet.</li>
                     <li>Lakshya, the Payment Service Provider(s) and its affiliates and associates shall not be liable, at any time, for any failure of performance, error, omission, interruption, deletion, defect, delay in operation or transmission, computer virus, communications line failure, theft or destruction or unauthorized access to, alteration of, or use of the information contained on the Website.</li>
                     <li>The User may be required to create his/ her own User ID and Password in order to register and/ or use the Services provided by Lakshya on the Website. By accepting these Terms and Conditions the User aggress that his/ her User ID and Password are very important pieces of information and it shall be the User&rsquo;s own responsibility to keep them secure and confidential. In furtherance hereof, the User agrees to;</li>
                  </ul>
                  <ul>
                     <li>
                         <p>(I) Choose a new password, whenever required for security reasons.</p>
                         <p>(II) Keep his/ her User ID &amp; Password strictly confidential.</p>
                         <p>(III) Be responsible for any transactions made by the User under such User ID and Password.</p>
                     </li>
                  </ul>
                  <p>The User is hereby informed that Lakshya will never ask the User for the User&rsquo;s password in an unsolicited phone call or in an unsolicited email. The User is hereby required to sign out of his/ her Lakshya account on the Website and close the web browser window when the transaction(s) have been completed. This is to ensure that others cannot access the User&rsquo;s personal information and correspondence when the User happens to share a computer with someone else or is using a computer in a public place like a library or Internet caf&eacute;.</p>
                  <h4> <strong>Debit/Credit Card, Bank Account Details</strong></h4>
                  <ul>
                     <li>The User agrees that the debit/credit card details provided by him/ her for use of the aforesaid Service(s) must be correct and accurate and that the User shall not use a debit/ credit card, that is not lawfully owned by him/ her or the use of which is not authorized by the lawful owner thereof. The User further agrees and undertakes to provide a correct and valid debit/credit card details.</li>
                     <li>The User may pay his/ her fees to Lakshya by using a debit/credit card or through an online banking account. The User warrants agree and confirm that when he/ she initiates a payment transaction and/or issues an online payment instruction and provides his/ her card/bank details:</li>
                  </ul>
                  <ul>
                     <li>The User is fully and lawfully entitled to use such credit/debit card, bank account for such transactions;</li>
                     <li>The User is responsible to ensure that the card/ bank account details provided by him/ her are accurate;</li>
                     <li>The User is authorizing debit of the nominated card/ bank account for the payment of fees selected by such User along with the applicable Fees.</li>
                  </ul>
                  <p>The User is responsible to ensure sufficient credit is available on the nominated card/ bank account at the time of making the payment to permit the payment of the dues payable or the bill(s) selected by the User inclusive of the applicable Fee.</p>
                  <h4> <strong>Personal Information</strong></h4>
                  <ul>
                     <li>The User agrees that, to the extent required or permitted by law, Lakshya and/ or the Payment Service Provider(s) may also collect, use and disclose personal information in connection with security-related or law enforcement investigations or in the course of cooperating with authorities or complying with legal requirements.</li>
                  </ul>
                  <ul>
                     <li>The User agrees that any communication sent by the User via e-mail and/or call shall imply release of information therein/ therewith to Lakshya. The User agrees to be contacted via e-mail and/or call on such contact initiated by him/ her.</li>
                  </ul>
                  <ul>
                     <li>In addition to the information already in the possession of Lakshya and/ or the Payment Service Provider(s), Lakshya may have collected similar information from the User in the past. By entering the Website the User consents to the terms of Lakshya information privacy policy and to Lakshya continued use of previously collected information. By submitting the User&rsquo;s personal information to Lakshya, the User will be treated as having given his/her permission for the processing of the User&rsquo;s personal data, and to be communicated via sms/email alerts/contacts/calls as set out herein.</li>
                  </ul>
                  <ul>
                     <li>The User acknowledges and agrees that his/ her information will be managed in accordance with the laws for the time in force. All data will be under compliance with Information Technology (Reasonable security practices and procedures sensitive personal data or information) Rules, 2011 ("Data Protection Rules") notified under the Information Technology Act, 200 ("IT Act").</li>
                  </ul>
                  <p><strong>Contact us </strong></p>
                  <p><strong> Learnfluence Education Private Limited</strong></p>
                  <p>LEARNFLUENCE EDUCATION PRIVATE LIMITED</p>
                  <p>India, Indian Rupee (INR)</p>
                  <p>Ernakulam, 8 F, DD SAMUDRA DARSHAN, SHANMUGHAM ROAD, MARINE DRIVE, KOCHI, , Kochi 682035, KL</p>
                  <p>GST 32AAECL5263F1ZR</p>
                  <p>Phone: 9061277777</p>
                  <p>Email:info@lakshyaclasses.com</p>
                </div>


            </div>
        </section>

        <CallbackForm props={{queryString: queryString}}/>

      <Footer props={{queryString: queryString}}/>

    </div>
  )
}
