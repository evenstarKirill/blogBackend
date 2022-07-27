import bcrypt from 'bcrypt';
import UserModel from '../models/User.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      name: req.body.name,
      avatarUrl: req.body.avatarUrl,
      passwordHash: passHash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      { expiresIn: '30d' }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      success: true,
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'registration failed',
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: 'user did not found',
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return res.status(400).json({
        message: 'wrong login or password',
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      { expiresIn: '30d' }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      success: true,
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'authorization failed',
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: 'user did not find',
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json({
      success: true,
      ...userData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'no access',
    });
  }
}
