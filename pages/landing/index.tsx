import Image from "next/image";
import styles from "@/pages/landing/styles.module.scss";
import landing_1 from "@/assets/images/landing/landing_1.png";
import landing_2 from "@/assets/images/landing/landing_2.png";
import landing_3 from "@/assets/images/landing/landing_3.png";

const Landing = () => {
  return (
    <>
      <div className={styles["landing-container"]}>
        <header className={styles["header"]}>
          <section className={styles["wikid-banner"]}>
            <div className={styles["banner-title"]}>
              <div className={styles["paragraph"]}>남들이 만드는</div>
              <div className={styles["heading"]}>나만의 위키</div>
            </div>
            <div className={styles["btn-wrapper"]}>
              <button className={styles["wikidMain-pageBts"]}>
                <h1>위키 만들기</h1>
              </button>
            </div>           
            <Image
              className={styles["landing-img1"]}
              width={498}
              height={590}
              src={landing_1}
              alt="위키만들기_일러스트"
            />
          </section>    
          <section className={styles["write-container"]}>
            <div className={styles["write-wrapper"]}>
              <div className={styles["feature-text"]}>
                <div className={styles["feature-title"]}>WRITE</div>
                <div className={styles["feature-content"]}>
                  <p>친구의 위키,</p>
                  <p>직접 작성해 봐요</p>
                </div>            
                <div className={styles["write-img-wrapper"]}>
                  <Image className={styles["write-img1"]} width={310} height={450} src={landing_2} alt="헤딩이미지1"/>  
                </div>
            </div>
            <Image className={styles["write-img2"]} width={520} height={681} src={landing_3} alt="헤딩이미지2"/>
            </div>
          </section>
        </header>
        <main>
          <section className={styles["share-container"]}>
            <div className={styles["feature-text"]}>
                <div className={styles["feature-title"]}>SHARE</div>
                <div className={styles["feature-content"]}>
                  <p>내 위키 만들고</p>
                  <p>친구에게 공유해요</p>
                </div>      
            </div>
            <div className={styles[]}>

            </div>



          </section>
        </main>
      </div>
    </>
  );
};

export default Landing;
