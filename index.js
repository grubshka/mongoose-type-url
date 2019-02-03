var mongoose = require('mongoose')
var normalizeUrl = require('normalize-url')

var regUrl = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/

function validateUrl (val) {
  return regUrl.test(val)
}

class SchemaTypeUrl extends mongoose.SchemaTypes.String {
  cast(val) {
    _val = super.cast(val);
    if (!validateUrl(_val)) {
      throw new Error('Url: ' + val + ' is not a valid URL')
    }
    return normalizeUrl(_val);
  }
}

mongoose.Schema.Types.Url = module.exports = SchemaTypeUrl
