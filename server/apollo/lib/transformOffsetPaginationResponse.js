export const transformOffsetPaginationResponse = apiResponse => ({
  nodes: apiResponse.data,
  pageInfo: {
    count: apiResponse.count || 0,
    total: apiResponse.total || 0,
    page: apiResponse.page || 0,
    pageCount: apiResponse.pageCount || 0,
  },
});
