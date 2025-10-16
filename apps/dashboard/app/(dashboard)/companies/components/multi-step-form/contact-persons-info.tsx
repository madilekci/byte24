import { useFieldArray, useFormContext } from 'react-hook-form';
import { CompanyFormValues } from '../../types';

import { FormControl, FormField, FormItem, FormMessage } from '@byte24/ui/components/form';
import { Input } from '@byte24/ui/components/input';
import { Label } from '@byte24/ui/components/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@byte24/ui/components/table';

import { Checkbox } from '@byte24/ui/components/checkbox';

import { Button } from '@byte24/ui/components/button';

import { PlusIcon, TrashIcon } from 'lucide-react';

const ContactPersonsInfo = () => {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<CompanyFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'contactPersons', // contactPersons array
    keyName: 'key',
  });

  return (
    <div>
      <h4 className='stepper_step_heading'>Contactpersonen</h4>
      <div className='stepper_step_container'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className='flex w-full items-center justify-between'>
                  <Label className='text-black'>Hoofd</Label>
                </div>
              </TableHead>
              <TableHead>
                <div className='flex w-full items-center justify-between'>
                  <Label className='text-black'>Voorletters *</Label>
                </div>
              </TableHead>
              <TableHead>
                <div className='flex w-full items-center justify-between'>
                  <Label className='text-black'>Roepnaam</Label>
                </div>
              </TableHead>
              <TableHead>
                <div className='flex w-full items-center justify-between'>
                  <Label className='text-black'>Tussenvoegsel</Label>
                </div>
              </TableHead>
              <TableHead>
                <div className='flex w-full items-center justify-between'>
                  <Label className='text-black'>Achternaam *</Label>
                </div>
              </TableHead>
              <TableHead>
                <div className='flex w-full items-center justify-between'>
                  <Label className='text-black'>Functie *</Label>
                </div>
              </TableHead>
              <TableHead>
                <div className='flex w-full items-center justify-between'>
                  <Label className='text-black'>Telefoonnummer</Label>
                </div>
              </TableHead>
              <TableHead>
                <div className='flex w-full items-center justify-between'>
                  <Label className='text-black'>E-mail</Label>
                </div>
              </TableHead>
              <TableHead>
                <div className='flex w-full items-center justify-end'>
                  <Button
                    type='button'
                    onClick={() =>
                      append({
                        isMainContactPerson: false,
                        infix: '',
                        initials: '',
                        lastName: '',
                        preferredName: '',
                        phone: '',
                        title: '',
                        email: '',
                      })
                    }
                  >
                    <PlusIcon className='h-4 w-4' />
                  </Button>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {fields.map((field, index) => (
              <TableRow key={field.key}>
                {/* isMainContactPerson Checkbox */}
                <TableCell className='!p-2 align-top'>
                  <FormField
                    control={control}
                    name={`contactPersons.${index}.isMainContactPerson`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) => field.onChange(checked)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>

                <TableCell className='!p-2 align-top'>
                  <FormField
                    control={control}
                    name={`contactPersons.${index}.initials`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder='Voorletters' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell className='!p-2 align-top'>
                  <FormField
                    control={control}
                    name={`contactPersons.${index}.preferredName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder='Roepnaam' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell className='!p-2 align-top'>
                  <FormField
                    control={control}
                    name={`contactPersons.${index}.infix`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder='Tussenvoegsels' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell className='!p-2 align-top'>
                  <FormField
                    control={control}
                    name={`contactPersons.${index}.lastName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder='Achternaam' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell className='!p-2 align-top'>
                  <FormField
                    control={control}
                    name={`contactPersons.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder='Functie' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>

                <TableCell className='!p-2 align-top'>
                  <FormField
                    control={control}
                    name={`contactPersons.${index}.phone`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder='Telefoonnummer' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>

                <TableCell className='!p-2 align-top'>
                  <FormField
                    control={control}
                    name={`contactPersons.${index}.email`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type='email' placeholder='E-mail' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>

                {/* Remove Button */}
                <TableCell className='!p-2 align-top'>
                  <div className='flex w-full items-center justify-end'>
                    <Button type='button' variant='ghost' size='icon' onClick={() => remove(index)}>
                      <TrashIcon className='h-4 w-4 text-destructive' />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ContactPersonsInfo;
