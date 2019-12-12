import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { navigate } from '~/store/modules/navigation/actions';

import { Container } from './styles';

export default function StudentEditor() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(navigate('students'));
  }, [dispatch]);

  return <Container />;
}
