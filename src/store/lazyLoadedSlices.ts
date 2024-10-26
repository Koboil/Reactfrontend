import { combineSlices } from '@reduxjs/toolkit';
import apiService from '@/services/apiService';
import { authSlice } from '@/features/authSlice';
import { localeSlice } from '@/features/localeSlice';

// eslint-disable-next-line
// @ts-ignore
export interface LazyLoadedSlices {}

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
export const rootReducer = combineSlices(
   /**
    * Static slices
    */
   authSlice,
   localeSlice,
   /**
    * Dynamic slices
    */
   {
      [apiService.reducerPath]: apiService.reducer,
   },
).withLazyLoadedSlices<LazyLoadedSlices>();
