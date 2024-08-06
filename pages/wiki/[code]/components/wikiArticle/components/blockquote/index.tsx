import styles from '@/pages/wiki/[code]/components/wikiArticle/components/blockquote/styles.module.scss';

interface BlockquoteProps {
  children: React.ReactNode;
}

const Blockquote = ({ children }: BlockquoteProps) => {
  return (
    <div className={styles['blockquote-container']}>
      <div className={styles['prefix']}></div>
      <div className={styles['content']}>{children}</div>
    </div>
  );
};

export default Blockquote;
