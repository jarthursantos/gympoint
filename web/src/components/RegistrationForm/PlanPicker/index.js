import React, { useRef, useState, useEffect } from 'react';
import { MdExpandMore } from 'react-icons/md';
import ReactLoading from 'react-loading';

import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';

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

  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedPlan, setSelectedPlan] = useState(defaultValue);
  const [selectedListItem, setSelectedListItem] = useState({});
  const [value, setValue] = useState(defaultValue && defaultValue.id);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const response = await api.get('/plans');

      setPlans(response.data);
      setFilteredPlans(response.data);

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

    setIsOpen(true);
  }

  function handleCloseModal() {
    setFilter('');
    setIsOpen(false);
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
        <span>{!selectedPlan ? 'Selecionar plano' : selectedPlan.title}</span>
        {isLoading ? (
          <ReactLoading type="spin" color="#666" height={24} width={24} />
        ) : (
          <MdExpandMore size={24} color="#666" />
        )}
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
      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
        <ModalContent>
          <SearchBar
            value={filter}
            onChange={e => setFilter(e.target.value)}
            type="text"
            autoFocus
            placeholder="Buscar plano"
          />
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
