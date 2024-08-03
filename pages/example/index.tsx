import styles from '@/pages/example/styles.module.scss';
import ExampleComponents from './components/exampleComponents';
import Button from '@/components/button';

const Example = () => {
  return (
    <div className={styles['container']}>
      <Button
        className="abc"
        color="primary"
        size="small"
        defaultPadding
      >
        내 위키 만들기
      </Button>
      <p className={styles['fighting']}>7팀 파이팅!!!</p>
      <ExampleComponents />
    </div>
  );
};

export default Example;
