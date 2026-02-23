<?php

namespace App\Containers\AdminSection\User\Data\Repositories;

use App\Containers\AdminSection\User\Models\User;
use App\Containers\AppSection\User\Models\User as ModelsUser;
use App\Ship\Parents\Repositories\Repository as ParentRepository;

/**
 * @template TModel of User
 *
 * @extends ParentRepository<TModel>
 */
final class UserRepository extends ParentRepository
{
    protected $fieldSearchable = [
        // 'id' => '=',
    ];

    public function model():string
    {
        return ModelsUser::class;
    }

    public function listing($data)
    {
        $query = $this->model()::query();

        if (!empty($data['search'])) {
            $query->where('name', 'like', '%' . $data['search'] . '%')
                ->orWhere('email', 'like', '%' . $data['search'] . '%');
        }

        if (isset($data['is_active'])) {
            $query->where('is_active', $data['is_active']);
        }

        return $query->get();
    }
}
