'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@byte24/ui/components/dialog';
import MultiStepForm from '../components/multi-step-form';

interface CompanyModalProps {
  open: boolean;
  onOpenChange: (state: boolean) => void;
}

const CompanyModal = ({ open, onOpenChange }: CompanyModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogContent
        className='max-h-[90vh] overflow-auto sm:max-w-7xl'
        //onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Bedrijf toevoegen</DialogTitle>
          <DialogDescription>Maak een nieuw bedrijf aan in het systeem.</DialogDescription>
        </DialogHeader>

        <div className='grid gap-2'>
          <MultiStepForm onOpenChange={onOpenChange} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyModal;
