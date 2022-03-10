window.app = {
  authorize: function(options) {
    var getParameter = function(name) {
      var parameters = window.location.search;
      if (parameters) {
        parameters = parameters.replace('?', '').split('&');
        for (var i = 0; i < parameters.length; i++) {
          var parameter = parameters[i].split('=');
          if (parameter[0] === name && parameter.length === 2) {
            return parameter[1];
          }
        }
      }
      return null;
    };
    var token = localStorage.getItem(STORES.authorization_token);
    if (token) {
      if (options.success && $.isFunction(options.success)) {
        options.success(token);
      }
      return;
    }
    if (options.require) {
      var openid = localStorage.getItem(STORES.username);
      if (openid) {
        // UNDO
      } else {
        var openid_callback = getParameter('openid');
        if (openid_callback) {
          var state_callback = getParameter('state');
          var state = localStorage.getItem(STORES.authorization_state);
          if (state_callback && state_callback === state) {
            openid = openid_callback;
            localStorage.setItem(STORES.username, openid);
          } else {
            if (options.fail && $.isFunction(options.fail)) {
              options.fail('illegal authorization state');
            }
            return;
          }
        }
      }
      if (openid) {
        $.ajax({
          url: REMOTE.api.user.signin,
          data: { username: openid, category: 3, platform: 3 },
          dataType: 'json',
          error: e => {
            if (options.fail && $.isFunction(options.fail)) {
              options.fail(e);
            }
          },
          success: response => {
            if (response.errcode === 0) {
              token = response.data.authorization_token;
              localStorage.setItem(STORES.authorization_token, token);
              if (options.success && $.isFunction(options.success)) {
                options.success(token);
              }
              return;
            }
            if (options.fail && $.isFunction(options.fail)) {
              options.fail();
            }
          }
        });
      } else {
        var redirect_uri = encodeURIComponent(location.href);
        var oauth2_url = REMOTE.oas.weixin.oauth2;
        var state = localStorage.getItem(STORES.authorization_state);
        if (!state) {
          state = (() => {
            var u = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
            return u.replace(/[xy]/g, c => {
              var r = Math.random() * 16 | 0,
                v = (c == 'x') ? r : (r & 0x3 | 0x8);
              return v.toString(16);
            });
          })();
          localStorage.setItem(STORES.authorization_state, state);
        }
        oauth2_url += '?appkey=master&state=' + state;
        oauth2_url += '&redirect_uri=' + redirect_uri;
        location.href = oauth2_url;
      }
    } else {
      if (options.success && $.isFunction(options.success)) {
        options.success();
      }
    }
  }
};
