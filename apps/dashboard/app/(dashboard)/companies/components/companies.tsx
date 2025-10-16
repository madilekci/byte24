"use client";
import { Button, DataTable, useDataTable } from "@byte24/ui";
import { DataTableType, FilterOption } from "@byte24/ui/interfaces";
import { API_URL } from "@dashboard/constants/server";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { getColumns } from "../helpers/get-companies-columns";
import { useGetAllCompanies, useGetAllTypes } from "../hooks";
import CompanyModal from "../modals/company-modal";

function Companies() {
  // hooks
  const { data: result, state, isLoading, isFetching } = useGetAllCompanies();
  const { data: types } = useGetAllTypes();

  // states
  const { totalRows, data: companies } = result ?? {};
  const [companyModalShowing, setCompanyModalShowing] = useState(false);

  // columns
  const columns = useMemo(() => getColumns({}), []);

  // filters
  const filterOptions: FilterOption[] = useMemo(
    () => [
      {
        id: "type",
        label: "Type",
        defaultValue: [],
        options: types?.map((type) => ({
          id: type.id,
          name: type.name,
          key: type.id,
        })),
        type: "select",
      },

      // {
      //   id: "createdAt",
      //   label: "Aangemaakt op",
      //   defaultValue: [],
      //   options: [],
      //   type: "conditional",
      //   field: {
      //     type: "date",
      //     prefix: "",
      //   },
      // },
      // {
      //   id: "updatedAt",
      //   label: "Bijgewerkt op",
      //   defaultValue: [],
      //   options: [],
      //   type: "conditional",
      //   field: {
      //     type: "date",
      //     prefix: "",
      //   },
      // },
    ],
    [types]
  );

  // data table
  const dataTable = useDataTable({
    columns,
    data: companies ?? [],
    totalRows: totalRows ?? 0,
    state,

    isLoading,
    noSelection: true,
    savePreferencesKey: "companies",
    changeColumnVisibility: true,
    changeColumnOrder: true,
    changeColumnSizing: true,
    changeView: true,
    viewsEndpoint: `${API_URL}/general/data-table/views`,
  });

  return (
    <>
      <div className="flex items-center justify-end gap-4">
        <Button
          size={"sm"}
          variant={"default"}
          disabled={isLoading}
          type="button"
          onClick={() => setCompanyModalShowing(true)}
        >
          <Plus size={22} className="mr-2" />
          Bedrijf toevoegen
        </Button>
      </div>

      <DataTable
        {...dataTable}
        type={DataTableType.PAGINATION}
        filterOptions={filterOptions}
      />

      {companyModalShowing && (
        <CompanyModal
          open={companyModalShowing}
          onOpenChange={setCompanyModalShowing}
        />
      )}
    </>
  );
}

export default Companies;
