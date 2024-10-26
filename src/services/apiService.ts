import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '@/store/baseQueryWithReauth';
//import { createMembersEndpoints } from '@/services/membersApi'; // Import membersApi factory function

export const apiService = createApi({
   baseQuery: baseQueryWithReauth,
   endpoints: () => ({}),
   tagTypes: [
      'User',
      'UserTotalComparerdToLastweek',
      'Log',
      'Configuration',
      'Member',
      'Reservation',
      'Service',
      'Review',
      'Company',
      'MediaObject',
      'CompanyUser',
   ],
   reducerPath: 'apiService',
});

// Use the factory functions to inject endpoints
//createMembersEndpoints(apiService);
export default apiService;
