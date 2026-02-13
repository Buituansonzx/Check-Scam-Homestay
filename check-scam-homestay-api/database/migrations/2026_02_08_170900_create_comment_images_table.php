<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('comment_images', function (Blueprint $table) {
            $table->uuid('id')->primary()
                ->comment('ID ảnh bình luận');

            $table->uuid('comment_id')->nullable()
                ->comment('Liên kết với bình luận');

            $table->string('file_path', 500)
                ->comment('Đường dẫn file trên S3 (key)');

            $table->string('file_name', 255)
                ->comment('Tên file gốc');

            $table->bigInteger('file_size')
                ->comment('Kích thước file (bytes)');

            $table->string('mime_type', 100)
                ->comment('Loại MIME (image/jpeg, image/png, etc.)');

            $table->string('disk', 50)->default('s3')
                ->comment('Storage disk name');

            $table->integer('width')->nullable()
                ->comment('Chiều rộng ảnh (pixels)');

            $table->integer('height')->nullable()
                ->comment('Chiều cao ảnh (pixels)');

            $table->json('variants')->nullable()
                ->comment('Các biến thể ảnh (thumbnail, medium, large)');

            $table->string('s3_bucket', 100)->nullable()
                ->comment('Tên S3 bucket');

            $table->string('s3_region', 50)->nullable()
                ->comment('AWS region (ap-southeast-1, etc.)');

            $table->string('s3_url', 500)->nullable()
                ->comment('URL đầy đủ trên S3');

            $table->string('cdn_url', 500)->nullable()
                ->comment('URL qua CloudFront/CDN');

            $table->integer('order')->default(0)
                ->comment('Thứ tự hiển thị');

            $table->string('alt_text', 255)->nullable()
                ->comment('Mô tả ảnh (SEO)');

            $table->timestamps();
            $table->softDeletes();

            // Indexes
            $table->index('comment_id');
            $table->index('order');

            // Foreign Key
            $table->foreign('comment_id')
                ->references('id')
                ->on('comments')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comment_images');
    }
};
