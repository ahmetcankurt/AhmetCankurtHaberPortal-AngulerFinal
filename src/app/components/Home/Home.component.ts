import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { Haberler } from 'src/app/models/Haberler';
import { Kategoriler } from 'src/app/models/Kategoriler';
import { Uye } from 'src/app/models/Uye';
import { FbservisService } from 'src/app/services/fbservis.service';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements OnInit {

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
            loading: 'haber Ekleniyor',
            success: 'haber Eklendi',
            error: 'haber Eklenirken Hata oluştu',
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
            loading: 'haber Düzenleniyor',
            success: 'haber Düzenlendi',
            error: 'haber Düzenlenirken Hata oluştu',
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
    this.modalBaslik = 'haber Ekle';
    this.modal.show();
  }
  Duzenle(haber: Haberler, el: HTMLElement) {
    this.frm.patchValue(haber);
    this.modalBaslik = 'haber Düzenle';
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  
}
