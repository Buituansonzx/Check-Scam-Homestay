<?php

namespace App\Containers\ClientSection\Post\Actions;

use App\Containers\ClientSection\Post\Models\PostType;
use App\Containers\ClientSection\Post\Tasks\CreatePostImageTask;
use App\Containers\ClientSection\Post\Tasks\CreatePostTask;
use App\Containers\ClientSection\Post\Tasks\FindPostTypeByCodeTask;
use App\Containers\ClientSection\Post\UI\API\Requests\CreateScamPostRequest;
use App\Ship\Parents\Actions\Action as ParentAction;
use Illuminate\Support\Facades\Auth;

final class CreateScamPostAction extends ParentAction
{
    public function run(CreateScamPostRequest $request)
    {
        $data = $request->validated();
        $postType = app(FindPostTypeByCodeTask::class)->run(PostType::CODE_REPORT); 
        $dataScamPost = [
            'post_type_id' => $postType->id,
            'title' => $data['title'],
            'content' => $data['content'],
            'amount_of_money_scammed' => $data['amount_of_money_scammed'],
            'is_anonymous' => $data['is_anonymous'],
            'user_id' => Auth::id() ?? null,
        ];
        $post = app(CreatePostTask::class)->run($dataScamPost);

        if (!empty($data['images'])) {
            app(CreatePostImageTask::class)->run($post, $data['images']);
        }

        return $post;

    }
}
