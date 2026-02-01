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
        Schema::create('reports', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('target_id')->constrained()->onDelete('cascade');
            $table->text('description')->comment('Mô tả chi tiết về báo cáo của người dùng');
            $table->enum('status', ['pending', 'reviewed', 'resolved'])->default('pending')
                ->comment('Trạng thái báo cáo: pending (chờ xử lý), reviewed (đã xem xét), resolved (đã giải quyết)');
            $table->enum('reporter_role',['victim','proxy']) ->comment('Vai trò của người báo cáo: victim (nạn nhân), proxy (người đại diện)');
            $table->decimal('amount_lost', 15, 2)->nullable()
                ->comment('Số tiền bị mất do vụ lừa đảo (nếu có)');
            $table->json('reporter_info')->nullable()->comment('Thông tin liên hệ của người báo cáo (tên, email, điện thoại, v.v.)');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
