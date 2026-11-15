import { tokenize } from '../lib/tokenize.mjs';

const getMethod = () => {
  for(const input of document.querySelectorAll('input[type="radio"]'))
    if(input.checked) return input.value;
};

const submit = () => {
  const input = document.getElementById('textinput').value;
  const method = getMethod();
  const res = tokenize(input,method);
  document.getElementById('results').innerHTML = res.map(r => `<div>${r}</div>`).join('');
};

document.getElementById('tokenizesubmit').addEventListener('click',submit);
