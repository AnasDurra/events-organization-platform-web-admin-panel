import { apiSlice } from '../../api/apiSlice';

export const reports = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        platformProblems: builder.query({
            query: () => ({
                url: 'platform-problem',
                method: 'GET',
            }),
        }),
        isEventReported: builder.query({
            query: (id) => ({
                url: `admin-report/is-reported/${id}`,
                method: 'GET',
            }),
        }),
        reportAdmin: builder.mutation({
            query: (body) => ({
                url: 'admin-report',
                method: 'POST',
                body: body,
            }),
        }),
        adminReports: builder.query({
            query: ({ page, pageSize }) => ({
                url: `admin-report?page=${page}&pageSize=${pageSize}`,
                method: 'GET',
            }),
            providesTags: ['reports'],
        }),

        ignoreReport: builder.mutation({
            query: (report_id) => ({
                url: `admin-report/ignore/${report_id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['reports'],
        }),
        resolveReport: builder.mutation({
            query: (report_id) => ({
                url: `admin-report/resolve/${report_id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['reports'],
        }),
    }),
});

export const {
    usePlatformProblemsQuery,
    useIsEventReportedQuery,
    useReportAdminMutation,
    useAdminReportsQuery,
    useIgnoreReportMutation,
    useResolveReportMutation,
} = reports;
