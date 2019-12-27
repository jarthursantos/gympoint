import React, { useRef, useState, useEffect } from 'react';
import { MdExpandMore, MdError } from 'react-icons/md';

import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import ActivityIndicator from '~/components/ActivityIndicator';
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

  const [filter, setFilter] = useState('');
  const [opened, setOpened] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(defaultValue);
  const [selectedListItem, setSelectedListItem] = useState({});
  const [value, setValue] = useState(defaultValue && defaultValue.id);

  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const response = await api.get('/plans');

        const data = response.data.map(plan => ({
          ...plan,
          months: monthPlurals(plan.duration),
          formatedPrice: formatPrice(plan.price),
        }));

        setPlans(data);
        setFilteredPlans(data);
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

  return (
    <>
      <Container onClick={handleOpenModal}>
        <span>{selectedPlan && selectedPlan.title}</span>
        {(() => {
          if (loadingError) return <MdError size={24} color="#de3b3b" />;

          if (isLoading) return <ActivityIndicator color="#666" size={24} />;

          return <MdExpandMore size={24} color="#666" />;
        })()}
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
            {(() => {
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
                        <span>{student.formatedPrice} p/mês</span>
                        <small>durante {student.months}</small>
                      </div>
                    </Plan>
                  ))}
                </PlanList>
              );
            })()}
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
