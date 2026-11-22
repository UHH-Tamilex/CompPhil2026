import transgeez from './geez.mjs';
import { EwtsConverter } from './EwtsConverter.mjs';
import { aksaraSplit, graphemeSplit, charSplit, geez, iast, slpish, wylie, wylish } from './split.mjs';
import Sanscript from './sanscript.mjs';

const totib = str => { const ewts = new EwtsConverter(); return ewts.to_unicode(str); };

const wordboundary = (str,options) => {
const segger = new Intl.Segmenter([], { granularity: 'word' });
    const segs = [...segger.segment(str)].map(s => s.segment);
  if(options.removespaces)
    return segs.filter(s => s.trim() !== '');

  return segs.reduce((acc,cur) => {
    if(cur.trim() === '') {
      acc.push(acc.pop() + cur);
    }
    else acc.push(cur);
    return acc;
  },[]);
};
const grapheme = (str,options) => {
  const seg = new Intl.Segmenter([], { granularity: 'grapheme' });
  const strclone = options.removespaces ? str.replaceAll(/\s+/g,'') : str;
  return [...seg.segment(strclone)].map(s => s.segment);
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

const split = (str,type='aksara',options) => {

  const maybejoin = (arr,removespaces) => {
    if(Array.isArray(arr))
      return removespaces ? arr.join('').trim() : arr.join('');
    return removespaces ? arr.trim(): arr;
  };

  const splitfunc = type === 'aksara' ? aksaraSplit :
                    type === 'eluttu' ? graphemeSplit :
                    charSplit;
  const script = options.script || detectScript(str);
  if(script === 'geez') {
    const trans = options.script ? str : transgeez(str);
    const split = splitfunc(trans,geez);
    return split.map(arr => maybejoin(arr,options.removespaces));
  }
  if(script === 'tibetan') {
    const trans = options.script ? str : Sanscript.t(toewts(str),'wylie','wylish');
    const clean = options.removespaces ? trans.replaceAll(/\s+/g,'') : trans;
    const split = splitfunc(trans, wylish);
    return split.map(c => {
      const wylie = options.script ? maybejoin(c,options.removespaces) :
        Sanscript.t(maybejoin(c,options.removespaces),'wylish','wylie')
      return type !== 'character' && !options.script ? totib(wylie) : wylie;
    });
  }
  else if(options.scheme === 'wylish') {
    const trans = Sanscript.t(str,'wylie','wylish');
    const clean = options.removespaces ? trans.replaceAll(/\s+/g,'') : trans;
    const split = splitfunc(trans, wylish);
    return split;
  }
  
  let trans = options.script ? str : Sanscript.t(str,script,'slpish');
  if(options.removespaces === true) trans = trans.replaceAll(/\s+/g,'');
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
  const scripted = split.map((c,i) => {
      const iast = options.script ? maybejoin(c,options.removespaces) : Sanscript.t(maybejoin(c,options.removespaces),'slpish','iast');
      if(type === 'character') {
        if(iast === 'a' && /^\u200d/.test(split[i+1]))
          return '';
        return iast;
      }
      return options.script ? iast : Sanscript.t(iast,'iast',script);
  });

  return type === 'character' ? 
    scripted.filter(c => c !== '' && !/^[\u200c-\u200d]$/.test(c)) : 
    scripted;
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

const whitespace = str => str.split(/\s+/gu).map(s => s + ' ');

const tokenize = (input, method, options={removespaces: true, script: undefined}) => {
  switch (method) {
    case 'wordboundary':
      return wordboundary(input,options);
    case 'grapheme':
      return grapheme(input,options);
    case 'whitespace':
      return whitespace(input);
    case 'aksara':
      return split(input,'aksara',options);
    case 'eluttu':
      return split(input,'eluttu',options);
    case 'char':
      return split(input,'character',options);
    default:
      return input;
  };
};

export { tokenize, detectScript, toewts, totib };
