<?php

namespace App\Containers\ClientSection\Post\UI\API\Requests;

use App\Ship\Parents\Requests\Request as ParentRequest;

final class CreateScamPostRequest extends ParentRequest
{
    protected array $decode = [];

    public function rules(): array
    {
        return [
            'title' => 'required|string',
            'content' => 'required|string',
            'amount_of_money_scammed' => 'nullable|numeric',
            'images' => 'required|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:512000',
            'is_anonymous' => 'nullable|boolean',
            'link_scam' => 'nullable|string',
            'phone_scammer' => 'nullable|string',
            'name_scammer' => 'nullable|string',
            'name_reporter' => 'required|string',
            'phone_reporter' => 'required|string',
        ];
    }
}
