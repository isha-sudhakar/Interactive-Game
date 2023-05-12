const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'Welcome... This is an interactive adventure where the first choice you make in this game will determine what journey you will take. Choose carefully and proceed.',
    options: [
      {
        text: 'Proceed',
        //setState: { blueGoo: true },
        nextText: 2
      },
      /*{
        text: 'Leave the goo',
        nextText: 2
      } */
    ]
  },
  {
    id: 2,
    text: 'You find yourself in the middle of a forest in the dead of the night. In front of you are two pathways: One is littered by a dense array of trees and seems to lead even deeper into the forest while the other pathway is marked by instructions, unprofessionally set up and barely legible, that promise you a way to an occupied campsite. Which way are you going?',
    options: [
      {
        text: ' Go deeper into the forest',
       // requiredState: (currentState) => currentState.blueGoo,
       // setState: { blueGoo: false, sword: true },
        nextText: 3
      },
      {
        text: 'Follow the Instructions',
        //requiredState: (currentState) => currentState.blueGoo,
        //setState: { blueGoo: false, shield: true },
        nextText: 4
      },
      {
        text: 'Try and trace your way back to the entrance of the forest ',
        nextText: 5
      }
    ]
  },
  {
    id: 3,
    text: 'You decide to go deeper into the forest. You end up walking for what feels like an eternity. Your feet grow tired and your mind starts playing games with you. All of a sudden a man emerged from the woods.',
    options: [
      {
        text: 'Tell him about your situation and ask him for help',
        nextText: 4
      },
      {
        text: 'Walk passed him and avoid him',
        nextText: 5
      }
    ]
  },
  {
    id: 4,
    text: 'You are so tired that you fall asleep while exploring the castle and are killed by some terrible monster in your sleep.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'Without any money to buy a room you break into the nearest inn and fall asleep. After a few hours of sleep the owner of the inn finds you and has the town guard lock you in a cell.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'You wake up well rested and full of energy ready to explore the nearby castle.',
    options: [
      {
        text: 'Explore the castle',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'While exploring the castle you come across a horrible monster in your path.',
    options: [
      {
        text: 'Try to run',
        nextText: 8
      },
      {
        text: 'Attack it with your sword',
        requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        text: 'Hide behind your shield',
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
      {
        text: 'Throw the blue goo at it',
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Your attempts to run are in vain and the monster easily catches.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'You foolishly thought this monster could be slain with a single sword.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'The monster laughed as you hid behind your shield and ate you.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'You threw your jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed. Seeing your victory you decide to claim this castle as your and live out the rest of your days there.',
    options: [
      {
        text: 'Congratulations. Play Again.',
        nextText: -1
      }
    ]
  }
]

startGame()
