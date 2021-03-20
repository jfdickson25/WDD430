import { ObjectId } from "mongoose";
import { Contact } from "../contacts/contact.model";

export class Message {
    public _id: ObjectId
    public id: string; 
    public subject: string;
    public msgText: string;
    public sender: Contact;

    constructor(id: string, subject: string, msgText:string, 
        sender: Contact) {
        this.id = id;
        this.subject = subject; 
        this.msgText = msgText;
        this.sender = sender;
    }
}