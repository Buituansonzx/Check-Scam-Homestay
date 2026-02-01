<?php

namespace App\Containers\AppSection\Authentication\Actions;

use App\Containers\AppSection\User\Models\User;
use App\Ship\Parents\Actions\Action as ParentAction;
use Illuminate\Auth\Events\Registered;

final class RegisterAction extends ParentAction
{
    public function run($data)
    {
        $user = User::create([
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'name' => $data['name'],
        ]);
        $user->assignRole('user');
        $user->sendEmailVerificationNotification();
        return $user;
    }
}
