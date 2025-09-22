const express = require("express");
const passport = require("passport");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDB = require("./server/config/dbconfig.js");
const recipesRouter = require("./server/routes/recipes-routes.js");
const customRecipesRouter = require("./server/routes/customrecipes-routes.js");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

// DB connection
connectDB();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Passport config
const configurePassport = require("./server/config/passport.js");
configurePassport(passport);
app.use(passport.initialize());

// Static frontend
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/", recipesRouter);
app.use("/", customRecipesRouter);

// Google Auth
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  (req, res) => {
    if (!req.user || !req.user.token)
      return res.redirect("/?error=login_failed");

    // Guardar token en cookie temporal para frontend
    res.cookie("tmpToken", req.user.token, {
      httpOnly: false, // frontend puede leer
      sameSite: "None",
      secure: true,
      maxAge: 10 * 60 * 1000, // 10 minutos
    });

    res.redirect("/index.html");
  }
);

// Endpoint temporal para que el frontend obtenga el token y lo guarde en localStorage
app.get("/get-token", (req, res) => {
  const token = req.cookies.tmpToken;
  if (!token) return res.json({ token: null });

  res.clearCookie("tmpToken"); // limpiar cookie después de usar
  res.json({ token });
});

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
