<?php

namespace App\Containers\ClientSection\Post\Tasks;

use App\Containers\ClientSection\Post\Models\Post;
use App\Ship\Parents\Tasks\Task as ParentTask;
use App\Ship\Services\ImageService;
use Illuminate\Http\UploadedFile;

final class CreatePostImageTask extends ParentTask
{
    public function __construct(
        private ImageService $imageService
    ) {
    }

    /**
     * @param Post $post
     * @param UploadedFile[] $images
     */
    public function run(Post $post, array $images): void
    {
        foreach ($images as $image) {
            $this->imageService->upload(
                file: $image,
                dir: "checkstay/posts/{$post->id}",
                disk: 's3',
                data: ['post_id' => $post->id]
            );
        }
    }
}
