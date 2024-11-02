export interface Event {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: {
    lat: number;
    lng: number;
  };
  category: string;
}