System.register('sijad/auth/steam/components/SteamLogInButton', ['flarum/components/Button'], function (_export) {

  /**
   * The `SteamLogInButton` component displays steam login button which will open
   * a popup window containing steam login box.
   */
  'use strict';

  var Button, SteamLogInButton;
  return {
    setters: [function (_flarumComponentsButton) {
      Button = _flarumComponentsButton['default'];
    }],
    execute: function () {
      SteamLogInButton = (function (_Button) {
        babelHelpers.inherits(SteamLogInButton, _Button);

        function SteamLogInButton() {
          babelHelpers.classCallCheck(this, SteamLogInButton);
          babelHelpers.get(Object.getPrototypeOf(SteamLogInButton.prototype), 'constructor', this).apply(this, arguments);
        }

        babelHelpers.createClass(SteamLogInButton, null, [{
          key: 'initProps',
          value: function initProps(props) {
            props.className = (props.className || '') + ' LogInButton';

            props.onclick = function () {
              var width = 800;
              var height = 400;
              var $window = $(window);

              window.open(app.forum.attribute('baseUrl') + props.path, 'logInPopup', 'width=' + width + ',' + ('height=' + height + ',') + ('top=' + ($window.height() / 2 - height / 2) + ',') + ('left=' + ($window.width() / 2 - width / 2) + ',') + 'status=no,resizable=no');
            };

            babelHelpers.get(Object.getPrototypeOf(SteamLogInButton), 'initProps', this).call(this, props);
          }
        }]);
        return SteamLogInButton;
      })(Button);

      _export('default', SteamLogInButton);
    }
  };
});;
System.register('sijad/auth/steam/main', ['flarum/extend', 'flarum/app', 'flarum/components/LogInButtons', 'sijad/auth/steam/components/SteamLogInButton'], function (_export) {
  'use strict';

  var extend, app, LogInButtons, SteamLogInButton;
  return {
    setters: [function (_flarumExtend) {
      extend = _flarumExtend.extend;
    }, function (_flarumApp) {
      app = _flarumApp['default'];
    }, function (_flarumComponentsLogInButtons) {
      LogInButtons = _flarumComponentsLogInButtons['default'];
    }, function (_sijadAuthSteamComponentsSteamLogInButton) {
      SteamLogInButton = _sijadAuthSteamComponentsSteamLogInButton['default'];
    }],
    execute: function () {

      app.initializers.add('sijad-auth-steam', function () {
        extend(LogInButtons.prototype, 'items', function (items) {
          items.add('steam', m(
            SteamLogInButton,
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