import { Dispatch, useEffect } from "react";
import { PagedActionTypes, PagedAction } from "@reducers/pagedReducer";

const usePaged = <T>(
  postsPerPage: number,
  pageNo: number,
  dispatch: Dispatch<PagedAction<T>>,
  fetchFunc: (
    postsPerPage: number,
    pageNo: number
  ) => Promise<[number, Array<T>]>
) => {
  const fetchEntries = async () => {
    dispatch({ type: PagedActionTypes.SET_LOADING, loading: true });
    const [pages, entries] = await fetchFunc(postsPerPage, pageNo);
    dispatch({
      type: PagedActionTypes.SET_ENTRIES,
      entries,
      pages,
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchEntries();
  }, [pageNo, postsPerPage]);
};

export default usePaged;
