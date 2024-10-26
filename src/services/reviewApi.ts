import { generateUrl } from '@/utils';
import { Review, ReviewEdit } from '@/models';
import apiService from '@/services/apiService';
import { ApiFormat, ApiRoutesWithoutPrefix, HttpMethod } from '@/config';

export const reviewApi = apiService.injectEndpoints({
   endpoints: (builder) => ({
      reviewsJsonLd: builder.query<any[], Object | string | void>({
         query: (params) => {
            return {
               url: generateUrl(ApiRoutesWithoutPrefix.REVIEWS, params),
               method: HttpMethod.GET,
               headers: {
                  Accept: ApiFormat.JSONLD,
               },
            };
         },
         providesTags: ['Review'],
      }),
      reviews: builder.query<Review[], Object | string | void>({
         query: (params) => {
            return {
               url: generateUrl(ApiRoutesWithoutPrefix.REVIEWS, params),
               method: HttpMethod.GET,
               headers: {
                  Accept: ApiFormat.JSONLD,
               },
            };
         },
         providesTags: ['Review'],
      }),
      review: builder.query({
         query: (id) => {
            let test = id;
            if (typeof id == 'string' || id instanceof String) {
               const tests = id.match(/\d+/);
               if (tests !== null) {
                  test = tests[0];
               }
            }
            return `${ApiRoutesWithoutPrefix.REVIEWS}/${test}`;
         },
         providesTags: ['Review'],
      }),
      updateReview: builder.mutation<Review, ReviewEdit>({
         query: ({ id, ...rest }) => {
            return {
               url: `${ApiRoutesWithoutPrefix.REVIEWS}/${id}`,
               method: HttpMethod.PATCH,
               headers: {
                  Accept: ApiFormat.JSONLD,
                  'Content-Type': ApiFormat.JSONLD,
               },
               body: rest,
            };
         },
         invalidatesTags: ['Review'],
      }),

      addReview: builder.mutation<Review, Partial<ReviewEdit>>({
         query: ({ id, ...rest }) => ({
            url: ApiRoutesWithoutPrefix.REVIEWS,
            method: HttpMethod.PATCH,
            headers: {
               Accept: ApiFormat.JSONLD,
               'Content-Type': ApiFormat.JSONLD,
            },
            body: rest,
         }),
         invalidatesTags: ['Review'],
      }),

      deleteReview: builder.mutation({
         query: (id) => ({
            url: `${ApiRoutesWithoutPrefix.REVIEWS}/${id}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Review'],
      }),
   }),
});

export const {
   useReviewsJsonLdQuery,
   useReviewsQuery,
   useUpdateReviewMutation,
   useAddReviewMutation,
   useReviewQuery,
   useDeleteReviewMutation,
} = reviewApi;
