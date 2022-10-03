import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
// import { NavController } from '@ionic/angular';
  import { Registro } from '../models/registro.model';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  // mio de la TAREA  1

  // guardados:Registro[] = [];
  
  // mio de la tarea  1

  constructor(private navCtrl:NavController) { }

  async guardarRegistro(format:string, content:string)
  {
    const nuevoRegistro = new Registro(format,content);
   
    // Tare 1 -- deben guardar los registros en la memoria del equipo
   // 1 

    // this.guardados.unshift( nuevoRegistro );
  
    // Abrir el registro 

  }
  abrirRegistro(registro:Registro)
  {   
// no me toma esta parte --------50:20-------------------------
   this.navCtrl.navigateForward('/taps/tap2');

    switch(registro.type){
      case 'http':
        
        // tarea 2 abrir el registro en el navegador nativo
        // del dispositivo
        break; 
    
      case 'geo':
        this.navCtrl.navigateForward(`/taps/tap2/mapa/${registro.content}`);
   
        // abrir el mapa 

        // min 45:00 
        break;

  }

}
}