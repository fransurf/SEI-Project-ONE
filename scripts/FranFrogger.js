function init() {

  // ? Elements
  // ? Grid container

  const grid = document.querySelector('#grid')

  //* Grid creation
  // Creating the grid - need 11 x 11
  // Having trouble so far!
  const width = 11
  const height = 10
  const cellCount = width * height
  const cells = []



  // * Character set up
  // Froggy1 appear
  // In the end 3 froggy classes that deploy at different points
  const froggyClass = 'froggy'
  const startPosition = 104
  let currentPosition = startPosition

  console.log('startPosition --->', startPosition)
  console.log('currentPosition --->', currentPosition)

  // * Add froggy1
  function addFroggy(position){
    cells[position].classList.add(froggyClass)
  }

  // * Remove froggy1
  function removeFroggy(position){
    cells[position].classList.remove(froggyClass)
  }



  // * Collider set up
  // Colldier1 appear
  const colliderClass = 'collider'
  const colliderStart = 84
  // let colliderCurrent = colliderStart // This is for collider movement later on //
  const collisionPopup = document.querySelector('.bang-popup')
  const collisionButton = document.querySelector('#close-btn')



  // * Add collider
  function addCollider(position){
    cells[position].classList.add(colliderClass)
  }


  // ? Executions

  // * Set up grid creation
  
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
    addCollider(colliderStart)
    console.log(addCollider)
  }
  createGrid()


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
    if (key === left && (currentPosition % width !== 0)){
      console.log('MOVE LEFT')
      currentPosition-- // position minus 1 grid box
    } else if (key === right && (currentPosition % width !== (width - 1))){
      console.log('MOVE RIGHT')
      currentPosition++ // position plus 1 grid box
    } else if (key === up && (currentPosition >= width)){
      console.log('MOVE UP')
      currentPosition -= width // position minus entire width = grid box above
    } else if (key === down && (currentPosition + width <= cellCount - 1)){
      console.log('MOVE DOWN')
      currentPosition += width
    } else {
      console.log('INVALID KEY')
    }

    // Add froggy to new position + adds one collider
    addFroggy(currentPosition)
    collisionDetection()
  }



  // * Collision detection

  function collisionDetection(){
    if (currentPosition === colliderStart){
      showPopUp()
      console.log('BANG!')
      console.log('collisionPopup--->', collisionPopup)
      // So far this is tracking whether froggy and collider are in the same box
    } else {
      console.log('YOURE OK!')
    }
  }

  function showPopUp(){
    collisionPopup.style.display = 'block'
  }

  function hidePopUp(){
    collisionPopup.style.display = 'none'
    removeFroggy(currentPosition)
    addFroggy(startPosition)
  }
  


  // ? Events

  // * Key press
  document.addEventListener('keydown', handleKeyDown)

  // * Close Collision Pop up
  collisionButton.addEventListener('click', hidePopUp)

}

window.addEventListener('DOMContentLoaded', init)