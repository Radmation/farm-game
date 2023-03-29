import './Hotbar.scss';
import HotbarItem from './HotbarItem';

export default function Hotbar({ items, setActiveItem }) {
  return (
    <div className="Hotbar">
      {items.map(item => (
        <HotbarItem key={item.id} item={item} setActiveItem={setActiveItem} />
      ))}
    </div>
  );
}