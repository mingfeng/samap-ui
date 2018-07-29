import { TravelMode } from '../enums';

export interface Settings {
  basemap: string;
  travelMode: TravelMode;
  travelTime: number;
}
