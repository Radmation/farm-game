import FarmCell from './FarmCell';
import './Farm.scss';

export default function Farm({ farmCells, setFarmPlot }) {
  return (
    <div className="Farm">
      {farmCells.map(farmCell => (
        <FarmCell key={farmCell.id} farmCell={farmCell} setFarmPlot={setFarmPlot} />
      ))}
    </div>
  )
}