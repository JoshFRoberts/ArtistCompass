<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ArtistRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required'],
            'private_name' => ['nullable'],
            'age' => ['nullable'],
            'economy' => ['required', 'integer'],
            'authority' => ['required', 'integer'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
