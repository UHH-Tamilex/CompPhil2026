import { tokenize } from '../lib/tokenize.mjs';
import bpe from '../lib/bpe.mjs';

const getMethod = () => {
  for(const input of document.querySelectorAll('input[type="radio"]'))
    if(input.checked) return input.value;
};

const submit = () => {
  const input = document.getElementById('textinput').value;
  const iters = document.getElementById('bpe-iters').value;
  const method = getMethod();
  if(input.includes('፡')) {
    const words = input.split(/[፡።]/).map(i => i.trim());
    const res = words.map(w => tokenize(w,method));
    const res2 = bpe(res,iters)
    const out = res2.reduce((acc,word) => {
      return acc + word.map(t => `<div>${t}</div>`).join('') + '<div>፡</div>';
    },'');
    document.getElementById('results').innerHTML = out;
  }
  else {
    const res = tokenize(input,method);
    const res2 = bpe([res],iters);
    document.getElementById('results').innerHTML = res2[0].map(r => `<div>${r}</div>`).join('');
  }
};

const loadSamples = e => {
  const par = e.target.closest('.samplebox');
  if(!par) return;
  const box = document.getElementById('textinput');
  const existing = box.value.trim() !== '';
  if(existing && !window.confirm('Replace existing texts?')) return;
  box.value = par.querySelector('.sample').textContent; 
};

document.getElementById('samples').addEventListener('click',loadSamples);
document.getElementById('tokenizesubmit').addEventListener('click',submit);
