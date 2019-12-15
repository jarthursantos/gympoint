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

      <Route path="/students" exact component={StudentList} isPrivate />
      <Route path="/students/register" component={StudentRegister} isPrivate />
      <Route path="/students/:id/edit" component={StudentEditor} isPrivate />

      <Route path="/plans" exact component={PlanList} isPrivate />
      <Route path="/plans/register" component={PlanRegister} isPrivate />
      <Route path="/plans/:id/edit" component={PlanEditor} isPrivate />

      <Route
        path="/registrations"
        exact
        component={RegistrationList}
        isPrivate
      />
      <Route
        path="/registrations/register"
        component={RegistrationRegister}
        isPrivate
      />
      <Route
        path="/registrations/:id/edit"
        component={RegistrationEditor}
        isPrivate
      />

      <Route path="/helpOrders" exact component={HelpOrderList} isPrivate />
      <Route
        path="/helpOrders/:id/answer"
        component={HelpOrderAnswer}
        isPrivate
      />
    </Switch>
  );
}
