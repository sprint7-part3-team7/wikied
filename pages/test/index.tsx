import React, { useState, useEffect } from 'react';
import WikiEditor from '@/components/common/wikiEditor';
import { ContentState, convertToRaw } from 'draft-js';
import { ProfileDetail } from '@/types/wiki';
import {
  getProfileByCode,
  updateProfileEditStatus,
  updateProfile,
  checkProfileEditStatus,
} from '@/services/api/profile';

const TestEditorPage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileDetail | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [securityAnswer, setSecurityAnswer] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const profileCode = '1ac6bc19-bc47-4c81-98d7-18f492ae551a'; // 테스트용 프로필 코드

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getProfileByCode(profileCode);
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setErrorMessage('Failed to fetch profile. Please try again.');
    }
  };

  const startEditing = async () => {
    if (!securityAnswer) {
      setErrorMessage('Please enter the security answer.');
      return;
    }

    try {
      // 편집 상태 확인
      const checkResponse = await checkProfileEditStatus(profileCode);
      console.log('Check edit status response:', checkResponse);

      // 편집 상태 업데이트
      const updateResponse = await updateProfileEditStatus(profileCode, {
        securityAnswer,
      });
      console.log('Update edit status response:', updateResponse);

      setIsEditing(true);
      setErrorMessage('');
    } catch (error: any) {
      console.error('Error starting edit session:', error);
      setErrorMessage(
        error.response?.data?.message ||
          'Failed to start editing. Please try again.',
      );
      setIsEditing(false);
    }
  };

  const handleEditorSubmit = async (htmlContent: string) => {
    if (!profile) return;

    try {
      const response = await updateProfile(profileCode, {
        securityAnswer,
        securityQuestion: profile.securityQuestion,
        nationality: profile.nationality,
        family: profile.family,
        bloodType: profile.bloodType,
        nickname: profile.nickname,
        birthday: profile.birthday,
        sns: profile.sns,
        job: profile.job,
        mbti: profile.mbti,
        city: profile.city,
        image: profile.image,
        content: htmlContent,
      });

      setProfile(response.data);
      setIsEditing(false);
      setErrorMessage('');
      alert('Profile updated successfully!');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      setErrorMessage(
        error.response?.data?.message ||
          'Failed to update profile. Please try again.',
      );
    }
  };

  const handleEditorCancel = () => {
    setIsEditing(false);
  };

  const parseContentForEditor = (content: string): string => {
    try {
      const parsedContent = JSON.parse(content);
      const text = parsedContent.blocks
        .map((block: any) => block.text)
        .join('\n');
      return JSON.stringify(convertToRaw(ContentState.createFromText(text)));
    } catch (error) {
      console.error('Error parsing content:', error);
      return JSON.stringify(convertToRaw(ContentState.createFromText('')));
    }
  };

  return (
    <div>
      <h1>에디터 테스트</h1>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      {!isEditing && (
        <div>
          <input
            type="text"
            value={securityAnswer}
            onChange={(e) => setSecurityAnswer(e.target.value)}
            placeholder="securityAnswer 입력"
          />
          <button
            onClick={startEditing}
            style={{ marginBottom: '20px', marginLeft: '10px' }}
          >
            에디터 연결
          </button>
        </div>
      )}
      {isEditing && profile ? (
        <WikiEditor
          profile={profile}
          onCancel={handleEditorCancel}
          onSubmit={handleEditorSubmit}
          initialContent={profile.content}
        />
      ) : (
        <div>
          <h2>현재 내용:</h2>
          <div
            dangerouslySetInnerHTML={{ __html: profile ? profile.content : '' }}
          />
        </div>
      )}
    </div>
  );
};

export default TestEditorPage;
