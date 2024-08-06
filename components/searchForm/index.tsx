import { useState } from 'react';
import styles from '@/components/searchForm/styles.module.scss';
import Button from '@/components/button';
import Image from 'next/image';
import searchIcon from '@/assets/icons/ic_search.svg';

interface SearchFormProps {
  onSearch: (term: string) => void;
  text: string;
}

const SearchForm = ({ onSearch, text }: SearchFormProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className={styles['search-container']}>
      <form onSubmit={handleSubmit}>
        <div className={styles['input-wrapper']}>
          <Image
            src={searchIcon}
            alt="Search"
            width={22}
            height={22}
            className={styles['search-icon']}
          />
          <input
            type="text"
            placeholder={text}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          color="primary"
          size="large"
          className={styles['search-button']}
        >
          검색
        </Button>
      </form>
    </div>
  );
};

export default SearchForm;
