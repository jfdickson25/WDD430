import { ObjectId } from "mongoose";

export class Memory {
    public _id: ObjectId;
    public event: string;
    public year: number;

    constructor(event: string, year: number) {
        this.event = event;
        this.year = year;
    }
}