import { ProfileDTO } from "..";

export default interface UserDTO {
  id: string;
  login: string;
  profile: ProfileDTO;
}