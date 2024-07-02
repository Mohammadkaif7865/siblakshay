import Head from 'next/head';
import Layout from '../comps/Layout';
import { useEffect } from 'react';

// import 'bootstrap/dist/css/bootstrap.min.css';

import '../styles/global.css';
import '../styles/header.css';
import '../styles/footer.css';
import '../styles/PhoneInput.css';
import '../styles/home.css';
import '../styles/about.css';
import '../styles/contact.css';
import '../styles/courses.css';
import '../styles/single-course.css';
import '../styles/login.css';
import '../styles/student.css';
import '../styles/style.css';

function MyApp({ Component, pageProps }) {

  // useEffect(() => {
  //   import('bootstrap/dist/js/bootstrap.bundle.min.js');
  // }, []);

  return (
    <Layout>
      <Head>

        <meta charSet="utf-8"/>
        <link rel="icon" href="/favicon.ico" />

        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <meta name="theme-color" content="#000000"/>

        <meta name="robots" content="index, follow" />

        <link rel="apple-touch-icon" href="https://www.lakshyacommerce.com/static/media/logo.33a9a921f736b6a8d332.webp"/>
        <link rel="manifest" href="/manifest.json"/>

        // eleminate render blocking start

        // font
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" />

        // style
        <link rel="preload" as="style" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        <link rel="preload" as="style" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" />

        // js
        <link rel="preload" as="script" href="https://lsqbot.converse.leadsquared.com/bot-script.js" />
        <link rel="preload" as="script" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" />
        <link rel="preload" as="script" href="/js/jquery.min.js" />
        <link rel="preload" as="script" href="/js/jquery.validate.min.js" />
        <link rel="preload" as="script" href="/js/custom.js" />

        // eleminate render blocking end

        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossOrigin="anonymous" referrerPolicy="no-referrer"/>

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" />

        <style dangerouslySetInnerHTML={{ __html: `
          #lsq-chatbot { position: fixed; z-index: 99999; border: none; }
          .chatbot-opened { height: min(85vh, 586px) !important; }
          @media only screen and (max-width: 768px) {
            .chatbot-opened {
              position: fixed; height: 100% !important; width: 100% !important;
              max-width: 100% !important; bottom: 0 !important; right: 0 !important;
              left: 0 !important; top: 0 !important;
            }
          }
        ` }} />

        <script type="text/javascript" src="https://lsqbot.converse.leadsquared.com/bot-script.js"></script>

        <script dangerouslySetInnerHTML={{ __html: `
          !function(e,t,a,n,g){e[n]=e[n]||[],e[n].push({"gtm.start":(new Date).getTime(),event:"gtm.js"});
          var m=t.getElementsByTagName(a)[0],r=t.createElement(a);r.async=!0;
          r.src="https://www.googletagmanager.com/gtm.js?id=GTM-5XLDC59F";
          m.parentNode.insertBefore(r,m)}(window,document,"script","dataLayer");
        ` }}></script>

        <script dangerouslySetInnerHTML={{ __html: `
          !function(e,t,n,c,o,a,f){e.fbq||(o=e.fbq=function(){o.callMethod?o.callMethod.apply(o,arguments):o.queue.push(arguments)},
          e._fbq||(e._fbq=o),(o.push=o).loaded=!0,o.version="2.0",o.queue=[],
          (a=t.createElement(n)).async=!0,a.src="https://connect.facebook.net/en_US/fbevents.js",
          (f=t.getElementsByTagName(n)[0]).parentNode.insertBefore(a,f))}(window,document,"script");
          fbq("init","849672136470343");fbq("track","PageView");
        ` }}></script>


        <noscript><img height="1" width="1" style={{display: 'none'}} src="https://www.facebook.com/tr?id=849672136470343&ev=PageView&noscript=1"/></noscript>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
        <script src="/js/jquery.min.js"></script>
        <script src="/js/jquery.validate.min.js"></script>
        <script src="/js/custom.js"></script>

        {/* Snap Pixel Code */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
          {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
          a.queue=[];var s='script';r=t.createElement(s);r.async=!0;
          r.src=n;var u=t.getElementsByTagName(s)[0];
          u.parentNode.insertBefore(r,u);})(window,document,
          'https://sc-static.net/scevent.min.js');

          snaptr('init', 'dae6a9bf-e73a-488c-a95c-1e7e15e6456c', {
          'user_email': '__INSERT_USER_EMAIL__'
          });

          snaptr('track', 'PAGE_VIEW');
        ` }}></script>
        {/* End Snap Pixel Code */}

      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
