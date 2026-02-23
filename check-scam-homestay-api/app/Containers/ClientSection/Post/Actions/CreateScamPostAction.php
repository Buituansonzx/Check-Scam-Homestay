<?php

namespace App\Containers\ClientSection\Post\Actions;

use App\Containers\ClientSection\Object\Models\ScamObject;
use App\Containers\ClientSection\Object\Tasks\CreateObjectTask;
use App\Containers\ClientSection\Post\Models\PostType;
use App\Containers\ClientSection\Post\Tasks\CreatePostImageTask;
use App\Containers\ClientSection\Post\Tasks\CreatePostTask;
use App\Containers\ClientSection\Post\Tasks\FindPostTypeByCodeTask;
use App\Containers\ClientSection\Post\UI\API\Requests\CreateScamPostRequest;
use App\Ship\Parents\Actions\Action as ParentAction;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

final class CreateScamPostAction extends ParentAction
{
    public function run(CreateScamPostRequest $request)
    {
        return DB::transaction(function () use ($request) {
            $data = $request->validated();
            $linkType = ScamObject::detectLinkType($data['link_scam']);
            $dataObject = [
                'accused_name' => $data['name_scammer'],
                'phone' => $data['phone_scammer'],
                $linkType => $data['link_scam'],
                'reporter_name' => $data['name_reporter'],
                'reporter_phone' => $data['phone_reporter'],
            ];
            $object = app(CreateObjectTask::class)->run($dataObject);
            $postType = app(FindPostTypeByCodeTask::class)->run(PostType::CODE_REPORT);
            $dataScamPost = [
                'object_id' => $object->id,
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
        });
    }
}
