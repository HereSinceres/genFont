const fs = require('fs/promises');
const path = require('path');

async function isExists(path) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
};

exports.writeFile = async (filePath, data)=> {
  try {
      console.log(filePath)
    const dirname = path.dirname(filePath);
    const exist = await isExists(dirname);
    if (!exist) {
      await fs.mkdir(dirname, {recursive: true});
    }
    
    await fs.writeFile(filePath, data, 'utf8');
  } catch (err) {
    throw new Error(err);
  }
}