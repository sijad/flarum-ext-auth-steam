import app from 'flarum/app';

import SteamSettingsModal from 'sijad/auth/steam/components/SteamSettingsModal';

app.initializers.add('sijad-auth-steam', () => {
  app.extensionSettings['sijad-auth-steam'] = () => app.modal.show(new SteamSettingsModal());
});
