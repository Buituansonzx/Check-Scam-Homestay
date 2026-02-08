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
        Schema::create('comments', function (Blueprint $table) {
            $table->uuid('id')->primary()
                ->comment('ID bình luận');

            $table->uuid('post_id')->nullable()
                ->comment('Liên kết với bài viết');

            $table->uuid('user_id')->nullable()
                ->comment('Người bình luận');

            $table->uuid('parent_id')->nullable()
                ->comment('Bình luận cha (nested comments)');

            $table->text('content')
                ->comment('Nội dung bình luận');

            $table->boolean('is_anonymous')->default(false)
                ->comment('Bình luận ẩn danh');

            $table->integer('likes')->default(0)
                ->comment('Số lượt thích');

            $table->timestamps();
            $table->softDeletes();

            // Indexes
            $table->index('post_id');
            $table->index('user_id');
            $table->index('parent_id');
            $table->index('is_anonymous');

            // Foreign Keys
            $table->foreign('post_id')
                ->references('id')
                ->on('posts')
                ->onDelete('cascade');

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('set null');

            $table->foreign('parent_id')
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
        Schema::dropIfExists('comments');
    }
};
