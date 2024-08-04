import Image from 'next/image';
import Link from 'next/link';
import { Profile, Section } from '@/types/wiki';
import styles from '@/pages/wiki/[code]/components/wikiHeader/styles.module.scss';
import link from '@/assets/icons/ic_link.svg';
import Button from '@/components/button';
import EditorBtn from './components/editorBtn';

interface WikiHeaderProps {
  className?: string;
  profile: Profile;
  sections: Section[];
  isEditable: boolean;
}

const WikiHeader = ({
  className,
  profile,
  sections,
  isEditable,
}: WikiHeaderProps) => {
  const hasSections = sections.length > 0;

  return (
    <>
      {isEditable ? (
        <div className={styles['header-container']}>
          <div className={styles['user-name']}>
            <span>{profile?.name}</span>
          </div>
          {/* 임시 사용 */}
          <EditorBtn />
        </div>
      ) : (
        <section className={`${styles['wiki-actions']} ${className}`}>
          <section className={styles['name-and-btn']}>
            <span className={styles['username']}>{profile?.name}</span>
            {hasSections && (
              <Button
                className={styles['participate-btn']}
                color="primary"
                size="large"
              >
                위키 참여하기
              </Button>
            )}
          </section>
          <section className={styles['link']}>
            <section className={styles['link-wrapper']}>
              <Image src={link} width={20} height={20} alt="링크 아이콘" />
              <Link href="#" className={styles['link-copy-btn']}>
                <section className={styles['link-address']}>
                  https://www.wikied.kr/{profile?.code}
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
