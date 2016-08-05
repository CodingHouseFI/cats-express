const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const dataFilePath = path.join(__dirname, '../data/cats.json');

exports.getAll = function(cb) {
  fs.readFile(dataFilePath, (err, buffer) => {
    if(err) {
      cb(err);
      return;
    } 

    let cats;

    try {
      cats = JSON.parse(buffer);
    } catch(err) {
      cb(err);
      return;
    }

    // cats!!!
    cb(null, cats);
  });

}

exports.remove = function(catId, cb) {
  exports.getAll(function(err, cats) {
    if(err) return cb(err);

    // cats // array of cats
    // catId // id

    cats = cats.filter(cat => cat.id !== catId);

    fs.writeFile(dataFilePath, JSON.stringify(cats), function(err) {
      cb(err);
    });
  });
};


exports.create = function(catObj, cb) {
  exports.getAll(function(err, cats) {
    if(err) return cb(err);

    catObj.id = uuid.v4();

    cats.push(catObj);

    fs.writeFile(dataFilePath, JSON.stringify(cats), function(err) {
      cb(err);
    });
  });
}

exports.update = function(id, updateObj, cb) {
  exports.getAll(function(err, cats) {
    if(err) return cb(err);

    let cat = cats.filter(cat => cat.id === id)[0];

    if(!cat) {
      return cb({error: "Cat not found."});
    }

    let index = cats.indexOf(cat);

    for(let key in cat) {
      cat[key] = updateObj[key] || cat[key];
    }

    cats[index] = cat;

    fs.writeFile(dataFilePath, JSON.stringify(cats), function(err) {
      if(err) return cb(err);

      cb(null, cat);
    });

  })
}
