import Image from 'next/image';
import styles from '@/pages/landing/styles.module.scss';
import landing_1 from '@/assets/images/landing/landing_1.png';
import landing_2 from '@/assets/images/landing/landing_2.png';
import landing_3 from '@/assets/images/landing/landing_3.png';
import landing_4 from '@/assets/images/landing/landing_4.png';
import landing_5 from '@/assets/images/landing/landing_5.png';
import landing_6 from '@/assets/images/landing/landing_6.png';
import landing_7 from '@/assets/images/landing/landing_7.png';
import landing_10 from '@/assets/images/landing/landing_10.png';
import landing_11 from '@/assets/images/landing/landing_11.png';
import landing_12 from '@/assets/images/landing/landing_12.png';
import ic_arrow_down from '@/assets/icons/ic_arrow_down.svg';
import ic_arrow_up from '@/assets/icons/ic_arrow_up.svg';
import Ellipse from '@/assets/icons/ic_Ellipse 22.svg';
import Button from '@/components/common/button';
import useWikiNavigation from '@/hooks/useCode/useCode';
import { useEffect, useState } from 'react';
import Toast from '@/components/common/toast';

const Landing = () => {
  const { handleNavigationWiki } = useWikiNavigation();

  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
    visible: boolean;
  } | null>(null);

  useEffect(() => {
    const storedToast = localStorage.getItem('toast');
    if (storedToast) {
      setToast(JSON.parse(storedToast));
      localStorage.removeItem('toast');
    }
  }, []);

  const handleCloseToast = () => {
    setToast(null);
  };

  const [open, setOpen] = useState(false);

  return (
    <div className={styles['landing-container']}>
      <header className={styles['header']}>
        <section className={styles['wikid-banner']}>
          <div className={styles['banner-title']}>
            <div className={styles['paragraph']}>남들이 만드는</div>
            <div className={styles['heading']}>나만의 위키</div>
          </div>
          <div className={styles['btn-wrapper']}>
            <Button
              color="main-top"
              size="x-large"
              className={styles['main-page-top-button']}
              onClick={handleNavigationWiki}
            >
              위키 만들기
            </Button>
          </div>
          <div className={styles['landing-img1-wrapper']}>
            <Image
              className={styles['landing-img1']}
              width={498}
              height={590}
              src={landing_1}
              alt="위키만들기_일러스트"
            />
          </div>
        </section>
        <Image
          className={styles['ellipse-img']}
          width={2000}
          height={400}
          src={Ellipse}
          alt="타원이미지"
        />
        <section className={styles['write-container']}>
          <div className={styles['write-wrapper']}>
            <div className={styles['feature-text']}>
              <div className={styles['feature-title']}>WRITE</div>
              <div className={styles['feature-content']}>
                <p>친구의 위키,</p>
                <p>직접 작성해 봐요</p>
              </div>
              <Image
                className={styles['write-img1']}
                width={310}
                height={450}
                src={landing_2}
                alt="헤딩이미지1"
              />
            </div>
            <Image
              className={styles['write-img2']}
              width={520}
              height={681}
              src={landing_3}
              alt="헤딩이미지2"
            />
          </div>
        </section>
      </header>
      <main>
        <section className={styles['share-container']}>
          <div className={styles['share-wrapper']}>
            <div className={styles['feature-text']}>
              <div className={styles['feature-title']}>SHARE</div>
              <div className={styles['feature-content']}>
                <p>내 위키 만들고</p>
                <p>친구에게 공유해요</p>
              </div>
            </div>
            <div className={styles['img-container']}>
              <div className={styles['img-box']}></div>
              <Image
                className={styles['share-img1']}
                width={360}
                height={360}
                src={landing_4}
                alt="쉐어이미지1"
              />
              <Image
                className={styles['share-img2']}
                width={360}
                height={360}
                src={landing_5}
                alt="쉐어이미지2"
              />
              <Image
                className={styles['share-img3']}
                width={360}
                height={360}
                src={landing_6}
                alt="쉐어이미지3"
              />
              <Image
                className={styles['share-img4']}
                width={360}
                height={360}
                src={landing_7}
                alt="쉐어이미지4"
              />
              <div className={styles['img-box']}></div>
            </div>
          </div>
        </section>
        <section className={styles['view-container']}>
          <div className={styles['view-wrapper']}>
            <div className={styles['feature-text']}>
              <div className={styles['feature-title']}>VIEW</div>
              <div className={styles['feature-content']}>
                <p>친구들이 달아준</p>
                <p>내용을 확인해 봐요</p>
              </div>
            </div>
            <div className={styles['img-container']}>
              <Image
                className={styles['view-img1']}
                width={924}
                height={280}
                src={landing_10}
                alt="뷰이미지1"
              />
              <div className={styles['img-wrapper']}>
                <Image
                  className={styles['view-img2']}
                  width={280}
                  height={280}
                  src={landing_12}
                  alt="뷰이미지2"
                />
                <Image
                  className={styles['view-img3']}
                  width={604}
                  height={280}
                  src={landing_11}
                  alt="뷰이미지3"
                />
              </div>
            </div>
          </div>
        </section>
        <section className={styles['start-container']}>
          <div className={styles['start-wrapper']}>
            <div className={styles['start-title']}>나만의 위키 만들어 보기</div>
            <Button
              color="main-bottom"
              size="x-large"
              className={styles['main-page-bottom-button']}
              onClick={handleNavigationWiki}
            >
              지금 시작하기
            </Button>
          </div>
        </section>
      </main>
      <footer>
        <div className={styles['footer-container']}>
          <div className={styles['footer-wrapper']}>
            <div className={styles['copyright']}>
              Copyright ⓒ Wikied. All Rights Reserved
            </div>
            <div className={styles['impormaion']}>
              <div
                className={styles['toggle-button']}
                onClick={() => setOpen((prev) => !prev)}
              >
                <span>Wikied 사업자 정보</span>
                <Image
                  src={open ? ic_arrow_up : ic_arrow_down}
                  width={8}
                  height={8}
                  className={styles['toggle-icon']}
                  alt="사업자 정보 토글 버튼"
                />
              </div>
              <div className={styles['business-info']} data-open={open}>
                <p className={styles['business-info-detail']}>
                  사업자등록번호 000-00-00000 | 통신판매신고 제2020-서울-00000호
                  | 대표 : 이지은
                </p>
                <p>서울특별시 중구 청계천로 123, 위키드빌딩</p>
              </div>
            </div>
            <div className={styles['footer-menu']}>
              <a className={styles['footer-link']} href="#">
                서비스 이용약관
              </a>
              <a className={styles['footer-link']} href="#">
                개인정보 취급방침
              </a>
              <a className={styles['footer-link']} href="#">
                전자금융거래 기본약관
              </a>
            </div>
          </div>
        </div>
      </footer>

      {toast && toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={handleCloseToast}
        />
      )}
    </div>
  );
};

export default Landing;
