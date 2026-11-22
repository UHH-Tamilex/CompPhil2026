import { tokenize, detectScript, toewts, totib } from '../lib/tokenize.mjs';
import { filters as normFilters, filterAll, unfilterAll } from '../lib/normalize.mjs';
import { ngramswithindices } from '../lib/ngrams.mjs';
import transgeez from '../lib/geez.mjs';
import Sanscript from '../lib/sanscript.mjs';

const checkAll = e => {
  const details = e.target.parentNode.querySelector('details');
  if(!details) return;
  
  details.open = true;
  const kids = details.querySelectorAll('input');
  for(const kid of kids) {
    if(kid.dataset.default === 'off')
      continue;
    else
      kid.checked = e.target.checked;
  }
};

const checkFilterBox = e => {
  if(e.target.tagName !== 'INPUT') return;
  const par = e.target.closest('details');
  const parbox = par.parentNode.querySelector('input');
  let checked = null;
  let unchecked = null;
  for(const box of par.querySelectorAll('input')) {
    if(box.checked)
      checked = true;
    else unchecked = true;
    if(checked === true && unchecked === true) {
      parbox.indeterminate = true;
      return;
    }
  }
  if(checked) parbox.checked = true;
  else parbox.checked = false;
  parbox.indeterminate = false;
};

const makeOption = (index,obj) => {
  const div = document.createElement('div');
  const box = document.createElement('input');
  box.setAttribute('type','checkbox');
  box.id = `checkbox_${Date.now() + Math.random()}`;
  box.value = index;
  if(obj.hasOwnProperty('checked')) {
    if(obj.checked === true) box.setAttribute('checked',true);
    else box.dataset.default = 'off';
  }
  const label = document.createElement('label');
  label.setAttribute('for',box.id);
  if(obj.search && obj.replace)
    label.title = `Search: ${obj.search} Replace: ${obj.replace.toString()}`;
  label.append(obj.name);
  div.appendChild(box);
  div.appendChild(label);
  return div;
};

const populateFilters = par => {
  const normies = par.querySelector('#normalization');

  for(const checkbox of normies.querySelectorAll('input'))
    checkbox.addEventListener('click',checkAll);

  const langMap = new Map();
  for(const lang of ['tamil','sanskrit','pali','geez']) {
    const deets = normies.querySelector(`details.${lang}`);
    deets.addEventListener('click',checkFilterBox);
    langMap.set(lang, deets);
  }
  for(const [i, filter] of normFilters.entries()) {
    if(filter.group === 'general')
      normies.insertBefore(makeOption(i,filter),langMap.get('tamil').parentNode);
    else if(filter.group) {
      const deets = langMap.get(filter.group);
      if(deets) deets.appendChild(makeOption(i,filter));
      else normies.insertBefore(makeOption(i,filter),langMap.get('tamil').parentNode); // catch typos
    }
    else langMap.get('sanskrit').appendChild(makeOption(i,filter));
  }
};

const getMethod = () => {
  for(const input of document.querySelectorAll('input[type="radio"]'))
    if(input.checked) return input.value;
};

const getFilterIndices = norm => {
    const ret = [];
    const par = norm.querySelector('#normalization');
    for(const box of par.querySelectorAll('input:checked')) {
        const i = parseInt(box.value);
        if(isNaN(i)) continue;
        ret.push([i,box.nextElementSibling.textContent]);
    }
    ret.sort((a,b) => a[0] - b[0]);
    //return [ret.map(r => r[0]), ret.map(r => r[1])];
    return ret.reduce((acc,cur) => {
        acc[0].push(cur[0]);
        acc[1].push(cur[1]);
        return acc;
    },[[],[]]);
};

const shouldTransliterate = (filternames, method) => {
  if(['aksara','eluttu','char'].includes(method)) return true;
  for(const name of filternames) {
    if(!['ignore punctuation','remove spaces','ignore vowels'].includes(name))
      return true;
  }
  return false;
};

const addIndices = (is,ngramsize,iset) => {
  for(const i of is) {
    for(let n=0;n<ngramsize;n++) {
      iset.add(i + n);
    }
  }
};

const submit = () => {
  const inputs = [
    {box: document.getElementById('textinput1')},
    {box: document.getElementById('textinput2')}
  ];
  const ngramsize = document.getElementById('ngramsize').value;
  const method = getMethod();
  const [filterindices, filternames] = getFilterIndices(document);
  for(const input of inputs) {
    const orig = input.box.textContent.trim();
    if(shouldTransliterate(filternames, method)) {
      const script = detectScript(orig);
      if(script === 'geez') input.trans = transgeez(orig);
      else if(script === 'tibetan') {
        input.trans = Sanscript.t(toewts(orig),'wylie','wylish');
        input.scheme = 'wylish';
        input.script = 'tibetan';
      }
      else {
        input.trans = Sanscript.t(orig, script, 'slpish');
        input.scheme = 'slpish';
        input.script = script;
      }
    }
    const [filtered,filters] = filterAll(input.trans || orig, filterindices);
    const tokenized = tokenize(filtered,method,{removespaces: false, script: input.script});
    input.unfiltered = unfilterAll(tokenized, filters);
    if(input.scheme) 
      input.unfiltered = input.unfiltered.map(i => {
        if(input.scheme === 'wylish') {
          if(method === 'aksara') return totib(Sanscript.t(i,'wylish','wylie'));
          else return Sanscript.t(i,'wylish','wylie');
        }
        const iast = Sanscript.t(i,'slpish','iast');
        return input.script && method !== 'char' ? Sanscript.t(iast,'iast',input.script) : iast;
      });
    input.ngrams = ngramswithindices(tokenized, ngramsize);
  }
  inputs[0].highlight = new Set();
  inputs[1].highlight = new Set();
  for(const gram of inputs[0].ngrams.keys()) {
    if(inputs[1].ngrams.has(gram)) {
      const indices1 = inputs[0].ngrams.get(gram).indices;
      addIndices(indices1,ngramsize,inputs[0].highlight); 
      const indices2 = inputs[1].ngrams.get(gram).indices;
      addIndices(indices2,ngramsize,inputs[1].highlight); 
    }
  }
  for(const input of inputs) {
    let html = '';
    for(let n=0;n < input.unfiltered.length; n++) {
      if(input.highlight.has(n))
        html = html + `<span class="highlight">${input.unfiltered[n]}</span>`;
      else
        html = html + input.unfiltered[n];
    }
    input.box.innerHTML = html;
  }
};

const removeHighlights = () => {
  for(const span of document.querySelectorAll('.inputbox span.highlight')) {
    while(span.firstChild)
      span.after(span.firstChild);
    span.remove();
  }
};

const loadSamples = e => {
  const par = e.target.closest('.samplebox');
  if(!par) return;
  const boxen = [...document.querySelectorAll('.inputbox')];
  const existing = boxen[0].textContent.trim() !== '' || boxen[1].textContent.trim() !== '';
  if(existing && !window.confirm('Replace existing texts?')) return;
  boxen[0].textContent = par.querySelector('.sample1').textContent; 
  boxen[1].textContent = par.querySelector('.sample2').textContent; 
};

document.getElementById('samples').addEventListener('click',loadSamples);
document.getElementById('comparesubmit').addEventListener('click',submit);
for(const input of document.querySelectorAll('.inputbox'))
  input.addEventListener('input',removeHighlights);
populateFilters(document);
