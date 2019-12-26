import React, { useRef, useState, useEffect } from 'react';
import { MdExpandMore, MdError } from 'react-icons/md';
import ReactLoading from 'react-loading';

import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import EmptyState from '~/components/EmptyState';
import Modal from '~/components/Modal';
import api from '~/services/api';
import { formatPrice } from '~/util/format';
import { month as monthPlurals } from '~/util/plurals';

import {
  Container,
  ModalContent,
  SearchBar,
  PlanList,
  Plan,
  Actions,
} from './styles';

export default function PlanPicker({ onPlanChange, name }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'value',
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  const [opened, setOpened] = useState(false);
  const [filter, setFilter] = useState('');
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState(defaultValue);
  const [selectedListItem, setSelectedListItem] = useState({});
  const [value, setValue] = useState(defaultValue && defaultValue.id);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const response = await api.get('/plans');

        setPlans(response.data);
        setFilteredPlans(response.data);
      } catch (err) {
        setLoadingError(true);
      }

      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!defaultValue) return;

    setValue(defaultValue.id);
    setSelectedPlan(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    const lowerFilter = filter.toLowerCase().trim();

    const data = plans.filter(({ title }) =>
      title.toLowerCase().includes(lowerFilter)
    );

    setFilteredPlans(data);

    setSelectedListItem(data.length === 1 ? data[0] : {});
  }, [filter, plans]);

  function handleOpenModal() {
    if (isLoading) return;

    setOpened(true);
  }

  function handleCloseModal() {
    setFilter('');
    setOpened(false);
    setSelectedListItem({});
  }

  function handleSelectListItem(student) {
    setSelectedListItem(selectedListItem.id === student.id ? {} : student);
  }

  function handleConfirmSelection() {
    setValue(selectedListItem.id);
    setSelectedPlan(selectedListItem);
    onPlanChange(selectedListItem);

    handleCloseModal();
  }

  function CurrentInputState() {
    if (loadingError) return <MdError size={24} color="#de3b3b" />;

    if (isLoading)
      return <ReactLoading type="spin" color="#666" height={24} width={24} />;

    return <MdExpandMore size={24} color="#666" />;
  }

  function CurrentState() {
    if (!plans.length) return <EmptyState />;

    if (filter.length && !filteredPlans.length)
      return <EmptyState message="Sua busca não encontrou nada" />;

    return (
      <PlanList>
        {filteredPlans.map(student => (
          <Plan
            key={student.id}
            selected={student.id === selectedListItem.id}
            onClick={() => handleSelectListItem(student)}
          >
            <strong>{student.title}</strong>
            <div>
              <span>{formatPrice(student.price)} p/mês</span>
              <small>durante {monthPlurals(student.duration)}</small>
            </div>
          </Plan>
        ))}
      </PlanList>
    );
  }

  return (
    <>
      <Container onClick={handleOpenModal}>
        <span>{!selectedPlan ? 'Selecionar plano' : selectedPlan.title}</span>
        <CurrentInputState />
        <input
          type="hidden"
          ref={ref}
          id={fieldName}
          name={fieldName}
          value={value || ''}
          onChange={setValue}
          defaultValue={defaultValue}
        />
      </Container>
      <Modal isOpen={opened} onRequestClose={() => setOpened(false)}>
        <ModalContent>
          <SearchBar
            value={filter}
            onChange={e => setFilter(e.target.value)}
            type="text"
            autoFocus
            placeholder="Buscar plano"
          />
          <div className="content">
            <CurrentState />
          </div>
          <Actions>
            <button type="button" className="cancel" onClick={handleCloseModal}>
              Cancelar
            </button>
            <button
              type="submit"
              className="confirm"
              disabled={!selectedListItem.id}
              onClick={handleConfirmSelection}
            >
              Confirmar
            </button>
          </Actions>
        </ModalContent>
      </Modal>
      {error && <span>{error}</span>}
    </>
  );
}

PlanPicker.propTypes = {
  onPlanChange: PropTypes.func,
  name: PropTypes.string.isRequired,
};

PlanPicker.defaultProps = {
  onPlanChange: () => {},
};
