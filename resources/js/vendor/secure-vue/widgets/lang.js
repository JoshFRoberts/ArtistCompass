import _ from 'lodash';
import pluralize from './Helper/pluralize';

/**
 * Translate the given key.
 */
function trans(key, replace) {
  let translation = _.has(window.i18n, key)
    ? _.get(window.i18n, key)
    : key;
  _.forEach(replace, (value, key) => {
    translation = translation.replace(`:${key}`, value);
  });

  return translation;
}

function trans_choice(key, num, replace) {
  let translation = _.has(window.i18n, key)
    ? _.get(window.i18n, key)
    : key;

  const segments = _.split(translation, '|');
  if (segments.length === 1) {
    return segments;
  }

  const pluralForm = pluralize(num);
  translation = segments[pluralForm];

  _.forEach(replace, (value, key) => {
    translation = translation.replace(`:${key}`, value);
  });

  return translation;
}

export { trans, trans_choice };
export default trans;
