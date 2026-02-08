/**
 * Domain Entity: Location
 */
export interface LocationEntity {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residentIds: number[];
  createdAt: Date;
}
