import { User } from "./user.model";

export interface Connection {
    _id: string;
    participants: User[];
}

export interface Message {
    _id?: string;
    from: any
    content: string
    connectionId: string
    to:any
    date?:Date
  }