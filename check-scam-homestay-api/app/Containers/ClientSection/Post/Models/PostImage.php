<?php

namespace App\Containers\ClientSection\Post\Models;

use App\Ship\Parents\Models\Model as ParentModel;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

final class PostImage extends ParentModel
{
    use HasUuids;
    protected $table = "post_images";

    protected $guarded = [];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
