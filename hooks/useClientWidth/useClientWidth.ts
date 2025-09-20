import { useEffect, useState } from 'react';

const useClientWidth = () => {
  const [clientWidth, setClientWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () =>
      setClientWidth(document.documentElement.clientWidth);

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return clientWidth;
};

export default useClientWidth;
