import { cn } from '@byte24/ui';
import { Badge } from '@byte24/ui/components/badge';
import fontColorContrast from 'font-color-contrast';

interface StatusBadgeProps {
  color: string;
  children?: React.ReactNode;
  className?: string;
}

export const StatusBadge = ({ color, children, className }: StatusBadgeProps) => {
  return (
    <Badge
      variant={'default'}
      className={cn('text-white', className)}
      style={{
        backgroundColor: color,
        color: fontColorContrast(color),
      }}
    >
      {children}
    </Badge>
  );
};
