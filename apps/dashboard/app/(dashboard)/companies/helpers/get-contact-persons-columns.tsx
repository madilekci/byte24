"use client";

import { DataTableColumnHeader } from "@byte24/ui";
import { ActionsDropdown } from "@byte24/ui/components/actions-dropdown";
import { ContactPerson } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle, Edit, Trash, XCircle } from "lucide-react";

export const getContactPersonsColumns = (
  onUpdateModalOpen: (id: number) => void,
  onDeleteModalOpen: (id: number) => void
): ColumnDef<ContactPerson>[] => {
  return [
    {
      id: "title",
      accessorKey: "title",
      accessorFn: (row) => row?.title,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Functie" />
      ),
      enableSorting: true,
    },
    {
      id: "initials",
      accessorKey: "initials",
      accessorFn: (row) => row?.initials,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Voorletters" />
      ),
      enableSorting: true,
    },
    {
      id: "preferredName",
      accessorKey: "preferredName",
      accessorFn: (row) => row?.preferredName,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Roepnaam" />
      ),
      enableSorting: true,
    },
    {
      id: "infix",
      accessorKey: "infix",
      accessorFn: (row) => row?.infix,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tussenvoegsels" />
      ),
      enableSorting: false,
    },
    {
      id: "lastName",
      accessorKey: "lastName",
      accessorFn: (row) => row?.lastName,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Achternaam" />
      ),
      enableSorting: true,
    },
    {
      id: "email",
      accessorKey: "email",
      accessorFn: (row) => row?.email,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="E-mail" />
      ),
      enableSorting: true,
    },
    {
      id: "phone",
      accessorKey: "phone",
      accessorFn: (row) => row?.phone,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Telefoonnummer" />
      ),
      enableSorting: true,
    },

    {
      id: "isMainContactPerson",
      accessorKey: "isMainContactPerson",
      accessorFn: (row) => row.isMainContactPerson,
      header: ({ column }) => {
        return (
          <DataTableColumnHeader
            column={column}
            title={"Hoofdcontactpersoon"}
          />
        );
      },
      cell: ({ row }) => {
        const isMainContactPerson = row?.original?.isMainContactPerson;
        return (
          <div
            className={`flex w-20 items-center justify-center space-x-2 rounded-md px-3 py-1 font-medium text-sm ${isMainContactPerson ? "text-green-600" : "text-red-600"}`}
          >
            {isMainContactPerson ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <XCircle className="h-5 w-5 text-red-600" />
            )}
          </div>
        );
      },

      enableSorting: true,
      maxSize: 50,
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const rowDetail = row.original;

        const items = [
          {
            label: "Bewerken",
            onClick: () => {
              onUpdateModalOpen(rowDetail.id);
            },
            icon: <Edit className="mr-1 h-5 w-5 text-green-600" />,
          },
          {
            label: "Verwijderen",
            onClick: () => {
              onDeleteModalOpen(rowDetail.id);
            },
            icon: <Trash className="mr-1 h-5 w-5 text-destructive" />,
          },
        ];

        return (
          <>
            <div className="float-right flex w-[40px] items-end justify-end">
              <ActionsDropdown items={items} width="w-44" />
            </div>
          </>
        );
      },
    },
  ];
};
