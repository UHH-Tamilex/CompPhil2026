import transgeez from './geez.mjs';
import { EwtsConverter } from './EwtsConverter.mjs';
import { aksaraSplit, graphemeSplit, charSplit, geez, iast, slpish, wylie, wylish } from './split.mjs';
import Sanscript from './sanscript.mjs';

const getMethod = () => {
  for(const input of document.querySelectorAll('input[type="radio"]'))
    if(input.checked) return input.value;
};

const submit = () => {
  const res = tokenize();
  document.getElementById('results').innerHTML = res.map(r => `<div>${r}</div>`).join('');
};

const wordboundary = str => {
const seg = new Intl.Segmenter([], { granularity: 'word' });
  return [...seg.segment(str)].map(s => s.segment);
};
const grapheme = str => {
  const seg = new Intl.Segmenter([], { granularity: 'grapheme' });
  return [...seg.segment(str.replaceAll(/\s+/g,''))].map(s => s.segment);
};

const detectScript = str => {
    const ranges = new Map([
        ['tamil', /[\u0b80-\u0bff]/u],
        ['devanagari', /[\u0900-\u097f]/u],
        ['bengali', /[\u0980-\u09ff]/u],
        ['burmese',/[\u1000-\u109f]/u],
        ['sinhala',/[\u0d80-\u0dff]/u],
        ['telugu', /[\u0c00-\u0c7f]/u],
        ['malayalam',/[\u0d00-\u0d7f]/u],
        ['sarada',/[𑆃-𑆲]/u],
        ['grantha',/[𑌅-𑌹]/u],
        ['newa',/[𑐀-𑐴]/u],
        ['tibetan',/[ༀ-࿚]/u],
        ['geez',/[\u1200-\u137f]/u]
    ]);

    for(const [name,range] of ranges)
        if(range.test(str)) return name;

    return 'iast';
};

const split = (str,type='aksara') => {

  const maybejoin = arr => Array.isArray(arr) ? arr.join('').trim() : arr.trim();

  const splitfunc = type === 'aksara' ? aksaraSplit :
                    type === 'eluttu' ? graphemeSplit :
                    charSplit;
  const script = detectScript(str);
  if(script === 'geez') {
    const trans = transgeez(str);
    const split = splitfunc(trans,geez);
    return split.map(arr => maybejoin(arr));
  }
  if(script === 'tibetan') {
    const trans = Sanscript.t(toewts(str),'wylie','wylish').replaceAll(/\s+/g,'');
    const ewts = new EwtsConverter();
    const split = splitfunc(trans, wylish);
    return split.map(c => {
      const wylie = Sanscript.t(maybejoin(c),'wylish','wylie')
      return type !== 'character' ? ewts.to_unicode(wylie) : wylie;
    });
  }
  
  let trans = Sanscript.t(str,script,'slpish').replaceAll(/\s+/g,'');
  let split = splitfunc(trans,slpish);
  if(type === 'aksara') { // recombine conjuncts
    split = split.reduce((acc,cur) => {
      if(acc.length === 0) return [cur];
      const last = acc.pop();
      if(/^[\u200c-\u200d]+$/.test(last[last.length - 1]))
        acc.push([...last,...cur]);
      else acc.push(last,cur);
      return acc;
    },[]);
  }
  return split.map(c => {
      const iast = Sanscript.t(maybejoin(c),'slpish','iast')
      return type !== 'character' ? Sanscript.t(iast,'iast',script) : iast;
  });
};

const toewts = text => {
    const ewts = new EwtsConverter({fix_spacing: true, pass_through: true,fix_sloppy: false});
    return ewts.to_ewts(text.replaceAll('ༀ','om̐'))
               .replaceAll(/[rl]-[iI]/g,(m) => {
                    switch (m) {
                        case 'r-i':
                            return 'ṛ';
                        case 'r-I':
                            return 'ṝ';
                        case 'l-i': 
                            return 'l̥';
                        default:
                            return 'l̥̄';
                    }
               })
               .replaceAll('ā+u','ū')
               .replaceAll('ā+i','ī')
               .replaceAll(/([gṭḍbd])\+h/g,'$1h');
};

const whitespace = str => str.split(/\s+/gu);

const tokenize = () => {
  const input = document.getElementById('textinput').value;
  const method = getMethod();
  switch (method) {
    case 'wordboundary':
      return wordboundary(input);
    case 'grapheme':
      return grapheme(input);
    case 'whitespace':
      return whitespace(input);
    case 'aksara':
      return split(input);
    case 'eluttu':
      return split(input,'eluttu');
    case 'char':
      return split(input,'character');
    default:
      return input;
  };
};


document.getElementById('tokenizesubmit').addEventListener('click',submit);
