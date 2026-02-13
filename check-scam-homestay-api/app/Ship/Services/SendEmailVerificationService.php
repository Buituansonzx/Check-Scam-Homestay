<?php

namespace  App\Ship\Services;

use App\Containers\AppSection\User\Models\User;

final class SendEmailVerificationService
{
    public function send(User $user): void
    {
        if ($user->hasVerifiedEmail()) {
            return;
        }

        $user->sendEmailVerificationNotification();
    }
}
