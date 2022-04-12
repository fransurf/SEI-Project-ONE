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
  const obstaclePosition = [45, 46, 49, 52, 53]
  

  // * Character set up
  // Froggy1 appear
  // In the end 3 froggy classes that deploy at different points
  const froggyClass = 'froggy'
  const startPosition = 104
  let currentPosition = startPosition
  const occupiedClass = 'occupied'
  const froggy2Start = 104
  // const froggy3Start = 107


  // * Collider set up
  // Colldier1 appear
  const colliderClass = 'collider'
  // const colliderStart = 98
  const colliderStart = [32, 65, 98]
  let colliderCurrent = colliderStart


  const collisionPopup = document.querySelector('#bang-popup')
  const collisionOverlay = document.querySelector('#bang-overlay')
  const closeButton = document.querySelectorAll('.close-btn')

  console.log('closeButton -->', closeButton)

  // * Win screen
  const winPopup = document.querySelector('#win-popup')


  // ? Executions

  // * Set up grid creation
  
  function createGrid(){
    for (let i = 0; i < cellCount; i++){
      const cell = document.createElement('div')
      cell.innerText = i
      cell.id = i
      grid.appendChild(cell)
      cells.push(cell)
      
      // Set up Home spaces
      if (homePosition.includes(i)) {
        cells[i].classList.add(homeClass)
      }

      // Set up Obstacles
      if (obstaclePosition.includes(i)) {
        cells[i].classList.add(obstacleClass)
      }
    }
    
  }

  createGrid()
  


  // * Add froggy1
  function addFroggy(position){
    cells[position].classList.add(froggyClass)
  }

  // * Remove froggy1
  function removeFroggy(position){
    cells[position].classList.remove(froggyClass)
  }

  // * Froggy Home
  function addOccupied(position){
    cells[position].classList.add(occupiedClass)
  }


  // * Removes occupied class on Home stations once game is restarted
  // iterates through the homePosition array to remove added classes
  function clearOccupied(){
    homePosition.forEach((i) => {
      cells[i].classList.remove(occupiedClass, froggyClass)
    })
  }

  // * Add collider
  function addCollider(position){
    cells[position].classList.add(colliderClass)
  }

  function removeCollider(position){
    cells[position].classList.remove(colliderClass)
  }

  // iterates through colliderStart array to add collider class to start positions
  function addColliders(){
    colliderStart.forEach((i) => {
      cells[i].classList.add(colliderClass)
    })
  }

  function removeColliders(){
    cells.forEach((i, key) => {
      cells[key].classList.remove(colliderClass)
    })
  }



  // * Start game

  function startGame(){

    removeFroggy(currentPosition)
    // removeFroggy(homePosition[]) // doesn't work - either wrong position or wrong syntax with empty array
    addFroggy(startPosition)
    currentPosition = startPosition
    // addCollider(colliderStart)
    // startCollider()

    addColliders()
    startColliders()
    colliderCurrent = colliderStart
    froggySafe()
    

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
      // restrict movement into occupied cells with [&& (cells[homePosition[]].classList.contains('occupied') === false)??]
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
    console.log(currentPosition)
    collisionDetection() // recognises when player bangs into collider
    froggySafe() // froggy gets safely home - release new froggy

    win()
  }


  // * Colliders moving across screen


  function startColliders(){
    // Creating an array of the coliders in order to be able to loop through each using forEach (below)
    // Setting the current position to equal the start position & a new array that will be updated through the loops
    const colliders = document.querySelectorAll('.collider')
    let colliderCurrent = (colliderStart[0])
    let colliderPosition = colliderStart.slice(0)

    // Moving colliders based on a timed loop
    moveCollider = setInterval(() => {
      colliders.forEach((collider, key) => {
        // if statement tracking updating array (colliderPosition) for every loop except for the first one (& every loop that returns to startPosition)
        if (colliderStart[key] === colliderPosition[key]){
          colliderCurrent = (colliderStart[key])
        } else {
          colliderCurrent = (colliderPosition[key])
        }

        // Remove previous collider in order to update next position
        removeCollider(colliderCurrent)

        // If collider is at far-left of board, then decrement position (re-add collider)
        // follow updating array (colliderPosition) 
        if (colliderCurrent % width !== 0){
          colliderCurrent--
          colliderPosition[key] = colliderCurrent
          addCollider(colliderCurrent)
          // console.log('colliderPosition --->', colliderPosition)

        } else {
        // Otherwise collider starts again at far-right
        // use colliderStart array
          colliderCurrent = (colliderStart[key])
          colliderPosition[key] = colliderStart[key]
          addCollider(colliderCurrent)
          
          // console.log('RESTART LOOP')
        }
        // Detect collision
        collisionDetection(colliderCurrent)

      })
    }, 100)
    
  }



  // * Collision detection

  function collisionDetection(colliderCurrent){
    if (currentPosition === colliderCurrent){

      bangPopUp()
      console.log('BANG!')
      console.log('collisionPopup--->', collisionPopup)
      console.log('currentPosition --->', currentPosition)
      console.log('colliderCurrent --->', colliderCurrent)
      removeFroggy(currentPosition)
      // Stop player moving underneath overlay
      clearInterval(moveCollider)
      
      
    } else {
      console.log('YOURE OK!')
    }

  }

  function bangPopUp(){
    // disable character!!
    collisionPopup.style.display = 'block'
    collisionOverlay.style.display = 'block'
    
  }

  function showWinPopup(){
    // disable character!!
    winPopup.style.display = 'block'
    collisionOverlay.style.display = 'block'
    
  }

  function hidePopUp(){
    collisionPopup.style.display = 'none'
    winPopup.style.display = 'none'
    collisionOverlay.style.display = 'none'
    // removeFroggy(currentPosition)
    // Clear froggies from home
    clearOccupied()
    removeColliders()
    startGame()
  }



  // * Froggy gets Home
  function froggySafe(){
    if (homePosition.includes(currentPosition)){
      const froggyHomeIndex = homePosition.indexOf(currentPosition)
      // adds class of froggyHome to homePosition
      addOccupied(homePosition[froggyHomeIndex])
      console.log('homePosition.indexOf(currentPosition) -->', homePosition.indexOf(currentPosition))
      console.log('RELEASE THE HOUNDS!!!')
      // releases new froggy
      addFroggy(froggy2Start)
      // froggy2Start.id = 2
      currentPosition = froggy2Start
    }

  }

  

  // * Win function
  function win(){
    // console.log('cells[homePosition[0]].classList', cells[homePosition[0]].classList)
    // console.log('cells[homePosition].classList', cells[homePosition].classList)
    if (cells[homePosition[0]].classList.contains('occupied') && cells[homePosition[1]].classList.contains('occupied') && cells[homePosition[2]].classList.contains('occupied')){
      console.log('YOU WIN!!! CRACK OUT THE CHAMPERS!!')
      showWinPopup()
    }
  }



  // ? Events

  // * Key press
  document.addEventListener('keydown', handleKeyDown)

  // * Close Collision Pop up
  closeButton.forEach(btn => btn.addEventListener('click', hidePopUp))
  // animalButtons.forEach(btn => btn.addEventListener('click', handleMultiClick))

}

window.addEventListener('DOMContentLoaded', init)