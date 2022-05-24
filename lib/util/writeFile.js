const fs = require('fs');
const path = require('path');

function isExists(path) {
    try {
        fs.accessSync(path);
        return true;
    } catch {
        return false;
    }
}

exports.writeFile = async (filePath, data) => {
    try {
        const dirname = path.dirname(filePath);
        const exist = isExists(dirname);
        if (!exist) {
            fs.mkdirSync(dirname, { recursive: true });
        }

        fs.writeFileSync(filePath, data, 'utf8');
    } catch (err) {
        throw new Error(err);
    }
};
