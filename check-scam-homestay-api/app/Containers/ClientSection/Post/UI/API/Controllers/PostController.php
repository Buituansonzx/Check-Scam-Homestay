<?php

namespace App\Containers\ClientSection\Post\UI\API\Controllers;

use App\Containers\ClientSection\Post\Actions\CreatePostAction;
use App\Containers\ClientSection\Post\Actions\CreateScamPostAction;
use App\Containers\ClientSection\Post\UI\API\Requests\CreatePostRequest;
use App\Containers\ClientSection\Post\UI\API\Requests\CreateScamPostRequest;
use App\Ship\Parents\Controllers\ApiController;

final class PostController extends ApiController
{
    public function create(CreatePostRequest $request, CreatePostAction $action)
    {
        $result = $action->run($request);
        return response()->json($result);
    }

    public function createScam(CreateScamPostRequest $request, CreateScamPostAction $action)
    {
        $result = $action->run($request);
        return response()->json($result);
    }
}
