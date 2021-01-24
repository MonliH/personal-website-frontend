export const PAGED_INITAL_STATE: PagedState<any> = {
  entries: [],
  pageNo: 0,
  loading: true,
  pages: 0,
};

export interface PagedState<T> {
  entries: Array<T>;
  pageNo: number;
  loading: boolean;
  pages: number;
}

export enum PagedActionTypes {
  SET_LOADING = 0,
  SET_ENTRIES = 1,
  SET_PAGE_NO = 2,
}

export type PagedAction<T> =
  | { type: PagedActionTypes.SET_LOADING; loading: boolean }
  | { type: PagedActionTypes.SET_PAGE_NO; pageNo: number }
  | {
      type: PagedActionTypes.SET_ENTRIES;
      pages: number;
      entries: Array<T>;
    };

const pagedReducer = <T>(
  state: PagedState<T>,
  action: PagedAction<T>
  // eslint-disable-next-line consistent-return
): PagedState<T> => {
  switch (action.type) {
    case PagedActionTypes.SET_LOADING:
      return { ...state, loading: action.loading };

    case PagedActionTypes.SET_ENTRIES:
      return {
        ...state,
        pages: action.pages,
        loading: false,
        entries: action.entries,
      };

    case PagedActionTypes.SET_PAGE_NO:
      return {
        ...state,
        pageNo: action.pageNo,
      };
    // All cases specified
  }
};
export default pagedReducer;
