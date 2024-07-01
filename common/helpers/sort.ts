type Field = {
  type: string;
  order: number;
  option?: string[];
};

type FieldsObject = {
  [key: string]: Field;
};

export function customSortKeys(
  fields: FieldsObject
): { key: string; type: string }[] {
  // Convert the keys of fields object into an array
  const keys = Object.keys(fields);

  // Sort keys based on the order property of their corresponding field
  keys.sort((keyA, keyB) => fields[keyA].order - fields[keyB].order);

  // Map keys to objects containing key and type
  const sortedKeysWithDetails = keys.map((key) => ({
    key,
    type: fields[key].type,
    option: fields[key]?.option || null,
  }));

  return sortedKeysWithDetails;
}
