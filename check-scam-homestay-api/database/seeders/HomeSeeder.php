<?php

namespace Database\Seeders;

use App\Containers\SharedSection\Home\Models\Home;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Faker\Factory;

class HomeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Factory::create('vi_VN');

        $cities = ['Hà Nội', 'Đà Lạt', 'Đà Nẵng', 'Hội An', 'Sapa', 'Hồ Chí Minh', 'Vũng Tàu', 'Nha Trang', 'Phú Quốc', 'Huế'];
        $adjectives = ['Xanh', 'Bình Yên', 'Mộng Mơ', 'Cổ Điển', 'Hiện Đại', 'Gia Đình', 'Biển Xanh', 'Phố Cổ', 'Ngàn Thông', 'Mây Ngàn'];
        $types = ['Homestay', 'Villa', 'Bungalow', 'Nhà Nghỉ', 'Căn Hộ'];

        for ($i = 0; $i < 20; $i++) {
            $city = $faker->randomElement($cities);
            $type = $faker->randomElement($types);
            $adj = $faker->randomElement($adjectives);
            
            $name = "$type $adj $city";
            
            $description = "Chào mừng bạn đến với $name. Chúng tôi cung cấp dịch vụ lưu trú tuyệt vời tại trung tâm $city. 
            Phòng ốc sạch sẽ, đầy đủ tiện nghi (Wifi, máy lạnh, nóng lạnh). 
            Gần các địa điểm du lịch nổi tiếng. 
            Liên hệ ngay để đặt phòng với giá ưu đãi!";

            $phoneNumberBase = $faker->numerify('9########');
            $phone = '0' . $phoneNumberBase;
            $phoneFull = '+84' . $phoneNumberBase;

            Home::create([
                'name' => $name,
                'phone' => $phone, 
                'phone_full' => $phoneFull,
                'bank_account' => $faker->creditCardNumber,
                'link_facebook' => 'https://facebook.com/homestay-' . Str::slug($name),
                'link_tiktok' => 'https://tiktok.com/@' . Str::slug($name),
                'link_zalo' => 'https://zalo.me/' . $phone,
                'link_website' => 'https://' . Str::slug($name) . '.com.vn',
                'link_other' => null,
                'address' => $faker->streetAddress . ', ' . $city, 
                'description' => $description,
                'latitude' => $faker->latitude(8.5, 23.5), 
                'longitude' => $faker->longitude(102.0, 109.5), 
                'rating' => $faker->randomFloat(2, 3.5, 5.0), 
                'is_scam' => $faker->boolean(5), 
                'is_confirmed' => $faker->boolean(80),
                'followers' => $faker->numberBetween(100, 10000),
            ]);
        }
    }
}
