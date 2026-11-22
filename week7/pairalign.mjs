import { affineAlign, charConfig, arrConfig, simpleArrConfig } from './affine-align.mjs';
import { filters, filterAll, unfilterAll } from '../lib/normalize.mjs';
import { tokenize, detectScript, toewts, totib } from '../lib/tokenize.mjs';
import { aksaraSplit, charSplit, graphemeSplit, slpish, wylish } from '../lib/split.mjs';
import Sanscript from '../lib/sanscript.mjs';
import transgeez from '../lib/geez.mjs';
import JSONCrush from './JSONCrush.min.js';

const guessWylie = str => {
  if(/[zs]h/.test(str)) return true;
  if(/'i/.test(str)) return true;
  if(/ng(?!\S)/.test(str)) return true;
  if(/ngs(?!\S)/.test(str)) return true;
  if(/bc/.test(str)) return true;
  return false;
};

const shouldTransliterate = (filternames, method) => {
  if(['aksara','eluttu','char'].includes(method)) return true;
  for(const name of filternames) {
    if(!['ignore punctuation','remove spaces','ignore vowels'].includes(name))
      return true;
  }
  return false;
};

const align = () => {

    /*  
    const iasted = strs.map(s => {
        const script = detectScript(s);
        return Sanscript.t(s.toLowerCase(),script,'slpish');
    });
    */

  //const filtered = iasted.map(s => filterAll(s,fis));

  const tok = document.querySelector('input[name="tokenization"]:checked').value;

  const inputs = [...document.querySelectorAll('.input-box input')].map(b => { return {value: b.value.replaceAll(/\s+/g,' ')};});
  const mainscript = detectScript(inputs[0].value);

  const [filterindices, filternames] = getFilterIndices(document);

  for(const input of inputs) {
    const orig = input.value;
    if(shouldTransliterate(filternames, tok)) {
      const script = detectScript(orig);
      if(script === 'geez') input.trans = transgeez(orig);
      else if(script === 'tibetan') {
        input.trans = Sanscript.t(toewts(orig),'wylie','wylish');
        input.scheme = 'wylish';
        input.script = 'tibetan';
      }
      else if(guessWylie(orig)) { //TODO: hack to detect Wylie
        input.trans = Sanscript.t(orig,'wylie','wylish');
        input.scheme = 'wylish';
      }
      else {
        input.trans = Sanscript.t(orig, script, 'slpish');
        input.scheme = 'slpish';
        input.script = script;
      }
    }
    const [filtered,filters] = filterAll(input.trans || orig, filterindices);
    input.filters = filters;
    input.tokenized = tokenize(filtered,tok,{removespaces: false, script: input.script, scheme: input.scheme});
    /*
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
    */
  }

    const scores = getScores();
    const scoring = {
        match: scores.scores[0],
        mismatch: scores.scores[1],
        gap_open: scores.scores[2],
        gap_extend: scores.scores[3],
        recursive: scores.recursive[4]
    };
    const configfunc = tok === 'char' ? charConfig : 
        scores.recursive ? arrConfig : simpleArrConfig;
    const res = affineAlign(inputs[0].tokenized, inputs[1].tokenized,new configfunc(scoring), {alignment: true, matrix: true});
    const path = res.pop();
    const matrix = res.pop();
    const score = res.pop();
    const unfiltered = res.map((r,i) => {
        const u = unfilterAll(
            r.map(b => Array.isArray(b) ? b.join('') : b),
            inputs[i].filters
        );
        if(inputs[i].scheme) {
          const newu = u.map(uu => {
            if(inputs[i].scheme === 'wylish') {
              if(inputs[i].script ==='tibetan' && tok === 'aksara') return totib(Sanscript.t(uu,'wylish','wylie'));
              else return Sanscript.t(uu,'wylish','wylie');
            }
            const iast = Sanscript.t(uu,'slpish','iast');
            return inputs[i].script && tok !== 'char' ? Sanscript.t(iast,'iast',inputs[i].script) : iast;
          });
          return newu;
        }
        return u; 
    });

    const filteredseqs = res.map((f,i) => {
      const strs = f.map(b => {
        return Array.isArray(b) ? b.join('') : b;
        /*return mainscript !== 'iast' ? Sanscript.t(ret,'slpish',mainscript) : 
                                       Sanscript.t(ret,'slpish','iast'); */
        });
        if(inputs[i].scheme) {
          const values = strs.map(uu => {
            if(inputs[i].scheme === 'wylish')
              return Sanscript.t(uu,'wylish','wylie');
            return Sanscript.t(uu,'slpish','iast');
          });
          const display = strs.map(uu => {
            if(inputs[i].scheme === 'wylish') {
              if(tok === 'aksara') return totib(Sanscript.t(uu,'wylish','wylie'));
              else return Sanscript.t(uu,'wylish','wylie');
            }
            const iast = Sanscript.t(uu,'slpish','iast');
            return inputs[i].script && tok !== 'char' ? Sanscript.t(iast,'iast',inputs[i].script) : iast;
          });
          return {values: values, display: display};
        }
        return {values: strs}; 
    });

    const longest = Math.max(inputs[0].tokenized.length,inputs[1].tokenized.length);
    showResults(unfiltered,filteredseqs,score,score/longest);
    const tokenized = filteredseqs.map(i => (i.display || i.values).filter(s => s !== ''));
    showMatrix(tokenized,matrix,path);
    addQueryString([inputs[0].value, inputs[1].value]);
};
/*
const getFilterIndices = () => {
    const ret = [];
    const par = document.getElementById('normalization');
    for(const box of par.querySelectorAll('input:checked')) {
        const i = parseInt(box.value);
        if(isNaN(i)) continue;
        ret.push(i);
    }
    ret.sort((a,b) => a - b);
    return ret;
};
*/
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

const getScores = () => {
    const par = document.getElementById('scoring');
    const nums = [...document.querySelectorAll('#scoring input[type="number"]')].map(i => parseFloat(i.value));
    const recursive = par.querySelector('input[type="checkbox"]').checked;
    return {scores: nums, recursive: recursive};
};

const makeRuby = (base, anno) => {
    const ruby = document.createElement('ruby');
    const rt = document.createElement('rt');
    rt.append(anno);
    ruby.append(base);
    ruby.append(rt);
    return ruby;
};

const showResults = (arr,arr2,score,scaled) => {
    const scorebox = document.getElementById('score');
    scorebox.textContent = '';
    scorebox.append(`Score: ${score} (scaled: ${scaled})`);

    const body = document.getElementById('results').firstElementChild;
    body.innerHTML = '';
    const trs = [];
    for(const [n,seq] of arr.entries()) {
        const tr = document.createElement('tr');
        const seq2 = arr2[n];
        for(const [m,cell] of seq.entries()) {
            const td = document.createElement('td');
            const filtered = seq2.values[m];
            if(filtered.trim() !== cell.trim())
                td.append(makeRuby(cell,seq2.display ? seq2.display[m] : seq2.values[m]));
            else
                td.append(cell);
            td.dataset.normal = seq2.values[m];
            tr.appendChild(td);
        }
        trs.push(tr);
    }
    for(const [i,td0] of [...trs[0].childNodes].entries()) {
        const val0 = td0.dataset.normal || td0.textContent.trim(); 
        const td1 = trs[1].children[i];
        const val1 = td1.dataset.normal || td1.textContent.trim();
        if(val0 !== '' && val1 !== '' && val0 !== val1) {
            td0.style.background = 'lightgray';
            td1.style.background = 'lightgray';
        }
    }
    for(const tr of trs)
        body.appendChild(tr);
};

const showMatrix = (seqs,matrix,path) => {
    const table = document.getElementById('matrix');
    table.closest('details').style.display = 'unset';
    const body = table.firstElementChild;

    body.innerHTML = '';
    const firsttr = document.createElement('tr');
    firsttr.appendChild(document.createElement('td'));
    firsttr.appendChild(document.createElement('td'));
    for(const cell of seqs[1]) {
        const td = document.createElement('td');
        td.append(cell);
        firsttr.appendChild(td);
    }
    body.appendChild(firsttr);
    for(const [x,row] of matrix.entries()) {
        const tr = document.createElement('tr');
        const firsttd = document.createElement('td');
        if(x > 0)
            firsttd.append(seqs[0][x-1]);
        tr.append(firsttd);
        for(const [y,cell] of row.entries()) {
            if(y > seqs[1].length) break; // GridMixin pads rows with 0's
            const td = document.createElement('td');
            td.append(parseFloat(cell.toFixed(2)));
            if(path.has(`${x},${y}`))
                td.className = 'highlit';
            tr.append(td);
        }
        body.append(tr);
    }
};

const makeOption = (index,obj) => {
    const div = document.createElement('div');
    const box = document.createElement('input');
    box.setAttribute('type','checkbox');
    box.value = index;
    const label = document.createElement('label');
    label.title = `Search: ${obj.search} Replace: ${obj.replace.toString()}`;
    label.append(obj.name);
    div.appendChild(box);
    div.appendChild(label);
    return div;
};

const checkAll = (e) => {
    const details = e.target.parentNode.querySelector('details');
    details.open = true;
    const kids = details.querySelectorAll('input');
    for(const kid of kids) {
        kid.checked = e.target.checked;
    }
};

const updateBoxes = (e) => {
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

const addQueryString = strs => {
    const options = [...document.querySelectorAll('fieldset.options input')];
    const os = options.map(o => o.type === 'number' ? o.value : o.checked);
    const qs = encodeURIComponent(
        JSONCrush.crush(
            JSON.stringify({str_a: strs[0], str_b: strs[1],options: os})
            )
        );
    window.history.replaceState(null,null,window.location.pathname+`?q=${qs}`);
};

const fillFromQueryString = () => {
    const searchParams = new URLSearchParams(window.location.search);
    if(!searchParams.has('q')) return;

    const boxes = document.querySelectorAll('.input-box input');
    const data = JSON.parse(
        JSONCrush.uncrush(
            decodeURIComponent(searchParams.get('q'))
        )
    );
    if(data.hasOwnProperty('str_a'))
        boxes[0].value = data.str_a;
    if(data.hasOwnProperty('str_b'))
        boxes[1].value = data.str_b;
    if(data.hasOwnProperty('options')) {
        const options = document.querySelectorAll('fieldset.options input');
        for(let n=0;n < options.length;n++) {
            if(options[n].type === 'number')
                options[n].value = data.options[n];    
            else
                options[n].checked = data.options[n];
        }
    }
};

const loadSamples = e => {
  const summary = e.target.closest('.samplesummary');
  if(!summary) return;
  const boxen = [...document.querySelectorAll('.input-box input')];
  const existing = boxen[0].value.trim() !== '' || boxen[1].value.trim() !== '';
  if(existing && !window.confirm('Replace existing texts?')) return;
  const par = summary.parentNode;
  boxen[0].value = par.querySelector('.sample1').textContent; 
  boxen[1].value = par.querySelector('.sample2').textContent; 
};

window.addEventListener('load',() => {

    const normies = document.getElementById('normalization');
    
    for(const checkbox of normies.querySelectorAll('input'))
        checkbox.addEventListener('click',checkAll);

    const tamil = normies.querySelector('details.tamil');
    tamil.addEventListener('click',updateBoxes);

    const sanskrit = normies.querySelector('details.sanskrit');
    sanskrit.addEventListener('click',updateBoxes);

    const pali = normies.querySelector('details.pali');
    pali.addEventListener('click',updateBoxes);

    const geez = normies.querySelector('details.geez');
    geez.addEventListener('click',updateBoxes);

    for(const [i, filter] of filters.entries()) {
        if(filter.group === 'general')
            normies.insertBefore(makeOption(i,filter),tamil.parentNode);
        else if(filter.group === 'tamil')
            tamil.appendChild(makeOption(i,filter));
        else if(filter.group === 'sanskrit')
            sanskrit.appendChild(makeOption(i,filter));
        else if(filter.group === 'pali')
            pali.appendChild(makeOption(i,filter));
        else if(filter.group === 'geez')
            geez.appendChild(makeOption(i,filter));
    }

    fillFromQueryString();

    document.getElementById('samples').addEventListener('click',loadSamples);
    document.getElementById('alignsubmit').addEventListener('click', align);
});
