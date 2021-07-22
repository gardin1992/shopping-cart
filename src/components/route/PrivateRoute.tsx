import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthorize } from '../../reducers/authenticationSlicer';

const PrivateRoute = ({ Component, exact, path }: { Component: any, exact: boolean, path: string }) => {

    return (

        <Route exact={exact} path={path} render={props => (
            isAuthorize() ?
                <Component />
                : <Redirect to="/usuario" />
        )} />
    );
};

export default PrivateRoute;