import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';

import {formatDistance, parseISO} from 'date-fns';
import pt from 'date-fns/locale/pt';

// import EmptyState from '~/components/EmptyState';
import {
  addCheckinRequest,
  getCheckinsRequest,
} from '~/store/modules/checkin/actions';

import {
  Container,
  Button,
  CheckinList,
  Checkin,
  CheckinTitle,
  CheckinDate,
  Footer,
} from './styles';

export default function Checkins() {
  const dispatch = useDispatch();
  const checkins = useSelector(state => state.checkin.checkins);
  const loading = useSelector(state => state.checkin.loading);
  const refreshing = useSelector(state => state.checkin.refreshing);

  function handleAddcheckin() {
    dispatch(addCheckinRequest());
  }

  function handleRefreshCheckins() {
    dispatch(getCheckinsRequest());
  }

  return (
    <Container>
      <Button isLoading={loading} onPress={handleAddcheckin}>
        Novo check-in
      </Button>
      <CheckinList
        data={checkins}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <Checkin>
            <CheckinTitle>Check-in #{item.id}</CheckinTitle>
            <CheckinDate>
              {formatDistance(parseISO(item.created_at), new Date(), {
                addSuffix: true,
                locale: pt,
              })}
            </CheckinDate>
          </Checkin>
        )}
        ListFooterComponent={() => <Footer />}
        onRefresh={handleRefreshCheckins}
        refreshing={refreshing}
      />
    </Container>
  );
}

Checkins.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: ({tintColor}) => ( /* eslint-disable-line */
    <Icon name="edit-location" color={tintColor} size={20} />
  ),
};
