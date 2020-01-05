import React, {useRef, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import PropTypes from 'prop-types';

import Button from '~/components/Button';
import {addHelpOrderRequest} from '~/store/modules/helpOrder/actions';

import {Wrapper, Container, TextArea} from './styles';

export default function HelpOrderDetails({navigation}) {
  const dispatch = useDispatch();
  const textareaRef = useRef(null);

  const [addCalled, setAddCalled] = useState(false);
  const [question, setQuestion] = useState('');
  const loading = useSelector(state => state.helpOrder.loading);

  useEffect(() => {
    if (addCalled && !loading) navigation.goBack();
  }, [addCalled, loading]);

  function handleAsk() {
    dispatch(addHelpOrderRequest(question));
    setAddCalled(true);
  }

  return (
    <Wrapper>
      <Container onStartShouldSetResponder={() => textareaRef.current.focus()}>
        <TextArea
          ref={textareaRef}
          multiline
          placeholder="Inclua seu pedido de auxílio"
          text={question}
          onChangeText={setQuestion}
        />
      </Container>
      <Button isLoading={loading} onPress={handleAsk}>
        Enviar pedido
      </Button>
    </Wrapper>
  );
}

HelpOrderDetails.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};
