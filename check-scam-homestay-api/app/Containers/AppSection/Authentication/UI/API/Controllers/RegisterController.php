<?php

namespace App\Containers\AppSection\Authentication\UI\API\Controllers;

use App\Containers\AppSection\Authentication\Actions\RegisterAction;
use App\Containers\AppSection\Authentication\UI\API\Requests\RegisterUserRequest;
use App\Ship\Parents\Controllers\ApiController;

final class RegisterController extends ApiController
{
    public function register(RegisterUserRequest $request, RegisterAction $action)
    {
        $user  = $action->run($request->validated());
        return response()->json(['data' => $user], 201);
    }
}
