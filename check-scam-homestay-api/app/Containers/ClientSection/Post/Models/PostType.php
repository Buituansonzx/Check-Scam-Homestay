<?php

namespace App\Containers\ClientSection\Post\Models;

use App\Ship\Parents\Models\Model as ParentModel;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

final class PostType extends ParentModel
{
    use HasUuids;
    protected $table = "post_types";

    protected $guarded = [];
    CONST CODE_REPORT = 'REPORT';
    CONST CODE_REVIEW = 'REVIEW';
    CONST CODE_NOMAL_POST = 'NOMAL_POST';

    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}
