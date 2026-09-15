# Computational Philology

## University of Hamburg, Winter semester 2026/27

### Mondays 10:15–11:45 CET | 13:45–15:15 IST (14:45–16:15 from week 4)

How can technology aid us in philological work — understanding, contextualizing, and critically editing texts? This seminar will explore a number of tools and techniques, and discuss approaches to working with a single manuscript, multiple witnesses texts, or a whole corpus in multiple languages. Examples will be drawn variously from Pali, Sanskrit, Tamil, & Tibetan, depending on interest, but the course material should be general enough for participants working in other languages as well.

The central idea for this seminar is to approach philology through the lens of computation, both practically and theoretically. Since many people in the department work on critical editions, one main thread of the seminar will be the process of creating a digital edition. But along the way, we will also touch upon manuscript studies and corpus linguistics, and draw insights from biology, computer science, folklore studies, graphic design, and philosophy.


## Week 1 | 12 October | Introductions & warm-ups

We will begin by introducing ourselves, what we're working on, and what we hope to get out of all this. We can consider fine-tuning the material that we will cover in the following sessions, so that it's tailored to everyone's interests (e.g., how much math can a philologist reasonably handle? What about philosophy?)

As a warm-up excercise, we will practice searching through a text corpus using regular expressions. Having a corpus — and knowing how to search it — should be a basic tool in everyone's toolbelt, but it's also something that's never usually formally taught or explained. I will prepare corpora for Sanskrit, Pali, Tamil, and Tibetan, in case someone doesn't yet have one. We will return to regular expressions in week 5.

For the course, everyone should have installed some software designed to edit code. If you don't have one, download VSCodium: <https://vscodium.com/>

### Bibliography

Friedl, Jeffrey E. F. 2006. *Mastering Regular Expressions.* Third edition. Sebastopol, CA: O'Reilly.
	

## Week 2 | 19 October | Transcription as interpretation

We work primarily with texts, but where do these texts come from? Many of us will answer that we work from manuscripts, but reading a manuscript is not always so straightforward. Keeping in mind the fundamental philosophical issues inherent in language, cognition, and knowledge production, we will introduce TEI XML and explore the different degrees of diplomacy that can be employed when transcribing a manuscript.

For the next couple of weeks, we will practice transcribing manuscripts using the TST editor: <https://tst-project.github.io/editor>

**Keywords**: folio, recto, verso, IIIF

### Bibliography

Borges, Jorge Luis. 1946. "Del rigor en la ciencia." *Los Anales de Buenos Aires* 3: 53.

Borges, Jorge Luis. 1966. "Del rigor en la ciencia." In *Historia universal de la infamia*. Sexta impresión. Buenos Aires: Emecé editores. 131–132.

Borges, Jorge Luis. 1972. "Of Exactitude in Science." In *A Universal History of Infamy*. Translated by Norman Thomas di Giovanni. New York: E. P. Dutton & Co. 141.

TEI Consortium. 2026. "TEI: Guidelines for Electronic Text Encoding and Interchange." *Text Encoding Initiative*. Last updated 28 July. <https://www.tei-c.org/release/doc/tei-p5-doc/en/html/index.html>


## Week 3 | 26 October | Transcription as interpretation

We will continue to discuss the limits of transcription by looking at various examples across manuscript cultures. Every transcription practice has advantages and trade-offs, but is there a pratical compromise that we can settle upon that doesn't lose too much information, yet still captures enough of the manuscript for our research purposes? In week 6, we will explore this question further, and link it up with broader philosophical debates on the nature of cognition.

**Keywords**: diplomatic edition, reproducibility, grapheme

### Bibliography

Bucher, Konrad. 2023. "Towards an ultra-diplomatic transcription of Wittgenstein's Nachlass." *Nordic Wittgenstein Review* 11. <https://doi.org/10.15845/nwr.v11.3655>

Kierkegaard, Søren. 1920. *Samlede Værker:// *Enten ― Eller. Andet Bind.// Edited by Anders Bjørn Drachmann et al. Kjøbenhavn: Gyldendal. [332](https://archive.org/details/enteneller02kier/page/332/mode/1up)–[333](https://archive.org/details/enteneller02kier/page/333/mode/1up).

Kierkegaard, Søren. 1978. "The Wife of the Orientalist." In *Parables of Kierkegaard.* Edited by Thomas C. Oden. Princeton: Princeton University Press. 126–127.

Korzybski, Alfred. 1958. "On Structure." In *Science and Sanity: An Introduction to Non-Aristotelian Systems and General Semantics*. Fourth edition. New York: Institute of General Semantics. 55–65.

Sandve, Geir Kjetil et al. 2013. "Ten Simple Rules for Reproducible Computational Research." *PLoS Computational Biology* 9(10): e1003285.  <https://doi.org/10.1371/journal.pcbi.1003285>


## Week 4 | 2 November | Paratexts & metadata

Until now, we have focused on transcribing the main text of the manuscript, but there is a lot of information outside of that text that might be interesting for our research. Paratexts, in particular, give us a window into the life of the scribe and the context in which the text was copied. Marginal notes might contain snippets from lost texts. And non-textual information, such as leaf material, folio size, stringhole distance, and margin proportions, open up possibilities to study how written culture and technology spread across time and space.

**Keywords**: blessing, colophon, completion statement, marginalia

### Bibliography

Li, Charles. 2025. "Scribes, editors, & librarians between tradition and modernity in late colonial India." In *South-Indian Manuscripts in Hamburg and Paris: Paratexts and Provenance.* Edited by Eva Wilden & Emmanuel Francis. Hamburg: Department of Indian & Tibetan Studies. <https://tst-project.github.io/cordier/>

Muroya Yasutaka. 2010.  "A Study on the Marginalia in Some Nyāyamañjarī Manuscripts: The Reconstruction of a Lost Portion of the Nyāyamañjarīgranthibhaṅga." *Wiener Zeitschrift für die Kunde Südasiens* LII-LIII: 213–267. <https://austriaca.at/0xc1aa5572%200x002452ac.pdf>

Prakash, Pranav. 2024. “Paratexting Persian Purāṇas: Probing Religious and Communal Boundaries in South Asian History.” *Textual Cultures: Texts, Contexts, Interpretation* 17(2): 157–193. <https://doi.org/10.14434/tc.v17i2.40322>


## Week 5 | 9 November | Comparing texts: tokenization

In order to compare two texts, we first need to split the text up into tokens. These tokens might be words, syllables, characters, or other units of comparison — even motifs, depending on the research question. We will explore these options as they apply to different languages and manuscript practices, and reflect on how tokenization embodies our assumptions about textual transmission.

**Keywords**: akṣara, character, eḻuttu, normalization, token

### Bibliography

Eltschinger, Vincent. 2023. "What Comes First, Word or Sentence Meaning? Dharmakīrti as a Contextualist." In *To the Heart of Truth: felicitation volume for Eli Franco on the occasion of his seventieth birthday.* Edited by Hiroko Matsuoka et al. Wien: Universität Wien. <https://www.academia.edu/108838314/What_Comes_First_Word_or_Sentence_Meaning_Dharmak%C4%ABrti_as_a_Contextualist>

Tehrani, Jamshid J. 2013. "The Phylogeny of Little Red Riding Hood." *PLoS ONE* 8(11): e78871. <https://doi.org/10.1371/journal.pone.0078871>


## Week 6 | 16 November (via Zoom) | Comparing texts: tokenization

In recent years, more complex methods of tokenization have been employed for doing work such as large-scale comparison of documents, and notably, training large language models. We will look at some of these methods, such as ngrams (originally termed "shingles") and byte-pair encoding, which was intially developed for data compression. Along the way, we will reflect on how well compression represents how we understand and cognize the world. We will return to ngrams and compression, in a more practical sense, in week 11.

**Keywords**: byte-pair encoding, ngram, resemblance

### Bibliography

Broder, Andrei Z. et al. 1997. "Syntactic clustering of the Web." *Computer Networks and ISDN Systems* 29: 1157–1166.

Delétang, Grégoire et al. 2024. "Language Modeling is Compression." ICLR 2024. <https://arxiv.org/abs/2309.10668>

Filliozat, Pierre-Sylvain. 2004. "Ancient Sanskrit Mathematics: An Oral Tradition and a Written Literature." In *History of Science, History of Text.* Edited by Karine Chemla. 137–157.

Karpathy, Andrej. 2024. "minbpe: Minimal, clean code for the Byte Pair Encoding (BPE) algorithm commonly used in LLM tokenization." *GitHub*. <https://github.com/karpathy/minbpe>

Wilkenfeld, Daniel A. 2018. "Understanding as compression." *Philosophical Studies* 176: 2807–2813.


## Week 7 | 23 November | Comparing texts: alignment

The problem of comparing two texts is known as the pairwise alignment problem. In this session, we will introduce the algorithm and consider the different parameters that can be used to fine-tune it. This session can contain as little or as much math as is bearable; it is usually enough to press a button and get results without understanding the underlying process. But a little understanding will enable you to adjust the software to better suit your needs.

**Keywords**: Needleman-Wunsch, affine/linear gap penalty

### Bibliography

Gotoh Osamu. 1982. "An Improved Algorithm for Matching Biological Sequences." *Journal of Molecular Biology* 162: 705–708.

Needleman, S. B. & C. D. Wunsch. 1970. "A General Method Applicable to the Search for Similarities in the Amino Acid Sequence of Two Proteins." *Journal of Molecular Biology* 48: 443–453.

Sung Wing-Kin. 2009. *Algorithms in Bioinformatics: A Practical Introduction*. London: CRC Press.


## Week 8 | 30 November | Comparing texts: alignment

Most texts that we work on are present in more than two manuscripts, so we will need to solve the multisequence alignment problem in order to collate them. However, it has been shown that this problem has a computational complexity such that it is practically unsolvable as the number of texts, and their length, grow large. This session will introduce a practical algorithm that will produce a fairly accurate collation of a multiwitness text in a reasonable amount of time. As with last week, if you are not interested in the math, it is enough to know how to press a button.

**Keywords**: distance matrix, heuristic

### Bibliography

Cilibrasi, Rudi & Paul M. B. Vitányi. 2005. "Clustering by Compression." *IEEE Transactions on Information Theory* 51(4): 1523–1545. <https://arxiv.org/abs/cs/0312044>

Gusfield, Dan. 1997. "Multiple String Comparison — The Holy Grail." In *Algorithms on Strings, Trees, and Sequences*. Cambridge: Cambridge University Press. 332–369.

Wang Lusheng & Jiang Tao. 1994. "On the complexity of multiple sequence alignment." *Journal of Computational Biology* 1(4): 337–348. 


## Week 9 | 7 December | Comparing texts: critical apparatus

Once our witnesses are collated, we can finally create a critical apparatus for our text edition. This session will introduce Saktumiva, a tool for creating digital editions, based on diplomatic manuscript transcriptions and using the algorithms discussed in the previous sessions. In the course of the previous weeks, if you have prepared manuscript transcriptions, this week, you can set up a Saktumiva project and collate them to produce a critical apparatus. We will also briefly touch on version control using git and putting your edition online using GitHub.

**Keywords**: variant reading, apparatus registers, sources, parallels, testimonia

### Bibliography

Giannouli, Antonia. 2015. "Critical editions and the complementary apparatuses to a critial apparatus." *COMSt Bulletin* 1(1): 21–28. <https://www.aai.uni-hamburg.de/en/comst/pdf/bulletin1/pp21-28.pdf>

Ponuthorai, Prem Kumar & Jon Loeliger. 2022. *Version Control with Git.* Third edition. Sebastopol, CA: O'Reilly.


## Week 10 | 14 December | Visual design

Visual diagrams, like a critical apparatus, represent the end result of a long process of abstraction. This week, we will take a break from the technical and theoretical material and delve into the practice of presenting your research results visually. We will take a tour through different charts, graphs, and schematics, and think about which of them are appropriate for what types of data. We will also touch on issues of accessibility.

**Keywords**: chartjunk, cognitive load, data-ink ratio, visual hierarchy

### Bibliography

Brewer, Cynthia. 2016. *Designing Better Maps.* Second edition. Redlands, CA: Esri Press.

European Union. 2023. "Data Visualization Guide."  *European Data.* <https://data.europa.eu/apps/data-visualisation-guide/>

Kangas, Brian D. 2012. "Not Waving but Drowning: A Review of Tufte's *The Cognitive Style of Powerpoint.*" *International Journal of Teaching and Learning in Higher Education* 24(3): 412–423. <https://files.eric.ed.gov/fulltext/EJ1000695.pdf>

Tufte, Edward R. 2007. *The Visual Display of Quantitative Information.* Second edition. Cheshire, CT: Graphics Press.


## Week 11 | 4 January | Text transmission & evolution

Philologists call it a stemma codicum, and biologists call it a phylogenetic tree, but its function is the same — to hypothesize how a text has changed over time, or its evolutionary history. As with all models, there are many caveats to be aware of. In this session, we will look at different methods for inferring a tree and then discuss what that tree represents. We will also touch on networks, an alternative representation of textual variation.

**Keywords**: contamination, network, stemma, tree, recension

### Bibliography

Baldauf, Sandra L. 2003. "Phylogeny for the faint of heart: a tutorial." *Trends in Genetics* 19(6): 345–351. <https://researchgate.net/publication/10712132_Phylogeny_for_the_faint_of_heart_A_tutorial>

Huson, Daniel H. & Bryant, David. 2006. "Application of Phylogenetic Networks in Evolutionary Studies." Molecular Biology and Evolution 23(2): 254–267. <https://academic.oup.com/mbe/article/23/2/254/1118872>

de Pinna, Mário et al. 2016. "Unrooted trees discovered independently in philology and phylogenetics: a remarkable case of methodological convergence." *Systematics and Biodiversity* 14(4): 317–326.


## Week 12 | 11 January | Text transmission & evolution

Both biologists and philologists have come up with methods for reconstructing a text based on a tree. In this session, we will compare two approaches — one biological, and the other philological — and see how the results might differ.

**Keywords**: ancestral reconstruction, "majority" reading

### Bibliography

Fitch, Walter M. 1971. "Defining the course of Evolution: Minimum change for a specific tree topology." *Systematic Zoology* 20: 406–416. <https://jstor.org/stable/2412116>

Maas, Paul. 1957. *Textkritik.* Leipzig: B. G. Teubner.

Maas, Paul. 1958. *Textual Criticism*. Translated by B. Flower. Oxford: Clarendon Press.

Trovato, Paolo. 2014. *Everything You Always Wanted to Know about Lachmann’s Method*. Translated by F. Poole. Padova: liberiauniversitaria.it.


## Week 13 | 18 January | Text transmission & evolution

The stemmatic method has sometimes been derided as overly "mechanical," and some editors have turned to other methods of editing. But, especially when working with many manuscript witnesses, a stemmatic hypothesis can be a very useful tool to check your own intuitions as an editor. We will consider some different attitudes to "Lachmann's method" and look at textual examples where a stemma and an editor's judgement differ.

**Keywords**: emendation, vulgate

### Bibliography

Biardeau, Madeleine. "Some More Considerations About Textual Criticism." *Purāṇa* X(2): 115–123.

Katre, S. M. & P. K. Gode. 1941. *Introduction to Indian Textual Criticism.* Bombay: Karnatak Publishing House. <https://archive.org/details/IntroductionToIndianTextualCriticismS.M.Kartre>


## Week 14 | 25 January | And beyond

Although much of this course has been focused on creating a critical edition from multiple manuscript witnesses, the concepts and techniques that we have learned can be used for other kinds of research as well. We have briefly touched on these in the previous sessions, and in this final session, we will look a bit more in depth at some possible studies that you, a computational philologist, can now go forth and explore.
