var SMB2Message = require('../tools/smb2-message');
var message = require('../tools/message');
var ntlm = require('ntlm');

module.exports = message({
  generate: function(connection) {
    return new SMB2Message({
      headers: {
        Command: 'SESSION_SETUP',
        SessionId: connection.SessionId,
        ProcessId: connection.ProcessId,
      },
      request: {
        Buffer: ntlm.encodeType3(
          connection.username,
          connection.ip,
          connection.domain,
          connection.nonce,
          connection.password
        ),
      },
    });
  },
  successCode:'STATUS_SUCCESS',

  onSuccess: function(connection, response) {
  var h = response.getHeaders();
  connection.SessionId = h.SessionId;
},
});
