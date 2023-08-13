import { makeAutoObservable, runInAction } from "mobx";
import { jorlyfTask } from "jorlyf-mobx-task";
import request from "@http/request";
import { RequestType } from "@http/interfaces";
import { Profile } from "@entities/index";
import { ProfileDTO } from "@dtos/index";
import { getApiUrl } from "@utils/url";
import ProfilePhotoDTO from "@dtos/Profile/ProfilePhotoDTO";

class ProfileStore {

  id: string = undefined;
  myId: string = undefined;

  profile?: Profile = undefined;

  constructor(id: string, myId: string) {
    makeAutoObservable(this, {
      fetchBaseInfo: false
    });

    this.id = id;
    this.myId = myId;

    this.fetchBaseInfo();
  }

  fetchBaseInfo = jorlyfTask(async () => {
    const { data: baseInfo } = await request<ProfileDTO>({
      url: `/Profiles/${this.id}`,
      type: RequestType.get
    });

    baseInfo.avatarUrl = getApiUrl(baseInfo.avatarUrl);

    runInAction(() => {
      this.profile = new Profile({
        id: baseInfo.id,
        login: baseInfo.login,
        avatarUrl: baseInfo.avatarUrl,
        status: baseInfo.status
      });
    });

    this.fetchBasePhotos();
  });

  async fetchBasePhotos() {
    try {
      let { data } = await request<ProfilePhotoDTO[]>({
        url: `/Profiles/${this.id}/Photos?limit=3`,
        type: RequestType.get
      });

      data = data.map(photo => ({ ...photo, url: getApiUrl(photo.url) }));

      this.profile.setPhotos(data);
    } catch {

    }
  }

  get isMe() { return this.id === this.myId; }
}

export default ProfileStore;
