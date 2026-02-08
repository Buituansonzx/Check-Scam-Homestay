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
        Schema::create('post_types', function (Blueprint $table) {
            $table->uuid('id')->primary()
                ->comment('ID loại bài viết');

            $table->string('name', 255)->unique()
                ->comment('Tên loại bài viết');

            $table->string('code', 50)->unique()
                ->comment('Mã loại bài viết');

            $table->text('description')->nullable()
                ->comment('Mô tả');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('post_types');
    }
};
