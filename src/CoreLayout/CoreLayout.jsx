/**
 *
 * CoreLayaout.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { PureComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppShell from 'AppShell';
// import StyledCoreLayout from './style';
import styles from './styles.css';
import { Login } from 'views';

// eslint-disable-next-line react/prefer-stateless-function
class CoreLayout extends PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <AppShell>
          <Switch>
            <Route
              exact
              path="/"
              component={Login}
            />
          </Switch>
        </AppShell>
      </div>
    );
  }
}

CoreLayout.propTypes = {};

export default CoreLayout;
