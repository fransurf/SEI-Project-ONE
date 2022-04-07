function init() {

  // ? Elements
  // ? Grid container

  const grid = document.querySelector('#grid')

  //* Grid creation
  // Creating the grid - need 11 x 10 (w x h)
  // Having trouble so far!
  const width = 10
  // const height = 11
  const cellCount = width * width
  const cells = []



  // * Character set up
  // Froggy1 appear
  // In the end 3 froggy classes that deploy at different points
  const froggyClass = 'froggy'
  const startPosition = 0
  let currentPosition = startPosition



  // ? Executions

  // * Set up grid creation
  // Can't get it to do 10 x 11!!!!!
  function createGrid(){
    for (let i = 0; i < cellCount; i++){
      console.log('Cell created')
      const cell = document.createElement('div')
      cell.innerText = i
      cell.id = i
      grid.appendChild(cell)
      cells.push(cell)
    }

    addFroggy(startPosition)
  }

  

  // * Add froggy1

  function addFroggy(position){
    cells[position].classList.add(froggyClass)
  }

  // * Remove froggy1
  function removeFroggy(position){
    cells[position].classList.remove(froggyClass)
  }



  // * Movement function

  function handleKeyDown(event){
    const key = event.keyCode
    const left = 37
    const right = 39
    const up = 38
    const down = 40

    // Remove froggy current position - removes any existing froggies
    removeFroggy(currentPosition)

    // Control flow for movement based on key direction
    if (key === left){
      console.log('MOVE LEFT')
      currentPosition-- // position minus 1 grid box
    } else if (key === right){
      console.log('MOVE RIGHT')
      currentPosition++ // position plus 1 grid box
    } else if (key === up){
      console.log('MOVE UP')
      currentPosition -= width // position minus entire width = grid box above
    } else if (key === down){
      console.log('MOVE DOWN')
      currentPosition += width
    } else {
      console.log('INVALID KEY')
    }

    // Add froggy to new position
    addFroggy(currentPosition)
  }


  // ? Events

  // * Key press
  document.addEventListener('keydown', handleKeyDown)

  // * Grid creation
  createGrid()

}

window.addEventListener('DOMContentLoaded', init)