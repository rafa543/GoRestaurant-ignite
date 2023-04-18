import { useState, useEffect } from 'react'
import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

export interface Foods {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;
}

export function Dashboard() {
  const [foods, setFoods] = useState<Foods[]>([]);
  const [editingFood, setEditingFood] = useState<Foods>();
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  async function componentDidMount() {
    const response = await api.get('/foods');

    setFoods(response.data);
  }

  useEffect(() => {
    async function teste() {
      const response = await api.get('/foods');

      setFoods(response.data);
    }

    teste()
  }, [])

  async function handleAddFood(food: Foods) {
    // const { foods } = this.state;

    try {
      const response = await api.post('/foods', {
        ...foods,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(foodEdition: Foods) {
    // const { foods, editingFood } = this.state;

    try {
      const foodUpdated = await api.put(
        `/foods/${foodEdition.id}`,
        { ...foodEdition, ...foods },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood(id: number) {

    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  }

  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal() {
    setModalOpen(!editModalOpen);
  }

  function handleEditFood(food: Foods) {
    setEditingFood(food);
    setEditModalOpen(true)
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        // editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
}

export default Dashboard;
