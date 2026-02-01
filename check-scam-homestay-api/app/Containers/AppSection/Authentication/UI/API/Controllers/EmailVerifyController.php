<?php

namespace App\Containers\AppSection\Authentication\UI\API\Controllers;

use App\Containers\AppSection\User\Models\User;
use App\Ship\Parents\Controllers\ApiController;
use Illuminate\Http\Request;

final class EmailVerifyController extends ApiController
{
    public function verify(Request $request, $id, $hash)
    {
        $user = User::findOrFail($id);

        if (! hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
            return response()->json(['message' => 'Link xác minh không hợp lệ.'], 400);
        }

        if ($user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email đã được xác minh trước đó.'], 200);
        }

        $user->markEmailAsVerified();

        return response('<h2>Email verified successfully!</h2>', 200)
            ->header('Content-Type', 'text/html; charset=UTF-8');
    }
}
