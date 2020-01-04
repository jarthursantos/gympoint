import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';

import PropTypes from 'prop-types';

// import EmptyState from '~/components/EmptyState';

import {getHelpOrdersRequest} from '~/store/modules/helpOrder/actions';

import HelpOrder from './HelpOrder';
import {Container, Button, HelpOrderList, Footer} from './styles';

export default function HelpOrders({navigation}) {
  const dispatch = useDispatch();
  const helpOrders = useSelector(state => state.helpOrder.helpOrders);
  const loading = useSelector(state => state.helpOrder.loading);
  const refreshing = useSelector(state => state.helpOrder.refreshing);

  function handleRefreshHelpOrders() {
    dispatch(getHelpOrdersRequest());
  }

  function handleCreateHelpOrder() {
    navigation.navigate('NewHelpOrder');
  }

  function handleShowDetails(helpOrder) {
    navigation.navigate('HelpOrderDetails', {helpOrder});
  }

  return (
    <Container>
      <Button isLoading={loading} onPress={handleCreateHelpOrder}>
        Novo pedido de auxílio
      </Button>
      <HelpOrderList
        data={helpOrders}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <HelpOrder data={item} onPress={() => handleShowDetails(item)} />
        )}
        ListFooterComponent={() => <Footer />}
        onRefresh={handleRefreshHelpOrders}
        refreshing={refreshing}
      />
    </Container>
  );
}

HelpOrders.navigationOptions = {
  tabBarLabel: 'Pedir ajuda',
  tabBarIcon: ({tintColor}) => ( /* eslint-disable-line */
    <Icon name="live-help" color={tintColor} size={20} />
  ),
};

HelpOrders.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
