import React from "react";
import { useDebounce, useNavigator } from "@hooks/index";
import request from "@http/request";
import { RequestType } from "@http/interfaces";
import { UserDTO } from "@dtos/index";
import { IUserSearchResultListItem } from "../components/UserSearchResultList";

const useUserSearch = () => {

  const navigate = useNavigator();

  const [users, setUsers] = React.useState<IUserSearchResultListItem[]>([]);

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
      avatarUrl: user.profile.avatarUrl,
      onClick: () => {
        redirectToUserProfile(user.login);
        setUsers([]);
        setSearchingLogin("");
      }
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

  const redirectToUserProfile = (userLogin: string) => {
    navigate(`/profile/${userLogin}`);
  }

  return {
    users,
    searchingLogin,
    setSearchingLogin,
    redirectToUserProfile
  }
}

export default useUserSearch;
