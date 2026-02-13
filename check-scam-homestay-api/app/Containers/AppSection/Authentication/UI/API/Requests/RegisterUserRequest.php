<?php

namespace App\Containers\AppSection\Authentication\UI\API\Requests;

use App\Containers\AppSection\User\Enums\Gender;
use App\Ship\Parents\Requests\Request as ParentRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

final class RegisterUserRequest extends ParentRequest
{
    protected array $decode = [];

    public function rules(): array
    {
        return [
            'email' => 'required|email|unique:users,email',
            'password' => [
                'required',
                Password::default(),
            ],
            'name' => 'min:2|max:50',
            'gender' => Rule::enum(Gender::class),
            'birth' => 'date',
        ];
    }
    public function messages(): array {
        return [
            'email.required' => 'Email không được để trống',
            'email.email' => 'Email không hợp lệ',
            'email.unique' => 'Email đã tồn tại',
            'password.required' => 'Mật khẩu không được để trống',
            'password.min' => 'Mật khẩu phải có ít nhất :min ký tự',
            'password.symbols' => 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt',
            'password.numbers' => 'Mật khẩu phải chứa ít nhất một chữ số',
            'password.mixed' => 'Mật khẩu phải bao gồm cả chữ hoa và chữ thường',
            'password.letters' => 'Mật khẩu phải chứa ít nhất một chữ cái',
            'name.min' => 'Tên phải có ít nhất 2 ký tự',
            'name.max' => 'Tên phải có nhiều nhất 50 ký tự',
            'gender.enum' => 'Giới tính không hợp lệ',
            'birth.date' => 'Ngày sinh không hợp lệ',
        ];
    }
}
