import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import StudentList from '../pages/StudentList';
import StudentRegister from '../pages/StudentRegister';
import StudentEditor from '../pages/StudentEditor';

import PlanList from '../pages/PlanList';
import PlanRegister from '../pages/PlanRegister';
import PlanEditor from '../pages/PlanEditor';

import RegistrationList from '../pages/RegistrationList';
import RegistrationRegister from '../pages/RegistrationRegister';
import RegistrationEditor from '../pages/RegistrationEditor';

import HelpOrderList from '../pages/HelpOrderList';
import HelpOrderAnswer from '../pages/HelpOrderAnswer';

export default function routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" component={StudentList} isPrivate />
      <Route path="/students/register" component={StudentRegister} isPrivate />
      <Route path="/students/:id/edit" component={StudentEditor} isPrivate />

      <Route path="/plan" component={PlanList} isPrivate />
      <Route path="/plan/register" component={PlanRegister} isPrivate />
      <Route path="/plan/:id/edit" component={PlanEditor} isPrivate />

      <Route path="/registration" component={RegistrationList} isPrivate />
      <Route
        path="/registration/register"
        component={RegistrationRegister}
        isPrivate
      />
      <Route
        path="/registration/:id/edit"
        component={RegistrationEditor}
        isPrivate
      />

      <Route path="/helpOrders" component={HelpOrderList} isPrivate />
      <Route
        path="/helpOrders/:id/answer"
        component={HelpOrderAnswer}
        isPrivate
      />
    </Switch>
  );
}
