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
        Schema::create('targets', function (Blueprint $table) {
            $table->uuid('id')->primary()
                ->comment('PK UUID của hồ sơ target (đối tượng bị check)');

            $table->string('display_name')->nullable()
                ->comment('Tên hiển thị của target (vd: Homestay X, Nhóm scam Y). Có thể null nếu chưa biết');

            $table->enum('status', ['active', 'disputed', 'removed', 'archived'])->default('active')
                ->comment('Trạng thái target: active, disputed (đang tranh chấp), removed (gỡ), archived (lưu trữ)');

            $table->json('phones')->nullable()
                ->comment('Danh sách số điện thoại liên quan đến target');

            $table->json('bank_accounts')->nullable()
                ->comment('Danh sách tài khoản ngân hàng (STK, ngân hàng, chủ TK, ghi chú)');

            $table->json('links')->nullable()
                ->comment('Các link liên quan: Facebook, bài phốt, link chứng cứ');

            $table->json('websites')->nullable()
                ->comment('Website chính thức hoặc website nghi vấn');

            $table->json('emails')->nullable()
                ->comment('Danh sách email liên quan');

            $table->json('extra_data')->nullable()
                ->comment('Dữ liệu mở rộng khác (linh hoạt)');
            $table->text('summary')->nullable()
                ->comment('Tóm tắt ngắn về target (admin/mod ghi)');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('targets');
    }
};
