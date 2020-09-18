'use strict';

require('dotenv').config();
const express = require('express');
const router = express.Router();

const blogs = require('../models/blogs-model');
const stories = require('../models/stories-model');
const users = require('../models/users-model');

const bearer = require('../middleware/bearer-auth');
const permissions = require('../middleware/authorize');
const basic = require('../middleware/basic');
const token = require('../middleware/token');


// AUTH ROUTES
router.post('/signup', signupHandler);
router.post('/signin',basic,token, signinHandler);

// WRITER USER ROUTES
router.get('/blogs', getAllBlogs);
router.post('/blog', postBlogs);
router.post('/newStory/:username',bearer, newStory);
router.get('/stories/:blog', getBlogStories);
router.get('/story/:id', getOneStory);
router.post('/addToStory/:id', bearer, addToStory);

// ADMIN USER ROUTES
router.get('/statusAll', bearer, permissions('admin'), getAllStories);
router.get('/status/:id', bearer, permissions('admin'), getOneStory);
router.put('/status/:id', bearer, permissions('admin'), editOneStory);



//HANDLERS:

/////// UPDATE STORY BY ADMIN
function editOneStory(req, res,next)  {
    stories 
      .update(req.params.id,req.body)
      .then(data =>res.json(data))
      .catch(err=>next(err.message));  
  }
  
  /////// GET ALL STORIES BY ADMIN
  function getAllStories(req, res, next) {
    stories
      .get()
      .then((data) => res.json(data))
      .catch((err) => next(err.message));
  }
  
 
/////// ADD TO STORY
async function addToStory(req, res, next) {
    try {
      let story = (await stories.get(req.params.id))[0];
      console.log('req.params.id ----------->', story);
      let commentBody = {};
      commentBody.username = req.user.username;
      commentBody.theComment = req.body.theComment;
      console.log('story before push ----------->', story);
      console.log('comment ---------->', commentBody);
      story.comment.push(commentBody);
    //   let updated = await stories.update(req.params.id, story);
    //   console.log('story after push -------->', updated);
      res.json(story);
    }
    catch (e) {
      next(e.message);
    }
  }
  

/////// GET ONE STORY
async function getOneStory(req, res, next) {
    console.log('oneStory------>',req.params.id);
    stories
    .get(req.params.id)
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch(err => next(err.message));
  }

/////// GET BLOG'S STORIES 
function getBlogStories(req, res, next) {
    let query = req.params.blog;
    stories.searchGet({ blogTitle : query })
      .then(data => {
        console.log(data);
        res.json(data);
      })
      .catch(err => next(err.message));
  }

/////// POST NEW STORY
async function newStory(req, res, next) {
    console.log('req.user.username', req.user.username);
    console.log('req.params.username', req.params);
  
    if (req.params.username === req.user.username) {
      try {
        req.body.username = req.user.username;
        const data = await stories.create(req.body);
        res.json(data);
      } catch (e) {
        next(e.message);
      }
    } else {
      next('Invalid User Post');
    }
  }

/////// POST BLOGS
function postBlogs(req, res, next) {
    blogs.create(req.body)
      .then(data => {
        console.log(data);
        res.json(data);
      })
      .catch(err => next(err.message));
  }

   /////// GET ALL BLOGS
function getAllBlogs(req, res, next) {
    blogs.get()
      .then(data => {
        console.log(data);
        res.json(data);
      })
      .catch(err => next(err.message));
  }

/////// SIGN UP HANDLER
function signupHandler (req, res,next)  {
    console.log('signupHandler');
    users
      .createUser(req.body)
      .then((user) => {
        console.log('this is user after sign up',user);
        const token = users.generateToken(user);
        req.user=user;
        return token;
      }).then(token=>{
        console.log('token',token);
        req.token=token;
        return users.update(req.user._id,{token:req.token});
      }).then((userUpdate)=>{
        console.log('userUpdated',userUpdate);
        req.user = userUpdate;
        res.json({ token:req.token }); 
      })
      .catch((err) => next(err));
  }
  
  /////// SIGN IN HANDLER
  function signinHandler(req, res,next)  {
    console.log('signinHandler');
    res.json({ token: req.token });
  }
 



module.exports = router;