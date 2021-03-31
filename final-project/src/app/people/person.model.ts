import { ObjectId } from "mongoose";
import { Memory } from '../memories/memory.model';

export class Person {
    public _id: ObjectId;
    public firstName: string;
    public lastName: string;
    public imgUrl: string;
    public memories: Memory[];

    constructor(firstName: string, lastName: string, imgUrl: string, memories: Memory[]) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.imgUrl = imgUrl;
        this.memories = memories;
    }
}