import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import * as bootstrap from 'bootstrap';
import { Kategoriler } from 'src/app/models/Kategoriler';
import { Uye } from 'src/app/models/Uye';
import { FbservisService } from 'src/app/services/fbservis.service';
import { Modal } from 'bootstrap';
 

@Component({
  selector: 'app-Kategoriler',
  templateUrl: './Kategoriler.component.html',
  styleUrls: ['./Kategoriler.component.css']
})
export class KategorilerComponent implements OnInit {
  uyeler!: Uye[];
  uye = this.fbServis.AktifUyeBilgi;
  kategoriler!: Kategoriler[];
  modalBaslik: string = '';
  modal!: Modal;
  frm: FormGroup = new FormGroup({
    uid: new FormControl(),
    kategoriAdi: new FormControl(),
  });
 
  
  constructor(
    public fbServis: FbservisService,
    public htoast: HotToastService
  ) { }

  ngOnInit() {
    this.KategoriListele();
    this.UyeListele();
  }
  UyeListele() {
    this.fbServis.UyeListele().subscribe((d) => {
      this.uyeler = d;
    });
  }

  KategoriListele() {
    this.fbServis.KategorilerListele().subscribe((d) => {
      this.kategoriler = d;
    });
  }
  Sil(kategori: Kategoriler) {
    this.fbServis.KategorilerSil(kategori).then(() => { });
    this.htoast.show('Başarıyla Silindi');
  }
  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.frm.patchValue({ admin: 0 });
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = 'Kategori Ekle';
    this.modal.show();
  }
  Duzenle(haber: Kategoriler, el: HTMLElement) {
    this.frm.patchValue(haber);
    this.modalBaslik = 'Kategori Düzenle';
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  EkleKaydet() {
    var kategori: Kategoriler = this.frm.value;
    if (!kategori.kategoriAdi) {
      this.htoast.show('Kategori Adı boş geçilemez');
    } else {
      var filtre = this.kategoriler.filter((s) => s.kategoriAdi == kategori.kategoriAdi);
      if (filtre.length > 0) {
        this.htoast.show('Kategori adı zaten var');
      } else {
        this.fbServis
          .KategorilerEkle(this.frm.value)
          .pipe(
            this.htoast.observe({
              success: 'Kategori Eklendi',
              loading: 'Kategori Ekleniyor...',
              error: ({ message }) => `${message}`,
            })
          )
          .subscribe();
      }
    }
  }

  DuzenleKaydet() {
    var kategori: Kategoriler = this.frm.value;
    if (
      !kategori.kategoriAdi 
    ) {
      this.htoast.warning('Alanlar boş geçilemez');
    } else {
      var filtre = this.kategoriler.filter((s) => s.kategoriAdi == kategori.kategoriAdi);
      if (filtre.length > 0) {
        this.htoast.show('Kategori adı zaten var');
      } else {
        this.fbServis
          .KategorilerDuzenle(kategori)
          .pipe(
            this.htoast.observe({
              loading: 'kategori Düzenleniyor',
              success: 'kategori Düzenlendi',
              error: 'kategori Düzenlenirken Hata oluştu',
            })
          )
          .subscribe();
      }
    }
  }
}
