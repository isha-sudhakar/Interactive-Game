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
    text: 'Welcome... This is an interactive adventure where the first choice you make will determine what journey you will take. Choose carefully.',
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
    text: 'You find yourself in the middle of a forest at night. In front of you are two pathways: One is littered by a dense array of trees and seems to lead even deeper into the forest while the other pathway is marked by instructions, unprofessionally set up and barely legible, that promise you a way to an occupied campsite. Which way are you going?',
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
    text: 'You decide to go deeper into the forest. You end up walking for what feels like an eternity. Your feet grow tired and your mind starts playing games with you. All of the sudden a black cat emerges from the woods.',
    options: [
      {
        text: 'Tell him about your situation and ask him for help',
        nextText: 6
      },
      {
        text: 'Offer him food',
        nextText: 7
      }
    ]
  },
  {
    id: 6,
    text: "Cats cannot talk. You're met with awkward silence as he walks passed you.",
    options: [
      {
        text: 'Follow the Cat',
        nextText: 8
      },
      
      {
        text: "Pspsps at him",
        nextText: 9
      }
    ]
  },
  {
    id: 8,
    text: 'You follow the cat and find yourself in front of an aged cabin',
    options: [
      {
        text: 'Go inside the cabin',
        nextText: 10
      },
      {
        text: "Go back",
        nextText: 11
      }
      
    
    ]
  },
  {
    id: 9,
    text: "You fail to get the cat's attenion. As you try to get the cat to come back to you, you become distracted from the presence that is slowly approaching you. The last thing you feel before blacking out is a hand on your shoulder",
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 7,
    text: 'You do not have food on you. The cat becomes uninterested and leaves ',
    options: [
      {
        text: '',
        nextText: -1
      },

      {
        //text: 'Attack it with your sword',
        //requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        //text: 'Hide behind your shield',
        //requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
     
      {
        //text: 'Throw the blue goo at it',
        //requiredState: (currentState) => currentState.blueGoo,
        nextText: 11
      }
    ]
  },
  {
    id: 10,
    text: "You enter the cabin. The door behind you shuts close. You notice the cabin's worn down appearance. Despite the premise clearly being abandoned, quite a few possessions have been left behind. With the limited carrying space that you have, you decide to arm yourself with one of the things that are lying around.",
    options: [
      {
        text: 'Hammer',
        nextText: 12
      },
      {
        text: "Heavy Duty Torch",
        nextText: 13
      },

      {
        text: "Swiss Army Knife",
        nextText: 14
      },
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
    id: 12,
    text: '',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'You attempt to go back but keep finding yourself cooming back to the cabin. No matter which direction you take, you end up walking in a circle.',
    options: [
      {
        text: 'Keep trying to walk back',
        nextText: 12
      }, 
      {
        text: 'Go inside the cabin', 
        nextSlide: 10
      }
    ]
  },
  {
    id: 12,
    text: "You feel yourself becoming abnormally more tired as you keep walking in a circle before finally passing out from exhaustion. Before you lose conciousness, you see a woman stand in front of you.",
    options: [
      {
        text: "Restart",
        nextText: -1
      }
    ]
  }
]

startGame()
