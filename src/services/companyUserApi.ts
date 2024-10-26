import { CompanyUser, CompanyUserEdit } from '../models';
import { generateUrl } from '@/utils';
import { ApiFormat, ApiRoutesWithoutPrefix, HttpMethod } from '@/config';
import apiService from '@/services/apiService';

export const companyApi = apiService.injectEndpoints({
   endpoints: (builder) => ({
      companyUsers: builder.query<CompanyUser[], object | void>({
         query: (params) => {
            return {
               url: generateUrl(ApiRoutesWithoutPrefix.COMPANY_USERS, params),
               method: HttpMethod.GET,
               headers: {
                  Accept: ApiFormat.JSON,
               },
            };
         },
         providesTags: ['CompanyUser'],
      }),
      companyUsersJsonLd: builder.query<any[], object | string | void>({
         query: (params) => {
            return {
               url: generateUrl(ApiRoutesWithoutPrefix.COMPANY_USERS, params),
               method: HttpMethod.GET,
               headers: {
                  Accept: ApiFormat.JSONLD,
               },
            };
         },
         providesTags: ['CompanyUser'],
      }),
      companyUser: builder.query<CompanyUser, string | number>({
         query: (id) => `/${ApiRoutesWithoutPrefix.COMPANY_USERS}/${String(id)}`,
         providesTags: ['CompanyUser'],
      }),
      addCompanyUser: builder.mutation<CompanyUser, CompanyUserEdit>({
         query: ({ id, ...data }) => ({
            url: ApiRoutesWithoutPrefix.COMPANY_USERS,
            method: HttpMethod.POST,
            headers: {
               Accept: ApiFormat.JSON,
               'Content-Type': ApiFormat.JSON,
            },
            body: data,
         }),
         invalidatesTags: ['CompanyUser'],
      }),
      updateCompanyUser: builder.mutation<CompanyUser, CompanyUserEdit>({
         query: ({ id, ...rest }) => {
            return {
               url: `${ApiRoutesWithoutPrefix.COMPANY_USERS}/${id}`,
               method: HttpMethod.PATCH,
               headers: {
                  Accept: ApiFormat.JSON,
                  'Content-Type': ApiFormat.JSON_MERGE_PATCH,
               },
               body: rest,
            };
         },
         invalidatesTags: ['CompanyUser'],
      }),
      deleteCompanyUser: builder.mutation<void, string>({
         query: (id) => ({
            url: `${ApiRoutesWithoutPrefix.COMPANY_USERS}/${id}`,
            method: HttpMethod.DELETE,
         }),
         invalidatesTags: ['CompanyUser'],
      }),
   }),
});

export const {
   useCompanyUserQuery,
   useCompanyUsersQuery,
   useLazyCompanyUsersQuery,
   useCompanyUsersJsonLdQuery,
   useAddCompanyUserMutation,
   useDeleteCompanyUserMutation,
   useUpdateCompanyUserMutation,
} = companyApi;
export default companyApi;
