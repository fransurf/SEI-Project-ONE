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


  // // * Movement function

  // function handleKeyDown(event){
  //   // const key = event.keyCode
  //   console.log(event.keyCode)



  // }

  // handleKeyDown(key)


  // ? Events

  // * Key press
  // document.addEventListener('keydown', handleKeyDown)

  // * Grid creation
  createGrid()

}

window.addEventListener('DOMContentLoaded', init)