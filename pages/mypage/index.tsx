import styles from '@/pages/mypage/styles.module.scss';
import ChangePasswordInput from '../../components/mypage/changePasswordInput';
import AddWikiInput from '../../components/mypage/addWikiInput';
import { changePassword } from '@/services/api/user';
import { addProfiles } from '@/services/api/profile';
import { ProfileRequest } from '@/types/profile';
import { ChangePasswordRequest } from '@/types/user';

const MyPage = () => {
  const handlePasswordChange = async (requestData: ChangePasswordRequest) => {
    try {
      const response = await changePassword(requestData);
      console.log('성공적으로 비밀번호가 변경되었어요 😃', response.data);
    } catch (error) {
      console.error('비밀번호를 변경하는 데 실패했어요 🙁', error);
    }
  };

  const handleAddWiki = async (profileData: ProfileRequest) => {
    try {
      const response = await addProfiles(profileData);
      console.log('성공적으로 위키가 생성되었어요 😃', response.data);
    } catch (error) {
      console.error('위키를 생성하는 데 실패했어요 🙁', error);
    }
  };

  return (
    <div className={styles['container']}>
      <strong className={styles['title']}>계정 설정</strong>
      <div>
        <ChangePasswordInput onChangePassword={handlePasswordChange} />
        <AddWikiInput onAddWiki={handleAddWiki} />
      </div>
    </div>
  );
};

export default MyPage;
