/**
 * Domain Entity: Paginated Response
 * Generic pagination wrapper
 */
export interface PaginatedResponse<T> {
  results: T[];
  info: PaginationInfo;
}

export interface PaginationInfo {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}
