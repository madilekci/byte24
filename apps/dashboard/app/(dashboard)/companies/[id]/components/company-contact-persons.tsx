'use client';

import { DataTable, DataTableType, FilterOption, useDataTable } from '@byte24/ui';
import { Button } from '@byte24/ui/components/button';
import { WarningDialog } from '@byte24/ui/components/warning-dialog';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { getContactPersonsColumns } from '../../helpers/get-contact-persons-columns';
import { useDeleteContactPerson, useGetAllContacts } from '../../hooks';
import AddContactPersonModal from '../../modals/add-contact-person-modal';
import UpdateContactPersonModal from '../../modals/update-contact-person-modal';
import { CompanyDetailPageProps } from '../../types';

interface ContactPersonsProps extends CompanyDetailPageProps {}

export default function CompanyContactPersons({ company }: ContactPersonsProps) {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [contactPersonId, setContactPersonId] = useState<number>();

  const { data, state, isLoading, isFetching } = useGetAllContacts(company?.id);

  const onUpdateModalOpen = (id: number) => {
    setContactPersonId(id!);
    setUpdateModalOpen(true);
  };

  const onDeleteModalOpen = (id: number) => {
    setContactPersonId(id!);
    setDeleteModalOpen(true);
  };

  const columns = getContactPersonsColumns(onUpdateModalOpen, onDeleteModalOpen);

  const { data: contactPersons, totalRows } = data ?? {};

  const filterOptions: FilterOption[] = [];

  const dataTable = useDataTable({
    columns,
    data: contactPersons ?? [],
    totalRows: totalRows ?? 0,
    state,
    isLoading,
    noSelection: true,
    savePreferencesKey: 'contact-persons',
    changeColumnVisibility: true,
    changeColumnOrder: true,
    changeColumnSizing: true,
  });

  return (
    <>
      <div className='flex items-center justify-end gap-4'>
        <Button
          size={'sm'}
          variant={'default'}
          disabled={isLoading}
          type='button'
          onClick={() => setAddModalOpen(true)}
        >
          <Plus size={22} className='mr-2' />
          Contactpersoon toevoegen
        </Button>
      </div>

      <DataTable
        {...dataTable}
        type={DataTableType.PAGINATION}
        filterOptions={filterOptions}
        noSelection
      />

      {addModalOpen && (
        <AddContactPersonModal
          open={addModalOpen}
          onOpenChange={setAddModalOpen}
          companyId={company?.id!}
        />
      )}

      {updateModalOpen && (
        <UpdateContactPersonModal
          open={updateModalOpen}
          onOpenChange={setUpdateModalOpen}
          id={contactPersonId!}
        />
      )}

      {deleteModalOpen && (
        // <DeleteContactPersonModal
        //   open={deleteModalOpen}
        //   onOpenChange={setDeleteModalOpen}
        //   id={contactPersonId!}
        // />
        <WarningDialog
          title='Contactpersoon verwijderen'
          description='Weet je zeker dat je deze contactpersoon wilt verwijderen?'
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
          onDeleteMutate={useDeleteContactPerson.bind(null, contactPersonId)}
          actionText='Verwijder'
        />
      )}
    </>
  );
}
