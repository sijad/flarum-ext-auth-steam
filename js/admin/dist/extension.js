System.register('sijad/auth/steam/components/SteamSettingsModal', ['flarum/components/SettingsModal'], function (_export) {
  'use strict';

  var SettingsModal, SteamSettingsModal;
  return {
    setters: [function (_flarumComponentsSettingsModal) {
      SettingsModal = _flarumComponentsSettingsModal['default'];
    }],
    execute: function () {
      SteamSettingsModal = (function (_SettingsModal) {
        babelHelpers.inherits(SteamSettingsModal, _SettingsModal);

        function SteamSettingsModal() {
          babelHelpers.classCallCheck(this, SteamSettingsModal);
          babelHelpers.get(Object.getPrototypeOf(SteamSettingsModal.prototype), 'constructor', this).apply(this, arguments);
        }

        babelHelpers.createClass(SteamSettingsModal, [{
          key: 'className',
          value: function className() {
            return 'SteamSettingsModal Modal--small';
          }
        }, {
          key: 'title',
          value: function title() {
            return app.translator.trans('sijad-auth-steam.admin.steam_settings.title');
          }
        }, {
          key: 'form',
          value: function form() {
            return [m(
              'div',
              { className: 'Form-group' },
              m(
                'label',
                null,
                app.translator.trans('sijad-auth-steam.admin.steam_settings.api_key_label')
              ),
              m('input', { className: 'FormControl', bidi: this.setting('sijad-auth-steam.api_key') })
            )];
          }
        }]);
        return SteamSettingsModal;
      })(SettingsModal);

      _export('default', SteamSettingsModal);
    }
  };
});;
System.register('sijad/auth/steam/main', ['flarum/app', 'sijad/auth/steam/components/SteamSettingsModal'], function (_export) {
  'use strict';

  var app, SteamSettingsModal;
  return {
    setters: [function (_flarumApp) {
      app = _flarumApp['default'];
    }, function (_sijadAuthSteamComponentsSteamSettingsModal) {
      SteamSettingsModal = _sijadAuthSteamComponentsSteamSettingsModal['default'];
    }],
    execute: function () {

      app.initializers.add('sijad-auth-steam', function () {
        app.extensionSettings['sijad-auth-steam'] = function () {
          return app.modal.show(new SteamSettingsModal());
        };
      });
    }
  };
});