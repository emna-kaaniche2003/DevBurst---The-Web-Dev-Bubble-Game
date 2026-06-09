# 🚀 DevBurst - The Web Dev Bubble Game

**DevBurst** est un jeu vidéo éducatif et interactif développé en JavaScript natif (Vanilla JS). Inspiré de l'univers du développement web, le jeu met au défi les utilisateurs de "faire éclater" les bonnes bulles technologiques (balises valides, propriétés réelles) tout en évitant les pièges et imposteurs syntaxiques, le tout sous la pression d'un compte à rebours dynamique.

---

## 🎬 Démo Vidéo & Aperçu

Voici une démonstration vidéo des fonctionnalités principales et du gameplay de l'application :



https://github.com/user-attachments/assets/81836e2c-3d59-42ba-8d3c-cf92cd24010b



---

## 🎮 Concept du Jeu & Niveaux

Le jeu intègre une barre de progression de chargement de type "Terminal/VS Code" à l'initialisation et s'articule autour de **4 niveaux progressifs** :

1. **📘 Niveau 1 : HTML – Le squelette du web**
   * *Objectif :* Identifier les balises HTML de structure, de formulaires (`<input>`, `<label>`) et de tableaux (`<table>`, `<tr>`) valides.
2. **🎨 Niveau 2 : CSS – Le style du web**
   * *Objectif :* Repérer les propriétés et sélecteurs de style authentiques et contourner les pièges cosmétiques.
3. **⚡ Niveau 3 : JavaScript – La logique du web**
   * *Objectif :* Maîtriser la syntaxe, les mots-clés essentiels et les fonctions natives de la logique algorithmique.
4. **🌐 Niveau 4 : DOM & Events – L'interaction**
   * *Objectif :* Sélectionner les bonnes méthodes de capture (`querySelector`, `getElementById`), de manipulation (`.textContent`, `.classList`) et les types d'événements valides (`click`, `submit`).

---

## 🏗️ Architecture & Structure du Code

Le projet est conçu selon une architecture modulaire et découplée (sans framework), facilitant la maintenance et l'évolution du moteur de jeu :

```
DevBurst/
├── index.html                  # Structure HTML5 principale et conteneurs des écrans/modales
├── css/                        # Feuilles de styles structurées et thèmes du jeu
│   ├── base.css                # Réinitialisations et styles de base
│   ├── components.css          # Styles des boutons, modales et éléments d'interface
│   ├── game.css                # Design du canvas de jeu, des bulles et des animations de score
│   ├── layout.css              # Organisation spatiale des écrans (Grids, Flexbox)
│   └── theme-dark.css          # Design inspiré de l'éditeur de code VS Code (Mode Sombre)
├── js/
│   ├── main.js                 # Point d'entrée principal et orchestration de la logique globale
│   ├── state.js                # Gestion centralisée de l'état du jeu (scores, niveaux, mute/unmute)
│   ├── ui.js                   # Gestion de l'affichage, des fenêtres modales et des popups de score
│   ├── utils.js                # Fonctions utilitaires génériques (mélange Fisher-Yates, gestion audio)
│   ├── bubbleEngine.js         # Moteur de génération, d'animation et de nettoyage des bulles de jeu
│   ├── collision.js            # Algorithmes de détection des clics dans les bulles et effets de particules
│   ├── timer.js                # Compte à rebours autonome avec alertes audio "Tic-Tac" (phases critiques)
│   └── data/
│       ├── levels.js           # Configuration structurée des questions (vrais/faux objets et patterns)
│       └── explanations.js     # Contenu pédagogique textuel affiché au début de chaque niveau
└── assets/                     # Ressources médias
├── images/                 # Icônes et placeholders graphiques
└── sounds/                 # Effets sonores (bubble-pop.mp3, correct.mp3, wrong.mp3, clock.mp3, background-music.mp3)
```
---

## 🛠️ Fonctionnalités Techniques Clés

* **Moteur d'Animation et de Collision Capillaire :** Gestion dynamique du positionnement spatial et du rendu visuel des cibles de jeu (bulles).
* **Système de Particules (Burst Effect) :** Génération instantanée d'effets visuels colorés (Vert = Correct / Rouge = Erreur) lors de l'éclatement d'une bulle.
* **Gestion Audio Avancée (Mute/Unmute spatial) :** Système d'atténuation sonore adaptatif. Volume de fond musical discret (`15%`) avec options de coupure globale (`Mute`) qui préservent l'accessibilité ou bloquent les bruitages à la volée.
* **Boucle de Feedback Temporel :** Intégration d'un module de décompte asynchrone qui déclenche un signal sonore d'urgence ("Tic-Tac") lors des 3 dernières secondes disponibles pour intensifier l'expérience de jeu.

---

## 🚦 Installation et Lancement Local

Ce projet est purement *Front-End* (Client-Side). Aucun serveur ou base de données externe n'est requis.

### Préquikis
* Un navigateur web moderne (Chrome, Firefox, Edge, Safari).

### Étapes de lancement
1. **Cloner le dépôt sur votre machine :**
   ```bash
   git clone https://github.com/emna-kaaniche2003/DevBurst---The-Web-Dev-Bubble-Game.git
   cd DevBurst
