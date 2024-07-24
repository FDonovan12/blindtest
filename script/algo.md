exo 10 moyenne notes

```JS
tableau notes(12) en flottant
variable sum entier
variable mean entier
variable studentWithGoodNote

DEBUT
    sum = 0
    studentWithGoodNote = 0
    ecrire "saisir une note "

    pour i de 0 a 11, pas = 1 faire
        lire notes[i]
        sum = sum + notes[i]
        i suivant
    finpour

    mean = sum/12
    ecrire mean

    pour i de 0 a 11, pas = 1 faire
        SI notes[i] > mean Alors
            studentWithGoodNote = studentWithGoodNote + 1
        finsi
    finpour
    ecrire studentWithGoodNote
FIN
```

exo 11 recherche min max

```JS
tableau tab(10) en flottant
variable maxValue entier
variable minValue entier

DEBUT
    maxValue = tab[0]
    minValue = tab[0]
    pour i de 1 a 9, pas = 1 faire
        SI maxValue < tab[i] Alors
            maxValue = tab[i]
        finsi
        SI minValue > tab[i] Alors
            minValue = tab[i]
        finsi
    finpour
    ecrire minValue
    ecrire maxValue
FIN
```

exo 12 trie

```JS
tableau tab(10) en flottant
variable minValue entier
variable minIndex entier
variable temp entier
variable i entier
variable j entier

DEBUT
    pour i de 0 a 9, pas = 1 faire
        minValue = tab[i]
        minIndex = i
        pour j de i a 9, pas = 1 faire
            SI minValue > tab[j] Alors
                minValue = tab[j]
                minIndex = j
            finsi
        finpour
        temp = tab[i]
        tab[i] = tab[minIndex]
        tab[minIndex] = temp
    finpour
    ecrire tab
FIN
```

exo 13 dichotomie

```JS
tableau tab(n) en flottant
variable search entier
variable minIndex entier
variable maxIndex entier
variable currentIndex entier

DEBUT
    minIndex = 0
    maxIndex = n-1
    faire
        currentIndex = (maxIndex + minIndex)/2 //cast int
        SI tab[currentIndex] > search Alors
            maxIndex = currentIndex
        Sinon SI tab[currentIndex] < search Alors
            minIndex = currentIndex
        finsi
    tantque tab[currentIndex] != search
    ecrire currentIndex
FIN
```

exo 14 palindrome

```JS
tableau tab(n) en string
variable isPalindrome boolean

DEBUT
    isPalindrome = true
    pour i de 0 a n/2, pas = 1 faire
        // SI tab[i] != tab[n-i] Alors
        //     isPalindrome = false
        // finsi
        isPalindrome = isPalindrome ET tab[i] != tab[n-i]
    finpour
    ecrire isPalindrome
FIN
```

exo 15 cesar

```JS
tableau tab(n) en string
tableau cryptedTab(n) en string
variable shift entier

DEBUT
    pour i de 0 a n, pas = 1 faire
        tab[i] = intToChar((charToInt(tab[i]) + shift) % 26) // charToInt(a)-> 0, charToInt(z)-> 25, intToChar(0)-> a, intToChar(25)-> z
        // z -> 25 -> 25+3 -> 28 -> 2 -> c
    finpour
    ecrire cryptedTab
FIN
```

exo 13 dichotomie

```JS
tableau tab(n) en flottant
variable search entier
variable minIndex entier
variable maxIndex entier
variable currentIndex entier

DEBUT
    minIndex = 0
    maxIndex = n-1
    faire
        currentIndex = floor((maxIndex - minIndex)/2) // cast int floor()
        SI tab[currentIndex] > search Alors
            maxIndex = currentIndex
        Sinon SI tab[currentIndex] < search Alors
            minIndex = currentIndex
        finsi
    tantque (tab[currentIndex] != search) or minIndex != maxIndex
    ecrire currentIndex
FIN
```
