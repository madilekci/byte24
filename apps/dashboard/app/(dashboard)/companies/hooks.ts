import { useDataTableState } from "@byte24/ui";
import { useAxiosContext } from "@byte24/ui/context";
import { useDebounce } from "@byte24/ui/hooks";
import {
  DataList,
  IErrorResponse,
  IOption,
  ISuccessResponse,
} from "@byte24/ui/interfaces";
import { toastError } from "@byte24/ui/utils";
import { QueryKey } from "@dashboard/constants";
import { RoutePath } from "@dashboard/constants/server";
import { CompanyStatus, CompanyType, ContactPerson, User } from "@prisma/client";
import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import dayjs from "dayjs";
import {
  UseQueryStatesKeysMap,
  Values,
  parseAsArrayOf,
  parseAsString,
} from "nuqs";
import { toast } from "sonner";
import {
  CompanyFormValues,
  FullCompany,
  FullCompanyContract,
  FullContactPerson,
  FullCountry,
} from "./types";

export function useGetAllTypes() {
  const { axiosInstance } = useAxiosContext();

  const queryResult = useQuery({
    queryKey: [QueryKey.COMPANIES, QueryKey.COMPANY_TYPES],
    queryFn: async (): Promise<CompanyType[]> => {
      const response = await axiosInstance.get(RoutePath.COMPANY + "/types");
      return response.data ?? [];
    },
    placeholderData: keepPreviousData,
  });

  return queryResult;
}

export function useGetAllStatus() {
  const { axiosInstance } = useAxiosContext();

  const queryResult = useQuery({
    queryKey: [QueryKey.COMPANIES, QueryKey.COMPANY_STATUSES],
    queryFn: async (): Promise<CompanyStatus[]> => {
      const response = await axiosInstance.get(RoutePath.COMPANY + "/status");
      return response.data ?? [];
    },
    placeholderData: keepPreviousData,
  });

  return queryResult;
}

export function useGetAllCountries() {
  const { axiosInstance } = useAxiosContext();

  const queryResult = useQuery({
    queryKey: [QueryKey.COMPANIES, QueryKey.COUNTRIES],
    queryFn: async (): Promise<FullCountry[]> => {
      const response = await axiosInstance.get(
        RoutePath.COMPANY + "/countries"
      );
      return response.data ?? [];
    },
    placeholderData: keepPreviousData,
  });

  return queryResult;
}

// COMPANIES
export function useGetAllCompanies(extraFilters?: { companyId?: number }) {
  const { axiosInstance } = useAxiosContext();
  const defaultFilters: Values<UseQueryStatesKeysMap<any>> = {
    status: parseAsArrayOf(parseAsString).withDefault([]),
    type: parseAsArrayOf(parseAsString).withDefault([]),
    name: parseAsArrayOf(parseAsString).withDefault([]),
    country: parseAsArrayOf(parseAsString).withDefault([]),
    city: parseAsArrayOf(parseAsString).withDefault([]),
    updatedAt: parseAsArrayOf(parseAsString).withDefault([]),
    createdAt: parseAsArrayOf(parseAsString).withDefault([]),
  };

  const state = useDataTableState(defaultFilters);

  const {
    search,
    orderByColumn,
    orderDirection,
    pageNumber,
    paginationPerPage,
    filters,
  } = state ?? {};

  const debouncedSearch = useDebounce(search, 500);

  const queryResult = useQuery({
    queryKey: [
      QueryKey.COMPANIES,
      QueryKey.DATATABLE,
      debouncedSearch,
      orderByColumn,
      orderDirection,
      pageNumber,
      paginationPerPage,
      filters,
      extraFilters,
    ],
    queryFn: async (): Promise<DataList<FullCompany>> => {
      const response = await axiosInstance.get(RoutePath.COMPANY + "/", {
        params: {
          search,
          orderByColumn,
          orderDirection,
          pageNumber,
          paginationPerPage,
          ...filters,
          ...extraFilters,
        },
      });

      return response.data;
    },
    placeholderData: keepPreviousData,
  });

  return {
    ...queryResult,
    state,
  };
}

export function useGetCompany(companyId: number) {
  const { axiosInstance } = useAxiosContext();
  return useQuery({
    queryKey: [QueryKey.COMPANY, companyId],
    queryFn: async (): Promise<FullCompany> => {
      const data = await axiosInstance.get(RoutePath.COMPANY + `/${companyId}`);
      return data?.data ?? {};
    },
    placeholderData: keepPreviousData,
  });
}

export function useGetCompanies(search?: string, companyType?: number[]) {
  const { axiosInstance } = useAxiosContext();
  return useQuery({
    queryKey: [QueryKey.COMPANIES, companyType],
    queryFn: async (): Promise<FullCompany[]> => {
      const data = await axiosInstance.get(RoutePath.COMPANY + "/list", {
        params: {
          companyType,
          search,
        },
      });
      return data?.data ?? [];
    },
    placeholderData: keepPreviousData,
  });
}

export function useListCompanies(
  debounceValue?: string,
  typeIds?: number[],
  includedCompanyIds?: number[],
  isCustomer?: boolean,
  isSupplier?: boolean
) {
  const { axiosInstance } = useAxiosContext();
  return useQuery({
    queryKey: [QueryKey.COMPANIES, QueryKey.LIST, debounceValue],
    refetchOnMount: true,
    queryFn: async (): Promise<IOption[]> => {
      try {
        const data = await axiosInstance.get(RoutePath.COMPANY + `/list`, {
          params: { search: debounceValue, typeIds, includedCompanyIds, isCustomer, isSupplier },
        });

        return data?.data;
      } catch (error: any) {
        return [];
      }
    },
    retry: false,
  });
}

export function useAddCompany(onOpenChange: (state: boolean) => void) {
  const { axiosInstance } = useAxiosContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CompanyFormValues) => {
      return await axiosInstance.post(RoutePath.COMPANY + "/", data);
    },
    onSuccess: (response: ISuccessResponse) => {
      toast.success(response.data.message);
      onOpenChange(false);
    },
    onError: (error: IErrorResponse) => {
      toastError(error?.response?.data?.message, {
        fallbackMsg: "Er is iets fout gegaan bij het aanmaken van het company",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.COMPANY],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKey.COMPANIES],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKey.DATATABLE],
      });
    },
  });
}

export function useUpdateCompany(companyId: number) {
  const { axiosInstance } = useAxiosContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CompanyFormValues) => {
      return await axiosInstance.put(RoutePath.COMPANY + `/${companyId}`, data);
    },
    onSuccess: (response: ISuccessResponse) => {
      toast.success(response.data.message);
    },
    onError: (error: IErrorResponse) => {
      toastError(error?.response?.data?.message, {
        fallbackMsg:
          "Er is iets fout gegaan bij het bijwerken van het company.",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.COMPANY],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKey.COMPANIES_UPDATES],
      });
    },
  });
}

export function useDeleteCompany(companyId: number) {
  const { axiosInstance } = useAxiosContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {}) => {
      return await axiosInstance.delete(
        RoutePath.COMPANY + `/${companyId}`,
        data
      );
    },
    onSuccess: (response: ISuccessResponse) => {
      toast.success(response.data.message);
    },
    onError: (error: IErrorResponse) => {
      toastError(error?.response?.data?.message, {
        fallbackMsg:
          "Er is iets fout gegaan bij het bijwerken van het company.",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.COMPANY, QueryKey.DATATABLE, companyId],
      });
    },
  });
}

export function useApproveSolvencyCompany(companyId: number) {
  const { axiosInstance } = useAxiosContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { solvencyApproved: boolean }) => {
      return await axiosInstance.put(
        RoutePath.COMPANY + `/approveSolvency/${companyId}`,
        data
      );
    },
    onSuccess: (response: ISuccessResponse) => {
      toast.success(response.data.message);
    },
    onError: (error: IErrorResponse) => {
      toastError(error?.response?.data?.message, {
        fallbackMsg:
          "Er is iets fout gegaan bij het bijwerken van het company.",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.COMPANY],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKey.COMPANIES_UPDATES],
      });
    },
  });
}

export function useDisapproveSolvencyCompany(companyId: number) {
  const { axiosInstance } = useAxiosContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { solvencyApproved: boolean }) => {
      return await axiosInstance.put(
        RoutePath.COMPANY + `/disapproveSolvency/${companyId}`,
        data
      );
    },
    onSuccess: (response: ISuccessResponse) => {
      toast.success(response.data.message);
    },
    onError: (error: IErrorResponse) => {
      toastError(error?.response?.data?.message, {
        fallbackMsg:
          "Er is iets fout gegaan bij het bijwerken van het company.",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.COMPANY],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKey.COMPANIES_UPDATES],
      });
    },
  });
}

export function useApproveInsuranceCompany(companyId: number) {
  const { axiosInstance } = useAxiosContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { insuranceApproved: boolean }) => {
      return await axiosInstance.put(
        RoutePath.COMPANY + `/approveInsurance/${companyId}`,
        data
      );
    },
    onSuccess: (response: ISuccessResponse) => {
      toast.success(response.data.message);
    },
    onError: (error: IErrorResponse) => {
      toastError(error?.response?.data?.message, {
        fallbackMsg:
          "Er is iets fout gegaan bij het bijwerken van het company.",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.COMPANY],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKey.COMPANIES_UPDATES],
      });
    },
  });
}

export function useDisappproveInsuranceCompany(companyId: number) {
  const { axiosInstance } = useAxiosContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { insuranceApproved: boolean }) => {
      return await axiosInstance.put(
        RoutePath.COMPANY + `/disapproveInsurance/${companyId}`,
        data
      );
    },
    onSuccess: (response: ISuccessResponse) => {
      toast.success(response.data.message);
    },
    onError: (error: IErrorResponse) => {
      toastError(error?.response?.data?.message, {
        fallbackMsg:
          "Er is iets fout gegaan bij het bijwerken van het company.",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.COMPANY],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKey.COMPANIES_UPDATES],
      });
    },
  });
}
// NOTES
export function useGetCompanyNotes(companyId: number, search: string) {
  const { axiosInstance } = useAxiosContext();

  return useInfiniteQuery({
    queryKey: [QueryKey.COMPANY_NOTES, companyId, search],

    queryFn: async ({ pageParam }) => {
      try {
        const data = await axiosInstance.get(
          `${RoutePath.COMPANY}/notes/${companyId}`,
          {
            params: {
              search: search,
              pageNumber: pageParam,
              paginationPerPage: 20,
            },
          }
        );

        return data?.data;
      } catch (error) {
        return [];
      }
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage?.length ? allPages?.length + 1 : undefined,
    initialPageParam: 1,
    placeholderData: keepPreviousData,
  });
}

export function useAddCompanyNote(companyId: number) {
  const { axiosInstance } = useAxiosContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      content: string;
      selectedMentions: string[];
    }) => {
      return await axiosInstance.post(RoutePath.COMPANY + "/notes", {
        ...data,
        companyId,
      });
    },
    onSuccess: (response: ISuccessResponse) => {
      toast.success(response.data.message);
    },
    onError: (error: IErrorResponse) => {
      toastError(error?.response?.data?.message, {
        fallbackMsg: "Er is iets fout gegaan bij het aanmaken van het company",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.COMPANY_NOTES, companyId],
      });
    },
  });
}

export function useUpdateCompanyNote(companyId: number) {
  const { axiosInstance } = useAxiosContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      noteId: number;
      content: string;
      selectedMentions: string[];
    }) => {
      return await axiosInstance.put(
        RoutePath.COMPANY + `/notes/${data.noteId}`,
        data
      );
    },
    onSuccess: (response: ISuccessResponse) => {
      toast.success(response.data.message);
    },
    onError: (error: IErrorResponse) => {
      toastError(error?.response?.data?.message, {
        fallbackMsg:
          "Er is iets fout gegaan bij het bijwerken van het company.",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.COMPANY_NOTES, companyId],
      });
    },
  });
}

export function useDeleteCompanyNote(companyId: number) {
  const { axiosInstance } = useAxiosContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { noteId: number }) => {
      return await axiosInstance.delete(
        RoutePath.COMPANY + `/notes/${data.noteId}`
      );
    },
    onSuccess: (response: ISuccessResponse) => {
      toast.success(response.data.message);
    },
    onError: (error: IErrorResponse) => {
      toastError(error?.response?.data?.message, {
        fallbackMsg:
          "Er is iets fout gegaan bij het bijwerken van het company.",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.COMPANY_NOTES, companyId],
      });
    },
  });
}

// DOCUMENTS
// export function useGetCompanyDocuments(companyId: number, search: string) {
//   const { axiosInstance } = useAxiosContext();

//   return useInfiniteQuery({
//     queryKey: [QueryKey.COMPANIES_DOCUMENTS, companyId, search],

//     queryFn: async ({ pageParam }) => {
//       try {
//         const data = await axiosInstance.get(
//           `${RoutePath.COMPANY}/documents/${companyId}`,
//           {
//             params: {
//               search: search,
//               pageNumber: pageParam,
//               paginationPerPage: 20,
//             },
//           }
//         );

//         return data?.data;
//       } catch (error) {
//         return [];
//       }
//     },
//     getNextPageParam: (lastPage, allPages) =>
//       lastPage?.length ? allPages?.length + 1 : undefined,
//     initialPageParam: 1,
//     placeholderData: keepPreviousData,
//   });
// }

// export function useAddCompanyDocument(companyId: number) {
//   const { axiosInstance } = useAxiosContext();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (data: { files: File[] }) => {
//       const formData = new FormData();
//       data.files.forEach((file) => formData.append('files', file));

//       return await axiosInstance.post(
//         RoutePath.COMPANY + `/documents/${companyId}`,
//         formData
//       );
//     },
//     onSuccess: (response: ISuccessResponse) => {
//       toast.success(response.data.message);
//     },
//     onError: (error: IErrorResponse) => {
//       toastError(error?.response?.data?.message, {
//         fallbackMsg: 'Er is iets fout gegaan bij het aanmaken van het company',
//       });
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries({
//         queryKey: [QueryKey.COMPANIES_DOCUMENTS, companyId],
//       });
//     },
//   });
// }

// export function useUpdateCompanyDocument(companyId: number) {
//   const { axiosInstance } = useAxiosContext();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (data: { documentId: number; name: string }) => {
//       return await axiosInstance.put(
//         RoutePath.COMPANY + `/documents/${data.documentId}`,
//         data
//       );
//     },
//     onSuccess: (response: ISuccessResponse) => {
//       toast.success(response.data.message);
//     },
//     onError: (error: IErrorResponse) => {
//       toastError(error?.response?.data?.message, {
//         fallbackMsg: 'Er is iets fout gegaan bij het aanmaken van het company',
//       });
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries({
//         queryKey: [QueryKey.COMPANIES_DOCUMENTS, companyId],
//       });
//     },
//   });
// }

// export function useDeleteCompanyDocument(companyId: number) {
//   const { axiosInstance } = useAxiosContext();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (data: { documentId: number }) => {
//       return await axiosInstance.delete(
//         RoutePath.COMPANY + `/documents/${data.documentId}`
//       );
//     },
//     onSuccess: (response: ISuccessResponse) => {
//       toast.success(response.data.message);
//     },
//     onError: (error: IErrorResponse) => {
//       toastError(error?.response?.data?.message, {
//         fallbackMsg: 'Er is iets fout gegaan bij het aanmaken van het company',
//       });
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries({
//         queryKey: [QueryKey.COMPANIES_DOCUMENTS, companyId],
//       });
//     },
//   });
// }

// CONTACT PERSONS
export function useGetAllContactPersons() {
  const { axiosInstance } = useAxiosContext();
  const state = useDataTableState();

  const queryResult = useQuery({
    queryKey: [QueryKey.COMPANY_CONTACT_PERSONS],
    queryFn: async (): Promise<FullContactPerson[]> => {
      const response = await axiosInstance.get(
        RoutePath.CONTACT_PERSONS + "/all/list"
      );

      return response.data ?? [];
    },
    placeholderData: keepPreviousData,
  });

  return {
    ...queryResult,
    state,
  };
}

export function useGetAllContactPersonsByCompany(companyId?: number) {
  const { axiosInstance } = useAxiosContext();
  const state = useDataTableState();

  const queryResult = useQuery({
    queryKey: [QueryKey.COMPANY_CONTACT_PERSONS, companyId, "list-all"],
    queryFn: async (): Promise<ContactPerson[]> => {
      const response = await axiosInstance.get(
        RoutePath.CONTACT_PERSONS + `/company/${companyId}/list-all`
      );

      return response.data ?? [];
    },
    placeholderData: keepPreviousData,
    enabled: !!companyId,
  });

  return {
    ...queryResult,
    state,
  };
}
export function useGetAllContacts(companyId: number) {
  const { axiosInstance } = useAxiosContext();
  const state = useDataTableState();

  const {
    search,
    orderByColumn,
    orderDirection,
    pageNumber,
    paginationPerPage,
    filters,
  } = state ?? {};

  const debouncedSearch = useDebounce(search, 500);

  const queryResult = useQuery({
    queryKey: [
      QueryKey.COMPANY_CONTACT_PERSONS,
      debouncedSearch,
      orderByColumn,
      orderDirection,
      pageNumber,
      paginationPerPage,
      filters,
      companyId,
    ],
    queryFn: async (): Promise<DataList<FullContactPerson>> => {
      const data = await axiosInstance.get(RoutePath.CONTACT_PERSONS + "/all", {
        params: {
          search,
          orderByColumn,
          orderDirection,
          pageNumber,
          paginationPerPage,
          ...filters,
          companyId,
        },
      });

      return {
        data: data.data?.data ?? [],
        totalRows: data.data?.totalRows ?? 0,
      };
    },
    placeholderData: keepPreviousData,
  });

  return {
    ...queryResult,
    state,
  };
}
export function useGetContactPerson(id: number) {
  const { axiosInstance } = useAxiosContext();
  const queryResult = useQuery({
    queryKey: [QueryKey.COMPANY_CONTACT_PERSONS, id],
    queryFn: async (): Promise<FullContactPerson> => {
      const data = await axiosInstance.get(
        RoutePath.CONTACT_PERSONS + `/${id}`
      );

      return data?.data ?? [];
    },
  });

  return {
    ...queryResult,
  };
}
export function useAddContactPerson(onOpenChange: (state: boolean) => void) {
  const { axiosInstance } = useAxiosContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<FullContactPerson>) => {
      return await axiosInstance.post(RoutePath.CONTACT_PERSONS, data);
    },
    onSuccess: (response: ISuccessResponse) => {
      toast.success(response.data.message);
      onOpenChange(false);
      queryClient.invalidateQueries({
        queryKey: [QueryKey.COMPANY_CONTACT_PERSONS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKey.COMPANY],
      });
    },
    onError: (error: IErrorResponse) => {
      toastError(error?.response?.data?.message, {
        fallbackMsg:
          "Er is iets fout gegaan bij het aanmaken van de contactpersoon",
      });
    },
  });
}
export function useUpdateContactPerson(
  id: number,
  onOpenChange: (state: boolean) => void
) {
  const { axiosInstance } = useAxiosContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<FullContactPerson>) => {
      return await axiosInstance.put(
        RoutePath.CONTACT_PERSONS + `/${id}`,
        data
      );
    },

    onSuccess: (response: ISuccessResponse) => {
      toast.success(response.data.message);
      onOpenChange(false);
      queryClient.invalidateQueries({
        queryKey: [QueryKey.COMPANY_CONTACT_PERSONS],
      });
    },
    onError: (error: IErrorResponse) => {
      toastError(error?.response?.data?.message, {
        fallbackMsg:
          "Er is iets fout gegaan bij het wijzigen van de contactpersoon",
      });
    },
  });
}
export function useDeleteContactPerson(id?: number) {
  const { axiosInstance } = useAxiosContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await axiosInstance.delete(RoutePath.CONTACT_PERSONS + `/${id}`);
    },

    onSuccess: (response: ISuccessResponse) => {
      toast.success(response.data.message);
      queryClient.invalidateQueries({
        queryKey: [QueryKey.COMPANY_CONTACT_PERSONS],
      });
    },
    onError: (error: IErrorResponse) => {
      toastError(error?.response?.data?.message, {
        fallbackMsg:
          "Er is iets fout gegaan bij het verwijderen van de contactpersoon",
      });
    },
  });
}

// NOTIFICATIONS
export function useCreateNotification() {
  const { axiosInstance } = useAxiosContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      title: string;
      message: string;
      link: string;
      userId: string;
    }) => {
      return await axiosInstance.post(
        RoutePath.NOTIFICATIONS + "/create",
        data
      );
    },
    onSuccess: (response: ISuccessResponse) => {
      toast.success(response.data.message);
    },
    onError: (error: IErrorResponse) => {
      toastError(error?.response?.data?.message, {
        fallbackMsg: "Er is iets fout gegaan bij het aanmaken van de melding",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.NOTIFICATIONS],
      });
    },
  });
}

export function useGetAllMentionUsers() {
  const { axiosInstance } = useAxiosContext();

  return useQuery({
    queryKey: [QueryKey.USERS],
    queryFn: async (): Promise<User[]> => {
      const response = await axiosInstance.get(RoutePath.USER + "/list");

      return response.data ?? [];
    },
    placeholderData: keepPreviousData,
  });
}

export function useGetCompanyContracts(companyId: number) {
  const { axiosInstance } = useAxiosContext();

  return useQuery({
    queryKey: [QueryKey.COMPANY_CONTRACTS, companyId],
    queryFn: async (): Promise<FullCompanyContract[]> => {
      const response = await axiosInstance.get(
        RoutePath.COMPANY + `/${companyId}/contracts`
      );
      return response.data ?? [];
    },
    placeholderData: keepPreviousData,
  });
}

export function useUploadCompanyContract(companyId: number) {
  const { axiosInstance } = useAxiosContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      file,
      expireDate,
    }: {
      file: File;
      expireDate: Date;
    }) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("expireDate", dayjs(expireDate).format("YYYY-MM-DD"));

      return await axiosInstance.post(
        `${RoutePath.COMPANY}/${companyId}/contract`,
        formData
      );
    },
    onSuccess: (response: ISuccessResponse) => {
      toast.success(response.data.message);
      queryClient.invalidateQueries({
        queryKey: [QueryKey.COMPANY_CONTRACTS, companyId],
      });
    },
    onError: (error: IErrorResponse) => {
      toastError(error?.response?.data?.message, {
        fallbackMsg: "Er is iets fout gegaan bij het uploaden van het bestand",
      });
    },
  });
}

export function useUpdateCompanyContract(
  companyId: number,
  contractId?: number
) {
  const { axiosInstance } = useAxiosContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ expireDate, name }: { expireDate: Date, name: string }) => {
      return await axiosInstance.put(
        `${RoutePath.COMPANY}/contracts/${contractId}`,
        {
          expireDate: dayjs(expireDate).format("YYYY-MM-DD"),
          name,
        }
      );
    },
    onSuccess: (response: ISuccessResponse) => {
      toast.success(response.data.message);
      queryClient.invalidateQueries({
        queryKey: [QueryKey.COMPANY_CONTRACTS, companyId],
      });
    },
    onError: (error: IErrorResponse) => {
      toastError(error?.response?.data?.message, {
        fallbackMsg: "Er is iets fout gegaan bij het wijzigen van het contract",
      });
    },
  });
}

export function useDeleteCompanyContract(
  companyId: number,
  contractId?: number
) {
  const { axiosInstance } = useAxiosContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await axiosInstance.delete(`${RoutePath.COMPANY}/contracts/${contractId}`);
    },
    onSuccess: (response: ISuccessResponse) => {
      toast.success(response.data.message);
    },
    onError: (error: IErrorResponse) => {
      toastError(error?.response?.data?.message, {
        fallbackMsg: "Er is iets fout gegaan bij het verwijderen van het contract",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.COMPANY_CONTRACTS, companyId],
      });
    },
  });
}

export function useApproveCompanyKYC(companyId: number) {
  const { axiosInstance } = useAxiosContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await axiosInstance.post(`${RoutePath.COMPANY}/${companyId}/kyc/approve`);
    },
    onSuccess: (response: ISuccessResponse) => {
      toast.success(response.data.message);
    },
    onError: (error: IErrorResponse) => {
      toastError(error?.response?.data?.message, {
        fallbackMsg: "Er is iets fout gegaan bij het goedkeuren van de KYC",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.COMPANY, companyId],
      });
    },
  });
}