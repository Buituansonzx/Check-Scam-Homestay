<?php

namespace App\Containers\AppSection\Authentication\Actions;

use App\Containers\AppSection\User\Models\User;
use App\Ship\Parents\Actions\Action as ParentAction;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

final class LoginWithSocialAction extends ParentAction
{
    public function run(string $provider): array
    {
        if (!in_array($provider, ['google', 'facebook'], true)) {
            abort(404);
        }

        $driver = Socialite::driver($provider)->stateless();

        if ($provider === 'facebook') {
            $driver = $driver->scopes(['email']);
        }

        $social = $driver->user();

        $socialId = (string)$social->getId();
        $email = $social->getEmail(); // có thể null với Facebook
        $name = $social->getName() ?: ($social->getNickname() ?: 'User');
        $nickname = $social->getNickname();
        $token = $social->token ?? null;
        $refreshToken = $social->refreshToken ?? null;
        $expiresIn = $social->expiresIn ?? null;
        $tokenSecret = $social->tokenSecret ?? null;


        $user = User::query()
            ->where('social_provider', $provider)
            ->where('social_id', $socialId)
            ->first();

        if (!$user && $email) {
            $emailExists = User::query()
                ->where('email', $email)
                ->exists();

            if ($emailExists) {
                abort(409, 'Email này đã có tài khoản');
            }
        }

        if (!$user) {
            $user = User::create([
                'name' => $name,
                'email' => $email,
                'password' => Hash::make(Str::random(32)),
                'has_password' => false,
                'email_verified_at' => $email ? now() : null,

                'social_provider' => $provider,
                'social_id' => $socialId,
                'social_nickname' => $nickname,

                'social_token' => $token,
                'social_refresh_token' => $refreshToken,
                'social_expires_in' => $expiresIn,
                'social_token_secret' => $tokenSecret,
            ]);

            // gán role mặc định nếu bạn dùng spatie
            if (method_exists($user, 'assignRole')) {
                $user->assignRole('user');
            }
        } else {
            $user->fill([
                'social_provider' => $provider,
                'social_id' => $socialId,
                'social_nickname' => $nickname ?: $user->social_nickname,

                'social_token' => $token ?: $user->social_token,
                'social_refresh_token' => $refreshToken ?: $user->social_refresh_token,
                'social_expires_in' => $expiresIn ?: $user->social_expires_in,
                'social_token_secret' => $tokenSecret ?: $user->social_token_secret,
            ]);

            if (empty($user->name) && $name) {
                $user->name = $name;
            }

            // Nếu user thiếu email mà provider trả email, có thể bổ sung
            if (empty($user->email) && $email) {
                $user->email = $email;
                $user->email_verified_at = now();
            }
            $user->save();
        }

        $tokenResult = $user->createToken('passport-access-token');
        $accessToken = $tokenResult->accessToken;
        return [
            'user' => $user,
            'access_token' => $accessToken,
        ];
    }
}
