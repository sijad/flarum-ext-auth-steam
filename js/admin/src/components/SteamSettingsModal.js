import SettingsModal from 'flarum/components/SettingsModal';

export default class SteamSettingsModal extends SettingsModal {
  className() {
    return 'SteamSettingsModal Modal--small';
  }

  title() {
    return app.translator.trans('sijad-auth-steam.admin.steam_settings.title');
  }

  form() {
    return [
      <div className="Form-group">
        <label>{app.translator.trans('sijad-auth-steam.admin.steam_settings.api_key_label')}</label>
        <input className="FormControl" bidi={this.setting('sijad-auth-steam.api_key')}/>
      </div>
    ];
  }
}
