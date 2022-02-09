import {Users} from "./users";

export interface UsersList {
  data: Users[];
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  per_page: number;
  to: number;
  total: number;
}
