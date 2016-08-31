<?php

/*
 * (c) Sajjad Hashemian <wolaws@gmail.com>
 */

namespace Sijad\Auth\Steam;

use Exception;
use Flarum\Forum\AuthenticationResponseFactory;
use Flarum\Http\Controller\ControllerInterface;
use Flarum\Settings\SettingsRepositoryInterface;
use Psr\Http\Message\ServerRequestInterface as Request;
use Zend\Diactoros\Response\RedirectResponse;
use Zend\Diactoros\Response;
use Zend\Diactoros\Uri;
use GuzzleHttp\Client;

class SteamAuthController implements ControllerInterface
{
    /**
     * Steam OpenID login url
     */
    const LOGIN_URL = 'https://steamcommunity.com/openid/login';

    /**
     * Steam OpenID API url
     */
    const API_URL = 'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002';

    /**
     * @var AuthenticationResponseFactory
     */
    protected $authResponse;

    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @param AuthenticationResponseFactory $authResponse
     * @param SettingsRepositoryInterface $settings
     */
    public function __construct(AuthenticationResponseFactory $authResponse, SettingsRepositoryInterface $settings)
    {
        $this->authResponse = $authResponse;
        $this->settings = $settings;
    }

    /**
     * @param Request $request
     * @return \Psr\Http\Message\ResponseInterface|RedirectResponse
     */
    public function handle(Request $request)
    {
        $redirectUri = $request->getOriginalRequest()->getUri()->withQuery('');

        $session = $request->getAttribute('session');

        $queryParams = $request->getQueryParams();
        $oidSig = array_get($queryParams, 'openid_sig');
        if (!$oidSig) {
            return new RedirectResponse((string) (
                new Uri(SteamAuthController::LOGIN_URL))
                    ->withQuery(http_build_query(
                        [
                            'openid.ns' => 'http://specs.openid.net/auth/2.0',
                            'openid.mode' => 'checkid_setup',
                            'openid.identity' => 'http://specs.openid.net/auth/2.0/identifier_select',
                            'openid.claimed_id' => 'http://specs.openid.net/auth/2.0/identifier_select',
                            'openid.return_to' => (string) $redirectUri,
                            'openid.realm' => (string) $redirectUri->withPath(''), // TODO: fix in subfolder issue, not sure if steam needs host name or flarum baseurl
                        ]
                    )
                )
            );
        }

        $query = [
            'openid.ns' => 'http://specs.openid.net/auth/2.0',
            'openid.sig' => array_get($queryParams, 'openid_sig'),
        ];

        foreach (explode(',', array_get($queryParams, 'openid_signed')) as $param) {
            $query['openid.'.$param] = array_get($queryParams, 'openid_'.$param);
        }

        // do not let overwrite this one via openid_signed
        $query['openid.mode'] = 'check_authentication';

        $client = new Client();
        try {
            $res = $client->request('POST', SteamAuthController::LOGIN_URL, [
                'form_params' => $query
            ]);
        } catch (Exception $e) {
            return new Response("Can't Verify OpenID", 500);
        }

        if ($res->getStatusCode() === 200 and preg_match("/^is_valid:true+$/im", (string) $res->getBody()) === 1) {
            if ($steam_id = array_get($queryParams, 'openid_claimed_id') and $steam_id = basename($steam_id) and is_numeric($steam_id)) {
                try {
                    $res = $client->request('GET', SteamAuthController::API_URL, [
                        'query' => [
                            'key' => $this->settings->get('sijad-auth-steam.api_key'),
                            'steamids' => $steam_id
                        ]
                    ]);
                } catch (Exception $e) {
                    return new Response("Can't Get User Info", 500);
                }

                if ($info = json_decode((string) $res->getBody(), true)) {
                    $identification = ['steam_id' => $steam_id];
                    $suggestions = [
                        'username' => $info['response']['players'][0]['personaname'],
                        'avatarUrl' => $info['response']['players'][0]['avatarfull']
                    ];

                    return $this->authResponse->make($request, $identification, $suggestions);
                }
            }
        }

        return new Response("Can't Get User Info", 500);
    }
}
