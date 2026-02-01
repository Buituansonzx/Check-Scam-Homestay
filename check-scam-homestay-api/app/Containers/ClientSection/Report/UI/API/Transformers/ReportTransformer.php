<?php

namespace App\Containers\ClientSection\Report\UI\API\Transformers;

use App\Containers\ClientSection\Report\Models\Report;
use App\Ship\Parents\Transformers\Transformer as ParentTransformer;

final class ReportTransformer extends ParentTransformer
{
    protected array $defaultIncludes = [];

    protected array $availableIncludes = [];

    public function transform(Report $report): array
    {
        return [
            'type' => $report->getResourceKey(),
            'id' => $report->getHashedKey(),
            'created_at' => $report->created_at,
            'updated_at' => $report->updated_at,
            'readable_created_at' => $report->created_at->diffForHumans(),
            'readable_updated_at' => $report->updated_at->diffForHumans(),
        ];
    }
}
