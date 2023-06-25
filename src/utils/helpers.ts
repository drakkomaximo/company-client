export const formatNumber = ({ value }: { value: number }) => {
  return new Intl.NumberFormat("es-co").format(value);
};
