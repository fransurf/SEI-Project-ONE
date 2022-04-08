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

  // * Home & obstacle set up
  const homeClass = 'home'
  const homePosition = [2, 5, 8] 
  const obstacleClass = 'obstacle'
  const obstaclePosition = [44, 47, 48, 50, 51, 54]
  

  // * Character set up
  // Froggy1 appear
  // In the end 3 froggy classes that deploy at different points
  const froggyClass = 'froggy'
  const startPosition = 104
  let currentPosition = startPosition

  // * Add froggy1
  function addFroggy(position){
    cells[position].classList.add(froggyClass)
  }

  // * Remove froggy1
  function removeFroggy(position){
    cells[position].classList.remove(froggyClass)
  }

  // * Restart current position
  // function restartCurrent(){
  //   const currentPosition = startPosition
  // }


  // * Collider set up
  // Colldier1 appear
  const colliderClass = 'collider'
  const colliderStart = 84
  // let colliderCurrent = colliderStart // This is for collider movement later on //
  const collisionPopup = document.querySelector('.bang-popup')
  const collisionOverlay = document.querySelector('#bang-overlay')
  const collisionButton = document.querySelector('#close-btn')

  // * Add collider
  function addCollider(position){
    cells[position].classList.add(colliderClass)
  }



  // ? Executions

  // * Set up grid creation
  
  function createGrid(){
    for (let i = 0; i < cellCount; i++){
      const cell = document.createElement('div')
      cell.innerText = i
      cell.id = i
      grid.appendChild(cell)
      cells.push(cell)
      
      // Set up for Home spaces
      if (homePosition.includes(i)) {
        cells[i].classList.add(homeClass)
      }
      // Set up for obstacles
      if (obstaclePosition.includes(i)) {
        cells[i].classList.add(obstacleClass)
      }
    }
    
  }

  createGrid()
  


  // * Start game

  function startGame(){
    
    removeFroggy(currentPosition)
    addFroggy(startPosition)
    // restartCurrent()
    addCollider(colliderStart)


    console.log('startPosition --->', startPosition)
    console.log('currentPosition --->', currentPosition)
  }

  startGame()



  // * Movement function

  function handleKeyDown(event){
    const key = event.keyCode
    console.log(event.keyCode)
    const left = 37
    const right = 39
    const up = 38
    const down = 40

    // Remove froggy current position - removes any existing froggies
    removeFroggy(currentPosition)

    // Control flow for movement based on key direction
    if (key === left && (currentPosition % width !== 0) && (obstaclePosition.includes(currentPosition - 1) === false)){
      console.log('MOVE LEFT')
      currentPosition-- // position minus 1 grid box
    } else if (key === right && (currentPosition % width !== (width - 1)) && (obstaclePosition.includes(currentPosition + 1) === false)){
      console.log('MOVE RIGHT')
      currentPosition++ // position plus 1 grid box
    } else if (key === up && (currentPosition >= width) && (obstaclePosition.includes(currentPosition - width) === false)){
      console.log('MOVE UP')
      currentPosition -= width // position minus entire width = grid box above
    } else if (key === down && (currentPosition + width <= cellCount - 1) && (obstaclePosition.includes(currentPosition + width) === false)){
      console.log('MOVE DOWN')
      currentPosition += width
    } else {
      console.log('INVALID KEY')
    }

    // Add froggy to new position + adds collision detection (one collider)
    addFroggy(currentPosition)
    collisionDetection()
  }



  // * Collision detection

  function collisionDetection(){
    if (currentPosition === colliderStart){
      removeFroggy(currentPosition)
      showPopUp()
      console.log('BANG!')
      console.log('collisionPopup--->', collisionPopup)
    } else {
      console.log('YOURE OK!')
    }

  }

  function showPopUp(){
    // disable character!!
    collisionPopup.style.display = 'block'
    collisionOverlay.style.display = 'block'
  }

  function hidePopUp(){
    collisionPopup.style.display = 'none'
    collisionOverlay.style.display = 'none'
    removeFroggy(currentPosition)
    startGame()
  }
  


  // ? Events

  // * Key press
  document.addEventListener('keydown', handleKeyDown)

  // * Close Collision Pop up
  collisionButton.addEventListener('click', hidePopUp)

}

window.addEventListener('DOMContentLoaded', init)