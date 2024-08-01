import React, { useState, useEffect, useCallback } from 'react';
import styles from './styles.module.scss';
import { User } from '@/types/user';
import UserCard from './UserCard';
import { getUsers } from '@/services/api/user';
import Pagination from '@/components/pagination';
import SearchForm from '@/components/searchForm';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = useCallback(
    async (page: number, search: string) => {
      setLoading(true);
      try {
        const data = await getUsers(page, 3, search);
        setUsers(data.list);
        setTotalPages(Math.ceil(data.totalCount / 3));
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchUsers(currentPage, searchTerm);
  }, [currentPage, fetchUsers, searchTerm]);

  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term);
      setCurrentPage(1);
      fetchUsers(1, term);
    },
    [fetchUsers]
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <div className={styles.userListContainer}>
      <SearchForm onSearch={handleSearch} text="사용자 검색" />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className={styles.userList}>
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
