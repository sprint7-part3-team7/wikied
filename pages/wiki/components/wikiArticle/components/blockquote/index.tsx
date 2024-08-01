import styles from '@/pages/wiki/components/wikiArticle/components/blockquote/styles.module.scss';

interface BlockquoteProps {
  children: React.ReactNode;
}

const Blockquote: React.FC<BlockquoteProps> = ({ children }) => {
  return (
    <div className={styles['blockquote-container']}>
      <div className={styles['prefix']}></div>
      <div className={styles['content']}>{children}</div>
    </div>
  );
};

export default Blockquote;
