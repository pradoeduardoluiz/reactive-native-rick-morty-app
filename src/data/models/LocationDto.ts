/**
 * Data Model (DTO): Location API Response
 */
export interface LocationDto {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}
