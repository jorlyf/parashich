import React from "react";
import { useDebounce } from "@hooks/index";
import request from "@http/request";
import { RequestType } from "@http/interfaces";
import { UserDTO } from "@dtos/index";
import { UserSearchResultItem } from "./components/UserSearchResult";

const useUserSearch = () => {
  const [users, setUsers] = React.useState<UserSearchResultItem[]>([]);

  const [searchingLogin, setSearchingLogin] = React.useState<string>("");

  const search = useDebounce(async () => {

    const response = await request<UserDTO[]>({
      url: `Search/UsersByLogin?login=${searchingLogin}`,
      type: RequestType.get,
    });

    if (response.status !== 200) {
      setUsers([]);
      return;
    }

    setUsers(response.data.map(user => ({
      id: user.id,
      login: user.login,
      avatarUrl: user.profile.avatarUrl
    })));
  });

  React.useEffect(() => {
    if (searchingLogin === "") return;
    search();
  }, [searchingLogin]);

  return {
    users,
    searchingLogin,
    setSearchingLogin
  }
}

export default useUserSearch;
