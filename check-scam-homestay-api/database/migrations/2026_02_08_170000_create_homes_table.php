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
        Schema::create('homes', function (Blueprint $table) {
            $table->uuid('id')->primary()
                ->comment('ID homestay/nhà trọ');

            $table->string('name', 255)
                ->comment('Tên homestay');

            $table->string('phone', 20)->nullable()
                ->comment('SĐT ngắn (0987654321)');

            $table->string('phone_full', 20)->nullable()
                ->comment('SĐT đầy đủ (+84987654321)');

            $table->string('bank_account', 50)->nullable()
                ->comment('Số tài khoản ngân hàng');

            $table->string('link_facebook', 500)->nullable()
                ->comment('URL Facebook');

            $table->string('link_tiktok', 500)->nullable()
                ->comment('URL Tiktok');

            $table->string('link_zalo', 500)->nullable()
                ->comment('URL Zalo');

            $table->string('link_website', 500)->nullable()
                ->comment('URL Website');

            $table->string('link_other', 500)->nullable()
                ->comment('URL khác');

            $table->string('address', 500)->nullable()
                ->comment('Địa chỉ');

            $table->text('description')->nullable()
                ->comment('Mô tả chi tiết');

            $table->string('latitude', 50)->nullable()
                ->comment('Vĩ độ GPS');

            $table->string('longitude', 50)->nullable()
                ->comment('Kinh độ GPS');

            $table->decimal('rating', 3, 2)->default(0.00)
                ->comment('Đánh giá (0-5)');

            $table->boolean('is_scam')->default(false)
                ->comment('Trạng thái lừa đảo');

            $table->boolean('is_confirmed')->default(false)
                ->comment('Đã xác thực');

            $table->integer('followers')->default(0)
                ->comment('Số người theo dõi');

            $table->timestamps();

            // Indexes
            $table->index('is_scam');
            $table->index('is_confirmed');
            $table->index('rating');

            // FULLTEXT index for search
            $table->fullText(['name', 'description']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('homes');
    }
};
