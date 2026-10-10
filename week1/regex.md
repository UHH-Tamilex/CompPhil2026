# Regular expressions cheatsheet

## Wildcards

## .
The character `.` means any character.

#### Pali/Sanskrit
```regex
evam.va
```
matches _evameva, eva va[tvā] eva va[deyya]_, etc.

#### Tamil
```regex
eṉṟa.āru
```
matches _eṉṟavāṟu,_ _eṉṟa āṟu,_ _eṉṟamāṟu_, etc.

#### Tibetan
```regex
la.ang
```
matches _la ang,_ _la'ang_, etc.

## \w
The character `\w` means any word character (e.g., not a space).
> [!IMPORTANT]
> Depending on the software, this may not work with diacritics (ā, ṭ, ś, etc.) or non-Latin scripts. As an alternative, you can use `\S` (any non-space character).

#### Pali/Sanskrit
```regex
vi\wāra
```
matches _vicāra, vihāra, vikāra, viḷāra_ etc.

#### Tamil
```regex
eṉṟa\wāṟu
```
matches _eṉṟavāṟu_ and _eṉṟalāṟu_ but NOT _eṉṟa āṟu._ 

#### Tibetan
```regex
b\wal ba
```
matches _bral ba_, _bsal ba_, _bdal ba_, etc.

## \s

The character `\s` means any space character (including tabs, etc.)

#### Pali/Sanskrit
```regex
evam\seva
```
matches _evam eva_.

#### Tamil
```regex
eṉṟa\sāṟu
```
matches _eṉṟa  āṟu._

#### Tibetan
```regex
dpal\smo
```
matches _dpal mo._

##\n

The character `\n` matches a newline.

This can be used together with `\s` to match words or phrases that might span more than one line.

## Character classes

## []
You can specify a specific set of characters with `[]`.

#### Pali
```regex
[bv]yākaraṇa
```
matches _byākaraṇa_ and _vyākaraṇa._

#### Sanskrit
```regex
h[auūṛ]ta
```
matches _hata, huta, hūta,_ and _hṛta_.

#### Tamil
```regex
nā[ḷḻl]i
```
matches _nāḷi, nāli,_ and _nāḻi._

#### Tibetan
```regex
[sz]hes so
```
matches _shes so_ and _zhes so._

## [^]
You can specify characters NOT to match with `[^]`.

#### Pali
```regex
sa[^ṅṃ]ga
```
matches _sarga,_ _sadga_, _sa ga,_ etc. but NOT _saṅga_ or _saṃga_.

#### Sanskrit
```regex
prā[^p]yate
```
matches _prāśyate, prācyate,_ but NOT _prāpyate._

#### Tamil
```regex
pu[^ṇ]arcci
```
matches _pukarcci, puyarcci,_ but NOT _puṇarcci._

#### Tibetan
```regex
mkha[^s] pa
```
matches _mkhan pa_ and _mkha' pa_ but NOT _mkhas pa._

## Quantifiers

## *

The character `*` means zero or more of the preceding character.

#### Pali
```regex
gaccha tvan *ti
```
matches _gaccha tvanti_, _gaccha tvan ti_, _gaccha tvan&nbsp;&nbsp;&nbsp;&nbsp;ti_, etc.

#### Sanskrit
```regex
kiṃ *cit
```
matches _kiṃcit,_ _kiṃ cit_, _kim&nbsp;&nbsp;&nbsp;&nbsp;cit,_ etc.

#### Tamil
```regex
eṉṟa *vāṟu
```
 matches _eṉṟavaṟu,_ _eṉṟa vāṟu,_ _eṉṟa&nbsp;&nbsp;&nbsp;&nbsp;vaṟu,_ ... etc.

#### Tibetan
```regex
pad *ma
```
matches _padma,_ _pad ma_, _pad&nbsp;&nbsp;&nbsp;&nbsp;ma,_ etc.

## ?
> [!TIP]
> This is probably the most useful quantifier.

The character `?` means zero or one of the preceding character.

#### Pali
```regex
bhik?khu
```
matches  _bhikhu_ or _bhikkhu._

#### Sanskrit
```regex
dharm?maḥ? ?kṣetre
```
matches _dharmakṣetre,_  _dharmmakṣetre._ _dharmaḥ kṣetre,_ _dharmmaḥkṣetre,_ etc.

#### Tamil
```regex
pūm? ?nāṟu
```
matches _pūm nāṟu,_ _pūmnāṟu,_ _pū nāṟu,_ or _pūnāṟu._

#### Tibetan
```regex
pa ?d? ?ma dmar po
```
matches _padma dmar po,_ _pad ma dmar po,_ and _pa dma dmar po._

## +

The character `+` means one or more of the preceding character.

#### Pali
```regex
bodhisat+o
```
matches _bodhisato,_  _bodhisatto,_ _bodhisattto,_ etc.

#### Tibetan
> [!IMPORTANT]
> If you want to match a plus sign, you need to write `\+`.
> Example: `vat\+sa la` matches _vat+sa la_ in Extended Wylie transliteration. `vat+sa la` will match _vattsa la._ 

## {}
You can specify a range using `{}`.
> [!TIP]
> This is great for finding words that are appear together but are separated by things in-between.

#### Pali
```regex
[Bb]odhisatto.{2,50}agamāsi
```
where `.{2,50}` means "2–50 of any character." This matches _Bodhisatto puna agamāsi, Bodhisatto nhātvā agamāsi, Bodhisatto dānādīni puññāni karitvā yathākammaṃ agamāsi,_ etc.

#### Sanskrit
```regex
pra\S{1,5}chinna
```
where `\S{1,5}` means "1–5 of any non-space character." This matches _pracchinna,_ _praticchinna,_ _prayātyachinna,_ _prakārācchinna,_ etc.

#### Tamil
```regex
vāḻi.{2,15}tōḻi
```
where `.{2,15}` means "2–15 of any character." This matches _vāḻi yōtōḻi, vāḻiyō makaḷainiṉ tōḻi, vāḻiya eṉat tōḻi, vāḻivēṇ ṭaṉṉai |eṉtōḻi,_ etc. but NOT _vāḻi tōḻi._

#### Tibetan
```regex
mkhan po.{1,10}kyi
```
where `.{1,10}` means "1–10 of any character." This matches _mkhan po chos kyi,_ _mkhan po rnams kyi,_ _mkhan po gnyis kyi,_ _mkhan po las dus kyi,_ etc.


> [!TIP]
> If you want to match across line breaks, use `[\S\s\n]` instead of `.`.
