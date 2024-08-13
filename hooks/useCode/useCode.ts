import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthProvider';

const useWikiNavigation = () => {
  const router = useRouter();
  const { user, isLoggedIn } = useAuth();
  const code = user?.profile?.code;


const handleNavigationWiki = useCallback(() => {
  if (!isLoggedIn) {
    // 로그인되지 않은 경우 로그인 페이지로 이동
    router.push('/login');
  } else if (isLoggedIn && !code) {
    // 로그인은 되었지만 code가 없는 경우 마이페이지로 이동
    router.push('/mypage');
  } else if (isLoggedIn && code) {
    // 로그인도 되었고 code도 있는 경우 위키 페이지로 이동
    router.push(`/wiki/${code}`);
  }
}, [isLoggedIn, code, router]);

return { code, handleNavigationWiki };
};

export default useWikiNavigation;