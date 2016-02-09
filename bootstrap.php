<?php

/*
 * (c) Sajjad Hashemian <wolaws@gmail.com>
 */

use Sijad\Auth\Steam\Listener;
use Illuminate\Contracts\Events\Dispatcher;

return function (Dispatcher $events) {
    $events->subscribe(Listener\AddClientAssets::class);
    $events->subscribe(Listener\AddSteamAuthRoute::class);
};
