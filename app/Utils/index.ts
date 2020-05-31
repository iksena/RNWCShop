import 'intl';
import 'intl/locale-data/jsonp/id';

export const toAmount = (amount: number): string =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
    amount
  );
