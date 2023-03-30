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
      growingAt: null,
    },
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
      growingAt: null,
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
    let errorMessage = '';

    if (!requirements.length) {
      return errorMessage;
    }

    if (requirements.length) {
      requirements.forEach(requirement => {
        if (requirement === 'Seeds') {
          if (!farmCell.isPlanted) {
            errorMessage = 'Farm plot is not seeded. Plant seeds first.';
          }
        }

        if (requirement === 'Water') {
          if (!farmCell.isWatered) {
            errorMessage = 'Farm plot is not watered. Water plot first.';
          }
        }
      });
    }

    return errorMessage;
  }

  function setFarmPlot(id) {
    // Let's get the active item from our hot bar.
    const items = [...hotbarItems];
    const activeItem = items.find(item => item.isActive);

    const newFarmCells = [...farmCells];
    const farmCellToUpdate = newFarmCells.find(farmCell => id === farmCell.id);

    // Show error message if any.
    const localErrorMessage = handleShowingErrorMessage(activeItem, farmCellToUpdate);

    if (localErrorMessage) {
      setErrorMessage(localErrorMessage);
      return;
    }

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

  function updateGameState() {
    // Determine if a crop plot is harvestable.
    const newFarmCells = [...farmCells];

    newFarmCells.forEach(farmCell => {
      if (farmCell.isPlanted === true && farmCell.isWatered === true && farmCell.growingAt === null) {
        farmCell.growingAt = Date.now();
      }

      if (farmCell.growingAt !== null && (Date.now() >= farmCell.growingAt + (1000 * 10))) {
        farmCell.isHarvestable = true;
      }
    });

    setFarmCells(newFarmCells);
  }

  useEffect(() => {
    // Start time loop.
    setInterval(updateGameState, 1000);
  }, [])

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
