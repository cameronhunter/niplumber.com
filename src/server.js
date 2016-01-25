import Express from "express";
import compression from "compression";
import path from "path";

import React from "react";
import ReactDOM from "react-dom/server";
import { match, RouterContext } from "react-router";

import routes from "./routes";

const app = new Express();

app.use(compression());
app.use(Express.static(path.join(__dirname, "..", "static")));

app.use((request, response, next) => {
  match({ routes: routes, location: request.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      return response.send(500, error.message);
    }

    if (redirectLocation) {
      return response.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) {
      return response.send(404);
    }

    const html = ReactDOM.renderToString(
      <RouterContext {...renderProps} />
    );

    response.status(200).send(`
      <!doctype html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>
          <main id="app">${html}</main>
          <script src="/dist/app.js"></script>
        </body>
      </html>
    `);
  });
});

export default app;
