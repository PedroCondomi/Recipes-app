# Recipes App

Lee esto en otros idiomas:

* en English: [README.md](README.md)

Aplicación web full-stack para descubrir, guardar y crear recetas con una experiencia de usuario limpia e intuitiva.

---

## Versión en vivo

* https://recipes-app-af73.onrender.com/

---

## Funcionalidades

* **Buscar recetas** por nombre o descubrir platos aleatorios
* **Vista detallada** con ingredientes e instrucciones paso a paso
* **Autenticación con Google** mediante OAuth
* **Sistema de favoritos** para guardar y gestionar recetas
* **CRUD de recetas personalizadas** (crear, editar y eliminar tus propias recetas)

---

## Problema y solución

**Problema:**
Encontrar recetas rápidamente mientras se mantiene una colección personalizada suele ser un proceso fragmentado entre distintas plataformas.

**Solución:**
Recipes App centraliza el descubrimiento de recetas y la gestión personal en una sola interfaz, combinando datos de APIs externas con contenido generado por el usuario y autenticación.

---

## Arquitectura y decisiones técnicas

* Separación de responsabilidades entre frontend y backend
* API REST desarrollada con Express
* MongoDB para persistencia de usuarios y recetas personalizadas
* Autenticación basada en JWT para manejo de sesiones
* Integración con Google OAuth mediante Passport
* Consumo asíncrono de API externa ([TheMealDB](https://www.themealdb.com/))

---

## Tecnologías

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

**Autenticación**

* Passport (Google OAuth)

**API externa**

* ([TheMealDB](https://www.themealdb.com/))

---

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/PedroCondomi/Recipes-app
cd Recipes-app
```

2. Instalar dependencias:

```bash
npm install
```

3. Configurar variables de entorno como indica `.env.example`

4. Iniciar la aplicación:

```bash
npm run start
```

5. Abrir en el navegador:

```
http://localhost:8080
```

---

## Uso

### Buscar recetas

* Usar la barra de búsqueda para encontrar recetas por nombre
* Descubrir nuevas comidas con la función de receta aleatoria

### Detalle de receta

* Ver ingredientes, medidas e instrucciones de preparación

### Favoritos

* Iniciar sesión con Google
* Guardar o eliminar recetas de favoritos

### Recetas personalizadas

* Crear tus propias recetas
* Editarlas o eliminarlas en cualquier momento

---

## Capturas de pantalla

### Búsqueda por nombre o receta aleatoria

<img width="1935" height="861" alt="Sin título" src="https://github.com/user-attachments/assets/94c8617e-86e3-4656-aa0f-bdefbe670075" />

### Detalle de receta y favoritos

<img width="1464" height="929" alt="Sin título2" src="https://github.com/user-attachments/assets/05fedfdd-0e98-47ad-a8da-8b17dd8df9bd" />

### Crear y editar recetas personalizadas

<img width="893" height="820" alt="Sin título3" src="https://github.com/user-attachments/assets/ff0e3dc1-6951-4aa3-9232-32650328126a" />

### Visualización de receta personalizada

<img width="892" height="1056" alt="Sin título4" src="https://github.com/user-attachments/assets/f4cf534a-9e68-447e-ae55-6e7b67988cfe" />

---

## Mejoras futuras

* Agregar filtros por categorías o ingredientes
* Implementar subida de imágenes para recetas personalizadas
* Añadir modo oscuro
* Soporte de múltiples idiomas (localización)

---

## Autor

### Pedro Condomí

* GitHub: https://github.com/PedroCondomi

---

## Apoyar el proyecto

Si este proyecto resulta de interés, se agradece considerarlo con una estrella ⭐ en el repositorio y no dudes en establecer contacto.

También podés ver más de mi trabajo o conectar conmigo.
