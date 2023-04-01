import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();
        res.json(posts);

    } catch (err) {
        res.status(500).json({
            message: 'Не удалось вернуть все статьи',
        });
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await PostModel.findOneAndUpdate(
        {
            _id: postId,
        }, 
        {
            $inc: { viewsCount: 1 },
        },
        {
            returnDocument: 'after',
        })
        .then((doc) => {
            if (!doc) {
                return res.status(404).json({
                    message: 'Статья не найдена',
                });
            }
            res.json(doc);
        })
        .catch((err, doc) => {
             if (err) {
                return res.status(500).json({
                    message: 'Не удалось вернуть статью',
                });
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось вернуть статью',
        });
    }
}

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

        const post = await doc.save();
        
        res.json(post);

    } catch (err) {
        res.status(500).json({
            message: 'Не удалось создать пост',
        });
    }
}

export const update = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

        const post = await doc.save();
        
        res.json(post);

    } catch (err) {
        res.status(500).json({
            message: 'Не удалось создать пост',
        });
    }
}

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const posts = await PostModel.deleteOne(postId);
        res.json(posts);
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось создать пост',
        });
    }
}
