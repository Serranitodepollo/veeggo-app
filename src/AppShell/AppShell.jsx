/**
 *
 * AppShell
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga, injectReducer } from 'utils/config';
import makeSelectAppShell from './selectors';
import reducer from './reducer';
import saga from './saga';

class AppShell extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { props } = this;

    return (
      <div>
        {
          props.children
        }
      </div>
    );
  }
}

AppShell.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  appshell: makeSelectAppShell(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'appShell', reducer });
const withSaga = injectSaga({ key: 'appShell', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AppShell);
