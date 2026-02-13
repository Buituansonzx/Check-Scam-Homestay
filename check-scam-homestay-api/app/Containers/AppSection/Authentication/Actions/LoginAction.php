<?php

namespace App\Containers\AppSection\Authentication\Actions;

use App\Containers\AppSection\User\Models\User;
use App\Ship\Parents\Actions\Action as ParentAction;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

final class LoginAction extends ParentAction
{
    public function run(array $data): array
    {
        $user = User::query()
            ->where('email', $data['email'])
            ->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            throw ValidationException::withMessages([
                'password' => ['Email hoặc mật khẩu không đúng.'],
            ]);
        }

        $tokenResult = $user->createToken('passport-access-token');
        $accessToken = $tokenResult->accessToken;
        $expiresAt   = $tokenResult->token->expires_at;

        return [
            'user' => [
                'id'    => $user->id,
                'name'  => $user->name,
                'email' => $user->email,
                'roles' => $user->getRoleNames(),
            ],
            'access_token' => $accessToken,
            'token_type'   => 'Bearer',
            'expires_at'   => $expiresAt?->toDateTimeString(),
        ];
    }
}
