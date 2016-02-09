import { extend } from 'flarum/extend';
import app from 'flarum/app';
import LogInButtons from 'flarum/components/LogInButtons';
import LogInButton from 'flarum/components/LogInButton';

app.initializers.add('sijad-auth-steam', () => {
  extend(LogInButtons.prototype, 'items', function(items) {
    items.add('steam',
      <LogInButton
        className="Button LogInButton--steam"
        icon="steam"
        path="/auth/steam">
        {app.translator.trans('sijad-auth-steam.forum.log_in.with_steam_button')}
      </LogInButton>
    );
  });
});
