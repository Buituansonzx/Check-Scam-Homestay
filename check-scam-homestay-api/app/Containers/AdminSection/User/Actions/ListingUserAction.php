<?php

namespace App\Containers\AdminSection\User\Actions;

use App\Containers\AdminSection\User\Tasks\ListingUserTask;
use App\Containers\AdminSection\User\UI\API\Requests\ListingRequest;
use App\Ship\Parents\Actions\Action as ParentAction;

final class ListingUserAction extends ParentAction
{
    public function run(ListingRequest $request)
    {
        $data = $request->validated();
        $users = app(ListingUserTask::class)->run($data);
        return $users;
    }
}
