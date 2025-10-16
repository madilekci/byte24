import { BaseTranslateBadge } from '@byte24/ui/components/translate-badge';
import { TRANSLATE_VALUES_WITH_BADGE } from '../utility/translations';

interface ITranslateBadgeProps {
  type: keyof typeof TRANSLATE_VALUES_WITH_BADGE;
  className?: string;
}

export const TranslateBadge = ({ type, className }: ITranslateBadgeProps) => {
  return (
    <BaseTranslateBadge
      extendedValues={TRANSLATE_VALUES_WITH_BADGE}
      type={type as string}
      className={className}
    />
  );
};
