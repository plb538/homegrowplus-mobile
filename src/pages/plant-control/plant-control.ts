import { Component } from '@angular/core';
import { ViewController, NavController, NavParams, AlertController } from 'ionic-angular';
import { ReservoirManager } from '../../model/managers/reservoir-manager';
import { RestClient } from '../../provider/rest-client';
import { Tray } from '../../model/components/tray';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { Plant } from '../../model/components/plant';

@Component({
    selector: 'page-plant-control',
    templateUrl: 'plant-control.html'
})
export class PlantControlPage {


    public trayNumber: number;
    public tray: Tray;
    public rest: RestClient;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, public modalCtrl: ModalController, public alertCtrl: AlertController) {
        this.trayNumber = navParams.data[0];
        this.tray = navParams.data[1];
        this.rest = navParams.data[2];
    }

    public addPlant(plant) {
        this.alertCtrl.create(
            {
                title: 'Add a plant',
                message: 'Enter details below',
                inputs: [
                    {
                        name: 'Name',
                        placeholder: 'Plant Name'
                    }, {
                        name: 'Date',
                        placeholder: 'Date (Leave blank if planting now)'
                    }
                ],
                buttons: [
                    {
                        text: 'Cancel',
                        handler: (data) => {
                            //no-op
                        }
                    }, {
                        text: 'OK',
                        handler: (data) => {
                            console.log(data);
                            if (data) {
                                if (data['Date'] == '') {
                                    this.tray.addPlant(new Plant(data['Name'], Date.now()), this.tray.getAllPlants().indexOf(plant));
                                } else {
                                    this.tray.addPlant(new Plant(data['Name'], data['Date']), this.tray.getAllPlants().indexOf(plant));
                                }
                            }
                        }
                    }
                ]
            }
        ).present();
    }

    public removePlant(plant) {
        this.tray.removePlant(this.tray.getAllPlants().indexOf(plant));
    }

    public getPlantsForTray() {
        return this.tray.getAllPlants();
    }

    public plantIsEmpty(plant): boolean {
        return plant.name == "Empty";
    }
}
