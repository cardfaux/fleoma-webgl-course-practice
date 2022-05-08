/*
===============================================================================
IMPORTS
===============================================================================
*/
// system imports
const path = require("path");

// third partys imports
require("dotenv").config();
const express = require("express");

// prismic imports
const Prismic = require("@prismicio/client");
const PrismicDOM = require("prismic-dom");

// initialize express
const app = express();
const port = process.env.PORT || 3000;

/*
===============================================================================
PRISMIC CONFIG
===============================================================================
*/
const initApi = (req) => {
  return Prismic.getApi(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    req: req,
  });
};

/*
===============================================================================
PRISMIC LINK RESOLVER
===============================================================================
*/
const handleLinkResolver = (doc) => {
  // Define the url depending on the document type
  // if (doc.type === 'page') {
  //   return '/page/' + doc.uid;
  // } else if (doc.type === 'blog_post') {
  //   return '/blog/' + doc.uid;
  // }

  // Default to homepage
  return "/";
};

/*
===============================================================================
PRISMIC MIDDLEWARE
===============================================================================
*/
app.use((req, res, next) => {
  res.locals.ctx = {
    endpoint: process.env.PRISMIC_ENDPOINT,
    linkResolver: handleLinkResolver,
  };

  res.locals.PrismicDOM = PrismicDOM;

  next();
});

/*
===============================================================================
SET VIEW ENGINE
===============================================================================
*/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

/*
===============================================================================
ROUTES
===============================================================================
*/

// homepage
app.get("/", async (req, res) => {
  res.render("pages/home");
});

// about
app.get("/about", async (req, res) => {
  initApi(req).then((api) => {
    api
      .query(Prismic.Predicates.any("document.type", ["about", "meta"]))
      .then((response) => {
        // response is the response object. Render your views here.

        // destructure the response
        const { results } = response;
        // destructure the results
        const [about, meta] = results;

        console.log(about, meta);

        res.render("pages/about", {
          about,
          meta,
        });
      });
  });
});

// collection
app.get("/collections", async (req, res) => {
  res.render("pages/collection");
});

// detail
app.get("/detail/:uid", async (req, res) => {
  res.render("pages/detail");
});

/*
===============================================================================
START THE EXPRESS SERVER
===============================================================================
*/
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
