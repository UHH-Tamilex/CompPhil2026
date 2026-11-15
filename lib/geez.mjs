// adapted from https://en.wiktionary.org/wiki/Module:Ethi-translit
const GEM = String.fromCharCode(0x135F);

const canon_spaces = text => {
	text = text.replace(/^\s+/,'');
	text = text.replace(/\s+$/,'');
	text = text.replace(/፡/, ' ');
	text = text.replaceAll(' ]','] ');
	return text;
}
const tt = new Map([
	['ሀ','hä'], ['ሁ','hu'], ['ሂ','hi'], ['ሃ','ha'], ['ሄ','he'], ['ህ','hə'], ['ሆ','ho'], 
	['ለ','lä'], ['ሉ','lu'], ['ሊ','li'], ['ላ','la'], ['ሌ','le'], ['ል','lə'], ['ሎ','lo'], 
		['ሏ','lʷa'], 
	['ሐ','ḥä'], ['ሑ','ḥu'], ['ሒ','ḥi'], ['ሓ','ḥa'], ['ሔ','ḥe'], ['ሕ','ḥə'], ['ሖ','ḥo'], 
		['ሗ','ḥʷa'], 
	['መ','mä'], ['ሙ','mu'], ['ሚ','mi'], ['ማ','ma'], ['ሜ','me'], ['ም','mə'], ['ሞ','mo'], 
		['ሟ','mʷa'], ['ፙ','mʲä'], 
	['ሠ','śä'], ['ሡ','śu'], ['ሢ','śi'], ['ሣ','śa'], ['ሤ','śe'], ['ሥ','śə'], ['ሦ','śo'], 
		['ሧ','śʷa'], 
	['ረ','rä'], ['ሩ','ru'], ['ሪ','ri'], ['ራ','ra'], ['ሬ','re'], ['ር','rə'], ['ሮ','ro'],
		['ሯ','rʷa'], ['ፘ','rʲä'], 
	['ሰ','sä'], ['ሱ','su'], ['ሲ','si'], ['ሳ','sa'], ['ሴ','se'], ['ስ','sə'], ['ሶ','so'],
		['ሷ','sʷa'], 
	['ሸ','šä'], ['ሹ','šu'], ['ሺ','ši'], ['ሻ','ša'], ['ሼ','še'], ['ሽ','šə'], ['ሾ','šo'],
		['ሿ','šʷa'], 
	['ቀ','ḳä'], ['ቁ','ḳu'], ['ቂ','ḳi'], ['ቃ','ḳa'], ['ቄ','ḳe'], ['ቅ','ḳə'], ['ቆ','ḳo'],
		['ቈ','ḳʷä'], ['ቊ','ḳʷi'], ['ቋ','ḳʷa'], ['ቌ','ḳʷe'], ['ቍ','ḳʷə'], 
	['ቐ','x̣ä'], ['ቑ','x̣u'], ['ቒ','x̣i'], ['ቓ','x̣a'], ['ቔ','x̣e'], ['ቕ','x̣ə'], ['ቖ','x̣o'],
		['ቘ','x̣ʷä'], ['ቚ','x̣ʷi'], ['ቛ','x̣ʷa'], ['ቜ','x̣ʷe'], ['ቝ','x̣ʷə'],
	['በ','bä'], ['ቡ','bu'], ['ቢ','bi'], ['ባ','ba'], ['ቤ','be'], ['ብ','bə'], ['ቦ','bo'], 
		['ቧ','bʷa'], 
	['ቨ','vä'], ['ቩ','vu'], ['ቪ','vi'], ['ቫ','va'], ['ቬ','ve'], ['ቭ','və'], ['ቮ','vo'], 
		['ቯ','vʷa'], 
	['ተ','tä'], ['ቱ','tu'], ['ቲ','ti'], ['ታ','ta'], ['ቴ','te'], ['ት','tə'], ['ቶ','to'], 
		['ቷ','tʷa'], 
	['ቸ','čä'], ['ቹ','ču'], ['ቺ','či'], ['ቻ','ča'], ['ቼ','če'], ['ች','čə'], ['ቾ','čo'], 
		['ቿ','čʷa'], 
	['ኀ','ḫä'], ['ኁ','ḫu'], ['ኂ','ḫi'], ['ኃ','ḫa'], ['ኄ','ḫe'], ['ኅ','ḫə'], ['ኆ','ḫo'], 
		['ኈ','ḫʷä'], ['ኊ','ḫʷi'], ['ኋ','ḫʷa'], ['ኌ','ḫʷe'], ['ኍ','ḫʷə'], 
	['ነ','nä'], ['ኑ','nu'], ['ኒ','ni'], ['ና','na'], ['ኔ','ne'], ['ን','nə'], ['ኖ','no'],
		['ኗ','nʷa'], 
	['ኘ','ñä'], ['ኙ','ñu'], ['ኚ','ñi'], ['ኛ','ña'], ['ኜ','ñe'], ['ኝ','ñə'], ['ኞ','ño'], 
		['ኟ','ñʷa'], 
	['አ','ʾä'], ['ኡ','ʾu'], ['ኢ','ʾi'], ['ኣ','ʾa'], ['ኤ','ʾe'], ['እ','ʾə'], ['ኦ','ʾo'],
		['ኧ','ʾʷa'], 
	['ከ','kä'], ['ኩ','ku'], ['ኪ','ki'], ['ካ','ka'], ['ኬ','ke'], ['ክ','kə'], ['ኮ','ko'], 
		['ኰ','kʷä'], ['ኲ','kʷi'], ['ኳ','kʷa'], ['ኴ','kʷe'], ['ኵ','kʷə'], 
	['ኸ','xä'], ['ኹ','xu'], ['ኺ','xi'], ['ኻ','xa'], ['ኼ','xe'], ['ኽ','xə'], ['ኾ','xo'],
	['ዅ','xʷə'],  ['ዀ','xʷä'], ['ዂ','xʷi'], ['ዃ', 'xʷa'], ['ዄ', 'xʷe'],
	['ወ','wä'], ['ዉ','wu'], ['ዊ','wi'], ['ዋ','wa'], ['ዌ','we'], ['ው','wə'], ['ዎ','wo'], 
	['ዐ','ʿä'], ['ዑ','ʿu'], ['ዒ','ʿi'], ['ዓ','ʿa'], ['ዔ','ʿe'], ['ዕ','ʿə'], ['ዖ','ʿo'], 
	['ዘ','zä'], ['ዙ','zu'], ['ዚ','zi'], ['ዛ','za'], ['ዜ','ze'], ['ዝ','zə'], ['ዞ','zo'],
		['ዟ','zʷa'], 
	['ዠ','žä'], ['ዡ','žu'], ['ዢ','ži'], ['ዣ','ža'], ['ዤ','že'], ['ዥ','žə'], ['ዦ','žo'], 
		['ዧ','žʷa'], 
	['የ','yä'], ['ዩ','yu'], ['ዪ','yi'], ['ያ','ya'], ['ዬ','ye'], ['ይ','yə'], ['ዮ','yo'], 
	['ደ','dä'], ['ዱ','du'], ['ዲ','di'], ['ዳ','da'], ['ዴ','de'], ['ድ','də'], ['ዶ','do'],
		['ዷ','dʷa'], 
	['ጀ','ǧä'], ['ጁ','ǧu'], ['ጂ','ǧi'], ['ጃ','ǧa'], ['ጄ','ǧe'], ['ጅ','ǧə'], ['ጆ','ǧo'], 
		['ጇ','ǧʷa'], 
	['ገ','gä'], ['ጉ','gu'], ['ጊ','gi'], ['ጋ','ga'], ['ጌ','ge'], ['ግ','gə'], ['ጎ','go'],
		['ጐ','gʷä'], ['ጒ','gʷi'], ['ጓ','gʷa'], ['ጔ','gʷe'], ['ጕ','gʷə'], 
	['ጘ','ŋä'], ['ጙ','ŋu'], ['ጚ','ŋi'], ['ጛ','ŋa'], ['ጜ','ŋe'], ['ጝ','ŋə'], ['ጞ','ŋo'],
		['ⶓ','ŋʷä'], ['ⶔ','ŋʷi'], ['ጟ','ŋʷa'], ['ⶕ','ŋʷe'], ['ⶖ','ŋʷə'], 
	['ጠ','ṭä'], ['ጡ','ṭu'], ['ጢ','ṭi'], ['ጣ','ṭa'], ['ጤ','ṭe'], ['ጥ','ṭə'], ['ጦ','ṭo'], 
		['ጧ','ṭʷa'], 
	['ጨ','č̣ä'], ['ጩ','č̣u'], ['ጪ','č̣i'], ['ጫ','č̣a'], ['ጬ','č̣e'], ['ጭ','č̣ə'], ['ጮ','č̣o'],
		['ጯ','č̣ʷa'], 
	['ጰ','p̣ä'], ['ጱ','p̣u'], ['ጲ','p̣i'], ['ጳ','p̣a'], ['ጴ','p̣e'], ['ጵ','p̣ə'], ['ጶ','p̣o'],
		['ጷ','p̣ʷa'],
	['ጸ','ṣä'], ['ጹ','ṣu'], ['ጺ','ṣi'], ['ጻ','ṣa'], ['ጼ','ṣe'], ['ጽ','ṣə'], ['ጾ','ṣo'], 
		['ጿ','ṣʷa'], 
	['ፀ','ṣ́ä'], ['ፁ','ṣ́u'], ['ፂ','ṣ́i'], ['ፃ','ṣ́a'], ['ፄ','ṣ́e'], ['ፅ','ṣ́ə'], ['ፆ','ṣ́o'], 
	['ፈ','fä'], ['ፉ','fu'], ['ፊ','fi'], ['ፋ','fa'], ['ፌ','fe'], ['ፍ','fə'], ['ፎ','fo'],
		['ፏ','fʷa'], ['ፚ','fʲä'], 
	['ፐ','pä'], ['ፑ','pu'], ['ፒ','pi'], ['ፓ','pa'], ['ፔ','pe'], ['ፕ','pə'], ['ፖ','po'], 
		['ፗ','pʷa'], 
	['፠','§'], ['።','.'], ['፣','],'], ['፤',';'], ['፥',':'], ['፦',':-'], ['፧','?'], ['፨','¶'],
]);

const numbers = new Map([
	['፩',1], ['፪',2], ['፫',3], ['፬',4], ['፭',5], ['፮',6], ['፯',7], ['፰',8], ['፱',9],
	['፲',10], ['፳',20], ['፴',30], ['፵',40], ['፶',50], ['፷',60], ['፸',70], ['፹',80], ['፺',90]
]);

const exportnumber = geez => {

	if(/^[፻፼]/.test(geez))
		geez = '፩' + geez // prepend 1
  
	geez = geez.replaceAll('፼፻', '፼፩፻');

	// following 3 lines are a hack, so that both ፻ and ፼ can be interpreted by the code as "multiply value by 100"
	geez = geez.replace(/፼([^፻፼]*)$/u, '፼፻$1'); 
	geez = geez.replace(/፼([^፻፼]*፼)/gu, '፼፻$1');  
	//  same line again (accounting for overlapping patterns)
	geez = geez.replace(/'፼([^፻፼]*፼)'/gu, '፼፻$1');  
	
	return geez.split('').reduce((val,digit) => {
		if(/'[፩-፺]'/.test(digit))
			val = val + numbers.get(digit);
		else if(digit === '፻' || digit === '፼')
			val = val * 100;
    return val;
  },0);
};

const transgeez = (text, lang, sc) => {

	//Remove gemination marks
	text = text.replaceAll(new RegExp('(.)' + GEM,'gu'), 'Q$1W');
	
	// Basic transliteration
	text = text.split('').map(char => tt.get(char) || char).join('');

	//Geminate consonants (keep ə before geminates and after non-final geminates, internally we'll use Ə for these ə-s)
	text = text.replaceAll("Qx̣", "Vx̣x̣");
	text = text.replaceAll("Qč̣", "Vč̣č̣");
	text = text.replaceAll("Qp̣", "Vp̣p̣");
	text = text.replaceAll("Qṣ́", "Vṣ́ṣ́");
	text = text.replaceAll(/Q(.)/g, 'V$1$1');
	text = text.replaceAll(/əW?V/gu, "Ə");
	text = text.replaceAll(/əW([hlḥmśrsšḳxbvtčḫnñʾkxwʿzžydǧgṭṣfp])/gu, 'Ə$1');

	// remove ə that is not in the first syllable
	// [bdfghklmnprstvwxyzñčŋśšžǧʾʿḥḫḳṣṭ][ʰʲʷ̣́]*
	// matches one transliterated consonant
	let prev_end_pos;
	let prev_schwa_removed = false;
	let text_len = text.length;
	text = text.replaceAll(/()(([bdfghklmnprstvwxyzñčŋśšžǧʾʿḥḫḳṣṭ][ʲʷ̣́]*)ə)()/gu,
		(match,syllable, consonant, start_pos) => {
      const end_pos = start_pos + match.length;
			let ret;
			if(start_pos === 1 || /^[\W]/u.test(text.slice(start_pos -1))
				|| (prev_end_pos === start_pos && prev_schwa_removed &&
					 !(end_pos === text_len + 1 || /^[\W]/u.test(text.slice(end_pos)))))
				ret = syllable;
			else
				ret = consonant;
			prev_schwa_removed = (ret === consonant);
			prev_end_pos = end_pos;
			return ret;
  });
	text = text.replaceAll(/[፩-፼]+/gu, exportnumber);
	text = text.replaceAll(/^-ʾ/g, '-'); // Convert suffixes starting with <-ʾV> to <-V>.
	text = text.replaceAll('Ə', 'ə');
	text = text.replaceAll(/[VW]/g, '');

	// Punctuation (add a space after punctuation unless final)
	text = text.replaceAll(/([%.,;:?])/g, '$1 ');
	text = canon_spaces(text)
	
	return text;
};

export default transgeez;
