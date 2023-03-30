import React, { useState, useEffect } from 'react';
import Hotbar from './Hotbar';
import Farm from './Farm';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [errorMessage, setErrorMessage] = useState('');

  const [hotbarItems, setHotbarItems] = useState([
    {
      id: uuidv4(),
      name: 'Seeds',
      emoji: '🌱',
      isActive: true,
      requirements: [],
    },
    {
      id: uuidv4(),
      name: 'Water',
      emoji: '💧',
      isActive: false,
      requirements: ['Seeds'],
    },
    {
      id: uuidv4(),
      name: 'Harvest',
      emoji: '🤏',
      isActive: false,
      requirements: ['Seeds', 'Water'],
    },
  ]);

  const [farmCells, setFarmCells] = useState([
    {
      id: uuidv4(),
      isWatered: false,
      isPlanted: false,
      isHarvestable: false,
      growingAt: null,
    },
    {
      id: uuidv4(),
      isWatered: false,
      isPlanted: false,
      isHarvestable: false,
      growingAt: null
    },
    {
      id: uuidv4(),
      isWatered: false,
      isPlanted: false,
      isHarvestable: false,
      growingAt: null
    },
    {
      id: uuidv4(),
      isWatered: false,
      isPlanted: false,
      isHarvestable: false,
      growingAt: null
    }
  ]);

  // TODO: Create a way to keep track of time, and if a crop isWatered and x amount of seconds has passed make it harvestable.
  // TODO: Handle way to plant crops.

  function setActiveItem(id) {
    const newItems = [...hotbarItems];

    // Find the active item in our list.
    const activeItem = newItems.find(item => item.id === id)
    activeItem.isActive = true;

    // Make each other item non-active.
    const nonActiveItems = newItems.filter(item => item.id !== id)
    nonActiveItems.forEach(item => item.isActive = false);

    // Set our new items.
    setHotbarItems(newItems);
  }

  function handleShowingErrorMessage(activeItem, farmCell) {
    // Get our requirements from our active item.
    const requirements = activeItem.requirements;

    //
  }

  function setFarmPlot(id) {
    // Let's get the active item from our hot bar.
    const items = [...hotbarItems];
    const activeItem = items.find(item => item.isActive);

    const newFarmCells = [...farmCells];
    const farmCellToUpdate = newFarmCells.find(farmCell => id === farmCell.id);

    handleShowingErrorMessage(activeItem, farmCellToUpdate);
    // Check if error message is an empty string.
    // If not return.

    // Set the cells property based on if the active.
    switch (activeItem.name) {
      case 'Seeds':
        // TODO: check that it is first seeded.
        farmCellToUpdate.isPlanted = true;
        break;
      case 'Water':
        // TODO: check that it is first seeded.
        farmCellToUpdate.isWatered = true;
        break;
    }

    setFarmCells(newFarmCells);
  }

  return (
    <>
      <h1>Farm Game</h1>
      <Farm farmCells={farmCells} setFarmPlot={setFarmPlot} />
      <Hotbar setActiveItem={setActiveItem} items={hotbarItems}/>
      {errorMessage}
    </>
  );
}

export default App;
