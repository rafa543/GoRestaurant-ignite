import { Component, createRef, useEffect } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import {
  useState
} from 'react';
import { boolean } from 'yup';
import { Foods } from '../../pages/Dashboard';

interface Props {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (data: Foods) => Promise<void>;
}

export function ModalAddFood({isOpen,setIsOpen, handleAddFood}: Props) {
  const formRef = createRef()

  async function handleSubmit() {
    // const { setIsOpen, handleAddFood } = this.props;

    // handleAddFood(data);
    setIsOpen();
  };

  useEffect(() => {
    console.log("modal")
    // console.log('teste')
  }, [])

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}

export default ModalAddFood;
