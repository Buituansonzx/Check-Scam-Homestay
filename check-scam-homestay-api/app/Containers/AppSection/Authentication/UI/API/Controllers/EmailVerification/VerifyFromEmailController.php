<?php

namespace App\Containers\AppSection\Authentication\UI\API\Controllers\EmailVerification;

use App\Containers\AppSection\Authentication\Actions\EmailVerification\VerifyAction;
use App\Containers\AppSection\User\Models\User;
use App\Ship\Parents\Controllers\ApiController;
use Illuminate\Http\Request;

final class VerifyFromEmailController extends ApiController
{
    public function __invoke(Request $request, string $id, string $hash, VerifyAction $action)
    {
        $user = User::query()->findOrFail($id);
        // Check hash giống Laravel (sha1(email))
        if (! hash_equals(sha1($user->getEmailForVerification()), (string) $hash)) {
            abort(403, 'Invalid verification link.');
        }

        $action->run($user);

        return response('Email verified', 200);
    }
}
