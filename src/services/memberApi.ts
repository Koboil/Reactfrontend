import { Member, MemberEdit } from '../models';
import { generateUrl } from '@/utils';
import { ApiFormat, ApiRoutesWithoutPrefix, HttpMethod } from '@/config';
import apiService from '@/services/apiService';

export const membersApi = apiService.injectEndpoints({
   endpoints: (builder) => ({
      members: builder.query<Member[], object | void>({
         query: (params) => {
            return {
               url: generateUrl(ApiRoutesWithoutPrefix.MEMBERS, params),
               method: HttpMethod.GET,
               headers: {
                  Accept: ApiFormat.JSON,
               },
            };
         },
         providesTags: ['Member'],
      }),
      membersJsonLd: builder.query<any[], object | string | void>({
         query: (params) => {
            return {
               url: generateUrl(ApiRoutesWithoutPrefix.MEMBERS, params),
               method: HttpMethod.GET,
               headers: {
                  Accept: ApiFormat.JSONLD,
               },
            };
         },
         providesTags: ['Member'],
      }),
      member: builder.query<Member, string | number>({
         query: (id) => `/${ApiRoutesWithoutPrefix.MEMBERS}/${String(id)}`,
         providesTags: ['Member'],
      }),
      addMember: builder.mutation<Member, MemberEdit>({
         query: ({ id, ...data }) => ({
            url: ApiRoutesWithoutPrefix.MEMBERS,
            method: HttpMethod.POST,
            headers: {
               Accept: ApiFormat.JSON,
               'Content-Type': ApiFormat.JSON,
            },
            body: data,
         }),
         invalidatesTags: ['Member'],
      }),
      updateMember: builder.mutation<Member, MemberEdit>({
         query: ({ id, ...rest }) => {
            return {
               url: `${ApiRoutesWithoutPrefix.MEMBERS}/${id}`,
               method: HttpMethod.PATCH,
               headers: {
                  Accept: ApiFormat.JSON,
                  'Content-Type': ApiFormat.JSON_MERGE_PATCH,
               },
               body: rest,
            };
         },
         invalidatesTags: ['Member'],
      }),
      deleteMember: builder.mutation<void, string>({
         query: (id) => ({
            url: `${ApiRoutesWithoutPrefix.MEMBERS}/${id}`,
            method: HttpMethod.DELETE,
         }),
         invalidatesTags: ['Member'],
      }),
   }),
});

export const {
   useMemberQuery,
   useMembersQuery,
   useLazyMembersQuery,

   useMembersJsonLdQuery,
   useAddMemberMutation,
   useDeleteMemberMutation,
   useUpdateMemberMutation,
} = membersApi;
export default membersApi;
