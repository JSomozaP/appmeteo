# 🌤️ Meteopouik - Application Météo

Une application météo moderne et intuitive qui affiche les conditions météorologiques actuelles avec un design élégant et des fonctionnalités avancées.

## ✨ Fonctionnalités

### 🔍 Recherche Intelligente
- **Recherche par ville** : Tapez le nom de n'importe quelle ville dans le monde et appuyez sur Entrée
- **Recherche par coordonnées** : Entrez manuellement la latitude et longitude pour une localisation précise
- **Géolocalisation** : Bouton "Chez moi" pour obtenir automatiquement la météo de votre position actuelle

![Interface principale](screenshots/appmeteo%20interface.png)

### 🌙 Thème Adaptatif Jour/Nuit
L'application change automatiquement de thème en fonction de l'heure locale de la zone recherchée :
- **Thème jour** : Dégradé bleu clair et lumineux
- **Thème nuit** : Dégradé bleu foncé et apaisant

![Mode nuit](screenshots/appmeteo%20test%20mode%20nuit%20pour%20localisation%20ou%20il%20fait%20nuit.png)

### 🎯 Affichage Météo Détaillé
- **Température actuelle** en temps réel
- **Icônes météo expressives** basées sur les conditions réelles (émojis)
- **Nom de la ville** recherchée
- **Heure locale** convertie en heure de Paris

![Affichage météo avec émojis](screenshots/appmeteo%20test%20affichage%20pluie%20via%20emoticone.png)

### 📱 Interface Utilisateur
- Design moderne avec effets de transparence (backdrop-filter)
- Interface responsive adaptée à tous les écrans
- Transitions fluides entre les thèmes
- Boutons élégants avec effets de survol

![Fonctionnalité de recherche](screenshots/appmeteo%20test%20recherche.png)
![Géolocalisation](screenshots/appmeteo%20test%20bouton%20chez%20moi%20avec%20geolocalisation.png)

## 🚀 Technologies Utilisées

- **HTML5** : Structure sémantique de l'application
- **CSS3** : 
  - Dégradés CSS avancés
  - Effets de flou (backdrop-filter)
  - Transitions et animations
  - Design responsive
- **JavaScript ES6+** :
  - API Fetch pour les requêtes
  - Async/Await pour la gestion asynchrone
  - Géolocalisation du navigateur
  - Manipulation du DOM

## 🌐 APIs Utilisées

### Open-Meteo API
- **API Météo** : `https://api.open-meteo.com/v1/forecast`
  - Données météo en temps réel
  - Codes météo standardisés (WMO)
  - Heures de lever/coucher du soleil
  - Fuseau horaire local

- **API Geocoding** : `https://geocoding-api.open-meteo.com/v1/search`
  - Conversion nom de ville → coordonnées géographiques
  - Support multilingue (français)
  - Base de données mondiale des villes

## 📋 Installation et Utilisation

### Prérequis
- Navigateur web moderne supportant :
  - ES6+ (async/await)
  - API Geolocation
  - CSS backdrop-filter

### Installation
1. Clonez ou téléchargez le projet
```bash
git clone [url-du-repo]
cd appmeteo
```

2. Ouvrez le fichier `index.html` dans votre navigateur
```bash
# Ou servez les fichiers via un serveur local
python -m http.server 8000
# Puis ouvrez http://localhost:8000
```

### Utilisation

#### Recherche par ville
1. Tapez le nom d'une ville dans le champ de recherche
2. Appuyez sur **Entrée**
3. La météo s'affiche automatiquement avec le thème approprié

#### Recherche par coordonnées
1. Entrez la latitude dans le premier champ
2. Entrez la longitude dans le deuxième champ
3. Cliquez sur **"Rechercher"**

#### Géolocalisation
1. Cliquez sur le bouton **"Chez moi"**
2. Autorisez l'accès à votre position
3. La météo de votre localisation s'affiche

## 🎨 Codes Météo Supportés

L'application affiche des émojis correspondant aux conditions météorologiques :

| Code | Condition | Émoji |
|------|-----------|-------|
| 0 | Ciel dégagé | ☀️ |
| 1 | Principalement dégagé | 🌤️ |
| 2 | Partiellement nuageux | ⛅ |
| 3 | Couvert | ☁️ |
| 45-48 | Brouillard | 🌫️ |
| 51-67 | Pluie/Bruine | 🌧️ |
| 71-86 | Neige | 🌨️ |
| 80-82 | Averses | 🌦️ |
| 95-99 | Orages | ⛈️ |

## 🔧 Structure du Projet

```
appmeteo/
├── index.html          # Page principale
├── style.css           # Styles et thèmes
├── main.js             # Logique de l'application
├── README.md           # Documentation
├── LICENSE             # Licence MIT
└── screenshots/        # Captures d'écran
    ├── appmeteo interface.png
    ├── appmeteo test affichage pluie via emoticone.png
    ├── appmeteo test bouton chez moi avec geolocalisation.png
    ├── appmeteo test mode nuit pour localisation ou il fait nuit.png
    └── appmeteo test recherche.png
```

## 🌟 Fonctionnalités Avancées

### Thème Adaptatif Intelligent
- Calcul automatique jour/nuit basé sur les données de lever/coucher du soleil
- Transition fluide entre les thèmes (1 seconde)
- Adaptation en temps réel selon la zone géographique recherchée

### Gestion des Erreurs
- Messages d'erreur informatifs pour l'utilisateur
- Fallback en cas d'échec de géolocalisation
- Validation des coordonnées entrées manuellement

### Performance et UX
- Requêtes API optimisées
- Interface réactive et fluide
- Support des raccourcis clavier (Entrée pour rechercher)

## 🚦 Compatibilité

### Navigateurs Supportés
- ✅ Chrome 76+
- ✅ Firefox 72+
- ✅ Safari 13+
- ✅ Edge 79+

### APIs Requises
- ✅ Fetch API
- ✅ Geolocation API
- ✅ CSS backdrop-filter
- ✅ ES6 Modules

## 🐛 Résolution de Problèmes

### La géolocalisation ne fonctionne pas
- Vérifiez que vous avez autorisé l'accès à la localisation
- Assurez-vous que le site est servi en HTTPS (requis pour la géolocalisation)

### Les données météo ne s'affichent pas
- Vérifiez votre connexion internet
- L'API Open-Meteo peut avoir des limites de débit

### Le thème ne change pas
- Vérifiez que les données de lever/coucher du soleil sont disponibles
- Certaines régions polaires peuvent ne pas avoir ces données

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Proposer de nouvelles fonctionnalités
- Améliorer la documentation
- Optimiser le code

## 📞 Contact

Pour toute question ou suggestion concernant Meteopouik, n'hésitez pas à ouvrir une issue dans le repository.

---

*Développé avec ❤️ en utilisant les APIs Open-Meteo*
