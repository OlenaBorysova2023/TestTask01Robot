const elements = {};
const canvasSizePx = 200;
let form,
    size,
    cX,
    cY;

init();

function init() {
  getFormElements();
}

function createLayout(event) {
  event.preventDefault();

  hidePreviousResult();
  getFormData();

  if (!validateLayoutInput()) {
    return false;
  };

  setRobotLayoutVariables();
  renderRobotLayout();
  showRobotLayout();
}

function getFormElements(){
  elements.form = document.getElementById('form');
  elements.size = document.getElementById('size');
  elements.cX = document.getElementById('cX');
  elements.cY = document.getElementById('cY');
  elements.errorContainer = document.getElementById('setupErrorMessage');
  elements.robotLayout = document.getElementById('robotLayout');
  elements.canvas = document.getElementById('canvas');
}

function getFormData(){
  form = elements.form.value;
  size = parseInt(elements.size.value);
  cX = parseInt(elements.cX.value);
  cY = parseInt(elements.cY.value);
}

function validateLayoutInput(){
  return validateSize() && validateC(cX, 'cX') && validateC(cY, 'cY') && validateCXY([cX,cY]);
};

function validateSize() {
  if (size > 0) return true;

  showLayoutError('size');
  return false;
}

function validateC(value, field) {
  const coordMax = form === 'square' ? size : size/2;
  const coordMin = form === 'square' ? 0 : - size/2;

  if (value <= coordMax && value >= coordMin) return true;

  showLayoutError(field);
  return false;
}

function validateCXY([x,y]) {
  if (form === 'square' || Math.pow(x,2) + Math.pow(y,2) <= Math.pow(size/2, 2)) return true;

  showCoordinateError();

  return false;
}

function showLayoutError(field) {
  elements[field].classList.add(classError);
  elements.errorContainer.innerText = `Please correct ${field} value`;
}

function showCoordinateError() {
  elements['cX'].classList.add(classError);
  elements['cY'].classList.add(classError);
  elements.errorContainer.innerText = errorMessages.wrongcoordinates;
}

function hidePreviousResult() {
  elements['size'].classList.remove(classError);
  elements['cX'].classList.remove(classError);
  elements['cY'].classList.remove(classError);
  elements['errorContainer'].innerText = '';
  elements.robotLayout.style.display = 'none';
}

function renderRobotLayout() {
  elements.canvas.style.borderRadius = form === 'circle' ?
    canvasSizePx / 2 + 'px' : 0;

  elements.canvas.style.backgroundSize = `${cellSize}px ${cellSize}px, ${cellSize}px ${cellSize}px`;

  updateCanvas();
}

function showRobotLayout() {
  clearPreviousResult();
  elements.robotLayout.style.display = 'flex';
}

function setRobotLayoutVariables() {
  canvasSize = size;
  coordinates = [cX, cY];
  cellSize = canvasSizePx / canvasSize;
  direction.current = 'N';
}
