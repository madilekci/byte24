import { MainRoutePath } from '@byte24/ui';
import { useAxiosContext } from '@byte24/ui/context';
import { IOption, IQueryBase } from '@byte24/ui/interfaces';
import { authClient } from '@dashboard/common/auth-client';
import { QueryKey } from '@dashboard/constants';
import { RoutePath } from '@dashboard/constants/server';
import { Location, User } from '@prisma/client';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { IOption as IOptionUI } from '@repo/ui/types';

export const useLogoutUser = (
  onSuccess?: () => void,
  { pathBase = MainRoutePath.AUTH, path = '/logout' }: IQueryBase = {}
) => {
  const router = useRouter();
  const mutate = async () =>
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          onSuccess && onSuccess();
          router.push('/login'); // redirect to login page
        },
        onError: () => {
          toast.error('Failed to logout');
        },
      },
    });

  return {
    mutate,
  };
};

export function useListVatCodes() {
  const { axiosInstance } = useAxiosContext();
  return useQuery({
    queryKey: [QueryKey.VAT_CODES],
    refetchOnMount: true,
    queryFn: async (): Promise<IOption[]> => {
      try {
        const data = await axiosInstance.get(RoutePath.GENERAL + `/vat-codes`);

        return data?.data;
      } catch (error: any) {
        return [];
      }
    },
    retry: false,
  });
}

export function useListUsers(debounceValue?: string,) {
  const { axiosInstance } = useAxiosContext();

  return useQuery({
    queryKey: [QueryKey.USERS, QueryKey.LIST, debounceValue],
    refetchOnMount: true,
    queryFn: async (): Promise<any[]> => {
      try {
        const response = await axiosInstance.get(RoutePath.USER + '/list', {
          params: {
            search: debounceValue,
          },
        });

        return response.data ?? [];
      } catch (error: any) {
        return [];
      }
    },
    placeholderData: keepPreviousData,
  });
}

export function useGetLocations() {
  const { axiosInstance } = useAxiosContext();
  return useQuery({
    queryKey: [QueryKey.LOCATIONS],
    refetchOnMount: true,
    queryFn: async (): Promise<Location[]> => {
      try {
        const data = await axiosInstance.get(RoutePath.GENERAL + `/locations`);

        return data?.data;
      } catch (error: any) {
        return [];
      }
    },
    retry: false,
  });
}