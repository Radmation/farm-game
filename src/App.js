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
    const requirements = activeItem.requirements;
    let hasError = false;
    let localErrorMessage = '';

    if (!requirements.length) {
      localErrorMessage = '';
    }

    if (requirements.length) {
      requirements.forEach(requirement => {
        if (requirement === 'Seeds') {
          if (!farmCell.isPlanted) {
            localErrorMessage = 'Farm plot is not seeded. Plant seeds first.';
            hasError = true;
          }
        }

        if (requirement === 'Water') {
          if (!farmCell.isWatered) {
            localErrorMessage = 'Farm plot is not watered. Water plot first.';
            hasError = true;
          }
        }
      });
    }

    if (hasError) {
      setErrorMessage(localErrorMessage);
    }
  }

  function setFarmPlot(id) {
    // Let's get the active item from our hot bar.
    const items = [...hotbarItems];
    const activeItem = items.find(item => item.isActive);

    const newFarmCells = [...farmCells];
    const farmCellToUpdate = newFarmCells.find(farmCell => id === farmCell.id);

    // Show error message if any.
    handleShowingErrorMessage(activeItem, farmCellToUpdate);

    // TODO: if there is an error message, we want to return.

    // Set the cells property based on if the active.
    switch (activeItem.name) {
      case 'Seeds':
        farmCellToUpdate.isPlanted = true;
        break;
      case 'Water':
        farmCellToUpdate.isWatered = true;
        break;
    }

    setFarmCells(newFarmCells);
  }

  return (
    <>
      <h1>Farm Game</h1>
      <Farm farmCells={farmCells} setFarmPlot={setFarmPlot}/>
      <Hotbar setActiveItem={setActiveItem} items={hotbarItems}/>
      {errorMessage}
    </>
  );
}

export default App;
