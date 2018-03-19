import { createSelector } from 'reselect';

/**
 * Direct selector to the appShell state domain
 */
const selectAppShellDomain = state => state.get('appShell');

/**
 * Other specific selectors
 */


/**
 * Default selector used by AppShell
 */

const makeSelectAppShell = () => createSelector(
  selectAppShellDomain,
  substate => substate.toJS(),
);

export default makeSelectAppShell;
export { selectAppShellDomain };
