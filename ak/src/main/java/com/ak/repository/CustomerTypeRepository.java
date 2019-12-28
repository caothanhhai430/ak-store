package com.ak.repository;
import com.ak.domain.CustomerType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CustomerType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomerTypeRepository extends JpaRepository<CustomerType, Long>, JpaSpecificationExecutor<CustomerType> {

}
