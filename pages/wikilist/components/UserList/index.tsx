import { useState, useEffect, useCallback } from 'react';
import styles from '@/pages/wikilist/components/UserList/styles.module.scss';
import UserCard from './userCard';
import Pagination from '@/components/pagination';
import SearchForm from '@/components/searchForm';
import NotFound from '@/pages/wikilist/components/notFound';
import { getProfiles } from '@/services/api/profile';
import { ProfileSummary } from '@/types/wiki';

const UserList = () => {
  const [users, setUsers] = useState<ProfileSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = useCallback(async (page: number, name: string) => {
    setLoading(true);
    try {
      const response = await getProfiles({ page, pageSize: 3, name });
      const data = response.data;
      setUsers(data.list);
      setTotalPages(Math.ceil(data.totalCount / 3));
    } catch (error) {
      console.error(error);
    } finally {
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
          <div className={styles['user-list']}>
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
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

export default UserList;
