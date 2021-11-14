export interface NotFound {
  name: string;
  details: {
    code: 404;
  };
}

export const isNotFound = (unknownValue: unknown): unknownValue is NotFound => {
  const notFound = unknownValue as NotFound;
  return (
    notFound.name != null &&
    notFound.details != null &&
    notFound.details.code === 404
  );
};
