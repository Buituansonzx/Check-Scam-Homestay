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
        Schema::create('posts', function (Blueprint $table) {
            $table->uuid('id')->primary()
                ->comment('ID bài viết');

            $table->uuid('object_id')->nullable()
                ->comment('Liên kết với object');

            $table->uuid('user_id')->nullable()
                ->comment('Người tạo bài viết');

            $table->uuid('post_type_id')->nullable()
                ->comment('Loại bài viết');

            $table->string('title', 255)
                ->comment('Tiêu đề');

            $table->text('content')
                ->comment('Nội dung chi tiết');

            $table->boolean('is_anonymous')->default(false)
                ->comment('Đăng ẩn danh');

            $table->integer('views')->default(0)
                ->comment('Số lượt xem');

            $table->integer('likes')->default(0)
                ->comment('Số lượt thích');

            $table->timestamps();
            $table->softDeletes();

            // Indexes
            $table->index('object_id');
            $table->index('post_type_id');
            $table->index('user_id');
            $table->index('is_anonymous');

            // FULLTEXT index for search
            $table->fullText(['title', 'content']);

            // Foreign Keys
            $table->foreign('object_id')
                ->references('id')
                ->on('objects')
                ->onDelete('cascade');

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('set null');

            $table->foreign('post_type_id')
                ->references('id')
                ->on('post_types')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
