<?php

namespace App\Containers\AppSection\Authentication\UI\API\Controllers;

use Apiato\Http\Response;
use App\Containers\AppSection\Authentication\Actions\LoginWithSocialAction;
use App\Containers\AppSection\User\UI\API\Transformers\UserTransformer;
use App\Ship\Parents\Controllers\ApiController;
use Laravel\Socialite\Facades\Socialite;

final class SocialCallbackController extends ApiController
{
    public function callback(string $provider, LoginWithSocialAction $action): \Illuminate\Http\RedirectResponse
    {
        $result = $action->run($provider);
        $user = $result['user'];
        $token = $result['access_token'];

        // Use env variable or default frontend URL
        $frontendUrl = config('app.frontend_url', 'http://localhost:3000') . '/auth/callback';
        
        $userData = rawurlencode(json_encode([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'roles' => $user->roles->pluck('name'),
        ]));

        return redirect()->away("{$frontendUrl}?token={$token}&user={$userData}");
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
