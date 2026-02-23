<?php

namespace App\Containers\AdminSection\User\Tasks;

use App\Containers\AdminSection\User\Data\Repositories\UserRepository;
use App\Ship\Parents\Tasks\Task as ParentTask;

final class ListingUserTask extends ParentTask
{
    public function __construct( private readonly UserRepository $repository)
    {
    }

    public function run($data)
    {
        $users = $this->repository->listing($data);
        return $users;
    }
}
