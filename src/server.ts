import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import { renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';
import { AppServerModuleNgFactory } from '../dist/ngfactory/src/app/app.server.module.ngfactory';
import * as express from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';


const contentful = require('contentful')
const contenfulClient = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_TOKEN
});

const PORT = process.env.PORT || 4000;

enableProdMode();

const app = express();

const template = readFileSync(join(__dirname, '..', 'dist', 'index.html')).toString();

app.engine('html', (_, options, callback) => {

  const opts = { document: template, url: options.req.url };

  renderModuleFactory(AppServerModuleNgFactory, opts)
    .then(html => callback(null, html)).catch(err => callback(err, null));

});

app.set('view engine', 'html');
app.set('views', 'src');

app.get('/api/:type', (req, res) => {
  contenfulClient.getEntries()
    .then(response => {
      res.send(
        response.items
          .filter(item => item.sys.contentType.sys.id === req.params.type)
          .map(item => item.fields)
      );
    })
    .catch(err => {
      console.error(err);
      res.send(JSON.stringify(err));
    });
});
app.get('/api/band/:band', (req, res) => {
  contenfulClient.getEntries()
    .then(response => {
      res.send(
        response.items
          .filter(item => item.sys.contentType.sys.id === 'bands')
          .map(band => band.fields)
          .filter(band => {
            return band.name.replace(/\s/g, '-').replace(/[^a-zA-Z\-]/g, '').toLowerCase() === req.params.band;
          })
      );
    })
    .catch(err => {
      console.error(err);
      res.send(JSON.stringify(err));
    });
});

app.get('*.*', express.static(join(__dirname, '..', 'dist')));

app.get('*', (req, res) => {
  res.render('index', { req });
});

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}!`);
});
