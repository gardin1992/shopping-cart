import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { reAuthorize } from '../../reducers/authenticationSlicer';

const PublicRoute = ({ Component, exact, path }: { Component: any, exact: boolean, path: string }) => {

    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(reAuthorize())
    }, [])

    return (
        <Route exact={exact} path={path} component={Component} />
    );
};

export default PublicRoute;