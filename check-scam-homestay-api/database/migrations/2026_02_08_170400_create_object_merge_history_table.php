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
        Schema::create('object_merge_history', function (Blueprint $table) {
            $table->uuid('id')->primary()
                ->comment('ID lịch sử merge');

            $table->uuid('parent_object_id')
                ->comment('Object cha (kết quả merge)');

            $table->json('child_object_ids')
                ->comment('Mảng UUID objects con đã merge ["uuid1", "uuid2"]');

            $table->uuid('group_id')->nullable()
                ->comment('Nhóm liên quan');

            $table->uuid('user_id')->nullable()
                ->comment('Người thực hiện merge');

            $table->timestamps();

            // Indexes
            $table->index('parent_object_id');
            $table->index('group_id');
            $table->index('user_id');

            // Foreign Keys
            $table->foreign('parent_object_id')
                ->references('id')
                ->on('objects')
                ->onDelete('cascade');

            $table->foreign('group_id')
                ->references('id')
                ->on('object_groups')
                ->onDelete('cascade');

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('object_merge_history');
    }
};
