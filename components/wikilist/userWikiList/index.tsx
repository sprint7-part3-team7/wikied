import { useState, useEffect, useCallback } from 'react';
import styles from '@/components/wikilist/userWikiList/styles.module.scss';
import UserWikiCard from '@/components/wikilist/userWikiList/userWikiCard';
import Pagination from '@/components/common/pagination';
import SearchForm from '@/components/common/searchForm';
import NotFound from '@/components/wikilist/notFound';
import { getProfiles } from '@/services/api/profile';
import { ProfileSummary } from '@/types/wiki';

const UserWikiList = () => {
  const [users, setUsers] = useState<ProfileSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = useCallback(async (page: number, search: string) => {
    setLoading(true);
    try {
      const response = await getProfiles({ page, pageSize: 3, name: search });
      const data = response.data;
      setUsers(data.list);
      setTotalPages(Math.ceil(data.totalCount / 3));
      setTotalCount(data.totalCount);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers(currentPage, searchTerm);
  }, [currentPage, fetchUsers, searchTerm]);

  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term);
      setCurrentPage(1);
      fetchUsers(1, term);
    },
    [fetchUsers],
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <div className={styles['user-list-container']}>
      <SearchForm onSearch={handleSearch} text="사용자 검색" />
      {loading ? (
        <div>Loading...</div>
      ) : users.length === 0 ? (
        <NotFound searchTerm={searchTerm} />
      ) : (
        <>
          <div className={styles['search-result-info']}>
            {searchTerm && (
              <>
                "{searchTerm}"님을 총{' '}
                <span className={styles['total-count']}>{totalCount}</span>명
                찾았습니다.
              </>
            )}
          </div>
          <div className={styles['user-list']}>
            {users.map((user) => (
              <UserWikiCard key={user.id} user={user} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default UserWikiList;
