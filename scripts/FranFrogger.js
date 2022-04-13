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
  // Collider1 appear
  const colliderClass = 'collider'
  const colliderStart = [32, 65, 98]
  // console.log('colliderStart.id', colliderStart.id)

  // Collider2 appear
  const collider2Class = 'collider2'
  const collider2Start = [66, 33]

  // Collision popup elements
  const collisionPopup = document.querySelector('#bang-popup')
  const collisionOverlay = document.querySelector('#bang-overlay')
  const closeButton = document.querySelectorAll('.close-btn')



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
        // const homeDiv = document.createElement('div')
        // homeDiv.className = homeClass
        // cells[i].document.createElement('div').classList.add(homeClass)
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

  // * Add/Remove colliders
  function addCollider(position){
    cells[position].classList.add(colliderClass)
  }

  function removeCollider(position){
    cells[position].classList.remove(colliderClass)
  }

  function addCollider2(position){
    cells[position].classList.add(collider2Class)
  }

  function removeCollider2(position){
    cells[position].classList.remove(collider2Class)
  }

  // iterates through colliderStart array to add collider class to start positions
  function addColliders(){
    colliderStart.forEach((i) => {
      cells[i].classList.add(colliderClass)
      console.log('cells[i].id', cells[i].id)
    })
  }

  // Just changed this to console.log it - find out whether collider2Class is being removed
  function removeColliders(){
    cells.forEach((i, key) => {
      console.log('colliderClass, collider2Class', colliderClass, collider2Class)
      cells[key].classList.remove(colliderClass, collider2Class) //, collider2Class
    })
  }

  function addColliders2(){
    collider2Start.forEach((i) => {
      cells[i].classList.add(collider2Class)
    })
  }



  // * Start game

  function startGame(){

    removeFroggy(currentPosition)
    // removeFroggy(homePosition[]) // doesn't work - either wrong position or wrong syntax with empty array
    addFroggy(startPosition)
    currentPosition = startPosition

    addColliders()
    addColliders2()
    // startColliders()
    // startColliders2()
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

        // console.log('colliderStart --->', colliderStart)
        console.log('colliderCurrent --->', colliderCurrent)
        console.log('colliderPosition --->', colliderPosition)

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
    }, 150)
    
  }

  function startColliders2(){
    // Creating an array of the coliders in order to be able to loop through each using forEach (below)
    // Setting the current position to equal the start position & a new array that will be updated through the loops
    const colliders2 = document.querySelectorAll('.collider2')
    let collider2Current = (collider2Start[0])
    let collider2Position = collider2Start.slice(0)


    // Moving colliders based on a timed loop
    moveCollider2 = setInterval(() => {
      colliders2.forEach((collider, key) => {
        // if statement tracking updating array (colliderPosition) for every loop except for the first one (& every loop that returns to startPosition)
        if (collider2Start[key] === collider2Position[key]){
          collider2Current = (collider2Start[key])
        } else {
          collider2Current = (collider2Position[key])
        }


    console.log('collider2Start --->', collider2Start)
    console.log('collider2Current start --->', collider2Current)
    console.log('collider2Position start --->', collider2Position)

        // Remove previous collider in order to update next position
        removeCollider2(collider2Current)

        // If collider is not at far-left of board, then increase position (re-add collider)
        // follow updating array (colliderPosition) 
        if (collider2Current % width !== (width - 1)){
          collider2Current++
          collider2Position[key] = collider2Current
          addCollider2(collider2Current)
          // console.log('colliderPosition --->', colliderPosition)

        } else {
        // Otherwise collider starts again at far-right
        // use colliderStart array
          collider2Current = (collider2Start[key])
          collider2Position[key] = collider2Start[key]
          addCollider2(collider2Current)
          

          console.log('collider2Current end --->', collider2Current)
          console.log('collider2Position end --->', collider2Position)
          // console.log('RESTART LOOP')
        }
        // Detect collision
        collisionDetection(collider2Current)

      })
    }, 100)
    
  }



  // * Collision detection
  // Update this for collider2
  function collisionDetection(colliderCurrent, collider2Current){
    if (currentPosition === colliderCurrent || currentPosition === collider2Current){

      bangPopUp()
      console.log('BANG!')
      console.log('collisionPopup--->', collisionPopup)
      console.log('currentPosition --->', currentPosition)
      console.log('colliderCurrent --->', colliderCurrent)
      console.log('collider2Current --->', collider2Current)
      removeFroggy(currentPosition)
      // Stop player moving underneath overlay
      clearInterval(moveCollider)
      clearInterval(moveCollider2)
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
    console.log('removeColliders()', removeColliders)
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
    // else if (cells[homePosition[0]].classList.contains('.froggy') && cells[homePosition[1]].classList.contains('.froggy') && cells[homePosition[2]].classList.contains('.froggy')){
    //   win()
    // }

  }

  

  // * Win function
  function win(){
    // console.log('cells[homePosition[0]].classList', cells[homePosition[0]].classList)
    // console.log('cells[homePosition].classList', cells[homePosition].classList)
    if (cells[homePosition[0]].classList.contains('occupied') && cells[homePosition[1]].classList.contains('occupied') && cells[homePosition[2]].classList.contains('occupied')){
      console.log('YOU WIN!!! CRACK OUT THE CHAMPERS!!')
      removeFroggy(froggy2Start)
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