import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getProfiles } from "@/services/api/wiki";
import { Profile, Section } from "@/types/wiki";
import WikiHeader from "@/pages/wiki/[code]/components/wikiHeader";
import WikiArticle from "@/pages/wiki/[code]/components/wikiArticle";
import WikiAside from "@/pages/wiki/[code]/components/wikiAside";
import styles from "@/pages/wiki/[code]/styles.module.scss";

interface WikiProps {
  className?: string;
}

// Mockdata 있을 때
const sectionsData = [
  {
    title: "01. 개요",
    content:
      "코드잇의 콘텐츠 프로듀서이자, 프론트엔드 엔지니어. 포도마켓의 프론트엔드 엔지니어 출신이다.",
  },
  {
    title: "02. 취미",
    content:
      "식물을 키우는 것을 좋아한다. 바질이나 로즈마리 같은 허브류부터, 파, 당근 같은 채소류까지 다양하게 키우는 것으로 알려져 있다.",
  },
  {
    title: "03. 여담",
    content:
      "걸어다니는 사전이라고 불릴 정도로 다양한 분야의 지식을 두루 소유하고 있다.",
  },
  {
    title: "04. 취향",
    content:
      "가위바위보를 좋아한다. 후식을 먹는다거나, 점심에 추가 금액을 내야 한다거나, 편의점에서 뭘 사 와야 하는 경우, 거의 항상 가위바위보를 제안한다. 제안을 많이 하다 보니 자신이 걸리는 경우도 꽤 많은데, 크게 개의치 않아 하는 것 같다. 영국에서 살았던 영향인지, 근본을 중시하는 것으로 보인다. 예를 들어 피자는 근본 토핑으로만 이루어진 피자(치즈 피자, 페퍼로니 피자)를 가장 선호한다. 근본에 어울리지 않는 토핑(불고기, 파인애플, 새우 등)이 추가된 피자는 선호하지 않는다.",
  },
];

// Mockdata 없을 때
// const sectionsData: Section[] = [];

const Wiki: React.FC<WikiProps> = ({ className }) => {
  const router = useRouter();
  const { code } = router.query;

  const [profile, setProfile] = useState<Profile | null>(null);

  async function getList(code: string) {
    try {
      const data = await getProfiles(code);
      setProfile(data);
    } catch (err) {
      console.error("데이터를 가져오는 중 오류가 발생했습니다:", err);
    }
  }

  useEffect(() => {
    if (typeof code === "string") {
      getList(code);
    }
  }, [code]);

  const containerClassName = `${styles["container"]} ${
    sectionsData.length === 0 ? styles["container-no-sections"] : ""
  }`;

  return (
    <div className={containerClassName}>
      <main className={styles["wiki-main"]}>
        <div className={styles["wiki-padding"]}></div>
        <WikiHeader
          className={styles["wiki-header"]}
          profile={profile}
          sections={sectionsData}
        />
        <div className={styles["spacer1"]}></div>
        <WikiArticle
          className={styles["wiki-article"]}
          sections={sectionsData}
        />
        <div className={styles["spacer2"]}></div>
        <WikiAside className={styles["wiki-aside"]} profile={profile} />
      </main>
    </div>
  );
};

export default Wiki;
