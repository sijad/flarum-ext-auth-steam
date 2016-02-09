System.register('sijad/auth/steam/main', ['flarum/extend', 'flarum/app', 'flarum/components/LogInButtons', 'flarum/components/LogInButton'], function (_export) {
  'use strict';

  var extend, app, LogInButtons, LogInButton;
  return {
    setters: [function (_flarumExtend) {
      extend = _flarumExtend.extend;
    }, function (_flarumApp) {
      app = _flarumApp['default'];
    }, function (_flarumComponentsLogInButtons) {
      LogInButtons = _flarumComponentsLogInButtons['default'];
    }, function (_flarumComponentsLogInButton) {
      LogInButton = _flarumComponentsLogInButton['default'];
    }],
    execute: function () {

      app.initializers.add('sijad-auth-steam', function () {
        extend(LogInButtons.prototype, 'items', function (items) {
          items.add('steam', m(
            LogInButton,
            {
              className: 'Button LogInButton--steam',
              icon: 'steam',
              path: '/auth/steam' },
            app.translator.trans('sijad-auth-steam.forum.log_in.with_steam_button')
          ));
        });
      });
    }
  };
});