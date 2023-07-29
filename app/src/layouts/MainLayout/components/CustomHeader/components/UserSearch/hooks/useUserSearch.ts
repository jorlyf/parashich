import React from "react";
import { useDebounce, useNavigator } from "@hooks/index";
import request from "@http/request";
import { RequestType } from "@http/interfaces";
import { ProfileSearchResponseDTO } from "@dtos/index";
import { IUserSearchResultListItem } from "../components/UserSearchResultList";

const useUserSearch = () => {

  const navigate = useNavigator();

  const [users, setUsers] = React.useState<IUserSearchResultListItem[]>([]);

  const [searchingLogin, setSearchingLogin] = React.useState<string>("");

  const lastSearchRequestAbortController = React.useRef<AbortController>(null);

  const search = useDebounce(async (login: string, abortController: AbortController) => {
    try {
      const { data: profileDTOs } = await request<ProfileSearchResponseDTO[]>({
        url: `Search/Profiles?login=${login}`,
        type: RequestType.get,
        signal: abortController.signal
      });

      setUsers(profileDTOs.map(profile => ({
        id: profile.id,
        login: profile.login,
        avatarUrl: profile.avatarUrl,
        onClick: () => {
          redirectToUserProfile(profile.login);
          setUsers([]);
          setSearchingLogin("");
        }
      })));
    } catch (error) {
      setUsers([]);
    }
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
