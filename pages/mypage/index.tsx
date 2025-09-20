import styles from '@/pages/mypage/styles.module.scss';
import ChangePasswordInput from '@/components/mypage/changePasswordInput';
import AddWikiInput from '@/components/mypage/addWikiInput';
import { changePassword } from '@/services/api/user';
import { addProfiles } from '@/services/api/profile';
import { ProfileRequest } from '@/types/profile';
import { ChangePasswordRequest } from '@/types/user';
import { AxiosError } from 'axios';

const MyPage = () => {
  const handlePasswordChange = async (
    requestData: ChangePasswordRequest,
  ): Promise<boolean> => {
    try {
      const response = await changePassword(requestData);
      console.log('성공적으로 비밀번호가 변경되었어요 😃', response.data);
      return true;
    } catch (error) {
      console.error('비밀번호를 변경하는 데 실패했어요 🙁', error);
      return false;
    }
  };

  const handleAddWiki = async (
    profileData: ProfileRequest,
  ): Promise<boolean> => {
    try {
      const response = await addProfiles(profileData);
      console.log('성공적으로 위키가 생성되었어요 😃', response.data);
      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (isAxiosError(error) && error.response?.status === 409) {
          console.error('이미 위키가 존재해요 🙁', error);
          return false;
        } else {
          console.error('위키를 생성하는 데 실패했어요 🙁', error);
          throw error;
        }
      } else {
        console.error('알 수 없는 에러가 발생했습니다');
        return false;
      }
    }
  };

  function isAxiosError(error: any): error is AxiosError {
    return error.isAxiosError === true;
  }

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
