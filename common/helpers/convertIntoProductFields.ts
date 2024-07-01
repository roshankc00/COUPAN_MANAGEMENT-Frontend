interface Field {
  key: string;
  type: string;
  order?: number;
}
interface FieldsObject {
  [key: string]: {
    type: string;
    order?: number;
  };
}

export const convertIntoFormat = (fields: Field[]) => {
  const fieldsObject: FieldsObject = fields.reduce(
    (acc: FieldsObject, curr: Field) => {
      acc[curr.key] = {
        type: curr.type,
        order: curr.order,
      };
      return acc;
    },
    {}
  );
};
