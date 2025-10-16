import { ConditionDto } from './condition.dto';

type TField = {
  field: string;
};

type TQuery = {};

type PrismaFilter = {
  [key: string]: {
    [key: string]: Date | string;
  };
};

const ConditionTypes = {
  EQUALS: '=',
  BETWEEN: '<>',
  GT: '>',
  LT: '<',
};

export const Condition = (query: TQuery, fields: TField[]): PrismaFilter => {
  const filters: PrismaFilter = {};

  fields.forEach((conditionField) => {
    if (query[conditionField.field]) {
      const filter = buildPrismaConditionFilter(conditionField.field, query[conditionField.field]);
      if (filter) {
        Object.assign(filters, filter);
      }
    }
  });

  return filters;
};

/**
 * Parses a frontend-encoded condition string into a ConditionDto object.
 * Example input: '">"%252C+"2025-05-09"%252C+"false"'
 */
export function parseConditionString(input: string): ConditionDto {
  // Step 1: URL decode once
  const decoded = decodeURIComponent(input);

  // Step 2: Split by '%2C'
  const parts = decoded.split('%2C');

  // Step 3: Clean up each part
  const cleaned = parts.map((part) => part.replace(/(^["'+\s]+|["'+\s]+$)/g, ''));

  return {
    operator: cleaned[0],
    value: cleaned[1],
    flag: cleaned[2] ? cleaned[2].toLowerCase() === 'true' : undefined,
  };
}

/**
 * Builds a Prisma filter for a given field and encoded condition string array from the DTO.
 * @param field - The field name to filter on (e.g., 'createdAt')
 * @param rawConditionArray - The string array from the DTO (e.g., ['[">", "2025-05-09", "false"]'])
 * @returns Prisma filter object for the field, or undefined if input is invalid
 */
export function buildPrismaConditionFilter(
  field: string,
  rawConditionArray: string[]
): PrismaFilter | undefined {
  if (!rawConditionArray || !rawConditionArray.length) return undefined;

  // Parse the string array (should be a single JSON string)
  let condition: string[];
  try {
    condition = JSON.parse(rawConditionArray[0]);
  } catch {
    return undefined;
  }

  // Map to ConditionDto
  const [operator, value1, value2] = condition;

  switch (operator) {
    case ConditionTypes.EQUALS:
      return {
        [field]: {
          contains: value1,
        },
      };
    case ConditionTypes.BETWEEN:
      // Try to parse as dates, fallback to strings
      const isDate1 = !isNaN(Date.parse(value1));
      const isDate2 = !isNaN(Date.parse(value2));
      return {
        [field]: {
          gt: isDate1 ? new Date(value1) : value1,
          lt: isDate2 ? new Date(value2) : value2,
        },
      };
    case ConditionTypes.GT:
      return {
        [field]: {
          gt: !isNaN(Date.parse(value1)) ? new Date(value1) : value1,
        },
      };
    case ConditionTypes.LT:
      return {
        [field]: {
          lt: !isNaN(Date.parse(value1)) ? new Date(value1) : value1,
        },
      };
    default:
      return undefined;
  }
}
