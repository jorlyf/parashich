import React from "react";
import useUserSearch from "./useUserSearch";
import Search from "@components/Search";
import { useTranslation } from "react-i18next";
import UserSearchResult from "./components/UserSearchResult";
import styles from "./styles.module.scss";

interface UserSearchProps {
  disabled: boolean;
}

const UserSearch: React.FC<UserSearchProps> = ({ disabled }) => {

  const { t } = useTranslation();

  const {
    users,
    searchingLogin,
    setSearchingLogin
  } = useUserSearch();

  return (
    <>
      <Search
        className={styles.user_search}
        value={searchingLogin}
        setValue={setSearchingLogin}
        placeholder={t("User search")}
        disabled={false}
      />

      <UserSearchResult
        users={users}
      />
    </>
  );
}

export default UserSearch;
