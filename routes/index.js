/**
 * 
 * Publicly available paths for the domain on which the site will be hosted
 * Error handling for HTTP errors
 *
 **/

const express = require('express');
const router = express.Router();
const { projects } = require('../data.json'); // This file contains all projects to be showcased on this site

router.get('/', (req, res) => {
  res.render('index', { projects });
});

router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/project/:id', (req, res, next) => {
  if (projects[req.params.id]) {
    const pageData = projects[req.params.id];
    res.render('project', pageData);
  } else {
    const err = new Error();
    err.status = 404;
    err.message = 'The project you requested does not exist.';
    next(err);
  }
});

router.use((req, res, next) => {
  const err = new Error();
  err.status = 404;
  err.message = 'The requested page does not exist.';
  res.statusMessage = err.message;
  res.status(404).render('page-not-found', { err });
  console.log(`Error ${err.status}:`, err.message);
});

router.use((err, req, res, next) => {
  res.statusMessage = err.message;
  if (err.status === 404) {
    res.status(404).render('page-not-found', { err });
  } else {
    err.message = err.message || 'Oops! It looks like something went wrong on the server.';
    res.status(err.status || 500).render('error', { err });
  }
  console.log(`Error ${err.status}:`, err.message);
});

module.exports = router;
