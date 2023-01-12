import { Uye } from './../models/Uye';
import { Injectable } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, docData, Firestore, query, setDoc, where } from '@angular/fire/firestore';
import { concatMap, from, map, Observable, of, switchMap, take } from 'rxjs';
import { addDoc, updateDoc } from '@firebase/firestore';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  User,
  UserInfo,
} from '@angular/fire/auth';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
import { Haberler } from '../models/Haberler';
import { Kategoriler } from '../models/Kategoriler';

@Injectable({
  providedIn: 'root'
})
export class FbservisService {
  aktifUye = authState(this.auth);
  constructor(
    public fs: Firestore,
    public auth: Auth,
    public storage: Storage
  ) { }

  KayitOl(mail: string, parola: string) {
    return from(createUserWithEmailAndPassword(this.auth, mail, parola));
  }
  OturumAc(mail: string, parola: string) {
    return from(signInWithEmailAndPassword(this.auth, mail, parola));
  }
  GoogleOturumAc() {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider()));
  }
  OturumKapat() {
    return from(this.auth.signOut());
  }

  get AktifUyeBilgi() {
    return this.aktifUye.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }
        const ref = doc(this.fs, 'Uyeler', user?.uid);
        return docData(ref) as Observable<Uye>;
      })
    );
  }
  

  UyeListele() {
    var ref = collection(this.fs, "Uyeler");
    return collectionData(ref, { idField: 'uid' }) as Observable<Uye[]>;
  }
  UyeEkle(uye: Uye) {
    var ref = doc(this.fs, 'Uyeler', uye.uid);
    return from(setDoc(ref, uye));
  }
  UyeDuzenle(uye: Uye) {
    var ref = doc(this.fs, "Uyeler", uye.uid);
    return from(updateDoc(ref, { ...uye }));
  }
  UyeSil(uye: Uye) {
    var ref = doc(this.fs, "Uyeler", uye.uid);
    return deleteDoc(ref);
  }

  uploadImage(image: File, path: string): Observable<string> {
    const storageRef = ref(this.storage, path);
    const uploadTask = from(uploadBytes(storageRef, image));
    return uploadTask.pipe(switchMap((result) => getDownloadURL(result.ref)));
  }
  // Haberler
  HaberlerListele() {
    var ref = collection(this.fs, "Haberler");
    return collectionData(ref, { idField: 'uid' }) as Observable<Haberler[]>;
  }
  HaberlerEkle(haber: Haberler) {
    var ref = collection(this.fs, 'Haberler');
    return from(addDoc(ref, haber));
  }
  HaberlerDuzenle(haber: Haberler) {
    var ref = doc(this.fs, "Haberler", haber.uid);
    return from(updateDoc(ref, { ...haber }));
  }
  HaberlerSil(haber: Haberler) {
    var ref = doc(this.fs, "Haberler", haber.uid);
    return deleteDoc(ref);
  }
  HaberlerById(haberId: string) {
    var ref = doc(this.fs, "Haberler", haberId);
    return docData(ref) as Observable<Haberler>;
  }
  
  

  // haberler Son

  // Kategoriler Başlangıç

  KategorilerListele() {
    var ref = collection(this.fs, "Kategoriler");
    return collectionData(ref, { idField: 'uid' }) as Observable<Kategoriler[]>;
  }
  KategorilerEkle(kategori: Kategoriler) {
    var ref = collection(this.fs, 'Kategoriler');
    return from(addDoc(ref, kategori));
  }
  KategorilerDuzenle(kategori: Kategoriler) {
    var ref = doc(this.fs, "Kategoriler", kategori.uid);
    return from(updateDoc(ref, { ...kategori }));
  }
  KategorilerSil(kategori: Kategoriler) {
    var ref = doc(this.fs, "Kategoriler", kategori.uid);
    return deleteDoc(ref);
  }
  

  // Kategoriler Son

  // 

}
