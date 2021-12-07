import express from 'express'
import Post from '../models/post'
import moment from 'moment'


//import WebSocket from 'ws';




const router = express.Router()
function log(msg) {
    console.log(`[api] ${msg}`);
  }
// TODO 2-(1): create the 1st API (/api/allPosts)
router.get('/allPosts', async (_, res) => {
    let data =await Post.find()
    .sort({timestamp:-1})
    .limit(100);
    console.log(data);
    res.send(data)
    if (data.length) {
        res.status(200).send({
          message: 'success',
          contents: data
        })
      }
      else {
        res.status(403).send({
          message: 'error',
          contents: []
        })
      }
})

    
// TODO 3-(1): create the 2nd API (/api/postDetail)

// TODO 4-(1): create the 3rd API (/api/newPost)

// TODO 5-(1): create the 4th API (/api/post)

export default router