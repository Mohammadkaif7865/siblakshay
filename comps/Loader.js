import React, { useEffect, useState } from 'react';

export default function Loader() {

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className={`loader ${loaded ? 'loaded' : ''}`}>
      <picture>
        <source srcSet="/assets/images/logo.png" type="image/webp" />
        <img src="/assets/images/logo.png" alt="Indian Institute of Commerce | Lakshya" />
      </picture>
      <p className="mt-2">Loading...</p>
    </div>
  )
}
