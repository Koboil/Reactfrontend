import { Service, ServiceEdit } from '@/models';
import { generateUrl } from '@/utils';
import { ApiFormat, ApiRoutesWithoutPrefix, HttpMethod } from '@/config';
import apiService from '@/services/apiService';

export const servicesApi = apiService.injectEndpoints({
   endpoints: (builder) => ({
      services: builder.query<Service[], object | void>({
         query: (params) => {
            return {
               url: generateUrl(ApiRoutesWithoutPrefix.SERVICES, params),
               method: HttpMethod.GET,
               headers: {
                  Accept: ApiFormat.JSON,
               },
            };
         },
         providesTags: ['Service'],
      }),
      servicesJsonLd: builder.query<any[], object | string | void>({
         query: (params) => {
            return {
               url: generateUrl(ApiRoutesWithoutPrefix.SERVICES, params),
               method: HttpMethod.GET,
               headers: {
                  Accept: ApiFormat.JSONLD,
               },
            };
         },
         providesTags: ['Service'],
      }),
      service: builder.query<Service, string | number>({
         query: (id) => `${ApiRoutesWithoutPrefix.SERVICES}/${String(id)}`,
         providesTags: ['Service'],
      }),
      addService: builder.mutation<Service, ServiceEdit>({
         query: ({ id, ...data }) => ({
            url: ApiRoutesWithoutPrefix.SERVICES,
            method: HttpMethod.POST,
            headers: {
               Accept: ApiFormat.JSON,
               'Content-Type': ApiFormat.JSON,
            },
            body: data,
         }),
         invalidatesTags: ['Service'],
      }),
      updateService: builder.mutation<Service, ServiceEdit>({
         query: ({ id, ...rest }) => {
            return {
               url: `${ApiRoutesWithoutPrefix.SERVICES}/${id}`,
               method: HttpMethod.PATCH,
               headers: {
                  Accept: ApiFormat.JSON,
                  'Content-Type': ApiFormat.JSON_MERGE_PATCH,
               },
               body: rest,
            };
         },
         invalidatesTags: ['Service'],
      }),
      deleteService: builder.mutation<void, string>({
         query: (id) => ({
            url: `${ApiRoutesWithoutPrefix.SERVICES}/${id}`,
            method: HttpMethod.DELETE,
         }),
         invalidatesTags: ['Service'],
      }),
   }),
});

export const {
   useServiceQuery,
   useServicesQuery,
   useLazyServicesQuery,
   useServicesJsonLdQuery,
   useAddServiceMutation,
   useDeleteServiceMutation,
   useUpdateServiceMutation,
} = servicesApi;
export default servicesApi;
