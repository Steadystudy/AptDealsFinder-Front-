import { Coordinates } from './MapType';

export type Marker = {
  id: string;
  position: Coordinates;
  place_name: string;
  address_name: string;
  place_url: string;
  category_group_name: string;
  category_group_code: any;
};
