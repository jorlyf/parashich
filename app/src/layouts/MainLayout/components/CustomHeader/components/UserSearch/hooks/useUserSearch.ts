import React from "react";
import { useDebounce } from "@hooks/index";
import request from "@http/request";
import { RequestType } from "@http/interfaces";
import { UserDTO } from "@dtos/index";
import { UserSearchResultItem } from "../components/UserSearchResult";

const useUserSearch = () => {
  const [users, setUsers] = React.useState<UserSearchResultItem[]>([]);

  const [searchingLogin, setSearchingLogin] = React.useState<string>("");

  const lastSearchRequestAbortController = React.useRef<AbortController>(null);

  const search = useDebounce(async (login: string, abortController: AbortController) => {

    const response = await request<UserDTO[]>({
      url: `Search/UsersByLogin?login=${login}`,
      type: RequestType.get,
      signal: abortController.signal
    });

    if (response.status !== 200) {
      setUsers([]);
      return;
    }

    const { data: userDTOs } = response;

    setUsers(userDTOs.map(user => ({
      id: user.id,
      login: user.login,
      avatarUrl: user.profile.avatarUrl
    })));

  });

  React.useEffect(() => {
    lastSearchRequestAbortController.current?.abort();

    if (searchingLogin === "") {
      setUsers([]);
      return;
    }

    const abortController = new AbortController();

    lastSearchRequestAbortController.current = abortController;

    search(searchingLogin, abortController);
  }, [searchingLogin]);

  return {
    users,
    searchingLogin,
    setSearchingLogin
  }
}

export default useUserSearch;
