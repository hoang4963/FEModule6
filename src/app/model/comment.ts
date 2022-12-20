import {User} from "./user";

export interface Comments {
  id?:number;
  comment?: String;
  houseId?:number;
  user: User;
  userName?:String;
  userId:any;
}
