<?php

namespace App\Containers\AdminSection\User\UI\API\Requests;

use App\Ship\Parents\Requests\Request as ParentRequest;

final class ListingRequest extends ParentRequest
{
    protected array $decode = [];

    public function rules(): array
    {
        return [
            'search' => 'string|nullable',
            'is_active' => 'boolean|nullable',
        ];
    }
}
