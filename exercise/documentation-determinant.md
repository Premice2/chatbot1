# Documentation : le calculateur de déterminant

Ce document explique le fichier `determinant.html`, ligne par ligne.
Le fichier a 3 parties : le **HTML** (la structure), le **CSS** (l'apparence) et le **JavaScript** (le fonctionnement). L'essentiel est dans le JavaScript.

---

## 1. Le HTML (la structure)

```html
<label for="taille">Taille de la matrice :
  <select id="taille">
    <option value="2">2 × 2</option>
    <option value="3" selected>3 × 3</option>
    <option value="4">4 × 4</option>
    <option value="5">5 × 5</option>
  </select>
</label>
```
- `<select>` : une liste déroulante pour choisir la taille.
- `<option value="3">` : chaque choix. `value` est la valeur lue par JavaScript.
- `selected` : cette option est choisie au départ (3 × 3).
- `id="taille"` : le nom pour retrouver cet élément en JavaScript.

```html
<div id="grille"></div>
```
Une boîte **vide**. JavaScript va y créer les cases de la matrice.

```html
<button id="calculer">Calculer</button>
<button id="vider" class="secondaire">Effacer</button>
```
Deux boutons, chacun avec un `id` pour y brancher un `addEventListener`.

```html
<div id="resultat" aria-live="polite"></div>
```
Une boîte vide où s'affichera le résultat. `aria-live` sert aux lecteurs d'écran : il annonce le résultat quand il change. Tu peux l'ignorer pour l'instant.

---

## 2. Le CSS (l'apparence)

Le CSS ne change pas le fonctionnement, seulement l'aspect. Les points à retenir :

- `:root { --bg: ...; --text: ...; }` : des **variables de couleur** réutilisables dans tout le CSS avec `var(--bg)`.
- `@media (prefers-color-scheme: dark)` : change les couleurs si ton ordinateur est en **mode sombre**.
- `#grille { display: grid; }` : affiche les cases en **grille** (lignes et colonnes).
- `button { ... }` : l'apparence des boutons.
- `:focus-visible` : un contour visible quand on navigue au clavier.

---

## 3. Le JavaScript

### Partie 1 : la fonction `determinant`

```js
function determinant(m) {
```
On crée une fonction qui s'appelle `determinant`. Elle reçoit `m`, la **matrice**, sous forme de tableau de tableaux :
```js
[[2, 0, 1],
 [1, 3, 2],
 [1, 1, 1]]
```
Chaque petit tableau est une **ligne**. `m[0]` est la première ligne, `m[0][1]` est le 2e nombre de la première ligne (donc `0`).

```js
if (m.length === 1) return m[0][0];
```
`m.length` = le nombre de lignes. Si la matrice n'a qu'**une ligne** (1×1), le déterminant est simplement son seul nombre. `return` renvoie le résultat et arrête la fonction.

```js
if (m.length === 2) return m[0][0] * m[1][1] - m[0][1] * m[1][0];
```
Si la matrice est **2×2** `[[a, b], [c, d]]`, on applique la formule **a×d − b×c**.

Ces deux lignes sont les **cas de base** : les cas simples qu'on sait résoudre directement.

```js
let det = 0;
```
Une variable qui va accumuler le résultat, on commence à 0.

```js
for (let col = 0; col < m.length; col++) {
```
Une boucle qui passe sur **chaque colonne** de la première ligne : `col` vaut 0, puis 1, puis 2, etc.

```js
let sousMatrice = m.slice(1).map(ligne =>
  ligne.filter((_, index) => index !== col)
);
```
C'est la ligne la plus difficile. On construit une **matrice plus petite** en enlevant la première ligne et la colonne `col`. Étape par étape :

- `m.slice(1)` : copie de la matrice **sans la première ligne**.
- `.map(ligne => ...)` : pour **chaque ligne** restante, on fait le traitement qui suit.
- `ligne.filter((_, index) => index !== col)` : on garde tous les nombres **sauf celui de la colonne `col`**. Le `_` veut dire « la valeur, mais je ne m'en sers pas » : seul l'`index` (la position) nous intéresse.

```js
let signe = col % 2 === 0 ? 1 : -1;
```
Le signe alterne : `+, -, +, -...`
- `col % 2` est le reste de la division par 2 : 0 si `col` est pair, 1 s'il est impair.
- `A ? B : C` veut dire « si A, alors B, sinon C ».
- Colonne paire → `1`, colonne impaire → `-1`.

```js
det += signe * m[0][col] * determinant(sousMatrice);
```
On ajoute à `det` : le **signe** × le **nombre de la première ligne** × le **déterminant de la sous-matrice**.
Ici, la fonction **s'appelle elle-même** : c'est la **récursivité**. Elle recommence avec une matrice plus petite, jusqu'à tomber sur un cas de base (1×1 ou 2×2).

```js
  }
  return det;
}
```
Quand la boucle est finie, on renvoie le total.

### Exemple pas à pas (3×3)

```js
[[2, 0, 1],
 [1, 3, 2],
 [1, 1, 1]]
```

| col | nombre | signe | sous-matrice | det de la sous-matrice | calcul |
|-----|--------|-------|--------------|------------------------|--------|
| 0 | 2 | + | `[[3,2],[1,1]]` | 3×1 − 2×1 = 1 | +2 × 1 = **2** |
| 1 | 0 | − | `[[1,2],[1,1]]` | 1×1 − 2×1 = −1 | −0 × (−1) = **0** |
| 2 | 1 | + | `[[1,3],[1,1]]` | 1×1 − 3×1 = −2 | +1 × (−2) = **−2** |

Total : 2 + 0 − 2 = **0**

---

### Partie 2 : construire la grille

```js
const grille = document.getElementById("grille");
const resultat = document.getElementById("resultat");
```
On récupère les deux boîtes du HTML et on les range dans des variables. `const` = une variable qui ne sera pas réaffectée.

```js
function construireGrille() {
```
Une fonction qui crée les cases de saisie.

```js
let n = parseInt(document.getElementById("taille").value);
```
On lit la taille choisie dans la liste (`"3"`), et `parseInt` la transforme en nombre (`3`).

```js
grille.style.gridTemplateColumns = `repeat(${n}, minmax(48px, 1fr))`;
```
On dit au CSS d'afficher **n colonnes** de largeur égale. Avec `n = 3`, ça donne `repeat(3, ...)`. Les `${n}` dans les accents graves insèrent la valeur de `n` dans le texte, comme dans ton compteur.

```js
grille.innerHTML = "";
```
On **vide** la grille, pour effacer les anciennes cases.

```js
for (let i = 0; i < n * n; i++) {
```
On répète `n × n` fois (9 fois pour du 3×3), une fois par case.

```js
let champ = document.createElement("input");
```
On **crée** un nouvel élément `<input>` en JavaScript (il n'est pas encore sur la page).

```js
champ.type = "number";
champ.step = "any";
champ.value = 0;
```
- `type = "number"` : la case n'accepte que des nombres.
- `step = "any"` : autorise les nombres à virgule.
- `value = 0` : valeur de départ.

```js
champ.setAttribute("aria-label", `Ligne ${Math.floor(i / n) + 1}, colonne ${(i % n) + 1}`);
```
Ajoute une étiquette pour les lecteurs d'écran (« Ligne 1, colonne 2 »). Pas essentiel à comprendre au début.
- `Math.floor(i / n)` : le numéro de ligne.
- `i % n` : le numéro de colonne.

```js
grille.appendChild(champ);
```
On **ajoute** la case dans la grille : elle apparaît à l'écran.

```js
  }
  resultat.textContent = "";
}
```
Quand la boucle est finie, on efface l'ancien résultat.

---

### Partie 3 : lire les cases et calculer

```js
function calculer() {
  let n = parseInt(document.getElementById("taille").value);
  let champs = grille.querySelectorAll("input");
  let matrice = [];
```
- On relit la taille.
- `querySelectorAll("input")` récupère **toutes les cases** de la grille, dans une liste.
- `matrice = []` : un tableau vide qu'on va remplir.

```js
for (let i = 0; i < n; i++) {
  let ligne = [];
  for (let j = 0; j < n; j++) {
```
Deux boucles **imbriquées** : `i` parcourt les lignes, `j` parcourt les colonnes.

```js
let valeur = champs[i * n + j].value;
```
Les cases sont dans une liste à plat (0, 1, 2, 3...). Pour trouver celle de la ligne `i` et de la colonne `j`, on calcule `i * n + j`. Exemple en 3×3 : ligne 1, colonne 2 → `1 × 3 + 2 = 5`.

```js
if (valeur === "") {
  resultat.className = "erreur";
  resultat.textContent = `Remplis toutes les cases (...)`;
  return;
}
```
Si une case est vide, on affiche un message d'erreur et `return` **arrête la fonction** : pas de calcul.

```js
ligne.push(parseFloat(valeur));
```
`parseFloat` transforme le texte en nombre. `push` l'ajoute à la fin du tableau `ligne`.

```js
  }
  matrice.push(ligne);
}
```
Quand une ligne est complète, on l'ajoute à `matrice`.

```js
resultat.className = "";
let det = Math.round(determinant(matrice) * 1e9) / 1e9;
resultat.textContent = `Déterminant = ${det}`;
```
- On retire le style d'erreur.
- On appelle `determinant(matrice)`, la fonction de la partie 1.
- `Math.round(... * 1e9) / 1e9` arrondit à 9 décimales, pour éviter des résultats comme `0.30000000000000004` (un défaut classique des nombres décimaux en informatique).
- On affiche le résultat.

---

### Partie 4 : brancher les boutons

```js
document.getElementById("taille").addEventListener("change", construireGrille);
document.getElementById("calculer").addEventListener("click", calculer);
document.getElementById("vider").addEventListener("click", construireGrille);
```
Comme pour ton compteur : « quand il se passe **telle chose** sur **cet élément**, lance **cette fonction** ».
- Changer la taille → reconstruit la grille.
- Cliquer sur Calculer → lance le calcul.
- Cliquer sur Effacer → reconstruit une grille vide.

```js
construireGrille();
```
On appelle la fonction une fois au chargement, pour que la grille 3×3 soit déjà là à l'ouverture de la page.

---

## Les notions à retenir

| Notion | Où on la voit |
|--------|---------------|
| Fonction | `determinant`, `construireGrille`, `calculer` |
| Boucle `for` | parcourir les colonnes, créer les cases |
| Tableau (`[]`) | la matrice et ses lignes |
| `push` | ajouter un élément à la fin d'un tableau |
| Récursivité | `determinant` qui s'appelle elle-même |
| `createElement` / `appendChild` | créer des éléments HTML en JavaScript |
| `addEventListener` | réagir aux clics et aux changements |
