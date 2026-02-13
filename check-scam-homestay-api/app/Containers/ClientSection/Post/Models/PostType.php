<?php

namespace App\Containers\ClientSection\Post\Models;

use App\Ship\Parents\Models\Model as ParentModel;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

final class PostType extends ParentModel
{
    use HasUuids;
    protected $table = "post_types";

    protected $guarded = [];

    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}
