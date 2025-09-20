import { useEffect } from 'react';

export const useOutsideClick = (
  refs: React.RefObject<HTMLElement>[],
  onClickOutside: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const clickedInside = refs.some(
        (r) => r.current && r.current.contains(e.target as Node),
      );

      if (!clickedInside) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [refs, onClickOutside]);
};
