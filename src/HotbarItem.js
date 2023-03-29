import './Hotbar.scss';

export default function HotbarItem({ item, setActiveItem }) {
  const classIsActive = (item.isActive) ? 'isActive' : '';

  function handleItemClick() {
    setActiveItem(item.id);
  }

  return (
    <button onClick={handleItemClick} className={classIsActive}>{item.emoji} <span>{item.name}</span></button>
  );
}