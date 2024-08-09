import Link from 'next/link';
import { ProfileDetail, Section } from '@/types/wiki';
import styles from '@/pages/wiki/[code]/components/wikiHeader/styles.module.scss';
import EditorBtn from '@/pages/wiki/[code]/components/wikiHeader/components/editorBtn';
import Button from '@/components/button';
import link from '@/assets/icons/ic_link.svg';

interface WikiHeaderProps {
  className?: string;
  profile: ProfileDetail;
  sections: Section[];
  isEditable: boolean;
  onParticipateClick: () => void;
}

const WikiHeader = ({
  className,
  profile,
  sections,
  isEditable,
  onParticipateClick,
}: WikiHeaderProps) => {
  const hasSections = sections.length > 0;

  return (
    <>
      {isEditable ? (
        <div className={styles['header-container']}>
          <div className={styles['user-name-wrapper']}>
            <span className={styles['user-name']}>{profile.name}</span>
          </div>
          <div></div>
          {/* 임시 사용 */}
          <EditorBtn />
        </div>
      ) : (
        <section className={`${styles['wiki-actions']} ${className}`}>
          <section className={styles['name-and-btn']}>
            <span className={styles['user-name']}>{profile.name}</span>
            {hasSections && (
              <Button
                className={styles['participate-btn']}
                color="primary"
                size="large"
                onClick={onParticipateClick}
              >
                위키 참여하기
              </Button>
            )}
          </section>
          <section className={styles['link']}>
            <section className={styles['link-wrapper']}>
              <img src={link.src} width={20} height={20} alt="링크 아이콘" />
              <Link href="#" className={styles['link-copy-btn']}>
                <section className={styles['link-address']}>
                  https://www.wikied.kr/{profile.code}
                </section>
              </Link>
            </section>
          </section>
        </section>
      )}
    </>
  );
};

export default WikiHeader;
