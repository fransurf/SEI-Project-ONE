function init() {



  window.addEventListener('load', showOpeningPopUp)
  
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

  // * Set up grid creation
  function createGrid(){
    for (let i = 0; i < cellCount; i++){
      const cell = document.createElement('div')
      // cell.innerText = i
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

      console.log('cell.id', i, cell.id, cell.className)
    }
    
  }

  createGrid()
  
  
  // * Character set up
  // Froggy1 appear
  // In the end 3 froggy classes that deploy at different points
  const froggyClass = 'froggy'
  const startPosition = 104
  let currentPosition = startPosition
  const occupiedClass = 'occupied'
  const froggy2Start = 104
  // const froggy3Start = 107

  // * Add froggy
  function addFroggy(position){
    cells[position].classList.add(froggyClass)
  }
  
  // * Remove froggy
  function removeFroggy(position){
    cells[position].classList.remove(froggyClass)
  }
  
  // * Froggy Home
  // adds occupied class when froggy arrives to home cell
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


  // * Collider set up
  // Colliders variables
  const colliderClass = 'collider'
  const colliderStart = [32, 65, 98] 
  const collider2Class = 'collider2'
  const collider2Start = [66, 33]
  const collider3Class = 'collider3'
  const collider3Start = [21, 87]

  // * Add colliders
  // iterates through colliderStart array to add collider class to start positions
  function addColliders(){
    colliderStart.forEach((i) => {
      cells[i].classList.add(colliderClass)
      // console.log('cells[i].id', cells[i].id)
    })
    collider2Start.forEach((i) => {
      cells[i].classList.add(collider2Class)
    })
    collider3Start.forEach((i) => {
      cells[i].classList.add(collider3Class)
    })
  }


  function removeColliders(){
    cells.forEach((i, key) => {
      console.log('REMOVE colliderClass, collider2Class, collider3Class', colliderClass, collider2Class, collider3Class)
      console.log('removeColliders', removeColliders)
      cells[key].classList.remove(colliderClass, collider2Class, collider3Class) 
    })
  }


  // * Grab popups
  const openingPopup = document.querySelector('#opening-popup')
  const collisionPopup = document.querySelector('#bang-popup')
  const winPopup = document.querySelector('#win-popup')
  const openingOverlay = document.querySelector('#opening-overlay')
  const collisionOverlay = document.querySelector('#bang-overlay')
  const closeButton = document.querySelectorAll('.close-btn')


  // * Audio/sound effects
  // const openingMusic = new Audio('scripts/PaperTrails.mp3')
  const homeAudio = new Audio('scripts/EnterGame.mp3')
  const gameMusic = new Audio('scripts/DiscoInfiltrator.mp3')
  const collisionAudio = new Audio('scripts/Smash.mp3')
  const loseMusic = new Audio('scripts/SillyGamesCrop.mp3')
  const winAudio = new Audio('scripts/Cheering.mp3')



  // ? Executions


  // * Start game

  function startGame(){

    removeFroggy(currentPosition)
    // removeFroggy(homePosition[]) // doesn't work - either wrong position or wrong syntax with empty array
    addFroggy(startPosition)
    currentPosition = startPosition

    removeColliders()
    addColliders()
    startColliders()
    startColliders2()
    startColliders3()
    froggySafe()

    // gameMusic.play()
    
    console.log('startPosition --->', startPosition)
    console.log('currentPosition --->', currentPosition)
  }



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
    const addCollider = (position) => { 
      cells[position].classList.add(colliderClass) 
    }
    const removeCollider = (position) => { 
      cells[position].classList.remove(colliderClass) 
    }
    

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
    let colliderCurrent = (collider2Start[0])
    let collider2Position = collider2Start.slice(0)
    const addCollider = (position) => { 
      cells[position].classList.add(collider2Class) 
    }
    const removeCollider = (position) => { 
      cells[position].classList.remove(collider2Class) 
    }

    // Moving colliders based on a timed loop
    const moveCollider2 = setInterval(() => {
      colliders2.forEach((collider, key) => {
        // if statement tracking updating array (colliderPosition) for every loop except for the first one (& every loop that returns to startPosition)
        if (collider2Start[key] === collider2Position[key]){
          colliderCurrent = (collider2Start[key])
        } else {
          colliderCurrent = (collider2Position[key])
        }

        // Remove previous collider in order to update next position
        removeCollider(colliderCurrent)

        // If collider is not at far-left of board, then increase position (re-add collider)
        // follow updating array (colliderPosition) 
        if (colliderCurrent % width !== (width - 1)){
          colliderCurrent++
          collider2Position[key] = colliderCurrent
          addCollider(colliderCurrent)
          // console.log('colliderPosition --->', colliderPosition)

        } else {
        // Otherwise collider starts again at far-right
        // use colliderStart array
          colliderCurrent = (collider2Start[key])
          collider2Position[key] = collider2Start[key]
          addCollider(colliderCurrent)

        }
        // Detect collision
        collisionDetection(colliderCurrent)

      })
    }, 100)
    
  }

  function startColliders3(){
    // Creating an array of the coliders in order to be able to loop through each using forEach (below)
    // Setting the current position to equal the start position & a new array that will be updated through the loops
    const colliders3 = document.querySelectorAll('.collider3')
    let colliderCurrent = (collider3Start[0])
    let collider3Position = collider3Start.slice(0)
    const addCollider = (position) => { 
      cells[position].classList.add(collider3Class) 
    }
    const removeCollider = (position) => { 
      cells[position].classList.remove(collider3Class) 
    }

    // Moving colliders based on a timed loop
    moveCollider3 = setInterval(() => {
      colliders3.forEach((collider, key) => {
        // if statement tracking updating array (colliderPosition) for every loop except for the first one (& every loop that returns to startPosition)
        if (collider3Start[key] === collider3Position[key]){
          colliderCurrent = (collider3Start[key])
        } else {
          colliderCurrent = (collider3Position[key])
        }

        // Remove previous collider in order to update next position
        removeCollider(colliderCurrent)

        // If collider is not at far-left of board, then increase position (re-add collider)
        // follow updating array (colliderPosition) 
        if (colliderCurrent % width !== 0){
          colliderCurrent--
          collider3Position[key] = colliderCurrent
          addCollider(colliderCurrent)

        } else {
        // Otherwise collider starts again at far-right
        // use colliderStart array
          colliderCurrent = (collider3Start[key])
          collider3Position[key] = collider3Start[key]
          addCollider(colliderCurrent)

        }
        // Detect collision
        collisionDetection(colliderCurrent)

      })
    }, 500)
  
  }



  // let moveCollider3 = setInterval(startColliders3, 500)

  // function startColliders3(){
  //   const colliders3 = document.querySelectorAll('.collider3')
  //   let collider3Current = (collider3Start[0])
  //   let collider3Position = collider3Start.slice(0)

  //   colliders3.forEach((collider, key) => {

  //     // if statement tracking updating array (colliderPosition) for every loop except for the first one (& every loop that returns to startPosition)
  //     if (collider3Start[key] === collider3Position[key]){
  //       collider3Current = (collider3Start[key])
  //     } else {
  //       collider3Current = (collider3Position[key])
  //     }

  //     // Remove previous collider in order to update next position
  //     removeCollider3(collider3Current)

  //     // If collider is not at far-left of board, then increase position (re-add collider)
  //     // follow updating array (colliderPosition) 
  //     if (collider3Current % width !== 0){
  //       collider3Current--
  //       collider3Position[key] = collider3Current
  //       addCollider3(collider3Current)

  //     } else {
  //     // Otherwise collider starts again at far-right
  //     // use colliderStart array
  //       collider3Current = (collider3Start[key])
  //       collider3Position[key] = collider3Start[key]
  //       addCollider3(collider3Current)

  //     }
  //     // Detect collision
  //     collisionDetection(collider3Current)

  //   })
  // }

  // function stopColliders3(){
  //   clearInterval(moveCollider3)
  //   moveCollider3 = null

  // }

// * put these back in Collision Detection
  //collider2Current, collider3Current
  // || currentPosition === collider2Current || currentPosition === collider3Current

  // * Collision detection
  function collisionDetection(colliderCurrent){
    if (currentPosition === colliderCurrent){
      gameMusic.pause()
      collisionAudio.play()
      bangPopUp()
      console.log('BANG!')
      // console.log('collider3Current --->', collider3Current)
      removeFroggy(currentPosition)
      // Stop player moving underneath overlay
      // clearInterval(moveCollider)
      // clearInterval(moveCollider2)
      // // clearInterval(moveCollider3)
      // stopColliders3()
    } 

  }

  // * Popup functions

  function showOpeningPopUp(){
    openingPopup.style.display = 'block'
    openingOverlay.style.display = 'block'
    // openingMusic.play()
  }

  function bangPopUp(){
    // disable character!!
    loseMusic.play()
    collisionPopup.style.display = 'block'
    collisionOverlay.style.display = 'block'
    
  }

  function showWinPopUp(){
    // disable character!!
    winPopup.style.display = 'block'
    collisionOverlay.style.display = 'block'
    removeColliders()
    
  }

  function hidePopUp(){
    openingPopup.style.display = 'none'
    collisionPopup.style.display = 'none'
    winPopup.style.display = 'none'
    openingOverlay.style.display = 'none'
    collisionOverlay.style.display = 'none'
    // removeFroggy(currentPosition)
    // Clear froggies from home
    loseMusic.pause()
    clearOccupied()
    // removeColliders()
    // console.log('removeColliders()', removeColliders)
    startGame()
  }



  // * Froggy gets Home
  function froggySafe(){
    if (homePosition.includes(currentPosition)){
      homeAudio.play()
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
      gameMusic.pause()
      winAudio.play()
      // * WHY ISNT THIS REMOVING COLLIDERS HERE???????

      removeFroggy(froggy2Start)
      showWinPopUp()
    }

  }


  // ? Events

  // * Opening popup on window load
  window.addEventListener('load', showOpeningPopUp)

  // * Key press
  document.addEventListener('keydown', handleKeyDown)

  // * Close Pop ups
  closeButton.forEach(btn => btn.addEventListener('click', hidePopUp))
  // animalButtons.forEach(btn => btn.addEventListener('click', handleMultiClick))

}

window.addEventListener('DOMContentLoaded', init)