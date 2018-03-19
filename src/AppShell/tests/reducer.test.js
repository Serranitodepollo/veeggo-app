
import { fromJS } from 'immutable';
import appShellReducer from '../reducer';

describe('appShellReducer', () => {
  it('returns the initial state', () => {
    expect(appShellReducer(undefined, {})).toEqual(fromJS({}));
  });
});
