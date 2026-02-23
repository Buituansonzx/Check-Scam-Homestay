<?php

namespace App\Containers\ClientSection\Post\UI\API\Requests;

use App\Ship\Parents\Requests\Request as ParentRequest;

final class CreatePostRequest extends ParentRequest
{
    protected array $decode = [];

    public function rules(): array
    {
        return [
            'type' => 'required|in:REVIEW,NORMAL_POST',
            'title' => 'required|string',
            'content' => 'required|string',
            'is_anonymous' => 'nullable|boolean',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }
}
