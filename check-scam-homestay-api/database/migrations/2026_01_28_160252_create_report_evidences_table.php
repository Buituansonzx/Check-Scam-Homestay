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
        Schema::create('report_evidences', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('report_id')->constrained('reports')->onDelete('cascade');
            $table->string('file_path')->comment('Đường dẫn đến tệp bằng chứng liên quan đến báo cáo');
            $table->integer('width')->nullable()->comment('Chiều rộng của hình ảnh (nếu là hình ảnh)');
            $table->integer('height')->nullable()->comment('Chiều cao của hình ảnh (nếu là hình ảnh)');
            $table->string('mine') ->comment('Loại MIME của tệp bằng chứng');
            $table->string('disk') ->comment('Tên ổ đĩa lưu trữ tệp bằng chứng');
            $table->string('variants')->nullable()->comment('Các biến thể của tệp bằng chứng (nếu có), lưu dưới dạng JSON');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('report_evidences');
    }
};
