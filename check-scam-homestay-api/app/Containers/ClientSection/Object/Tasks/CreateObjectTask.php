<?php

namespace App\Containers\ClientSection\Object\Tasks;

use App\Containers\ClientSection\Object\Data\Repositories\ObjectRepository;
use App\Ship\Parents\Tasks\Task as ParentTask;

final class CreateObjectTask extends ParentTask
{
    public function __construct(private readonly ObjectRepository $objectRepository)
    {
    }

    public function run(array $data)
    {
        return $this->objectRepository->create($data);
    }
}
