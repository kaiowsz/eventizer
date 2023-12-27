import { Document } from "mongoose";

interface IEvent extends Document {
    _id: string;
    title: string;
    description?: string;
    location?: string;
    imageUrl: string;
    createdAt: Date;
    startDateTime: Date;
    endDateTime: Date;
    price: string;
    isFree: boolean;
    url?: string;
    category: { _id: string, name: string },
    organizer: { _id: string, firstName: string, lastName: string }
}

export default IEvent;