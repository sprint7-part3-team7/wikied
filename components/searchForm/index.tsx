import React, { useState } from 'react';
import styles from '@/components/searchForm/styles.module.scss';

interface SearchFormProps {
  onSearch: (term: string) => void;
  text: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, text }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className={styles['search-container']}>
      <form onSubmit={handleSubmit}>
        <div className={styles['input-wrapper']}>
          <input
            type="text"
            placeholder={text}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className={styles['search-button']} type="submit">
          검색
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
