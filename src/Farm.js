import FarmCell from './FarmCell';

export default function Farm({ farmCells }) {
  return (
    <div className="Farm">
      {farmCells.map(farmCell => (
        <FarmCell key={farmCell.id} farmCell={farmCell} />
      ))}
    </div>
  )
}