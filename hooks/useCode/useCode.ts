import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthProvider';

const UseWikiNavigation = () => {
  const router = useRouter();
  const { user } = useAuth();
  const code = user?.profile?.code;

  const handleNavigationWiki = useCallback(
    (path: string) => {
      if (code) {
        router.push(path);
      } else {
        router.push('/mypage');
      }
    },
    [code, router]
  );

  return { code, handleNavigationWiki };
};

export default UseWikiNavigation;