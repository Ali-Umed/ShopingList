import { useState } from 'react';
import Logo from './Logo';
import Form from './Form';
import ListOfItem from './ListOfItem';
import Stats from './Stats';
import React from 'react';

export default function App() {
  const [items, setItems] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [update, setUpdate] = useState();
  const [checkAll, setCheckAll] = useState(true);
  function handleAddItems(item) {
    setItems(items => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems(items => items.filter(item => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems(items =>
      items.map(item =>
        item.id === id ? { ...item, bought: !item.bought } : item
      )
    );
  }

  function handleToggleCheckAll() {
    setItems(items =>
      items.map(item => {
        return { ...item, bought: checkAll };
      })
    );

    setCheckAll(bool => !bool);
  }

  function handleOpenModal(item) {
    setOpenModal(true);
    console.log(item);
    setUpdate(item);
  }

  function onUpdateItem(itemToUpdate) {
    const newItem = items.filter(item => item.id === itemToUpdate.id);

    if (newItem) {
      setItems(item =>
        item.map(itema => (itema.id === newItem[0].id ? itemToUpdate : itema))
      );
    }
    setOpenModal(false);
  }
  function handleClearList() {
    const confirmed = window.confirm(' sure  to delete all items ?');

    if (confirmed) setItems([]);
  }

  return (
    <div className=" py-3 px-1 lg:px-5 lg:pt-5 w-screen    h-screen  bg-fuchsia-50 flex flex-col  ">
      <Logo />
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        <Form
          onAddItems={handleAddItems}
          openModal={openModal}
          setOpenModal={setOpenModal}
          update={update}
          onUpdateItem={onUpdateItem}
        />
        <ListOfItem
          items={items}
          onDeleteItem={handleDeleteItem}
          onToggleItem={handleToggleItem}
          onClearList={handleClearList}
          onUpdateItem={onUpdateItem}
          openModal={openModal}
          setOpenModal={setOpenModal}
          handleOpenModal={handleOpenModal}
          handleToggleCheckAll={handleToggleCheckAll}
          checkAll={checkAll}
        />
      </div>

      <Stats items={items} />
    </div>
  );
}
