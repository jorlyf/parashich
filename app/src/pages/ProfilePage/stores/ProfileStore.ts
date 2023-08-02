import { makeAutoObservable, runInAction } from "mobx";
import { jorlyfTask } from "jorlyf-mobx-task";
import request from "@http/request";
import { RequestType } from "@http/interfaces";
import { Profile } from "@entities/index";
import { ProfileDTO } from "@dtos/index";

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
      const { data } = await request({
        url: `/Profiles/${this.id}/Photos?limit=3`,
        type: RequestType.get
      });

      this.profile.setPhotos(data);
    } catch {

    }
  }

  get isMe() { return this.id === this.myId; }
}

export default ProfileStore;
