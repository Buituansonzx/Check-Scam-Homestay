<?php

namespace App\Containers\AppSection\Authentication\UI\API\Controllers;

use Apiato\Http\Response;
use App\Containers\AppSection\Authentication\Actions\LoginWithSocialAction;
use App\Containers\AppSection\User\UI\API\Transformers\UserTransformer;
use App\Ship\Parents\Controllers\ApiController;
use Laravel\Socialite\Facades\Socialite;

final class SocialCallbackController extends ApiController
{
    public function callback(string $provider, LoginWithSocialAction $action)
    {
        $result = $action->run($provider);

        return Response::create($result['user'], UserTransformer::class)
            ->addMeta([
                'token_type' => 'Bearer',
                'access_token' => $result['access_token'],
            ])
            ->ok();
    }

    public function redirect(string $provider)
    {
        if (!in_array($provider, ['google', 'facebook'], true)) {
            abort(404);
        }

        $driver = Socialite::driver($provider)->stateless();

        if ($provider === 'facebook') {
            $driver = $driver->scopes(['email']);
        }
        $url = $driver->redirect()->getTargetUrl();

        return redirect()->away($url);
    }
}
