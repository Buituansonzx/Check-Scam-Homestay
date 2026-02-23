<?php

namespace App\Containers\AdminSection\User\UI\API\Controllers;

use Apiato\Http\Response;
use App\Containers\AdminSection\User\Actions\ListingUserAction;
use App\Containers\AdminSection\User\UI\API\Requests\ListingRequest;
use App\Containers\AdminSection\User\UI\API\Transformers\UserTransformer;
use App\Ship\Parents\Controllers\ApiController;

final class UserController extends ApiController
{
    public function listing(ListingRequest $request, ListingUserAction $action)
    {
        $users = $action->run($request);

        return Response::create($users, UserTransformer::class);
    }
}
