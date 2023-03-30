export default function FarmCell({ farmCell, setFarmPlot }) {
  // TODO: add images to visually display if farm is watered. (some wet and dry dirt image)
  // TODO: add images to visually show if farm is planted. (some seed image)
  // TODO: add images to visually show if farm is harvestable. (some plant image)

  return (
    <div className="FarmCell" onClick={() => setFarmPlot(farmCell.id)}>
      {/*{ farmCell.id }*/}
      <span> is watered: </span>{ farmCell.isWatered.toString() } <br />
      <span> is planted: </span>{ farmCell.isPlanted.toString() } <br />
      <span> is harvestable: </span>{ farmCell.isHarvestable.toString() }
    </div>
  )
}