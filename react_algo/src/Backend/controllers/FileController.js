const File = require('../Models/File');

exports.getFiles = async (req, res) => {
  try {
    const files = await File.find();
    if (files.length === 0) {
      return res.status(404).json({ error: 'No files found' });
    }
    return res.json(files);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.uploadFile = async (req, res) => {
  try {
    const file = new File({
      filename: req.file.filename,
      uploadDate: new Date(),
      contentType: req.file.contentType,
      size: req.file.size
    });
    await file.save();
    return res.json(file);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    await File.deleteOne({ _id: req.params.id });
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};