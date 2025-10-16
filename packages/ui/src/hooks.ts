import { useAxiosContext } from "@byte24/ui/context";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { QueryKey } from "../../../apps/dashboard/constants/index";
import { RoutePath } from "../../../apps/dashboard/constants/server";

export function useGetMyNotifications(userId: string) {
  const { axiosInstance } = useAxiosContext();
  return useQuery({
    queryKey: [QueryKey.NOTIFICATIONS, userId],
    queryFn: async () => {
      if (!userId) return [];
      const response = await axiosInstance.get(`${RoutePath.NOTIFICATIONS}/my`);
      return response.data;
    },
    placeholderData: keepPreviousData,
    refetchInterval: 60 * 1000, //1 minute
    staleTime: 60 * 1000,
  });
}

export function useReadNotification(userId: string) {
  const { axiosInstance } = useAxiosContext();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (notificationId: number) => {
      const response = await axiosInstance.put(
        `${RoutePath.NOTIFICATION}/read/${notificationId}`
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Notification read");
    },
    onError: (error) => {
      toast.error("Error reading notification");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.NOTIFICATIONS, userId],
      });
    },
  });
}

export function useReadAllNotifications(userId: string) {
  const { axiosInstance } = useAxiosContext();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.put(
        `${RoutePath.NOTIFICATION}/read/all/${userId}`
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("All notifications read");
    },
    onError: () => {
      toast.error("Error reading all notifications");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.NOTIFICATIONS, userId],
      });
    },
  });
}

export function useClearNotification(userId: string) {
  const { axiosInstance } = useAxiosContext();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (notificationId: string) => {
      const response = await axiosInstance.delete(
        `${RoutePath.NOTIFICATION}/clear/${notificationId}`
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Notification cleared");
    },
    onError: () => {
      toast.error("Error clearing notification");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.NOTIFICATIONS, userId],
      });
    },
  });
}

export function useClearAllNotifications(userId: string) {
  const { axiosInstance } = useAxiosContext();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete(
        `${RoutePath.NOTIFICATION}/clear/all/${userId}`
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("All notifications cleared");
    },
    onError: () => {
      toast.error("Error clearing all notifications");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.NOTIFICATIONS, userId],
      });
    },
  });
}
