<?php

namespace App\Containers\ClientSection\Object\Models;

use App\Containers\ClientSection\Post\Models\Post;
use App\Ship\Parents\Models\Model as ParentModel;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Support\Str;

final class ScamObject extends ParentModel
{
    use HasUuids;   
    protected $table = "objects";

    protected $guarded = [];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    public static function detectLinkType(?string $link): string
    {
        if (empty($link)) {
            return 'link_other';
        }

        $link = strtolower($link);

        if (Str::contains($link, ['facebook.com', 'fb.com', 'fb.watch', 'm.me'])) {
            return 'link_facebook';
        }

        if (Str::contains($link, ['zalo.me', 'zaloapp.com'])) {
            return 'link_zalo';
        }

        if (Str::contains($link, ['tiktok.com', 'vt.tiktok.com'])) {
            return 'link_tiktok';
        }

        $urlToCheck = Str::startsWith($link, ['http://', 'https://']) ? $link : "https://" . $link;
        if (filter_var($urlToCheck, FILTER_VALIDATE_URL)) {
            return 'link_website';
        }

        return 'link_other';
    }
}
