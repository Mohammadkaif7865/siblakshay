import Loader from "../comps/Loader";

const Layout = ({ children }) => {
  return (
    <>
      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5XLDC59F" height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe></noscript>

      { children }

      <iframe style={{bottom:'15px',right:'10px'}} id="lsq-chatbot" src="https://botweb.converse.leadsquared.com/?botId=967&tenantId=55343&type=WEB&channelId=0202bc7e-d904-48e7-b313-e614975f9ce5"></iframe>
    </>
  );
}

export default Layout;
