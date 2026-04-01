# Recipes App

Read this in other languages:

- 🇪🇸 Español: [README.es.md](README.es.md)

A full-stack web application to discover, save, and create recipes with a clean and intuitive user experience.

---

## Live Demo

- https://recipes-app-af73.onrender.com/

---

## Features

* **Search Recipes** by name or discover random dishes
* **Detailed Views** with ingredients and step-by-step instructions
* **Google Authentication** using secure OAuth login
* **Favorites System** to save and manage recipes
* **Custom Recipes CRUD** (create, edit, delete your own recipes)

---

## Problem & Solution

**Problem:**
Finding recipes quickly while keeping a personalized collection is often fragmented across different platforms.

**Solution:**
Recipes App centralizes recipe discovery and personal management in a single interface, combining external API data with user-generated content and authentication.

---

## Architecture & Technical Decisions

* Separation of concerns between frontend and backend
* RESTful API built with Express
* MongoDB used for persistent user data and custom recipes
* JWT-based authentication for session handling
* Google OAuth integration via Passport for secure login
* External API consumption (TheMealDB) handled asynchronously

---

## Tech Stack

**Frontend**

* HTML
* CSS
* JavaScript

**Backend**

* Node.js
* Express
* MongoDB
* Axios
* JWT

**Authentication**

* Passport (Google OAuth)

**External API**

* TheMealDB

---

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/PedroCondomi/Recipes-app
cd Recipes-app
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables provided in `.env.example`:

4. Start the application:

```bash
npm run start
```

5. Open in your browser:

```
http://localhost:8080
```

---

## Usage

### Search Recipes

* Use the search bar to find recipes by name
* Discover new meals with the random recipe feature

### Recipe Details

* View ingredients, measurements, and preparation steps

### Favorites

* Log in with Google
* Save or remove recipes from your favorites

### Custom Recipes

* Create your own recipes
* Edit or delete them anytime

---

## Screenshots
### Search by name or select a random recipe
<img width="1935" height="861" alt="Sin título" src="https://github.com/user-attachments/assets/94c8617e-86e3-4656-aa0f-bdefbe670075" />

### Recipe details and bookmark
<img width="1464" height="929" alt="Sin título2" src="https://github.com/user-attachments/assets/05fedfdd-0e98-47ad-a8da-8b17dd8df9bd" />

### Create and edit custom recipes
<img width="893" height="820" alt="Sin título3" src="https://github.com/user-attachments/assets/ff0e3dc1-6951-4aa3-9232-32650328126a" />

### Custom recipe display
<img width="892" height="1056" alt="Sin título4" src="https://github.com/user-attachments/assets/f4cf534a-9e68-447e-ae55-6e7b67988cfe" />

---

## Future Improvements

* Add filtering by categories or ingredients
* Implement image upload for custom recipes
* Add Dark Mode
* Add localization

---

## Author

### Pedro Condomí

- GitHub: https://github.com/PedroCondomi

---

### If you like this project...

Give it a star ⭐ and feel free to reach out!

Feel free to connect or check out more of my work.
