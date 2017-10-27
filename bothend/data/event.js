import mongoose from "mongoose";


/*
 type Event {
 lat: String
 lng: String
 id: ID!
 title: String
 description: String
 startTime: String
 usersAttending: [User]
 eventType: EventType
 }

 enum EventType {
 Global
 Educational
 Group
 }*/
const EventSchema = new mongoose.Schema({
    lat: {
        type: String
    },
    lng: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    eventType: {
        type: String
    }
});

const Event = mongoose.model('Event', EventSchema);

export default Event;
