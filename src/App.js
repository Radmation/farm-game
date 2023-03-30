import React, { useState, useEffect } from 'react';
import Hotbar from './Hotbar';
import Farm from './Farm';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [playing, setPlaying] = useState(true);

  const [hotbarItems, setHotbarItems] = useState([
    {
      id: uuidv4(),
      name: 'Seeds',
      emoji: '🌱',
      isActive: false,
    },
    {
      id: uuidv4(),
      name: 'Water',
      emoji: '💧',
      isActive: false,
    },
    {
      id: uuidv4(),
      name: 'Harvest',
      emoji: '🤏',
      isActive: false,
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

  // Have
  function gameTick() {
    console.log('Ticking...');
  }

  // TODO: Set up game loop.
  useEffect(() => {

  }, [])

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

  return (
    <>
      <h1>Farm Game</h1>
      <Farm farmCells={farmCells} />
      <Hotbar setActiveItem={setActiveItem} items={hotbarItems}/>
    </>
  );
}

export default App;
