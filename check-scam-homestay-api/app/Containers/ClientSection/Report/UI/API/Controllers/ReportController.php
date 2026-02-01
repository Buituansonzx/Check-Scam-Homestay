<?php

namespace App\Containers\ClientSection\Report\UI\API\Controllers;

use Apiato\Http\Response;
use App\Containers\ClientSection\Report\Actions\CreateReportBankAction;
use App\Containers\ClientSection\Report\UI\API\Requests\CreateReportBankRequest;
use App\Containers\ClientSection\Report\UI\API\Transformers\ReportTransformer;
use App\Ship\Parents\Controllers\ApiController;

final class ReportController extends ApiController
{
    public function createReportBank(CreateReportBankRequest $request, CreateReportBankAction $action)
    {
        $report = $action->run($request->validated());
        return response()->json([
            'message' => 'Report created successfully.',
            'data' => $report
        ], 201);
    }
}
