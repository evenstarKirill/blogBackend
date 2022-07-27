import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec();

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'getting posts failure',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'getting post failure',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'post not found',
          });
        }

        res.json(doc);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'getting posts failure',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findByIdAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            message: 'removing post failure',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'post not found',
          });
        }

        res.status(200).json({
          message: 'post successfully deleted'
        })
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'removing post failure',
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });

    const post = await doc.save();

    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'creating post failure',
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags,
        imageUrl: req.body.imageUrl,
        user: req.userId
      })

        res.status(200).json({
          message: 'post successfully updated'
        })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'removing post failure',
    });
  }
}
