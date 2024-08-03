import styles from '@/pages/mypage/styles.module.scss';
import ChangePasswordInput from './components/changePasswordInput';
import AddWikiInput from './components/addWikiInput';

const MyPage = () => {
  /**
   * @ ChangePasswordInput, AddWikiInput에 공통 컴포넌트 (Button, Input) 적용해야 함
   */
  return (
    <div className={styles['container']}>
      <strong className={styles['title']}>계정 설정</strong>
      <div>
        <ChangePasswordInput />
        <AddWikiInput />
      </div>
    </div>
  );
};

export default MyPage;
