import { User } from "./user.model";

export interface Connection {
    _id: string;
    participants: User[];
}