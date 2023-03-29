export default function FarmCell({ farmCell }) {
  // TODO: add images to visually display if farm is watered. (some wet and dry dirt image)
  // TODO: add images to visually show if farm is planted. (some seed image)
  // TODO: add images to visually show if farm is harvestable. (some plant image)

  return (
    <div className="FarmCell">
      { farmCell.id }
      <span> is watered: </span>{ farmCell.isWatered.toString() }
      <span> is planted: </span>{ farmCell.isPlanted.toString() }
      <span> is harvestable: </span>{ farmCell.isHarvestable.toString() }
    </div>
  )
}