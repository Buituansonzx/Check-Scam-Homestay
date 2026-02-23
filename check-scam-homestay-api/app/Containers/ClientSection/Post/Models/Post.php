<?php

namespace App\Containers\ClientSection\Post\Models;

use App\Containers\AppSection\User\Models\User;
use App\Ship\Parents\Models\Model as ParentModel;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

final class Post extends ParentModel
{
    use HasUuids;
    protected $table = "posts";

    protected $guarded = [];

    public function postType()
    {
        return $this->belongsTo(PostType::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function postImages()
    {
        return $this->hasMany(PostImage::class);
    }
}
