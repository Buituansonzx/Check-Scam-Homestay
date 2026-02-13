<?php

namespace App\Containers\ClientSection\Post\Tasks;

use App\Containers\ClientSection\Post\Models\PostType;
use App\Ship\Parents\Tasks\Task as ParentTask;
use Exception;

final class FindPostTypeByCodeTask extends ParentTask
{
    public function run(string $code): PostType
    {
        $type = PostType::where('code', $code)->first();

        if (!$type) {
            throw new Exception("PostType with code {$code} not found.");
        }

        return $type;
    }
}
