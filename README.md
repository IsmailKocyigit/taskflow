
# TASKFLOW — Görev ve Proje Yönetim Sistemi API

## 1. Proje Hakkında

Projenin adı "TASKFLOW"dur.

Software persona, backend eğitimi için geliştirilmiş bir öğrenim projesidir.

Proje Node.js ve Express.js kullanılarak geliştirilmiştir.
Görev verileri JSON dosyasında saklanmaktadır.

## 2. Kullanılan Teknolojiler

- Node.js
- Express.js
- JavaScript
- JSON dosya tabanlı veri saklama
- Postman

## 3. Kurulum

Projeyi bilgisayarına indirdikten veya kopyaladıktan sonra proje klasöründe terminal aşağıdaki komut çalıştırılmalıdır:

```bash
npm install
```

## 4. Uygulamayı Çalıştırma

Geliştirme modunda başlatmak için terminal ile aşağıdaki komut çalıştırılmalıdır:

```bash
npm run dev
```

Normal şekilde başlatmak için terminal ile aşağıdaki komut çalıştırılmalıdır:

```bash
npm start
```

Sunucu varsayılan olarak şu adreste çalışır:

http://localhost:3000

## 5. Proje Senaryosu

Bir yazılım şirketi ekip içerisindeki görevleri, projeleri ve çalışanların sorumluluklarını takip etmek istemektedir.
Geliştirilen sistem; görevlerin oluşturulmasını, çalışanlara atanmasını, durumlarının takip edilmesini, önceliklendirilmesini ve temel raporlama süreçlerini desteklemektedir.

## 6. API Endpoint'leri

| HTTP Metodu | Endpoint | Açıklama |
|---|---|---|
| GET | / | API durumunu kontrol eder |
| POST | /tasks | Yeni görev oluşturur |
| GET | /tasks | Tüm görevleri listeler |
| GET | /tasks/:id | ID ile görev getirir |
| PUT | /tasks/:id | Görevi günceller |
| DELETE | /tasks/:id | Görevi siler |

## 7. Görev Veri Modeli

Her görev aşağıdaki alanları içerebilir:

- id: Benzersiz görev kimliği
- title: Görev başlığı
- description: Görev açıklaması
- status: Görevin durumu
- priority: Görevin önceliği
- assignee: Görevden sorumlu kişi
- createdAt: Oluşturulma tarihi
- updatedAt: Son güncelleme tarihi

Örnek görev durumları: pending, in_progress, completed.

Örnek öncelik seviyeleri: low, medium, high.

## 8. Veri Saklama

Görevler data/tasks.json dosyasında saklanır.
Veriler, sunucu yeniden başlatıldığında JSON dosyası korunduğu sürece kullanılabilir durumda kalır.

## 9. Logger Middleware

Logger middleware'i gelen HTTP isteklerinin metodunu, endpoint bilgisini ve zaman damgasını terminale yazar.

## 10. Proje Yapısı

taskflow/
├── controllers/
│   └── taskController.js
├── data/
│   └── tasks.json
├── middleware/
│   └── logger.js
├── routes/
│   └── taskRoutes.js
├── app.js
├── server.js
├── package.json
└── README.md
