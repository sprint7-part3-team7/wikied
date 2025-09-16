import { useEffect, useState } from 'react';

export const useMenu = () => {
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const [isDeskMenuOpen, setIsDeskMenuOpen] = useState(false);

  const mobileMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMobileMenu((prev) => !prev);
  };

  const deskMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsDeskMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenu(false);
      } else {
        setIsDeskMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);

    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobileMenu,
    setIsMobileMenu,
    isDeskMenuOpen,
    setIsDeskMenuOpen,
    mobileMenu,
    deskMenu,
  };
};
