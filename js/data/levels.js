// Game Levels Configuration

const GAME_LEVELS = [
    // LEVEL 1 - HTML
    {
        id: 1,
        name: "HTML",
        fileName: "level1.html",
        badge: "HTML",
        bubbleType: "html",
        questions: [
            {
                title: "Sélectionner les balises HTML valides",
                tip: "Tip: les balises HTML sont toujours entourées de < >",
                correct: ["<p>", "<h1>", "<table>", "<div>", "<span>", "<a>", "<ul>", "<li>"],
                incorrect: ["<pp>", "<text>", "<bodyy>", "<paragh>", "<titulo>", "<link1>"]
            },
            {
                title: "Sélectionner les balises des tableaux",
                tip: "Tip: les tableaux utilisent table, tr, td et thead",
                correct: ["<table>", "<tr>", "<td>", "<thead>", "<tbody>", "<th>"],
                incorrect: ["<row>", "<column>", "<cell>", "<tabelle>", "<grid>"]
            },
            {
                title: "Sélectionner les balises des formulaires",
                tip: "Tip: les formulaires ont input, label, form, select",
                correct: ["<form>", "<input>", "<label>", "<select>", "<textarea>", "<button>"],
                incorrect: ["<formulaire>", "<entry>", "<campo>", "<submit>", "<textfield>"]
            },
            {
                title: "Sélectionner les balises de structure",
                tip: "Tip: header, footer, section et nav structurent la page",
                correct: ["<header>", "<footer>", "<section>", "<nav>", "<main>", "<article>"],
                incorrect: ["<content>", "<container>", "<page>", "<sidebar>", "<layout>"]
            }
        ]
    },
    
    // LEVEL 2 - CSS
    {
        id: 2,
        name: "CSS",
        fileName: "level2.css",
        badge: "CSS",
        bubbleType: "css",
        questions: [
            {
                title: "Propriétés d'alignement",
                tip: "Tip: text-align, align-items et justify-content alignent le contenu",
                correct: ["text-align", "align-items", "justify-content", "vertical-align", "align-self"],
                incorrect: ["text-position", "align-text", "content-align", "position-text"]
            },
            {
                title: "Propriétés liées aux couleurs",
                tip: "Tip: color, background-color et border-color changent les couleurs",
                correct: ["color", "background-color", "border-color", "opacity", "background"],
                incorrect: ["font-color", "bgcolor", "text-color", "colour", "back-color"]
            },
            {
                title: "Propriétés liées aux marges/espacements",
                tip: "Tip: margin, padding et gap gèrent les espacements",
                correct: ["margin", "padding", "gap", "margin-top", "padding-left"],
                incorrect: ["space", "outer-margin", "inner-padding", "spacing", "distance"]
            },
            {
                title: "Propriétés liées à la taille",
                tip: "Tip: width, height et max-width contrôlent les dimensions",
                correct: ["width", "height", "max-width", "min-height", "max-height"],
                incorrect: ["auto-size", "length", "size", "dimension", "largeur"]
            }
        ]
    },
    
    // LEVEL 3 - JavaScript
    {
        id: 3,
        name: "JavaScript",
        fileName: "level3.js",
        badge: "JS",
        bubbleType: "js",
        questions: [
            {
                title: "Fonctions natives",
                tip: "Tip: parseInt, alert et setTimeout sont des fonctions JS natives",
                correct: ["parseInt()", "alert()", "setTimeout()", "console.log()", "prompt()"],
                incorrect: ["toUpper()", "wait()", "sleep()", "display()", "show()"]
            },
            {
                title: "Types de données JS",
                tip: "Tip: string, boolean, number et object sont des types JS",
                correct: ["string", "boolean", "number", "object", "undefined", "null"],
                incorrect: ["char", "integer", "float", "double", "int"]
            },
            {
                title: "Mots-clés du langage",
                tip: "Tip: let, const, return et function sont des mots-clés JS",
                correct: ["let", "const", "return", "function", "if", "else"],
                incorrect: ["varr", "set", "fun", "ret", "func", "define"]
            },
            {
                title: "Méthodes de tableaux",
                tip: "Tip: map, filter et push sont des méthodes de tableaux",
                correct: ["map()", "filter()", "push()", "includes()", "forEach()"],
                incorrect: ["add()", "contains()", "inject()", "append()", "insert()"]
            }
        ]
    },
    
    // LEVEL 4 - DOM & Events
    {
        id: 4,
        name: "DOM & Events",
        fileName: "level4.js",
        badge: "DOM",
        bubbleType: "dom",
        questions: [
            {
                title: "Méthodes de sélection DOM",
                tip: "Tip: querySelector et getElementById sélectionnent des éléments",
                correct: ["querySelector()", "getElementById()", "querySelectorAll()", "getElementsByClassName()"],
                incorrect: ["selectById()", "query()", "getElement()", "findElement()"]
            },
            {
                title: "Types d'événements",
                tip: "Tip: click, keyup et submit sont des événements DOM",
                correct: ["click", "keyup", "submit", "mouseover", "mouseout", "change"],
                incorrect: ["enter", "scrollup", "write", "press", "tap"]
            },
            {
                title: "Propriétés de manipulation DOM",
                tip: "Tip: textContent, innerHTML et classList manipulent le DOM",
                correct: [".textContent", ".innerHTML", ".classList", ".style", ".value"],
                incorrect: [".content", ".innerTextHTML", ".classNames", ".text", ".html"]
            },
            {
                title: "Méthodes d'ajout/suppression",
                tip: "Tip: append, appendChild et remove modifient le DOM",
                correct: ["append()", "appendChild()", "remove()", "removeChild()"],
                incorrect: ["addNode()", "destroy()", "delete()", "insertNode()"]
            }
        ]
    }
];