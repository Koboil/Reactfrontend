import { Reservation, ReservationEdit, ReservationStatus } from '@/models';
import { generateUrl } from '@/utils';
import { ApiFormat, ApiRoutesWithoutPrefix, HttpMethod } from '@/config';
import apiService from '@/services/apiService';

export const reservationApi = apiService.injectEndpoints({
   endpoints: (builder) => ({
      reservations: builder.query<Reservation[], object | void>({
         query: (params) => {
            return {
               url: generateUrl(ApiRoutesWithoutPrefix.RESERVATIONS, params),
               method: HttpMethod.GET,
               headers: {
                  Accept: ApiFormat.JSON,
               },
            };
         },
         providesTags: ['Reservation'],
      }),
      reservationsJsonLd: builder.query<any[], object | string | void>({
         query: (params) => {
            return {
               url: generateUrl(ApiRoutesWithoutPrefix.RESERVATIONS, params),
               method: HttpMethod.GET,
               headers: {
                  Accept: ApiFormat.JSONLD,
               },
            };
         },
         providesTags: ['Reservation'],
      }),
      reservation: builder.query<Reservation, string | number>({
         query: (id) => `/${ApiRoutesWithoutPrefix.RESERVATIONS}/${id}`,
         providesTags: ['Reservation'],
      }),
      addReservation: builder.mutation<Reservation, ReservationEdit>({
         query: ({ id, ...data }) => ({
            url: ApiRoutesWithoutPrefix.RESERVATIONS,
            method: HttpMethod.POST,
            headers: {
               Accept: ApiFormat.JSON,
               'Content-Type': ApiFormat.JSON,
            },
            body: data,
         }),
         invalidatesTags: ['Reservation'],
      }),
      updateReservation: builder.mutation<Reservation, Partial<ReservationEdit>>({
         query: ({ id, ...rest }) => {
            return {
               url: `${ApiRoutesWithoutPrefix.RESERVATIONS}/${id}`,
               method: HttpMethod.PATCH,
               headers: {
                  Accept: ApiFormat.JSON,
                  'Content-Type': ApiFormat.JSON,
               },
               body: rest,
            };
         },
         invalidatesTags: ['Reservation'],
      }),
      deleteReservation: builder.mutation<void, string>({
         query: (id) => ({
            url: `${ApiRoutesWithoutPrefix.RESERVATIONS}/${id}`,
            method: HttpMethod.DELETE,
         }),
         invalidatesTags: ['Reservation'],
      }),

      reservationStatuses: builder.query<ReservationStatus[], Object | void>({
         query: (params) => {
            return {
               url: generateUrl(ApiRoutesWithoutPrefix.RESERVATION_STATUSES, params),
               method: 'GET',
               headers: {
                  Accept: 'application/json',
               },
            };
         },
         providesTags: ['Reservation'],
      }),

      reservationStatusesJsonLd: builder.query<any[], Object | void>({
         query: (params) => {
            return {
               url: generateUrl(ApiRoutesWithoutPrefix.RESERVATION_STATUSES, params),
               method: 'GET',
               headers: {
                  Accept: 'application/ld+json',
               },
            };
         },
         providesTags: ['Reservation'],
      }),
      reservationStatus: builder.query<ReservationStatus, string | number>({
         query: (id) => `${ApiRoutesWithoutPrefix.RESERVATION_STATUSES}/${id}`,
         providesTags: ['Reservation'],
      }),
      addReservationStatus: builder.mutation<
         ReservationStatus,
         Partial<ReservationStatus>
      >({
         query: (multisite) => ({
            url: ApiRoutesWithoutPrefix.RESERVATION_STATUSES,
            method: 'POST',
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
            },
            body: multisite,
         }),
         invalidatesTags: ['Reservation'],
      }),
      updateReservationStatus: builder.mutation<ReservationStatus, ReservationStatus>({
         query: ({ id, ...rest }) => {
            return {
               url: `${ApiRoutesWithoutPrefix.RESERVATION_STATUSES}/${id}`,
               method: 'PUT',
               headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
               },
               body: rest,
            };
         },
         invalidatesTags: ['Reservation'],
      }),
      deleteReservationStatus: builder.mutation({
         query: (id) => ({
            url: `${ApiRoutesWithoutPrefix.RESERVATION_STATUSES}/${id}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Reservation'],
      }),
   }),
});

export const {
   useReservationQuery,
   useReservationsQuery,
   useLazyReservationsQuery,
   useReservationsJsonLdQuery,
   useAddReservationMutation,
   useDeleteReservationMutation,
   useUpdateReservationMutation,
   /**
    * Reservation status
    */

   useReservationStatusQuery,
   useReservationStatusesQuery,
   useReservationStatusesJsonLdQuery,
   useAddReservationStatusMutation,
   useUpdateReservationStatusMutation,
   useDeleteReservationStatusMutation,
} = reservationApi;
export default reservationApi;
