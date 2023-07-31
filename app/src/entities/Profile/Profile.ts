import { makeAutoObservable } from "mobx";

interface ProfileConstructorParams {
  id: string;
  login: string;
  avatarUrl?: string;
  status?: string;
  friendship?: any;
  friends?: any[];
  photos?: any[];
  posts?: any[];
}

class Profile {

  id: string = undefined;
  login: string = undefined;
  avatarUrl?: string = undefined;
  status?: string = undefined;
  friendship?: any = undefined;
  friends?: any[] = undefined;
  photos?: any[] = undefined;
  posts?: any[] = undefined;

  constructor({ id, login, avatarUrl, status, friendship, friends, photos, posts }: ProfileConstructorParams) {
    makeAutoObservable(this);

    this.id = id;
    this.login = login;
    this.avatarUrl = avatarUrl;
    this.status = status;
    this.friendship = friendship;
    this.friends = friends;
    this.photos = photos;
    this.posts = posts;
  }

  setAvatarUrl(url: string) {
    this.avatarUrl = url;
  }

  setStatus(text: string) {
    this.status = text;
  }

  setPhotos(photos: any) {
    this.photos = photos;
  }
}

export default Profile;
