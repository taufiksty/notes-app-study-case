import moment from 'moment';

const dateFormat = (timestamp: string | Date): string => {
  return moment(Number(timestamp)).format('DD/MM/YYYY');
};

export default dateFormat;
