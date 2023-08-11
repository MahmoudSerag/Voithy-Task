import { AUTH_URL, USERS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: 'POST',
        credentials: 'include',
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
        credentials: 'include',
      }),
    }),
    getDoctors: builder.query({
      query: () => ({
        url: `${USERS_URL}/doctors`,
        credentials: 'include',
      }),
      keepUnusedDataFor: 5,
    }),
    bookDoctor: builder.mutation({
      query: (doctorId) => ({
        url: `${USERS_URL}/doctors/${doctorId}`,
        method: 'POST',
        credentials: 'include',
      }),
      keepUnusedDataFor: 5,
    }),
    getUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
        credentials: 'include',
      }),
      providesTags: ['User'],
      keepUnusedDataFor: 5,
    }),
    getUserDetails: builder.query({
      query: (userId) => ({
        url: `${USERS_URL}/doctors/${userId}`,
        method: 'GET',
        credentials: 'include',
      }),

      providesTags: ['User'],
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/doctors/${data.patientId}`,
        method: 'PATCH',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['User'],
    }),

    sendMessage: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/doctors/notification/${data.patientId}`,
        method: 'POST',
        body: { message: data.message },
        credentials: 'include',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetDoctorsQuery,
  useGetUserDetailsQuery,
  useBookDoctorMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
  useSendMessageMutation,
} = usersApiSlice;
