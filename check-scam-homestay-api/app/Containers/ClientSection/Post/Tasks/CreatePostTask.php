<?php

namespace App\Containers\ClientSection\Post\Tasks;

use App\Containers\ClientSection\Post\Data\Repositories\PostRepository;
use App\Containers\ClientSection\Post\Models\Post;
use App\Ship\Parents\Tasks\Task as ParentTask;

final class CreatePostTask extends ParentTask
{
    public function __construct(private readonly PostRepository $postRepository)
    {
    }

    public function run(array $data): Post
    {
        return $this->postRepository->create($data);
    }
}
