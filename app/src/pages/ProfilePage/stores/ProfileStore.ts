import { makeAutoObservable, runInAction } from "mobx";
import request from "@http/request";
import { RequestType } from "@http/interfaces";
import { Profile } from "@entities/index";
import { ProfileDTO } from "@dtos/index";

class ProfileStore {

  id: string = undefined;
  myId: string = undefined;

  profile?: Profile = undefined;
  fetched: boolean = false;
  loading: boolean = false;
  error?: string = undefined;

  constructor(id: string, myId: string) {
    makeAutoObservable(this);

    this.id = id;
    this.myId = myId;

    this.fetchBaseInfo();
  }

  async fetchBaseInfo() {
    try {
      this.loading = true;

      const { data: baseInfo } = await request<ProfileDTO>({
        url: `/Profiles/${this.id}`,
        type: RequestType.get
      });

      runInAction(() => {
        this.loading = false;
        this.fetched = true;

        this.profile = new Profile({
          id: baseInfo.id,
          login: baseInfo.login,
          avatarUrl: baseInfo.avatarUrl,
          status: baseInfo.status
        });

        this.fetchBasePhotos();
      });
    } catch (error) {
      console.error(error);
      runInAction(() => {
        this.error = "An error has occured";
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

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
