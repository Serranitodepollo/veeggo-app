/**
 *
 * Login
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

function Login(props) {
  return (
    <div>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Description of Login" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


export default Login;
