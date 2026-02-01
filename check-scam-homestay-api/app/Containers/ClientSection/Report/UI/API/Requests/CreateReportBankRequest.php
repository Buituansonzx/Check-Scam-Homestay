<?php

namespace App\Containers\ClientSection\Report\UI\API\Requests;

use App\Ship\Parents\Requests\Request as ParentRequest;

final class CreateReportBankRequest extends ParentRequest
{
    protected array $decode = [];

    public function rules(): array
    {
        return [
            'description' => 'required|string',
            'amount_lost' => 'nullable|numeric|min:0',
            'reporter_role' => 'required|string|in:victim,proxy',
            'reporter_name' => 'required|string|max:255',
            'reporter_phone' => 'required|string|max:100',
            'report_evidences' => 'required|array',
            'report_evidences.*' => 'file|mimes:jpg,jpeg,png,pdf|max:51200',
            'target_link' => 'nullable|url|max:255',
            'target_phone' => 'nullable|string|max:100',
            'target_bank_account' => 'required|string|max:255',
            'target_bank_name' => 'required|string|max:255',
            'target_owner_bank_account' => 'required|string|max:255',
        ];
    }
}
