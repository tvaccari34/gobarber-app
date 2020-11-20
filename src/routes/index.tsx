import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

const Routes: React.FC = () => (

    <Switch>

        <Route component={SignIn} path="/" exact />
        <Route component={SignUp} path="/signup" />
        <Route component={ForgotPassword} path="/forgot-password" />
        <Route component={ResetPassword} path="/reset-password" />
        <Route component={Dashboard} path="/dashboard" isPrivate />

    </Switch>

);

export default Routes;