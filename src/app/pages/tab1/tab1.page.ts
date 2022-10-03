import { AfterViewInit, Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController, Config, Platform } from '@ionic/angular';
// import { format } from 'path';
import { DataLocalService } from 'src/app/services/data-local.service';
// import { resolve } from 'dns';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements AfterViewInit {

  scanActive:boolean = false;




  constructor(
    private alertCtrl:AlertController,
    private platform:Platform,
    private dataLocalService:DataLocalService
    ) {}
  ngAfterViewInit(){  
    if(this.platform.is('capacitor')){
      BarcodeScanner.prepare();
    }
  }

  async scan(){ 
    if(this.platform.is('capacitor')){
      console.log("comenzando a escanear");
      const allowed = await this.checkPermisos();
      // console.log("Estatus permisos:",allowed);
      if(allowed){
        this.scanActive = true;
        const result = await BarcodeScanner.startScan();
        if (result.hasContent) {
        console.log(result.content); 
        this.dataLocalService.guardarRegistro(result.format,result.content)
        this.scanActive=false;
      }
      }  
      

    }else{

      console.log('Corriendo en web');
      this.dataLocalService.guardarRegistro('geo','geo:40.7807769727703,-74.03857695380083')
    }
    
  }

  checkPermisos(){
    return new Promise(async (resolve,reject) =>{
      const status = await BarcodeScanner.checkPermission({force:true});
      if(status.granted){ 
        resolve(true);

      }else if(status.denied) {
        // configurar
        const alert = await this.alertCtrl.create({
          header:'Sin Permisos',
          message:'Por favor permita el acceso a la camara en sus preferencias',
          buttons:[
            {
              text: 'No',
              role: 'Cancel'
            },
            {
              text: 'Abrir preferencias',
              handler:()=>{
                BarcodeScanner.openAppSettings(),
                resolve(false)
                // quede aqui 
              }

            }
          ]
        });
        await alert.present();
      }else{
        resolve(reject);
      }
    })
  }
}
