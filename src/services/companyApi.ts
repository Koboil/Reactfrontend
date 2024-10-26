import { CompanyUser, CompanyEdit } from '../models';
import { generateUrl } from '@/utils';
import { ApiFormat, ApiRoutesWithoutPrefix, HttpMethod } from '@/config';
import apiService from '@/services/apiService';

export const companyApi = apiService.injectEndpoints({
   endpoints: (builder) => ({
      companies: builder.query<CompanyUser[], object | void>({
         query: (params) => {
            return {
               url: generateUrl(ApiRoutesWithoutPrefix.COMPANIES, params),
               method: HttpMethod.GET,
               headers: {
                  Accept: ApiFormat.JSON,
               },
            };
         },
         providesTags: ['CompanyUser'],
      }),
      companiesJsonLd: builder.query<any[], object | string | void>({
         query: (params) => {
            return {
               url: generateUrl(ApiRoutesWithoutPrefix.COMPANIES, params),
               method: HttpMethod.GET,
               headers: {
                  Accept: ApiFormat.JSONLD,
               },
            };
         },
         providesTags: ['CompanyUser'],
      }),
      company: builder.query<CompanyUser, string | number>({
         query: (id) => `/${ApiRoutesWithoutPrefix.COMPANIES}/${String(id)}`,
         providesTags: ['CompanyUser'],
      }),
      addCompany: builder.mutation<CompanyUser, CompanyEdit>({
         query: ({ id, ...data }) => ({
            url: ApiRoutesWithoutPrefix.COMPANIES,
            method: HttpMethod.POST,
            headers: {
               Accept: ApiFormat.JSON,
               'Content-Type': ApiFormat.JSON,
            },
            body: data,
         }),
         invalidatesTags: ['CompanyUser'],
      }),
      updateCompany: builder.mutation<CompanyUser, CompanyEdit>({
         query: ({ id, ...rest }) => {
            return {
               url: `${ApiRoutesWithoutPrefix.COMPANIES}/${id}`,
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
      deleteCompany: builder.mutation<void, string>({
         query: (id) => ({
            url: `${ApiRoutesWithoutPrefix.COMPANIES}/${id}`,
            method: HttpMethod.DELETE,
         }),
         invalidatesTags: ['CompanyUser'],
      }),
   }),
});

export const {
   useCompanyQuery,
   useCompaniesQuery,
   useLazyCompaniesQuery,
   useCompaniesJsonLdQuery,
   useAddCompanyMutation,
   useDeleteCompanyMutation,
   useUpdateCompanyMutation,
} = companyApi;
export default companyApi;
