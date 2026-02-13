<?php

namespace App\Containers\SharedSection\Home\Models;

use App\Ship\Parents\Models\Model as ParentModel;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

final class Home extends ParentModel
{
    use HasUuids;
    protected $table = "homes";

    protected $guarded = [];

}
