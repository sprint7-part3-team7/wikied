import React from 'react';
import classNames from 'classnames';
import Blockquote from '@/pages/wiki/components/wikiArticle/components/blockquote';
import styles from '@/pages/wiki/components/wikiArticle/styles.module.scss';

interface WikiArticleProps {
  className?: string;
}

const WikiArticle: React.FC<WikiArticleProps> = ({ className }) => {
  return (
    <div className={`${styles['grid-container']} ${className}`}>
      <div className={styles['grid-item']}>
        <span className={styles['wiki-article-title']}>01. 개요</span>
        <div className={styles['separator']} />
        <span className={styles['wiki-article-content']}>
          코드잇의 콘텐츠 프로듀서이자, 프론트엔드 엔지니어. 포도마켓의
          프론트엔드 엔지니어 출신이다.
        </span>
      </div>
      <div className={`${styles['grid-item']} ${styles['blockquote-item']}`}>
        <span className={styles['wiki-article-title']}>02. 취미</span>
        <div className={styles['separator']} />
        <span className={styles['wiki-article-content']}>
          식물을 키우는 것을 좋아한다. 바질이나 로즈마리 같은 허브류부터, 파,
          당근 같은 채소류까지 다양하게 키우는 것으로 알려져 있다. 이렇게 키운
          식물들을 직접 요리에 활용하기도 한다는데, 실제로 집에 방문한 사람들에
          의하면 요리 실력 또한 상당하다고 한다. <p />
          <p />
          이렇게 키운 식물들을 직접 요리에 활용하기도 한다는데, 실제로 집에
          방문한 사람들에 의하면 요리 실력 또한 상당하다고 한다.
        </span>
        <Blockquote>
          여기는 Block Quote를 나타내는 영역이에요.
          <p />
          이런 식으로 텍스트가 늘어나면 영역도 같이 늘어나게 됩니다.
          <p />
          여기는 Block Quote를 나타내는 영역이에요.
          <p />
          이런 식으로 텍스트가 늘어나면 영역도 같이 늘어나게 됩니다.
          <p />
        </Blockquote>
      </div>
      <div className={styles['grid-item']}>
        <span className={styles['wiki-article-title']}>03. 여담</span>
        <div className={styles['separator']} />
        <span className={styles['wiki-article-content']}>
          걸어다니는 사전이라고 불릴 정도로 다양한 분야의 지식을 두루 소유하고
          있다. 특히 새로운 서비스 출시 관련 소식을 아주 잘 알고 있는데, 얘기를
          들어보면 다양하게 구독하고 있는 뉴스레터들이 큰 도움을 준다고 한다.
        </span>
      </div>
      <div className={styles['grid-item']}>
        <span className={styles['wiki-article-title']}>04. 취향</span>
        <div className={styles['separator']} />
        <span className={styles['wiki-article-content']}>
          가위바위보를 좋아한다. 후식을 먹는다거나, 점심에 추가 금액을 내야
          한다거나, 편의점에서 뭘 사 와야 하는 경우, 거의 항상 가위바위보를
          제안한다. 제안을 많이 하다 보니 자신이 걸리는 경우도 꽤 많은데, 크게
          개의치 않아 하는 것 같다. 영국에서 살았던 영향인지, 근본을 중시하는
          것으로 보인다. 예를 들어 피자는 근본 토핑으로만 이루어진 피자(치즈
          피자, 페퍼로니 피자)를 가장 선호한다. 근본에 어울리지 않는
          토핑(불고기, 파인애플, 새우 등)이 추가된 피자는 선호하지 않는다.
        </span>
      </div>
    </div>
  );
};

export default WikiArticle;
