import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, Platform, ToastController } from '@ionic/angular';
import axios from 'axios';
import { DataService, Message } from '../services/data.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  public message!: Message;
  private data = inject(DataService);
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);
  usuario : any = {};

  constructor(private toastController: ToastController,
   private router: Router) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    //this.message = this.data.getMessageById(parseInt(id, 10));
    let token =localStorage.getItem('token');
    let config = {
      headers : {
        "Authorization": token
      }
    }
    axios.get("http://localhost:4000/user/" + id, config)
    .then( result => {
      if (result.data.success == true) {

        if( result.data.usuario != null){
          this.usuario = result.data.usuario;
        }else{
          this.usuario = {};
        }
       
      } else {
        console.log(result.data.error);
      }
      
    }).catch(error => {
      console.log(error.message);
    })
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios')
    return isIos ? 'Inbox' : '';
    

    
  }

  saveUser(){
    console.log("usuario", this.usuario);
    var data = {
      id : this.usuario.id,
      name: this.usuario.name,
      last_name: this.usuario.last_name,
      email: this.usuario.email
    }
    console.log(data);

    let token =localStorage.getItem('token');
    let config = {
      headers : {
        "Authorization": token
      }
    }
    axios.post("http://localhost:4000/users/update" , data, config)
    .then(  async result => {
      if (result.data.success == true) {
        console.log(result.data);
        this.presentToats ("Usuario Guardado!!!");
          this.router.navigate(["/home"]);
      } else {
        this.presentToats (result.data.error );
        
      }
      
    }).catch( async error => {
      this.presentToats (error.message.data.error );
    })
  }

  async presentToats (message : string){
    const toast = await this.toastController.create({
      message:message,
      duration: 1500,
      position: 'bottom',
      });

    await toast.present();
  }
}
