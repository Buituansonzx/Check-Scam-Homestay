<?php

namespace App\Containers\ClientSection\Post\Actions;

use App\Containers\ClientSection\Post\Models\Post;
use App\Containers\ClientSection\Post\Tasks\CreatePostImageTask;
use App\Containers\ClientSection\Post\Tasks\CreatePostTask;
use App\Containers\ClientSection\Post\Tasks\FindPostTypeByCodeTask;
use App\Containers\ClientSection\Post\UI\API\Requests\CreatePostRequest;
use App\Ship\Parents\Actions\Action as ParentAction;
use Illuminate\Support\Facades\DB;

final class CreatePostAction extends ParentAction
{
    public function run(CreatePostRequest $request): Post
    {
        return DB::transaction(function () use ($request) {
            $data = $request->validated();

            $postType = app(FindPostTypeByCodeTask::class)->run($data['type']);

            $postData = [
                'post_type_id' => $postType->id,
                'title' => $data['title'],
                'content' => $data['content'],
                'is_anonymous' => $data['is_anonymous'] ?? false,
                'user_id' => $request->user()?->id,
            ];

            $post = app(CreatePostTask::class)->run($postData);

            if (!empty($data['images'])) {
                app(CreatePostImageTask::class)->run($post, $data['images']);
            }

            return $post;
        });
    }
}
