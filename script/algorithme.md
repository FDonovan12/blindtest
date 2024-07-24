exo 1

```JS
variable A entier

DEBUT
	lire a
	Si a >= 0 Alors
		Ecrire 'positif'
	Sinon
		Ecrire 'negatif'
	Finsi
FIN
```

exo 2

```JS
variable a entier
variable b entier

DEBUT
	lire a
	lire b
	Si exo1(a) == axo1(b)  Alors
	Si (a >= 0 ET b >=0) OU (a <= 0 ET b <=0) Alors
		Ecrire 'positif'
	Sinon
		Ecrire 'negatif'
	Finsi
FIN
```

exo 3

```JS
variable vitesse entier
variable route entier

DEBUT
	lire vitesse
	lire route

	Si route = "ville" Alors
		Si vitesse > 50 Alors
			Ecrire true
		Sinon
			Ecrire false
		Finsi
	Finsi
	Si route = "autoroute" Alors
		Si vitesse > 130 Alors
			Ecrire true
		Sinon
			Ecrire false
		Finsi
	Finsi
	Si route = "autoroute mouillé" Alors
		Si vitesse > 110 Alors
			Ecrire true
		Sinon
			Ecrire false
		Finsi
	Finsi
FIN
```

exo 4

```JS
variable msTime entier
variable second entier
variable minute entier
variable heure entier
variable temp entier

DEBUT
	lire msTime

	temp = msTime - msTime%1000
	second = temp/1000
	msTime = msTime%1000

	temp = seconde - seconde%60
	minute = temp/60
	seconde = seconde%60

	temp = minute - minute%60
	heure = temp/60
	minute = minute%60

	ecrire heures."h, ".minute."m, ".second."s, ".msTime."ms"
FIN
```

exo 5

```JS
variable jour entier
variable mois entier
variable annee entier

DEBUT
	lire jour
	lire mois
	lire annee

	Si mois > 12 ou < 1 Alors
		false
	Sinon Si jour > 31  ou jour < 1 Alors
		false
	Sinon Si jour > 30 ET (mois == 4 OU mois == 6 OU mois == 9 OU mois == 11) Alors
		false
	Sinon Si mois == 2 Alors
		Si jour > 29 Alors
			false
		Sinon Si jour < 29
			true
		Sinon Si (annee%400==0 OU (!annee%100==0 ET annee%4==0))
			true
		Sinon
			false
		Finsi
	Sinon
		true
	Finsi
```

exo 6

```JS
variable demande string

DEBUT
	Faire
		ecrire "voulait vous un cafe ? (O/N)"
		lire demande
	TantQue (demande != "o" OU demande != "n")
FIN
```

exo 7

```JS
variable n entier
variable somme entier

DEBUT
	somme = (n * (n+1))/2
	ecrire somme
FIN
```

exo 8

```JS
variable n entier
variable multiplicationText string

DEBUT
	lire n
	Pour index de 1 a 9 avec pas 1 faire
		multiplicationText = index." * ".n." = ".n*index
		ecrire multiplicationText
FIN
```

exo 9

```JS
variable min entier
variable max entier
variable intToFind entier
variable intChoices entier

DEBUT
	intChoices = min
	TantQue (intChoices != intToFind) Faire
		intChoices = intChoices +1
	FinTantQue
	ecrire intChoices
FIN
```

exo 9 bis

```JS
variable min entier
variable max entier
variable intToFind entier
variable intChoices entier

DEBUT
	Faire
		ecrire "choisissez un nombre entre ".min." et ".max
		lire intChoices
		if(intChoices < intToFind) Alors
			ecrire "c'est moins"
		if(intChoices > intToFind) Alors
			ecrire "c'est plus"
	TantQue (intChoices != intToFind)
FIN
```
