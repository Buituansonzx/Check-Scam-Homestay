<?php

namespace App\Containers\ClientSection\Object\Models;

use App\Containers\ClientSection\Post\Models\Post;
use App\Ship\Parents\Models\Model as ParentModel;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

final class ScamObject extends ParentModel
{
    use HasUuids;   
    protected $table = "objects";

    protected $guarded = [];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
