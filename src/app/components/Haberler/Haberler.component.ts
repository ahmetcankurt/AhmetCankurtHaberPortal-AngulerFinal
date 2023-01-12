import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { concatMap } from 'rxjs';
import { Haberler } from 'src/app/models/Haberler';
import { Kategoriler } from 'src/app/models/Kategoriler';
import { Uye } from 'src/app/models/Uye';
import { FbservisService } from 'src/app/services/fbservis.service';

@Component({
  selector: 'app-Haberler',
  templateUrl: './Haberler.component.html',
  styleUrls: ['./Haberler.component.css']
})
export class HaberlerComponent implements OnInit {
  
  haberler!: Haberler[];
  kategoriler!: Kategoriler[];
  uyeler!: Uye[];
  uye = this.fbServis.AktifUyeBilgi;
  modal!: Modal;
  modalBaslik: string = '';
  secHaber!: Haberler;
  frm: FormGroup = new FormGroup({
    uid: new FormControl(),
    haberBasligi: new FormControl(),
    haberYazan: new FormControl(),
    categoryId: new FormControl(),
    haberManseti: new FormControl(),
    haberYazisi: new FormControl(),
    haberKayitTarihi: new FormControl(),
    haberDuzenlemeTarihi: new FormControl(),
    haberResim: new FormControl(),

  });
  constructor(
    public fbServis: FbservisService,
    public htoast: HotToastService
  ) { }

  ngOnInit() {
    this.fbServis.AktifUyeBilgi.subscribe((user) => {
      this.frm.patchValue({ ...user });
    });
    this.KategoriListele();
    this.HaberListele();
    this.UyeListele();
  }
  UyeListele() {
    this.fbServis.UyeListele().subscribe((d) => {
      this.uyeler = d;
    });
  }
  HaberListele() {
    this.fbServis.HaberlerListele().subscribe((d) => {
      this.haberler = d;
      console.log(this.haberler);
    });
  }
  KategoriListele() {
    this.fbServis.KategorilerListele().subscribe((d) => {
      this.kategoriler = d;
    });
  }
  EkleKaydet() {
    var haber: Haberler = this.frm.value;
    if (
      !haber.haberBasligi ||
      !haber.haberManseti ||
      !haber.categoryId   ||   
      !haber.haberYazisi ||
      !haber.haberYazan   

    ) {
      this.htoast.warning('Alanlar boş geçilemez');
    } else {
      this.fbServis
        .HaberlerEkle(this.frm.value)
        .pipe(
          this.htoast.observe({
            loading: 'Haber Ekleniyor',
            success: 'Haber Eklendi',
            error: 'Haber Eklenirken Hata oluştu',
          })
        )
        .subscribe();
    }
  }
  DuzenleKaydet() {
    var haber: Haberler = this.frm.value;
    if (
      !haber.haberBasligi ||
      !haber.haberYazan   ||
      !haber.categoryId   ||
      !haber.haberManseti ||
      !haber.haberYazisi
    ) {
      this.htoast.warning('Alanlar boş geçilemez');
    } else {
      this.fbServis
        .HaberlerDuzenle(haber)
        .pipe(
          this.htoast.observe({
            loading: 'Haber Düzenleniyor',
            success: 'Haber Düzenlendi',
            error: 'Haber Düzenlenirken Hata oluştu',
          })
        )
        .subscribe();
    }
  }
  Sil(haber: Haberler) {
    this.fbServis.HaberlerSil(haber).then(() => { });
  }
  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.frm.patchValue({ admin: 0 });
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = 'Haber Ekle';
    this.modal.show();
  }
  Duzenle(haber: Haberler, el: HTMLElement) {
    this.frm.patchValue(haber);
    this.modalBaslik = 'Haber Düzenle';
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  ResimYukle(event: any, haber: Haberler) {
    this.fbServis
      .uploadImage(event.target.files[0], `images/profile/${haber.uid}`)
      .pipe(
        this.htoast.observe({
          loading: 'Fotoğraf Yükleniyor...',
          success: 'Fotoğraf yüklendi',
          error: 'Hata oluştu',
        }),
        concatMap((haberResim) =>
          this.fbServis.HaberlerDuzenle({
            uid: haber.uid,
            haberResim,
            haberBasligi: haber.haberBasligi,
            haberYazan: haber.haberYazan,
            categoryId: haber.categoryId,
            haberManseti: haber.haberManseti,
            haberYazisi: haber.haberYazisi
          })
        )
      )
      .subscribe();
  }
}
