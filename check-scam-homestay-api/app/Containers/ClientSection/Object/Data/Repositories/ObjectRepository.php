<?php

namespace App\Containers\ClientSection\Object\Data\Repositories;

use App\Containers\ClientSection\Object\Models\ScamObject;
use App\Ship\Parents\Repositories\Repository as ParentRepository;

/**
 * @template TModel of ScamObject
 *
 * @extends ParentRepository<TModel>
 */
final class ObjectRepository extends ParentRepository
{
    protected $fieldSearchable = [
        // 'id' => '=',
    ];

    public function model(): string
    {
        return ScamObject::class;
    }
}
