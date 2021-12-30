package com.example.taks_2229_2021_user.repository;

import com.example.taks_2229_2021_user.model.Users;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserSearchRepository extends JpaSpecificationExecutor<Users>, PagingAndSortingRepository<Users, String> {
}
