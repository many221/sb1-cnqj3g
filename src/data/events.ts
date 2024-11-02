import { Event } from '../types';

export const events: Event[] = [
  {
    id: '1',
    title: 'Morning Yoga in the Park',
    description: 'Start your day with energizing yoga poses',
    startTime: '06:00',
    endTime: '07:30',
    location: { lat: 40.7829, lng: -73.9654 },
    category: 'fitness'
  },
  {
    id: '2',
    title: 'Tech Conference',
    description: 'Annual technology innovation summit',
    startTime: '09:00',
    endTime: '17:00',
    location: { lat: 40.7505, lng: -73.9934 },
    category: 'conference'
  },
  {
    id: '3',
    title: 'Food Festival',
    description: 'International cuisine and local delicacies',
    startTime: '11:00',
    endTime: '20:00',
    location: { lat: 40.7587, lng: -73.9787 },
    category: 'food'
  },
  {
    id: '4',
    title: 'Art Gallery Opening',
    description: 'Contemporary art exhibition premiere',
    startTime: '18:00',
    endTime: '21:00',
    location: { lat: 40.7484, lng: -74.0014 },
    category: 'art'
  },
  {
    id: '5',
    title: 'Night Market',
    description: 'Local vendors and live music',
    startTime: '19:00',
    endTime: '23:00',
    location: { lat: 40.7417, lng: -73.9893 },
    category: 'market'
  }
];