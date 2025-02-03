package org.project.app.repository;

import org.project.app.model.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long>{

    @Query("SELECT b FROM Budget b WHERE b.user.id = :userId AND b.category.id = :categoryId")
    Optional<Budget> findByUserIdAndCategoryId(@Param("userId") Long userId, @Param("categoryId") Long categoryId);

}
