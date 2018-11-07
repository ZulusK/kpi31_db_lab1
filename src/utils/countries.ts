const countryList = require('country-list')();
import * as _ from 'lodash';

const countries = countryList.getData();

const filterFunc = _.flow([
  regexp =>
    _.filter(countries, ({ code, name }) => {
      return regexp.test(code) || regexp.test(name);
    }),
  filtered => _.map(filtered, ({ name }) => name),
]);

export function filterCountries(input: string) {
  if (input && input.length > 0) {
    const regexp = new RegExp(`.*${input}.*`, 'i');
    return filterFunc(regexp);
  }
  return countries;
}
