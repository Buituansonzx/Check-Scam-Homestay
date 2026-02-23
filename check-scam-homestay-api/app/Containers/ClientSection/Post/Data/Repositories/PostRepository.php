<?php

namespace App\Containers\ClientSection\Post\Data\Repositories;

use App\Containers\ClientSection\Post\Models\Post;
use App\Containers\ClientSection\Post\Models\PostType;
use App\Ship\Parents\Repositories\Repository as ParentRepository;
use App\Ship\Services\ImageService;

/**
 * @template TModel of Post
 *
 * @extends ParentRepository<TModel>
 */
final class PostRepository extends ParentRepository
{
    protected $fieldSearchable = [
        // 'id' => '=',
    ];



    public function model():string
    {
        return Post::class;
    }
}
