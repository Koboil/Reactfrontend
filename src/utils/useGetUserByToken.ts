import { useUserQuery } from '@/services/userApi';
import { logout } from '@/features/authSlice';
import { useAppSelector, useAppStore, useAppDispatch } from '@/store/hooks';
/**
 *
 * @returns Since we don't store the true token in local storage, token contain only email
 */
export const useGetUserByToken = () => {
   const user = useAppSelector((state) => state.auth.user);
   const dispatch = useAppDispatch();
   const store = useAppStore();
   /*
   const {
      data: userData,
      isLoading,
      isError,
   } = useUserQuery(user?.id!, { skip: user?.id ? false : true });
*/
   if (!user) {
      dispatch(logout());
      return undefined;
   }
   /*
   if (isLoading === false && isError === false && userData) {
      if (userData) {
         localStorage.setItem('firstName', userData.firstName);
         localStorage.setItem('lastName', userData.lastName);
         localStorage.setItem('photo', userData.avatar);
      }
   }
   */
   return user;
};
