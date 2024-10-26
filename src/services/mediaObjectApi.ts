import { generateUrl } from '@/utils';
import { MediaObject, MediaObjectEdit } from '@/models';
import apiService from '@/services/apiService';
import { ApiFormat, ApiRoutesWithoutPrefix, HttpMethod } from '@/config';

export const reviewApi = apiService.injectEndpoints({
   endpoints: (builder) => ({
      mediaObjectsJsonLd: builder.query<any[], Object | string | void>({
         query: (params) => {
            return {
               url: generateUrl(ApiRoutesWithoutPrefix.REVIEWS, params),
               method: HttpMethod.GET,
               headers: {
                  Accept: ApiFormat.JSONLD,
               },
            };
         },
         providesTags: ['MediaObject'],
      }),
      mediaObjects: builder.query<MediaObject[], Object | string | void>({
         query: (params) => {
            return {
               url: generateUrl(ApiRoutesWithoutPrefix.REVIEWS, params),
               method: HttpMethod.GET,
               headers: {
                  Accept: ApiFormat.JSONLD,
               },
            };
         },
         providesTags: ['MediaObject'],
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
         providesTags: ['MediaObject'],
      }),
      replaceMediaObject: builder.mutation<MediaObject, MediaObjectEdit>({
         query: ({ id, ...rest }) => {
            return {
               url: `${ApiRoutesWithoutPrefix.REVIEWS}/${id}`,
               method: HttpMethod.PUT,
               headers: {
                  Accept: ApiFormat.JSONLD,
                  'Content-Type': ApiFormat.JSONLD,
               },
               body: rest,
            };
         },
         invalidatesTags: ['MediaObject'],
      }),

      addMediaObject: builder.mutation<MediaObject, Partial<MediaObjectEdit>>({
         query: ({ id, ...rest }) => ({
            url: ApiRoutesWithoutPrefix.REVIEWS,
            method: HttpMethod.PATCH,
            headers: {
               Accept: ApiFormat.JSONLD,
               'Content-Type': ApiFormat.JSONLD,
            },
            body: rest,
         }),
         invalidatesTags: ['MediaObject'],
      }),

      deleteMediaObject: builder.mutation({
         query: (id) => ({
            url: `${ApiRoutesWithoutPrefix.REVIEWS}/${id}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['MediaObject'],
      }),
   }),
});

export const {
   useMediaObjectsJsonLdQuery,
   useMediaObjectsQuery,
   useAddMediaObjectMutation,
   useReplaceMediaObjectMutation,
   useMediaObjectQuery,
   useDeleteMediaObjectMutation,
} = reviewApi;
