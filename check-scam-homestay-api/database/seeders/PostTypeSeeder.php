<?php

namespace Database\Seeders;

use App\Containers\ClientSection\Post\Models\PostType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $postTypes = [
            [
                'name' => 'Tố cáo',
                'code' => 'REPORT',
                'description' => 'Tố cáo hành vi vi phạm hoặc vấn đề cần xử lý',
            ],
            [
                'name' => 'Review',
                'code' => 'REVIEW',
                'description' => 'Bài viết đánh giá trải nghiệm dịch vụ hoặc sản phẩm',
            ],
            [
                'name' => 'Bài viết bình thường',
                'code' => 'NORMAL_POST',
                'description' => 'Các bài viết chia sẻ nội dung thông thường',
            ],
        ];

        foreach ($postTypes as $postType) {
            PostType::create($postType);
        }
    }
}
