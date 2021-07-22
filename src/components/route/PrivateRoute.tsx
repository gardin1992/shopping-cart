import * as React from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';

const PrivateRoute = ({ Component, exact, path }: { Component: any, exact: boolean, path: string }) => {

    console.log()

    const history = useHistory()

    const isLogin = () => {
        return false;
    }

    return (

        <Route exact={exact} path={path} render={props => (
            isLogin() ?
                <Component />
                : <Redirect to="/usuario" />
        )} />
    );
};

export default PrivateRoute;