let canvasSize = 5;
let cellSize = 40;
let coordinates = [0,0];
const dotSize = 10;

const direction = {
  current: 'N',
  new: '',
  nextMove: {
    N: [0,-1],
    E: [1,0],
    S: [0,1],
    W: [-1,0]
  }
};
const commandList = {
  E: ['L','R','F'],
  S: ['V','H','G'],
  F: ['G','D','A']
};
const validationRegexp = {
  E: /[^LRF]/gi,
  S: /[^VHG]/gi,
  F: /[^GDA]/gi
};
const errorMessages = {
  empty: 'Command string is empty',
  wrongsymbols: 'Please use only allowed commands',
  wrongcoordinates: 'Coordinates are out of the grid. Please try again'
};
const elementsID = {
  languageDropDown: 'lang',
  inputField: 'command',
  robotDot: 'robot',
  resultContainer: 'resultContainer',
  resultOutput: 'result'
}
const classSuccess = 'success';
const classError = 'error';


function moveRobot(event) {
  let lang = document.getElementById(elementsID.languageDropDown).value;
  let command = document.getElementById(elementsID.inputField).value;

  event.preventDefault();
  clearPreviousResult();

  if (!validateRobotInput(lang, command)) {
    return false;
  }

  if (!applyCommand(lang, command)) {
    return false;
  };

  showResult();
}

function applyCommand(lang, command) {
  let delta = parseCommand(lang, command);
  let newCoordinates = [
    coordinates[0] + delta[0],
    coordinates[1] + delta[1]
  ];

  if (!validateCoordinates(newCoordinates)) {
    showError('wrongcoordinates');
    return false;
  }

  coordinates = newCoordinates;
  direction.current = direction.new;

  return true;
}

function validateCoordinates(coords) {
  if (form === 'square') {
    return coords[0] <= canvasSize
      && coords[0] >= 0
      && coords[1] <= canvasSize
      && coords[1] >= 0;
  }

  return Math.pow(coords[0],2) + Math.pow(coords[1],2) <= Math.pow(canvasSize/2, 2);

}

function parseCommand(lang, command) {
  let commandArray = Array.from(command.toUpperCase());
  let delta = [0,0];
  direction.new = direction.current;

  commandArray.forEach(element => {
    let commandCode = commandList[lang].indexOf(element);

    delta = updateCoordinatesAndDirection(commandCode, delta);
  });

  return delta;
}

function validateRobotInput(lang, command) {
  let result = !!command.length && !validationRegexp[lang].test(command);

  if (!result) {
    let errorCode = !!command.length ? 'wrongsymbols' : 'empty';
    showError(errorCode);
  }

  return result;
}

function updateCanvas() {
  let robot = document.getElementById(elementsID.robotDot);
  let deltaForRoundLayout = form === 'circle' ? canvasSizePx / 2 : 0;
  let robotIconDirectionDeg = 90 * Object.keys(direction.nextMove).indexOf(direction.current);

  robot.style.left = (deltaForRoundLayout + coordinates[0] * cellSize - dotSize/2) + 'px';
  robot.style.top = (deltaForRoundLayout + coordinates[1] * cellSize - dotSize/2) + 'px';
  robot.style.transform = `rotate(${robotIconDirectionDeg}deg)`;

}

function showResult() {
  let resultOutput = document.getElementById(elementsID.resultOutput);
  let resultString = `Position: ${coordinates[0]} ${coordinates[1]} ${direction.current}`;

  resultOutput.innerText = resultString;
  resultOutput.classList.add(classSuccess);
  resultOutput.style.display = 'block';

  updateCanvas();
}

function showError(errorCode) {
  let resultOutput = document.getElementById(elementsID.resultOutput);

  resultOutput.innerText = errorMessages[errorCode];
  resultOutput.classList.add(classError);
  resultOutput.style.display = 'block';
}

function clearPreviousResult() {
  let resultOutput = document.getElementById(elementsID.resultOutput);

  resultOutput.classList.remove(classError);
  resultOutput.classList.remove(classSuccess);
  resultOutput.style.display = 'none';
}

function updateCoordinatesAndDirection(commandCode, delta) {
  if (commandCode === 2) {
    delta[0] += direction.nextMove[direction.new][0];
    delta[1] += direction.nextMove[direction.new][1];
  } else {
    const directionsList = Object.keys(direction.nextMove);
    const newDirectionIndexDelta = commandCode === 0 ? -1 : 1;
    const currentDirectionIndex = directionsList.indexOf(direction.new);
    let newDirectionIndex = currentDirectionIndex + newDirectionIndexDelta;

    if (newDirectionIndex < 0 || newDirectionIndex > 3) {
      newDirectionIndex += 4 * (-newDirectionIndexDelta);
    }

    direction.new = directionsList[newDirectionIndex];
  }

  return delta;
}
