# Movie-App

This App being developed by Luki Subandi. I intend to license this App under MIT License.

Fork or clone this repository to your personal repository.

## How to run the App:

1. Setup React Native Environment in your personal PC based on this guide: https://reactnative.dev/docs/environment-setup.
2. Open your remote personal repository that held the codebase for this up.
3. In the root folder run this int your terminal/command cli:
   1. Run `npm install` or `yarn`.
   2. Then run `react-native start` or `yarn start`.
   3. Then run `react-native run-android` or `yarn run-android`

In the Linux based OS you may find npm not running as expected you may need `npx react-native start` then `npx react-native run-android`.

If you find some error feel free to open issues.

Happy Hacking.

-@ganLS-

---

## Cara membuat Debug APK

copas command berikut di terminal pada folder utama

`npx react-native bundle --dev false --platform android --entry-file index.js --bundle-output ./android/app/src/main/assets/index.android.bundle --assets-dest ./android/app/src/main/res`

atau

`npx react-native bundle --dev false --platform android --entry-file index.js --bundle-output ./android/app/build/intermediates/assets/debug/index.android.bundle --assets-dest ./android/app/build/intermediates/res/merged/debug`

pada kasus OS linux perlu ada penambahan yarn/npx di depan command, pada OS lain mungkin tidak diperlukan.

jika ada kendala karena error Enoent coba buat foldernya dengan
`mkdir android/app/src/main/assets`

setelah selesai
#Buka file android
`cd android`

jika gagal build karena Execution failed for task ':app:mergeDexDebug' atau semacamnya coba
baca:
https://rnfirebase.io/enabling-multidex

#Create debug build:
`./gradlew assembleDebug`

#Create release build:
`./gradlew assembleRelease`

apk debug ada pada
`cd app/build/outputs/apk/debug`

---

Repositori ini dibuat untuk memenuhi test assesment untuk masuk ke dalam team mobile Front End Development PT FLIP Indonesia. 

Catatan dalam Pengembangan:
1. Saya menggunakan create_at sebagai acuan tanggal untuk sorting dan tanggal pada transaction card. 
2. Saya belum sempat membuat debug apk atau ios testflight. 



Jika diberikan waktu lebih dari yang sekarang, dengan keadaan saya yang sekarang yang sedang bekerja di perusahaan lain tidak banyak yang bisa saya kerjakan. Karena saya akan mengutamakan pekerjaan saya. Seluruh repositori ini dibangun selama lima hari dengan saya tetap melakukan presensi (bekerja) di perusahaan saat ini saya bekerja selama tanggal 13-15 November 2024. Saya baru muali full incharge setelah 16 November 2024.

Namun, Jika ada waktu lebih untuk mengerjakan tugas ini (dengan syarat saya tidak memiliki beban kerja di perusahaan lain), saya bisa melakukan:

1. Menambah method-method yang meningkatkan user experience seperti activity indicator saat loading, error report saat fetch tidak berhasil atau error report lainnya, dengan syarat API dari BE juga diperbaharui.
2. Jika ada waktu 2 pekan lagi, saya bisa mengubah global state manajemen yang disini saya menggunakan react.contex + react.useReducer menjadi react-redux. (ada beberapa alasan saya menggunakan state manajemen pilihan saya, akan saya jelaskan dibawah).
3. Jika diberikan 2 bulan lagi saya bisa membuat aplikasi mockup (bahkan bisa dengan API), untuk tampilan sederhana mencakup mungkin sampai 5 fitur baru seperti hit transaksi, confirmasi transaksi, modul ppob (3 modul).
4. Jika diberikan waktu 1 tahun, saya bisa usahakan sudah bisa membuat full feature aplikasi flip (mungkin masih dengan beberapa bug). 
5. Lebih daru 1 tahun, saya lebih mementingkan apa yang diperlukan customer. 

Mengapa saya memilih menggunakan React.Context + React.useReducer dibanding react-redux? Alasan paling praktisnya karena saya sudah terbiasa dengan state manajemen ini. Tetapi, ada banyak alasan teknis lain, seperti:

1. react.context +react.useReducer dibuat oleh developer yang membuat redux, sehingga bisa dikatakan API dari react.context + useReducer lebih termaintain dengan baik, lebih mudah digunakan dan lebih sedikit boiler plate dan middleware.
2. Tidak perlu menginstall package tambahan, semakin sedikit third party package semakin mudah memaintain pekerjaan/ proyek.
3. Bisa membuat multi store tanpa banyak boilerplate. Saya sudah pernah membuat aplikasi dengan lebih dari 40 react.context.provider. Dan masih berjalan dengan sangat ringan. Kelemahan aplikasi dengan satu global state store adalah adanya banyak middleware, nesting state dan boiler plate.
4. react.context + react.useProvider langsung di maintain oleh team developer react sehingga kemungkinan terjadi API yang tidak termaintain, conflict major upgrade (atau minor) dan ketidak cocokan lain dari perubahan versi sangat kecil.

Saya sudah pernah menggunakan react-redux dalam karir saya, saya mempelajarinya selama kurang lebih 2 pekan penuh. Saya hanya perlu waktu 3 hari untuk memahami react.context. Dari pandangan subjective saya, jika saya ingin mengerjakan proyek pribadi dengan menggunakan react.js atau react-native saya akan selalu mendahulukan react.context + react.useReducer dibanding react-redux. Akan tetapi, dalam pekerjaan saya akan tetap mengikuti framework yang banyak digunakan oleh team atau framework yang diharuskan oleh perusahaan.

Seperti pengalaman saya sekarang saya bekerja dengan framework Flutter/Dart menggunakan BLoC. Saya awalnya lebih fasih menggunakan Provider, tetapi setelah 1.5 tahun saya menggunakan BLoC bisa dikatakan saya sudah lebih fasih menggunakan BLoC. Begitu juga kemungkinan dengan redux, jika saya menggunakannya sampai 1,5 tahun kemungkinan besar saya akan lebih memahaminya. 

Selain itu, pengembangan dengan menggunakan react-redux tidak jauh berbeda dengan react.useReducer hanya berbeda di tingkat middleware yang digunakan sebagai state distributor, sehingga akan lebih mudah saya menerapkannya.

-Luki Subandi-
