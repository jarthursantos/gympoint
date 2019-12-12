import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { navigate } from '~/store/modules/navigation/actions';

import { Container } from './styles';

export default function PlanList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(navigate('plans'));
  }, [dispatch]);

  return <Container />;
}
