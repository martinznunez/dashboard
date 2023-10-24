export interface Data {
  connected: boolean;
  id: string;
  name: string;
  unit: string;
  value: string | null;
}

export interface RefData extends Partial<Data> {
  command: string;
}
