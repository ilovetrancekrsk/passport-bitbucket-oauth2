/**
 * Parse profile.
 *
 * @param {Object|String} json
 * @return {Object}
 * @api private
 */
exports.parse = function(json) {
  if ('string' == typeof json) {
    json = JSON.parse(json);
  }
  
  var profile = {};
  profile.id = json.uuid;
  profile.displayName = json.display_name;
  profile.username = json.username;
  profile.profileUrl = json.links.html.href;

  if (json.emails) {
    profile.emails = [];
    json.emails.forEach(function(email) {
      if(email.is_confirmed) {
        var emailObj = {};
        emailObj.value = email.email;
        if(email.is_primary) {
            emailObj.type = "Primary";
            profile.emails.unshift(emailObj);

            profile.email = emailObj.value;
        } else {
            profile.emails.push(emailObj);
        }
      }
    });
  }

  return profile;
};
